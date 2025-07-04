export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <a
        href="#discover"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Discover
      </a>
      <a
        href="#how-it-works"
        className="text-gray-300 hover:text-white transition-colors"
      >
        How it Works
      </a>
      <a
        href="#why-important"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Why It Matters
      </a>
    </nav>
  );
}
