// Mock data generator for AONA front-end

export interface Sensor {
  id: string
  lat: number
  lng: number
  location: string
  status: "active" | "offline" | "maintenance"
  metrics: {
    ph: number
    turbidity: number
    conductivity: number
    temperature: number
    level: number
  }
}

export interface Reading {
  sensorId: string
  timestamp: Date
  ph: number
  turbidity: number
  conductivity: number
  temperature: number
  level: number
}

export interface Payment {
  txId: string
  sensorId: string
  amount: number
  timestamp: Date
}

export interface Node {
  id: string
  location: string
  uptimePct: number
  dataPoints: number
  earned: number
}

export interface Layer {
  id: string
  name: string
  type: "raster" | "vector"
  timestep: "daily" | "monthly"
  units: string
  enabled: boolean
}

export interface AnomalyPoint {
  ts: string
  value: number
  zscore?: number
  baseline?: number
}

export interface CoverageCell {
  id: string
  basinId: string
  basinName: string
  lat: number
  lng: number
  coveragePct: number
  sensors: number
  bounty?: number
}

export interface AlertRule {
  id: string
  metric: "ph" | "turbidity" | "conductivity" | "temperature" | "level"
  operator: ">" | "<" | "=" | "!="
  threshold: number
  duration: number
  scope: "node" | "region"
  scopeId: string
  channels: string[]
  enabled: boolean
}

export interface Playbook {
  id: string
  title: string
  category: string
  summary: string
  prerequisites: string[]
  steps: string[]
  estImpact: string
  bountyLinked?: boolean
}

export interface Scenario {
  id: string
  name: string
  rainfallPct: number
  demandPct: number
  sensorDensity: number
  contaminationEvents: number
}

export interface DataQuality {
  nodeId: string
  location: string
  completeness: number
  drift: number
  calibrationDays: number
  score: number
  agentSigned: boolean
}

export interface NodeMeta {
  id: string
  name: string
  lat: number
  lng: number
  location: string
  basin: string
  status: "online" | "offline"
  uptimePct: number
}

export interface NodeStats {
  lastUpdated: string
  readings24h: number
  earnedUsd: number
  dq: {
    score: number
    completeness: number
    drift: number
    calibrationDays: number
  }
  integrity: {
    agent: "AONA"
    signatureHash: string
  }
  reliabilityRank: string
}

export interface NodeReading {
  ts: string
  ph?: number
  turbidity?: number
  conductivity?: number
  temp?: number
  level?: number
}

export interface NodeEvent {
  ts: string
  type: "reading" | "signed" | "payment" | "alert" | "calibration"
  note: string
}

export interface Neighbor {
  id: string
  name: string
  distanceKm: number
  coverageGapScore: number
}

export interface ForecastPoint {
  ts: string
  value: number
  lower: number
  upper: number
}

export interface NodeHardware {
  sensorModel: string
  firmwareVersion: string
  lastCalibration: string
  calibrationMethod: string
  power: "battery" | "solar" | "grid"
  connectivity: "HTTP" | "MQTT" | "LoRa" | "GGWave"
}

// Generate mock sensor
export function generateMockSensor(id: string): Sensor {
  const locations = [
    { name: "Pacific Northwest River", lat: 47.6062, lng: -122.3321 },
    { name: "Great Lakes Monitor", lat: 41.8781, lng: -87.6298 },
    { name: "Colorado River Station", lat: 36.1699, lng: -115.1398 },
    { name: "Mississippi Delta", lat: 29.9511, lng: -90.0715 },
    { name: "Chesapeake Bay", lat: 39.0458, lng: -76.6413 },
  ]

  const location = locations[Math.floor(Math.random() * locations.length)]

  return {
    id,
    lat: location.lat,
    lng: location.lng,
    location: location.name,
    status: Math.random() > 0.1 ? "active" : "offline",
    metrics: {
      ph: 6.5 + Math.random() * 2,
      turbidity: Math.random() * 50,
      conductivity: 200 + Math.random() * 600,
      temperature: 10 + Math.random() * 15,
      level: Math.random() * 100,
    },
  }
}

