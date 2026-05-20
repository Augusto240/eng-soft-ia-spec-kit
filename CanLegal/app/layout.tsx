import '../styles/globals.css';

import type { Metadata } from 'next';

import ThemeToggle from '@/components/ui/ThemeToggle';

export const metadata: Metadata = {
  title: 'CanLegal - Global Cannabis Policy Education',
  description:
    'Educational platform about cannabis legislation, medical regulation, and public policy worldwide.',
  metadataBase: new URL('https://canlegal.example'),
  openGraph: {
    title: 'CanLegal - Global Cannabis Policy Education',
    description:
      'Explore legal status, timelines, and policy context with evidence-based, educational data.',
    url: 'https://canlegal.example',
    siteName: 'CanLegal',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-surface text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 border-b border-line/40 bg-surface/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
            <a href="#top" className="font-display text-xl tracking-tight">
              CanLegal
            </a>
            <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
              <a className="hover:text-ink" href="#overview">
                Legal status
              </a>
              <a className="hover:text-ink" href="#highlights">
                Highlights
              </a>
              <a className="hover:text-ink" href="#stats">
                Data
              </a>
              <a className="hover:text-ink" href="#timeline">
                Timeline
              </a>
              <a className="hover:text-ink" href="#education">
                Concepts
              </a>
              <a className="hover:text-ink" href="#sources">
                Sources
              </a>
              <a className="hover:text-ink" href="#faq">
                FAQ
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <div id="top" className="mx-auto w-full max-w-7xl px-6">
          {children}
        </div>
        <footer className="border-t border-line/40">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-muted">
            <p>
              Educational content only. All data must be verified against official sources before
              publication.
            </p>
            <p>
              CanLegal is designed for public policy literacy and does not encourage illegal use.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
