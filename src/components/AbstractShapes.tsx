export function AbstractCircle({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-full border border-brown-200 opacity-20 ${className}`}
      aria-hidden="true"
    />
  );
}

export function AbstractArc({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`opacity-10 ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M 100 180 A 80 80 0 0 1 100 20"
        stroke="#4A2828"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 100 160 A 60 60 0 0 1 100 40"
        stroke="#4A2828"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export function AbstractDots({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`opacity-15 ${className}`}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map(row =>
        [0, 1, 2, 3, 4].map(col => (
          <circle
            key={`${row}-${col}`}
            cx={10 + col * 20}
            cy={10 + row * 20}
            r="1.5"
            fill="#4A2828"
          />
        ))
      )}
    </svg>
  );
}

export function AbstractPetal({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`opacity-10 ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <ellipse cx="100" cy="100" rx="40" ry="80" stroke="#7B4E3D" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="80" ry="40" stroke="#7B4E3D" strokeWidth="1" />
      <ellipse
        cx="100"
        cy="100"
        rx="60"
        ry="60"
        transform="rotate(45 100 100)"
        stroke="#C4A097"
        strokeWidth="0.8"
      />
    </svg>
  );
}
