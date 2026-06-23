import logoImg from "@assets/logo-transparent.png";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 font-sans"
      style={{ background: "#0d1e38", color: "#EAEAEA" }}
    >
      <a href="/" className="mb-10">
        <img src={logoImg} alt="Albert Auto Detailing" className="h-24 w-auto object-contain" />
      </a>

      <p className="text-8xl font-bold mb-4" style={{ color: "#FF2534", letterSpacing: "-0.04em" }}>404</p>
      <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-gray-400 text-sm text-center max-w-sm mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <a
        href="/"
        className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-sm transition-all"
        style={{ background: "#FF2534", color: "white" }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#b91c1c"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#FF2534"; }}
      >
        ← Back to Home
      </a>
    </div>
  );
}
