"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InkBrushDivider } from "@/components/ink-brush-divider"

export default function ContributePage() {
  const [formData, setFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    ph: "",
    turbidity: "",
    temperature: "",
    notes: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Smartphone sensor report:", formData)
    setSubmitted(true)
    setSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        location: "",
        latitude: "",
        longitude: "",
        ph: "",
        turbidity: "",
        temperature: "",
        notes: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Could not get your location. Please enter coordinates manually.")
        }
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">
            Contribute to the Network
          </h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Help build the world's most comprehensive water quality dataset. Report water conditions
            from anywhere using your smartphone. Every data point helps protect communities.
          </p>
          <div className="flex gap-2 mt-6">
            <Badge variant="outline" className="text-xs">📱 Smartphone Sensors</Badge>
            <Badge variant="outline" className="text-xs">🌍 Global Coverage</Badge>
            <Badge variant="outline" className="text-xs">🔗 DePIN Network</Badge>
          </div>
        </div>
      </div>

      <InkBrushDivider />

      {/* Contribution Form */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-wide">
                Submit Water Quality Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-light text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-sm font-light text-muted-foreground">
                    Your contribution has been received and will be reviewed by our AI agent.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Location */}
                  <div>
                    <label className="text-sm font-light text-muted-foreground mb-2 block">
                      Location Name
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Lake Michigan, Downtown River"
                      required
                      className="w-full px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light"
                    />
                  </div>

                  {/* Coordinates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-light text-muted-foreground mb-2 block">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="39.7392"
                        required
                        className="w-full px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-light text-muted-foreground mb-2 block">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="-104.9903"
                        required
                        className="w-full px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="text-sm font-light text-primary hover:opacity-70 transition-opacity"
                  >
                    📍 Use My Current Location
                  </button>

                  {/* Water Quality Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-light text-muted-foreground mb-2 block">
                        pH Level (0-14)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="ph"
                        value={formData.ph}
                        onChange={handleChange}
                        placeholder="7.0"
                        min="0"
                        max="14"
                        className="w-full px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-light text-muted-foreground mb-2 block">
                        Turbidity (NTU)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="turbidity"
                        value={formData.turbidity}
                        onChange={handleChange}
                        placeholder="5.0"
                        className="w-full px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-light text-muted-foreground mb-2 block">
                        Temperature (°C)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        placeholder="20.0"
                        className="w-full px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-sm font-light text-muted-foreground mb-2 block">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Describe water appearance, smell, nearby activities..."
                      rows={4}
                      className="w-full px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-3 bg-primary text-white rounded-md font-light text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Report"}
                  </button>

                  <p className="text-xs font-light text-muted-foreground text-center">
                    Your report will be verified by our AI agent and added to the network.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="border-border/50 bg-card/50 mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-light tracking-wide">
                How Contributions Work
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-light text-primary mb-2">1. Submit Your Report</h3>
                <p className="text-sm font-light text-muted-foreground">
                  Use smartphone sensors or manual observations to report water conditions
                  from anywhere in the world.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-light text-primary mb-2">2. AI Agent Verification</h3>
                <p className="text-sm font-light text-muted-foreground">
                  Our AI agent cross-references your report with weather data (Open-Meteo),
                  USGS data, and historical patterns to verify accuracy.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-light text-primary mb-2">3. Network Integration</h3>
                <p className="text-sm font-light text-muted-foreground">
                  Verified reports are added to the AONA DePIN network, expanding global water
                  quality coverage and helping protect communities.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-light text-primary mb-2">4. Future Rewards (Coming Soon)</h3>
                <p className="text-sm font-light text-muted-foreground">
                  Contributors will earn tokens for verified data points. High-quality, consistent
                  contributors will receive priority in the decentralized network.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
