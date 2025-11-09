"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InkBrushDivider } from "@/components/ink-brush-divider"

interface NodeDetail {
  id: string
  name: string
  location: string
  authority: string
  agent: string
  reputation: {
    score: number
    totalReadings: number
    uptime: number
    rank: string
  }
  lastReading: {
    ph: number
    turbidity: number
    conductivity: number
    temp: number
    level: number
    timestamp: number
  }
  earned: number
  price: {
    lamports: number
    sol: number
    usd: number
  }
}

interface WeatherData {
  temperature: number
  precipitation: number
  humidity: number
  windSpeed: number
}

interface USGSData {
  siteName: string
  siteCode: string
  waterLevel: number | null
  discharge: number | null
  temperature: number | null
}

export default function NodeDetailPage() {
  const params = useParams()
  const nodeId = params.id as string

  const [node, setNode] = useState<NodeDetail | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [usgsData, setUSGSData] = useState<USGSData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNodeData() {
      try {
        // Fetch node details from x402 API
        const nodeRes = await fetch('/api/x402/nodes')
        const nodeJson = await nodeRes.json()
        const foundNode = nodeJson.nodes?.find((n: NodeDetail) => n.id === nodeId)

        if (foundNode) {
          setNode(foundNode)

          // Fetch real weather data for node's location
          // Using Denver coords as example, ideally derive from node.location
          const weatherRes = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=39.74&longitude=-104.99&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m'
          )
          const weatherJson = await weatherRes.json()

          if (weatherJson.current) {
            setWeather({
              temperature: weatherJson.current.temperature_2m,
              precipitation: weatherJson.current.precipitation,
              humidity: weatherJson.current.relative_humidity_2m,
              windSpeed: weatherJson.current.wind_speed_10m
            })
          }

          // Fetch USGS data for node's watershed
          const usgsRes = await fetch(
            'https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=co&parameterCd=00060,00065,00010&siteStatus=active'
          )
          const usgsJson = await usgsRes.json()

          if (usgsJson.value?.timeSeries?.[0]) {
            const ts = usgsJson.value.timeSeries[0]
            setUSGSData({
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
            })
          }
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching node data:', error)
        setLoading(false)
      }
    }

    fetchNodeData()
    const interval = setInterval(fetchNodeData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [nodeId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading node data...</p>
      </div>
    )
  }

  if (!node) {
    return (
      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-light text-muted-foreground tracking-widest mb-8">Node not found</p>
          <Link href="/nodes" className="text-sm font-light text-primary hover:opacity-70 transition-opacity">
            ← Return to Nodes
          </Link>
        </div>
      </main>
    )
  }

  const timeSinceReading = node.lastReading
    ? Math.floor((Date.now() - node.lastReading.timestamp) / 60000)
    : null

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            href="/nodes"
            className="text-sm font-light text-primary/60 hover:text-primary transition-colors tracking-wide"
          >
            ← Nodes
          </Link>
        </div>
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="text-xs border-green-500/50 text-green-500">
              🔴 LIVE
            </Badge>
            <Badge variant="outline" className="text-xs">
              {node.reputation.rank}
            </Badge>
          </div>
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">
            {node.name}
          </h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Real-time water quality monitoring powered by AONA DePIN network,
            integrated with Open-Meteo weather API and USGS Water Services.
          </p>
        </div>
      </div>

      <InkBrushDivider />

      {/* Node Stats */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-light tracking-wide text-muted-foreground">
                Reputation Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-light mb-2">{node.reputation.score}</div>
              <p className="text-xs text-muted-foreground">{node.reputation.rank} tier</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-light tracking-wide text-muted-foreground">
                Total Readings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-light mb-2">{node.reputation.totalReadings}</div>
              <p className="text-xs text-muted-foreground">Data points submitted</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-light tracking-wide text-muted-foreground">
                Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-light mb-2">{node.reputation.uptime}%</div>
              <p className="text-xs text-muted-foreground">Network reliability</p>
            </CardContent>
          </Card>
        </div>

        {/* Latest Reading */}
        <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-light tracking-wide flex items-center gap-2">
              <span>💧</span>
              Latest Water Quality Reading
              {timeSinceReading !== null && (
                <span className="text-xs font-light text-muted-foreground ml-auto">
                  {timeSinceReading} minutes ago
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm font-light text-muted-foreground mb-1">pH</p>
                <p className="text-2xl font-light">{node.lastReading.ph}</p>
              </div>
              <div>
                <p className="text-sm font-light text-muted-foreground mb-1">Turbidity</p>
                <p className="text-2xl font-light">{node.lastReading.turbidity} NTU</p>
              </div>
              <div>
                <p className="text-sm font-light text-muted-foreground mb-1">Conductivity</p>
                <p className="text-2xl font-light">{node.lastReading.conductivity} µS/cm</p>
              </div>
              <div>
                <p className="text-sm font-light text-muted-foreground mb-1">Temperature</p>
                <p className="text-2xl font-light">{node.lastReading.temp}°C</p>
              </div>
              <div>
                <p className="text-sm font-light text-muted-foreground mb-1">Water Level</p>
                <p className="text-2xl font-light">{node.lastReading.level} m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Data */}
        {weather && (
          <Card className="border-border/50 bg-card/50 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-wide flex items-center gap-2">
                <span>🌤️</span>
                Current Weather Conditions
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
        )}

        {/* USGS Data */}
        {usgsData && (
          <Card className="border-border/50 bg-card/50 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-wide flex items-center gap-2">
                <span>🌊</span>
                USGS Watershed Data
                <Badge variant="outline" className="text-xs ml-auto">USGS Real-time</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                {usgsData.siteName} (Site {usgsData.siteCode})
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {usgsData.waterLevel !== null && (
                  <div>
                    <p className="text-sm font-light text-muted-foreground mb-1">Water Level</p>
                    <p className="text-2xl font-light">{usgsData.waterLevel} ft</p>
                  </div>
                )}
                {usgsData.discharge !== null && (
                  <div>
                    <p className="text-sm font-light text-muted-foreground mb-1">Discharge</p>
                    <p className="text-2xl font-light">{usgsData.discharge} cfs</p>
                  </div>
                )}
                {usgsData.temperature !== null && (
                  <div>
                    <p className="text-sm font-light text-muted-foreground mb-1">Temperature</p>
                    <p className="text-2xl font-light">{usgsData.temperature}°C</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Technical Details */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-light tracking-wide">
              Technical Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-light text-muted-foreground mb-1">Node ID</p>
              <p className="text-sm font-mono">{node.id}</p>
            </div>
            <div>
              <p className="text-sm font-light text-muted-foreground mb-1">Authority</p>
              <p className="text-sm font-mono">{node.authority}</p>
            </div>
            <div>
              <p className="text-sm font-light text-muted-foreground mb-1">Agent</p>
              <p className="text-sm font-mono">{node.agent}</p>
            </div>
            <div>
              <p className="text-sm font-light text-muted-foreground mb-1">Data Access Price</p>
              <p className="text-sm">{node.price.sol} SOL (${node.price.usd})</p>
            </div>
            <div>
              <p className="text-sm font-light text-muted-foreground mb-1">Total Earned</p>
              <p className="text-sm">{node.earned} SOL</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
