import { useMemo } from "react";

export default function WaterParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 3, // 3-7px
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 6, // 6-12s
      delay: Math.random() * 8,
      opacity: Math.random() * 0.06 + 0.04, // 0.04-0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="water-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--particle-opacity": p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
