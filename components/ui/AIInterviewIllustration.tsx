export default function AIInterviewIllustration() {
  return (
    <svg
      width="600"
      height="350"
      viewBox="0 0 600 350"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glow */}
      <circle cx="300" cy="180" r="120" fill="#2563eb" opacity="0.15" />

      {/* Table */}
      <rect x="210" y="210" width="180" height="10" fill="#64748b" />

      {/* Human */}
      <circle cx="240" cy="150" r="20" fill="#f1c27d" />
      <rect x="230" y="170" width="20" height="40" rx="5" fill="#3b82f6" />

      {/* Laptop */}
      <rect x="255" y="195" width="35" height="18" rx="2" fill="#94a3b8" />

      {/* Robot */}
      <rect x="330" y="130" width="40" height="35" rx="6" fill="#38bdf8" />
      <circle cx="342" cy="147" r="4" fill="#0f172a" />
      <circle cx="358" cy="147" r="4" fill="#0f172a" />

      <rect x="330" y="170" width="40" height="40" rx="6" fill="#0ea5e9" />

      {/* Antenna */}
      <line x1="350" y1="130" x2="350" y2="115" stroke="#38bdf8" strokeWidth="3"/>
      <circle cx="350" cy="110" r="4" fill="#38bdf8" />

      {/* Text */}
      <text
        x="300"
        y="80"
        textAnchor="middle"
        fill="#60a5fa"
        fontSize="20"
        fontFamily="Arial"
      >
        AI Interview Session
      </text>
    </svg>
  );
}
