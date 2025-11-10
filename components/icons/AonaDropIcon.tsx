// components/icons/AonaDropIcon.tsx
export function AonaDropIcon({
    size = 28,
    stroke = "#0A0A0A",
    accent = "#6CAFC9",
    core = "#0A0A0A",
    className = "",
  }: { size?: number; stroke?: string; accent?: string; core?: string; className?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
           className={className} aria-label="AONA icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C20.5 9.4 24 13.6 24 18.5C24 23.2 20.4 26.5 16 26.5C11.6 26.5 8 23.2 8 18.5C8 13.6 11.5 9.4 16 4Z"
              stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="16" cy="17" r="1.8" fill={core}/>
        <circle cx="12" cy="19.5" r="1.1" fill={accent} />
        <circle cx="20" cy="19.5" r="1.1" fill={accent} />
        <circle cx="16" cy="13.2" r="1.1" fill={accent} />
        <path d="M12 19.5L16 17L20 19.5M16 13.2L16 17"
              stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  