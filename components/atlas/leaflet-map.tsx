"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface USGSData {
  siteName: string
  siteCode: string
  waterLevel: number | null
  discharge: number | null
  temperature: number | null
}

interface LeafletMapProps {
  usgsData: USGSData[]
}

// Fix for default marker icons in react-leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Sample AONA node locations (Colorado)
const aonaNodes = [
  { id: "node-0001", name: "Colorado River — Grand County", lat: 39.9142, lng: -105.8767, status: "online" },
  { id: "node-0002", name: "South Platte River — Denver", lat: 39.7392, lng: -104.9903, status: "online" },
  { id: "node-0003", name: "Arkansas River — Pueblo", lat: 38.2544, lng: -104.6091, status: "online" }
]

function MapController() {
  const map = useMap()

  useEffect(() => {
    // Fix map rendering issues
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }, [map])

  return null
}

export default function LeafletMap({ usgsData }: LeafletMapProps) {
  return (
    <MapContainer
      center={[39.74, -104.99]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <MapController />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* AONA Nodes */}
      {aonaNodes.map((node) => (
        <Marker
          key={node.id}
          position={[node.lat, node.lng]}
          icon={icon}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-sm mb-2">{node.name}</h3>
              <div className="space-y-1 text-xs">
                <p><strong>Node ID:</strong> {node.id}</p>
                <p><strong>Status:</strong> <span className="text-green-600">{node.status}</span></p>
                <p><strong>Network:</strong> AONA DePIN</p>
                <p><strong>Payment:</strong> x402 Enabled</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
