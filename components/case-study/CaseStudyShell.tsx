import Link from "next/link";
import Background from "../layout/Background";

export type CaseStudyNavItem = {
  id: string;
  label: string;
};

interface CaseStudyShellProps {
  backHref?: string;
  navItems: CaseStudyNavItem[];
  children: React.ReactNode;
}

const CaseStudyShell = ({
  backHref = "/",
  navItems,
  children,
}: CaseStudyShellProps) => {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-sharp text-sharp-fg">
      <Background />

      <div className="relative z-10 border-b border-sharp">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href={backHref}
            className="font-mono text-xs uppercase tracking-[0.16em] text-sharp-muted transition-colors hover:text-sharp-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sharp-accent)]"
          >
            ← Back
          </Link>
          <span className="font-mono text-xs tracking-[0.2em] text-sharp-fg">
            RK
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14 lg:py-14">
        <aside className="hidden lg:block">
          <nav
            aria-label="Case study sections"
            className="sticky top-24 space-y-1 border border-sharp bg-sharp-surface p-4"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sharp-muted">
              Index
            </p>
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 px-1 py-2 font-mono text-xs text-sharp-muted transition-colors hover:text-sharp-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sharp-accent)]"
              >
                <span className="text-sharp-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
};

export default CaseStudyShell;