// Generate mock reading
export function generateMockReading(sensorId: string): Reading {
  return {
    sensorId,
    timestamp: new Date(),
    ph: 6.5 + Math.random() * 2,
    turbidity: Math.random() * 50,
    conductivity: 200 + Math.random() * 600,
    temperature: 10 + Math.random() * 15,
    level: Math.random() * 100,
  }
}

// Generate mock sensors array
export function generateMockSensors(count = 5): Sensor[] {
  return Array.from({ length: count }, (_, i) => generateMockSensor(`sensor-${i + 1}`))
}

// Generate mock readings for charts
export function generateMockReadings(hours = 24): Reading[] {
  const readings: Reading[] = []
  const now = new Date()

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    readings.push({
      sensorId: "sensor-1",
      timestamp,
      ph: 7.0 + Math.sin(i * 0.5) * 0.5 + (Math.random() - 0.5) * 0.2,
      turbidity: 25 + Math.sin(i * 0.3) * 10 + (Math.random() - 0.5) * 5,
      conductivity: 400 + Math.sin(i * 0.4) * 100 + (Math.random() - 0.5) * 50,
      temperature: 15 + Math.sin(i * 0.2) * 3 + (Math.random() - 0.5) * 1,
      level: 50 + Math.sin(i * 0.6) * 20 + (Math.random() - 0.5) * 5,
    })
  }

  return readings
}

// Generate mock nodes
export function generateMockNodes(count = 10): Node[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `node-${String(i + 1).padStart(4, "0")}`,
    location: [
      "Pacific Northwest",
      "Great Lakes",
      "Colorado River",
      "Mississippi Delta",
      "Chesapeake Bay",
      "Hudson River",
      "San Francisco Bay",
      "Puget Sound",
      "Lake Michigan",
      "Columbia River",
    ][i % 10],
    uptimePct: 85 + Math.random() * 15,
    dataPoints: Math.floor(1000 + Math.random() * 9000),
    earned: Math.floor(100 + Math.random() * 900),
  }))
}

// Generate mock payments
export function generateMockPayments(count = 10): Payment[] {
  return Array.from({ length: count }, (_, i) => {
    const now = new Date()
    return {
      txId: `tx-${Math.random().toString(36).substring(2, 15)}`,
      sensorId: `sensor-${Math.floor(Math.random() * 5) + 1}`,
      amount: Math.random() * 10,
      timestamp: new Date(now.getTime() - i * 60 * 60 * 1000),
    }
  })
}

export function generateMockLayers(): Layer[] {
  return [
    {
      id: "grace-groundwater",
      name: "GRACE Groundwater Anomaly",
      type: "raster",
      timestep: "monthly",
      units: "cm",
      enabled: true,
    },
    {
      id: "ndwi",
      name: "NDWI (Surface Water)",
      type: "raster",
      timestep: "daily",
      units: "index",
      enabled: false,
    },
    {
      id: "gpm-precipitation",
      name: "GPM Precipitation",
      type: "raster",
      timestep: "daily",
      units: "mm/day",
      enabled: false,
    },
    {
      id: "surface-water",
      name: "Surface Water Occurrence",
      type: "raster",
      timestep: "monthly",
      units: "%",
      enabled: false,
    },
    {
      id: "hydrobasins",
      name: "HydroBASINS",
      type: "vector",
      timestep: "monthly",
      units: "",
      enabled: false,
    },
  ]
}

export function generateMockAnomalies(days = 90): AnomalyPoint[] {
  const points: AnomalyPoint[] = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const baseline = 7.2 + Math.sin(i * 0.1) * 0.3
    const value = baseline + (Math.random() - 0.5) * 0.4
    const zscore = (value - baseline) / 0.2

    points.push({
      ts: date.toISOString().split("T")[0],
      value: Number.parseFloat(value.toFixed(2)),
      baseline: Number.parseFloat(baseline.toFixed(2)),
      zscore: Number.parseFloat(zscore.toFixed(2)),
    })
  }

  return points
}

