// Science utility functions for mock data transformations

// Calculate z-score for anomaly detection
export function calculateZScore(value: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0
  return (value - mean) / stdDev
}

// Calculate moving average
export function movingAverage(data: number[], window: number): number[] {
  const result: number[] = []
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - window + 1)
    const subset = data.slice(start, i + 1)
    const avg = subset.reduce((sum, val) => sum + val, 0) / subset.length
    result.push(avg)
  }
  return result
}

// Simple forecast (linear extrapolation for mock)
export function forecastLinear(data: number[], steps: number): number[] {
  if (data.length < 2) return []

  const n = data.length
  const x = Array.from({ length: n }, (_, i) => i)
  const y = data

  // Calculate slope
  const xMean = x.reduce((a, b) => a + b, 0) / n
  const yMean = y.reduce((a, b) => a + b, 0) / n

  const numerator = x.reduce((sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean), 0)
  const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0)

  const slope = numerator / denominator
  const intercept = yMean - slope * xMean

  // Generate forecast
  const forecast: number[] = []
  for (let i = 0; i < steps; i++) {
    const futureX = n + i
    forecast.push(slope * futureX + intercept)
  }

  return forecast
}

// Calculate confidence bands (mock)
export function calculateConfidenceBands(
  data: number[],
  forecast: number[],
  confidence = 0.95,
): { upper: number[]; lower: number[] } {
  const stdDev = calculateStdDev(data)
  const zScore = confidence === 0.95 ? 1.96 : 2.58 // 95% or 99%

  const upper = forecast.map((val) => val + zScore * stdDev)
  const lower = forecast.map((val) => val - zScore * stdDev)

  return { upper, lower }
}

// Calculate standard deviation
export function calculateStdDev(data: number[]): number {
  const mean = data.reduce((a, b) => a + b, 0) / data.length
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
  return Math.sqrt(variance)
}

// Detect seasonal pattern (simplified)
export function detectSeasonality(data: number[], period: number): boolean {
  if (data.length < period * 2) return false

  // Compare variance of seasonal chunks
  const chunks: number[][] = []
  for (let i = 0; i < Math.floor(data.length / period); i++) {
    chunks.push(data.slice(i * period, (i + 1) * period))
  }

  const chunkMeans = chunks.map((chunk) => chunk.reduce((a, b) => a + b, 0) / chunk.length)
  const overallMean = chunkMeans.reduce((a, b) => a + b, 0) / chunkMeans.length
  const variance = chunkMeans.reduce((sum, mean) => sum + Math.pow(mean - overallMean, 2), 0) / chunkMeans.length

  // If variance is significant, likely seasonal
  return variance > calculateStdDev(data) * 0.5
}

// Calculate drought index (simplified)
export function calculateDroughtIndex(
  precipitation: number[],
  temperature: number[],
  evapotranspiration: number[],
): number[] {
  return precipitation.map((precip, i) => {
    const pet = evapotranspiration[i]
    const deficit = precip - pet
    // Normalize to 0-100 scale (100 = no drought)
    return Math.max(0, Math.min(100, 50 + deficit * 2))
  })
}
