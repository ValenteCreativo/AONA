"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InkBrushDivider } from "@/components/ink-brush-divider"

// Dynamic import for Leaflet to avoid SSR issues
const LeafletMap = dynamic(() => import("@/components/atlas/leaflet-map"), { ssr: false })

interface WeatherData {
  temperature: number
  precipitation: number
  humidity: number
  windSpeed: number
  location: string
}

interface USGSData {
  siteName: string
  siteCode: string
  waterLevel: number | null
  discharge: number | null
  temperature: number | null
}

export default function AtlasPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [usgsData, setUSGSData] = useState<USGSData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Open-Meteo weather data (free, no auth)
        const weatherRes = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=39.74&longitude=-104.99&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m'
        )
        const weatherJson = await weatherRes.json()

        if (weatherJson.current) {
          setWeather({
            temperature: weatherJson.current.temperature_2m,
            precipitation: weatherJson.current.precipitation,
            humidity: weatherJson.current.relative_humidity_2m,
            windSpeed: weatherJson.current.wind_speed_10m,
            location: "Denver, CO"
          })
        }

        // Fetch USGS Water Services data (free, no auth)
        const usgsRes = await fetch(
          'https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=co&parameterCd=00060,00065,00010&siteStatus=active'
        )
        const usgsJson = await usgsRes.json()

        if (usgsJson.value?.timeSeries) {
          const sites = usgsJson.value.timeSeries.slice(0, 5).map((ts: any) => ({
            siteName: ts.sourceInfo?.siteName || 'Unknown',
            siteCode: ts.sourceInfo?.siteCode?.[0]?.value || 'N/A',
            waterLevel: ts.variable?.variableCode?.[0]?.value === '00065'
              ? ts.values?.[0]?.value?.[0]?.value
              : null,
            discharge: ts.variable?.variableCode?.[0]?.value === '00060'
              ? ts.values?.[0]?.value?.[0]?.value
              : null,
            temperature: ts.variable?.variableCode?.[0]?.value === '00010'
              ? ts.values?.[0]?.value?.[0]?.value
              : null
          }))
          setUSGSData(sites)
        }

        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch API data:', error)
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">
            Water Atlas
          </h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Real-time water quality monitoring powered by USGS Water Services, Open-Meteo weather API,
            and on-chain data from Switchboard oracles.
          </p>
          <div className="flex gap-2 mt-6">
            <Badge variant="outline" className="text-xs">🌐 Open-Meteo API</Badge>
            <Badge variant="outline" className="text-xs">💧 USGS Water Services</Badge>
            <Badge variant="outline" className="text-xs">⛓️ Switchboard Oracle</Badge>
            <Badge variant="outline" className="text-xs border-green-500/50 text-green-500">🔴 LIVE</Badge>
          </div>
        </div>
      </div>

      <InkBrushDivider />

      {/* Real-time weather data from Open-Meteo */}
      {weather && (
        <div className="container mx-auto px-6 py-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-wide flex items-center gap-2">
                <span>🌤️</span>
                Current Weather - {weather.location}
                <Badge variant="outline" className="text-xs ml-auto">Open-Meteo API</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-light text-muted-foreground mb-1">Temperature</p>
                  <p className="text-2xl font-light">{weather.temperature}°C</p>
                </div>
                <div>
                  <p className="text-sm font-light text-muted-foreground mb-1">Precipitation</p>
                  <p className="text-2xl font-light">{weather.precipitation} mm</p>
                </div>
                <div>
                  <p className="text-sm font-light text-muted-foreground mb-1">Humidity</p>
                  <p className="text-2xl font-light">{weather.humidity}%</p>
                </div>
                <div>
                  <p className="text-sm font-light text-muted-foreground mb-1">Wind Speed</p>
                  <p className="text-2xl font-light">{weather.windSpeed} km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Interactive Leaflet Map */}
      <div className="container mx-auto px-6 py-8">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-light tracking-wide">
              Network Coverage Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px] w-full">
              <LeafletMap usgsData={usgsData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* USGS Water Services Data */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-light tracking-widest text-foreground mb-6">
          Live USGS Water Data
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="py-12 text-center">
                <p className="text-sm font-light text-muted-foreground">Loading USGS data...</p>
              </CardContent>
            </Card>
          )}
          {usgsData.map((site, i) => (
            <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-light tracking-wide flex items-center gap-2">
                  <span>💧</span>
                  {site.siteName}
                </CardTitle>
                <p className="text-xs text-muted-foreground">Site {site.siteCode}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {site.waterLevel !== null && (
                    <div>
                      <p className="text-xs font-light text-muted-foreground mb-1">Water Level</p>
                      <p className="text-lg font-light">{site.waterLevel} ft</p>
                    </div>
                  )}
                  {site.discharge !== null && (
                    <div>
                      <p className="text-xs font-light text-muted-foreground mb-1">Discharge</p>
                      <p className="text-lg font-light">{site.discharge} cfs</p>
                    </div>
                  )}
                  {site.temperature !== null && (
                    <div>
                      <p className="text-xs font-light text-muted-foreground mb-1">Temperature</p>
                      <p className="text-lg font-light">{site.temperature}°C</p>
                    </div>
                  )}
                </div>
                <Badge variant="outline" className="text-xs mt-4">USGS Real-time</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