export function generateMockCoverage(count = 20): CoverageCell[] {
  const basins = [
    "Columbia River",
    "Colorado River",
    "Mississippi River",
    "Great Lakes",
    "Hudson River",
    "Rio Grande",
    "Sacramento River",
    "Snake River",
  ]

  return Array.from({ length: count }, (_, i) => {
    const basin = basins[i % basins.length]
    const coveragePct = Math.random() * 100
    const sensors = Math.floor(Math.random() * 15)
    const hasBounty = coveragePct < 50

    return {
      id: `cell-${i + 1}`,
      basinId: `basin-${(i % basins.length) + 1}`,
      basinName: basin,
      lat: 30 + Math.random() * 20,
      lng: -120 + Math.random() * 30,
      coveragePct: Number.parseFloat(coveragePct.toFixed(1)),
      sensors,
      bounty: hasBounty ? Math.floor(50 + Math.random() * 450) : undefined,
    }
  })
}

export function generateMockRules(): AlertRule[] {
  return [
    {
      id: "rule-1",
      metric: "ph",
      operator: "<",
      threshold: 6.5,
      duration: 60,
      scope: "node",
      scopeId: "node-0001",
      channels: ["email", "webhook"],
      enabled: true,
    },
    {
      id: "rule-2",
      metric: "turbidity",
      operator: ">",
      threshold: 40,
      duration: 30,
      scope: "region",
      scopeId: "pacific-northwest",
      channels: ["webhook"],
      enabled: true,
    },
    {
      id: "rule-3",
      metric: "level",
      operator: "<",
      threshold: 20,
      duration: 120,
      scope: "node",
      scopeId: "node-0003",
      channels: ["email"],
      enabled: false,
    },
  ]
}

export function generateMockPlaybooks(): Playbook[] {
  return [
    {
      id: "playbook-1",
      title: "Rainwater Harvesting for Urban Gardens",
      category: "Conservation",
      summary: "Deploy low-cost rainwater collection systems in water-scarce urban areas.",
      prerequisites: ["Precipitation data", "Runoff coefficient", "Storage capacity estimate"],
      steps: [
        "Identify rooftop catchment area",
        "Install gutter and downspout system",
        "Add first-flush diverter",
        "Connect to storage tank",
        "Monitor collection volume",
      ],
      estImpact: "Save 40-50% municipal water usage",
      bountyLinked: false,
    },
    {
      id: "playbook-2",
      title: "Leakage Detection via Pressure Monitoring",
      category: "Infrastructure",
      summary: "Use pressure anomaly patterns to identify pipe leaks before they worsen.",
      prerequisites: ["Pressure sensors", "Flow baseline", "Historical anomaly data"],
      steps: [
        "Install pressure sensors at key nodes",
        "Establish baseline pressure profile",
        "Run anomaly detection model",
        "Investigate pressure drops",
        "Prioritize repair zones",
      ],
      estImpact: "Reduce water loss by 20-30%",
      bountyLinked: true,
    },
    {
      id: "playbook-3",
      title: "Agricultural Irrigation Optimization",
      category: "Agriculture",
      summary: "Adjust irrigation schedules based on soil moisture and weather forecasts.",
      prerequisites: ["Soil moisture sensors", "Precipitation forecast", "Crop water requirements"],
      steps: [
        "Install soil moisture probes",
        "Integrate weather forecast API",
        "Calculate crop evapotranspiration",
        "Adjust irrigation timing",
        "Monitor yield and water use",
      ],
      estImpact: "Reduce irrigation by 15-25%",
      bountyLinked: false,
    },
    {
      id: "playbook-4",
      title: "Community Cisterns for Drought Resilience",
      category: "Community",
      summary: "Build shared water storage for neighborhoods facing seasonal drought.",
      prerequisites: ["Community buy-in", "Storage site", "Water quality testing"],
      steps: [
        "Assess community water needs",
        "Design cistern capacity",
        "Secure funding and permits",
        "Construct and test system",
        "Establish usage protocol",
      ],
      estImpact: "Buffer 2-3 months of drought",
      bountyLinked: true,
    },
    {
      id: "playbook-5",
      title: "Managed Aquifer Recharge",
      category: "Groundwater",
      summary: "Direct excess surface water into aquifers during wet seasons.",
      prerequisites: ["Aquifer characterization", "Surface water excess", "Infiltration site"],
      steps: [
        "Map aquifer recharge zones",
        "Identify surplus surface water",
        "Design infiltration basins",
        "Monitor groundwater levels",
        "Adjust recharge volume",
      ],
      estImpact: "Restore 10-20% aquifer depletion",
      bountyLinked: false,
    },
  ]
}

