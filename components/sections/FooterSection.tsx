const FooterSection = () => {
  return (
    <footer className="relative z-10 border-t border-sharp px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-xs tracking-wide text-sharp-muted">
          © {new Date().getFullYear()} Rahul Khedekar
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-sharp-muted"
        >
          <a href="#projects" className="transition-colors hover:text-sharp-accent">
            Projects
          </a>
          <a href="/blog" className="transition-colors hover:text-sharp-accent">
            Blog
          </a>
          <a href="#contact" className="transition-colors hover:text-sharp-accent">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default FooterSection;
