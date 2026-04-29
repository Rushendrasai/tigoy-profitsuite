import { CalculatorIcon } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "https://hubcity.net" },
  { label: "Other Tools", href: "https://hubcity.net/businesstools.html" },
  { label: "Crypto Tools", href: "https://hubcity.net/cryptotoo;s.html" },
  { label: "Contact Us", href: "https://hubcity.net/contacthubcity.html" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Top Navigation */}
      <nav
        className="bg-card border-b border-border sticky top-0 z-50 shadow-xs"
        data-ocid="nav.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <a
            href="https://hubcity.net"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 hover:opacity-80 transition-smooth"
            data-ocid="nav.home_link"
          >
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <CalculatorIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold text-foreground tracking-tight">
              TIGOY.com <span className="text-primary">ProfitSuite</span>
            </span>
          </a>

          {/* Nav links */}
          <div
            className="flex flex-wrap items-center gap-1"
            data-ocid="nav.links"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-xs font-semibold text-muted-foreground hidden sm:block">
            Live Calculator v1.2
          </div>
        </div>
      </nav>

      {/* Top Advertisement Banner */}
      <div
        className="bg-muted/30 border-b border-border"
        data-ocid="ad.top_banner"
      >
        <div className="w-full overflow-x-auto py-3">
          <div className="max-w-[960px] mx-auto px-4">
            <a
              href="https://adsection.tigoy.com/ad001.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://adsection.tigoy.com/001.png"
                alt="Advertisement"
                width={960}
                height={200}
                className="block w-full max-w-[960px]"
                style={{ height: "200px", objectFit: "cover" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-background" data-ocid="main.content">
        {children}
      </main>

      {/* Bottom Advertisement Banner */}
      <div
        className="bg-muted/30 border-t border-border"
        data-ocid="ad.bottom_banner"
      >
        <div className="w-full overflow-x-auto py-3">
          <div className="max-w-[960px] mx-auto px-4">
            <a
              href="https://adsection.tigoy.com/ad002.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://adsection.tigoy.com/002.png"
                alt="Advertisement"
                width={960}
                height={200}
                className="block w-full max-w-[960px]"
                style={{ height: "200px", objectFit: "cover" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border py-6 px-4"
        data-ocid="footer.section"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          {/* Footer nav links */}
          <div className="flex flex-wrap justify-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © 2025 TIGOY.com | Huncity.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