export function generateMockDataQuality(): DataQuality[] {
  const nodes = generateMockNodes(10)
  return nodes.map((node) => ({
    nodeId: node.id,
    location: node.location,
    completeness: 85 + Math.random() * 15,
    drift: Math.random() * 5,
    calibrationDays: Math.floor(Math.random() * 90),
    score: 75 + Math.random() * 25,
    agentSigned: Math.random() > 0.3,
  }))
}

export function generateMockScenarios(): Scenario[] {
  return [
    {
      id: "baseline",
      name: "Current Baseline",
      rainfallPct: 0,
      demandPct: 0,
      sensorDensity: 1,
      contaminationEvents: 0,
    },
    {
      id: "drought",
      name: "Drought Scenario (-30% rainfall)",
      rainfallPct: -30,
      demandPct: 10,
      sensorDensity: 1,
      contaminationEvents: 0,
    },
    {
      id: "flood",
      name: "Flood Scenario (+50% rainfall)",
      rainfallPct: 50,
      demandPct: 0,
      sensorDensity: 1,
      contaminationEvents: 2,
    },
    {
      id: "expansion",
      name: "Network Expansion (3x sensors)",
      rainfallPct: 0,
      demandPct: 0,
      sensorDensity: 3,
      contaminationEvents: 0,
    },
  ]
}

// Get node by ID
export function getNodeById(id: string): NodeMeta | undefined {
  const nodes = [
    {
      id: "node-0001",
      name: "Colorado River — Grand County",
      lat: 39.9142,
      lng: -105.8767,
      location: "Colorado River — Grand County",
      basin: "Upper Colorado",
      status: "online" as const,
      uptimePct: 98.5,
    },
    {
      id: "node-0002",
      name: "Mississippi Delta — Plaquemines",
      lat: 29.3547,
      lng: -89.4112,
      location: "Mississippi Delta — Plaquemines",
      basin: "Lower Mississippi",
      status: "online" as const,
      uptimePct: 95.2,
    },
    {
      id: "node-0003",
      name: "Great Lakes — Lake Michigan",
      lat: 41.8781,
      lng: -87.6298,
      location: "Great Lakes — Lake Michigan",
      basin: "Great Lakes",
      status: "online" as const,
      uptimePct: 99.1,
    },
  ]

  return nodes.find((n) => n.id === id)
}

// Get node stats
export function getNodeStats(id: string): NodeStats | undefined {
  const node = getNodeById(id)
  if (!node) return undefined

  return {
    lastUpdated: new Date(Date.now() - Math.random() * 300000).toISOString(),
    readings24h: Math.floor(1400 + Math.random() * 40),
    earnedUsd: Math.floor(250 + Math.random() * 100),
    dq: {
      score: 92 + Math.random() * 7,
      completeness: 95 + Math.random() * 5,
      drift: Math.random() * 2,
      calibrationDays: Math.floor(Math.random() * 45),
    },
    integrity: {
      agent: "AONA",
      signatureHash: `0x${Math.random().toString(16).substring(2, 18)}...`,
    },
    reliabilityRank: "Top 15%",
  }
}

