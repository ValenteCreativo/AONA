"use client"

import { useCallback } from "react"
import { useTheme } from "next-themes"
import Particles from "react-tsparticles"
import type { Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"

type Props = { className?: string }

export default function WaterParticles({ className }: Props) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="aona-water-particles"
      init={init}
      className={className}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 40,
        detectRetina: true,
        background: { color: "transparent" },
        
        particles: {
          number: {
            value: 65,
            density: { 
              enable: true, 
              area: 1000,
            },
          },
          
          // Colores jade-aqua como tu texto
          color: {
            value: isDark 
              ? ["#5ca3b8", "#62a89a", "#6fb7c8"] // jade-aqua brillante
              : ["#6fb7c8", "#62a89a", "#7db5c8"], // jade-aqua vibrante en light
          },
          
          shape: {
            type: "circle",
          },
          
          opacity: {
            value: isDark ? 0.3 : 0.22, // ← más brillante
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: isDark ? 0.15 : 0.12,
              sync: false,
            },
          },
          
          size: {
            value: { min: 1.5, max: 3 },
            animation: {
              enable: true,
              speed: 0.8, // ← lento
              minimumValue: 1,
              sync: false,
            },
          },
          
          links: {
            enable: true,
            distance: 130,
            color: isDark ? "#5ca3b8" : "#6fb7c8", // jade-aqua
            opacity: isDark ? 0.18 : 0.14, // ← más visible
            width: 0.9,
            triangles: {
              enable: true,
              opacity: isDark ? 0.025 : 0.018,
            },
          },
          
          // ¡RÍO TRANQUILO! - super lento
          move: {
            enable: true,
            speed: 0.12, // ← SÚPER LENTO (antes 0.4)
            direction: "bottom-right", // flujo suave
            random: true,
            straight: false,
            outModes: { 
              default: "out",
            },
            attract: {
              enable: true,
              rotateX: 1000,
              rotateY: 2000,
            },
          },
        },
        
        // ¡INTERACTIVIDAD RESTAURADA!
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "repulse"], // ← ambos modos
              parallax: {
                enable: true,
                force: 50,
                smooth: 20,
              },
            },
            onClick: {
              enable: true,
              mode: "bubble",
            },
            resize: {
              enable: true,
              delay: 0.5,
            },
          },
          modes: {
            // Conexiones al hover
            grab: {
                links: {
                  opacity: isDark ? 0.6 : 1.2, // ← conexiones MUY brillantes
                },
            },
            // Partículas crecen al hover
            bubble: {
                distance: 260,
                size: 15, // ← más grande
                opacity: isDark ? 0.6 : 1, // ← más brillante
              },
            // Click hace onda
            repulse: {
              distance: 200,
              duration: 0.1,
              speed: 0.4, // ← lento y elegante
              easing: "ease-out-cubic",
            },
          },
        },
        
        smooth: true,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
      }}
    />
  )
}