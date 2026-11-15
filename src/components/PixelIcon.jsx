export default function PixelIcon({ type, className = 'w-8 h-8' }) {
    const frog = (body, pack) => (
      <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className}>
        <path fill={body} d="M4 1h3v2H4zM9 1h3v2H9z" />
        <path fill="#ffffff" d="M5 1h1v1H5zM10 1h1v1h-1z" />
        <path fill={pack} d="M2 5h2v6H2z" />
        <path fill={body} d="M4 3h8v10H4z" />
        <path fill="#7dd3fc" d="M7 5h5v3H7z" />
        <path fill="#e0f2fe" d="M8 5h3v1H8z" />
        <path fill={body} d="M4 13h3v2H4zM9 13h3v2H9z" />
      </svg>
    );
  
    const icons = {
      tongue: frog('#9333ea', '#6b21a8'),
      baudinii: frog('#3f6212', '#365314'),
      froggy: frog('#22c55e', '#15803d'),
      frogatha: frog('#f97316', '#c2410c'),
      rocket: (
        <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className}>
          <path fill="#f8fafc" d="M7 1h2v2H7zM6 3h4v3H6zM5 6h6v5H5z" />
          <path fill="#38bdf8" d="M7 6h2v2H7z" />
          <path fill="#ef4444" d="M3 9h2v3H3zM11 9h2v3h-2z" />
          <path fill="#facc15" d="M6 11h4v3H6z" />
        </svg>
      ),
      planet: (
        <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className}>
          <path fill="#a855f7" d="M5 4h6v8H5zM4 5h8v6H4z" />
          <path fill="#facc15" d="M1 9h14v1H1z" />
        </svg>
      ),
      antenna: (
        <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className}>
          <path fill="#38bdf8" d="M11 2h2v2h-2zM9 4h2v2H9z" />
          <path fill="#cbd5e1" d="M4 4h2v4H4zM6 6h4v2H6zM8 8h2v2H8z" />
          <path fill="#64748b" d="M6 10h2v4H6zM4 14h6v1H4z" />
        </svg>
      ),
      earth: (
        <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className}>
          <path fill="#2563eb" d="M5 3h6v10H5zM3 5h10v6H3z" />
          <path fill="#22c55e" d="M5 4h3v3H5zM9 6h3v3H9zM6 9h3v3H6z" />
        </svg>
      ),
      lock: (
        <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className}>
          <path fill="#94a3b8" d="M6 2h4v2H6zM5 4h2v3H5zM9 4h2v3H9z" />
          <path fill="#475569" d="M4 7h8v7H4z" />
        </svg>
      ),
    };
    return icons[type] || null;
  }
  