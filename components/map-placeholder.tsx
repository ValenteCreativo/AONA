"use client"

export function MapPlaceholder() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-md bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
      {/* Abstract map background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,150 Q100,100 200,150 T400,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <path
          d="M0,100 Q100,150 200,100 T400,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-secondary"
        />
      </svg>

      {/* Sensor markers */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-3/4 h-3/4">
          {[
            { x: "20%", y: "30%", active: true },
            { x: "45%", y: "20%", active: true },
            { x: "70%", y: "40%", active: false },
            { x: "30%", y: "70%", active: true },
            { x: "65%", y: "75%", active: true },
          ].map((point, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: point.x, top: point.y }}>
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${point.active ? "bg-secondary" : "bg-muted-foreground"}`} />
                {point.active && <div className="absolute inset-0 w-3 h-3 rounded-full bg-secondary/30 animate-ping" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-light text-muted-foreground tracking-wide">Network Visualization</p>
      </div>
    </div>
  )
}