// Get node series data
export function getNodeSeries(
  id: string,
  hours = 48,
): {
  ph: NodeReading[]
  turbidity: NodeReading[]
  conductivity: NodeReading[]
  temp: NodeReading[]
  level: NodeReading[]
} {
  const now = new Date()
  const series = {
    ph: [] as NodeReading[],
    turbidity: [] as NodeReading[],
    conductivity: [] as NodeReading[],
    temp: [] as NodeReading[],
    level: [] as NodeReading[],
  }

  for (let i = hours; i >= 0; i--) {
    const ts = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString()
    const reading: NodeReading = {
      ts,
      ph: 7.0 + Math.sin(i * 0.3) * 0.4 + (Math.random() - 0.5) * 0.15,
      turbidity: 20 + Math.sin(i * 0.2) * 8 + (Math.random() - 0.5) * 3,
      conductivity: 400 + Math.sin(i * 0.25) * 80 + (Math.random() - 0.5) * 30,
      temp: 15 + Math.sin(i * 0.15) * 4 + (Math.random() - 0.5) * 1.5,
      level: 50 + Math.sin(i * 0.35) * 15 + (Math.random() - 0.5) * 5,
    }

    series.ph.push({ ts, ph: reading.ph })
    series.turbidity.push({ ts, turbidity: reading.turbidity })
    series.conductivity.push({ ts, conductivity: reading.conductivity })
    series.temp.push({ ts, temp: reading.temp })
    series.level.push({ ts, level: reading.level })
  }

  return series
}

// Get node events
export function getNodeEvents(id: string): NodeEvent[] {
  const now = new Date()
  return [
    {
      ts: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
      type: "reading",
      note: "pH reading ingested: 7.2",
    },
    {
      ts: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
      type: "signed",
      note: "Agent signature verified",
    },
    {
      ts: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      type: "payment",
      note: "x402 micropayment: $0.15",
    },
    {
      ts: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      type: "reading",
      note: "Turbidity reading ingested: 22.4 NTU",
    },
    {
      ts: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      type: "alert",
      note: "pH threshold exceeded (< 6.5)",
    },
    {
      ts: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      type: "calibration",
      note: "Multi-point calibration completed",
    },
  ]
}

// Get neighbors
export function getNeighbors(id: string): Neighbor[] {
  return [
    {
      id: "node-0012",
      name: "Upstream Monitor A",
      distanceKm: 8.3,
      coverageGapScore: 0.2,
    },
    {
      id: "node-0015",
      name: "Downstream Monitor B",
      distanceKm: 12.7,
      coverageGapScore: 0.5,
    },
    {
      id: "node-0008",
      name: "Tributary Junction C",
      distanceKm: 15.4,
      coverageGapScore: 0.8,
    },
  ]
}

// Get anomaly for node
export function getAnomaly(id: string): { ts: string; metric: string; magnitude: number; zscore: number } | null {
  if (Math.random() > 0.7) {
    const now = new Date()
    return {
      ts: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      metric: "pH",
      magnitude: -0.8,
      zscore: -3.2,
    }
  }
  return null
}

// Get forecast for node metric
export function getForecast(
  id: string,
  metric: "level" | "turbidity" | "ph" | "conductivity" | "temp",
): ForecastPoint[] {
  const now = new Date()
  const forecast: ForecastPoint[] = []

  for (let i = 0; i < 7; i++) {
    const ts = new Date(now.getTime() + i * 24 * 60 * 60 * 1000).toISOString()
    const baseValue = metric === "ph" ? 7.0 : metric === "temp" ? 15 : 50
    const value = baseValue + Math.sin(i * 0.5) * 5
    const uncertainty = 1 + i * 0.3

    forecast.push({
      ts,
      value: Number.parseFloat(value.toFixed(2)),
      lower: Number.parseFloat((value - uncertainty).toFixed(2)),
      upper: Number.parseFloat((value + uncertainty).toFixed(2)),
    })
  }

  return forecast
}

// Get node hardware info
export function getNodeHardware(id: string): NodeHardware {
  const models = ["AquaSense Pro 2.1", "HydroNode Elite", "WaterWatch X3"]
  const connectivity: Array<"HTTP" | "MQTT" | "LoRa" | "GGWave"> = ["HTTP", "MQTT", "LoRa", "GGWave"]

  return {
    sensorModel: models[Math.floor(Math.random() * models.length)],
    firmwareVersion: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}`,
    lastCalibration: new Date(Date.now() - Math.random() * 45 * 24 * 60 * 60 * 1000).toISOString(),
    calibrationMethod: "Multi-point buffer calibration",
    power: Math.random() > 0.5 ? "solar" : "battery",
    connectivity: connectivity[Math.floor(Math.random() * connectivity.length)],
  }
}
