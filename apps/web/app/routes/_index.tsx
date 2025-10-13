import { Brand, Button, Card, Badge } from "@modern-retro-cyber/ui";
import { APP_NAME, THEME, VERSION } from "@modern-retro-cyber/config";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Modern Retro Cyber - The Future of Web3 Gaming Development" },
    { name: "description", content: "A production-ready monorepo template for building crypto games with Remix, TypeScript, and cutting-edge Web3 tools." },
    { property: "og:title", content: "Modern Retro Cyber - Web3 Gaming Framework" },
    { property: "og:description", content: "Build the future of crypto gaming with our modern development stack." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Modern Retro Cyber" },
    { name: "twitter:description", content: "The Future of Web3 Gaming Development" },
  ];
};

export default function Index() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navigation */}
      <nav style={{
        padding: "20px 40px",
        borderBottom: `1px solid ${THEME.surface}`,
        background: `${THEME.bg}95`,
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            <Brand />
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link to="/game" style={{ color: THEME.text, textDecoration: "none" }}>Game</Link>
            <Link to="/docs" style={{ color: THEME.text, textDecoration: "none" }}>Docs</Link>
            <a href="https://github.com/Gzeu/modern-retro-cyber" target="_blank" rel="noopener noreferrer" style={{ color: THEME.text, textDecoration: "none" }}>GitHub</a>
            <Button size="small">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: "100px 40px",
        textAlign: "center",
        background: `linear-gradient(135deg, ${THEME.bg} 0%, ${THEME.surface} 100%)`
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Badge variant="secondary" style={{ marginBottom: "20px" }}>v{VERSION}</Badge>
          
          <h1 style={{
            fontSize: "4rem",
            margin: "20px 0",
            background: THEME.gradients.cyber,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.1
          }}>
            The Future of Web3 Gaming Development
          </h1>
          
          <p style={{
            fontSize: "1.4rem",
            margin: "30px 0",
            color: THEME.secondary,
            lineHeight: 1.6
          }}>
            A production-ready monorepo template for building crypto games with **Remix**, **TypeScript**, and cutting-edge **Web3** tools.
          </p>

          <div style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            margin: "40px 0",
            flexWrap: "wrap"
          }}>
            <Link to="/game">
              <Button size="large">🎮 Try Live Demo</Button>
            </Link>
            <a href="https://github.com/Gzeu/modern-retro-cyber" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="large">⭐ Star on GitHub</Button>
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            margin: "60px 0",
            flexWrap: "wrap"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: THEME.primary }}>45s</div>
              <div style={{ color: THEME.accent, fontSize: "0.9rem" }}>Build Time</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: THEME.primary }}>180KB</div>
              <div style={{ color: THEME.accent, fontSize: "0.9rem" }}>Bundle Size</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: THEME.primary }}>98/100</div>
              <div style={{ color: THEME.accent, fontSize: "0.9rem" }}>Lighthouse</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: THEME.primary }}>60s</div>
              <div style={{ color: THEME.accent, fontSize: "0.9rem" }}>Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "60px",
            color: THEME.primary
          }}>
            ✨ What Makes This Special?
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
            marginBottom: "80px"
          }}>
            <Card title="🏢 Enterprise-Grade Architecture" glowing>
              <ul style={{ lineHeight: 1.8, paddingLeft: "20px" }}>
                <li><strong>Monorepo Mastery:</strong> Turborepo + pnpm for lightning-fast builds</li>
                <li><strong>Type Safety First:</strong> End-to-end TypeScript with strict mode</li>
                <li><strong>Modern Web3 Stack:</strong> Viem + Wagmi for type-safe interactions</li>
                <li><strong>Production Ready:</strong> Built-in CI/CD and deployment</li>
              </ul>
            </Card>

            <Card title="🎮 Gaming-First Approach">
              <p style={{ marginBottom: "15px" }}>Built-in gaming primitives that just work:</p>
              <div style={{
                background: THEME.surface,
                padding: "15px",
                borderRadius: "8px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                border: `1px solid ${THEME.accent}`
              }}>
                {`<TokenMinerGame
  onMint={(tokens) => mintToWallet(tokens)}
  theme="retro-cyber"
  animations="smooth"
/>`}
              </div>
            </Card>

            <Card title="⚡ Developer Experience">
              <p style={{ marginBottom: "15px" }}>From zero to hero in 2 minutes:</p>
              <div style={{
                background: THEME.bg,
                padding: "15px",
                borderRadius: "8px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                border: `1px solid ${THEME.primary}`
              }}>
                {`# Magic setup - everything configured
curl -fsSL install.modern-retro-cyber.dev | bash
cd my-game && pnpm dev
# 🚀 Your Web3 game is running!`}
              </div>
            </Card>
          </div>

          {/* Tech Stack */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "40px", color: THEME.accent }}>🔧 Built With The Best</h3>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              flexWrap: "wrap"
            }}>
              {[
                { name: "Remix", icon: "⚛️" },
                { name: "TypeScript", icon: "📘" },
                { name: "React 18", icon: "⚛️" },
                { name: "Turborepo", icon: "🚄" },
                { name: "pnpm", icon: "📦" },
                { name: "Ethereum", icon: "💎" },
                { name: "Viem", icon: "🔗" },
                { name: "Vercel", icon: "▲" }
              ].map((tech, i) => (
                <div key={i} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <div style={{ fontSize: "2rem" }}>{tech.icon}</div>
                  <div style={{ fontWeight: "bold", color: THEME.text }}>{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "80px 40px",
        background: THEME.surface,
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            color: THEME.primary
          }}>
            🚀 Ready to build the future?
          </h2>
          
          <p style={{
            fontSize: "1.2rem",
            marginBottom: "40px",
            color: THEME.accent
          }}>
            Join hundreds of developers building the next generation of Web3 games
          </p>

          <div style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Link to="/game">
              <Button size="large">🎮 Try Demo</Button>
            </Link>
            <a href="https://github.com/Gzeu/modern-retro-cyber" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="large">📖 View Docs</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "40px",
        borderTop: `1px solid ${THEME.surface}`,
        textAlign: "center",
        color: THEME.accent
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ marginBottom: "20px" }}>
            Made with ❤️ by <strong>George Pricop</strong> and the Web3 community
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
            <a href="https://github.com/Gzeu/modern-retro-cyber" target="_blank" rel="noopener noreferrer" style={{ color: THEME.primary, textDecoration: "none" }}>GitHub</a>
            <a href="https://twitter.com/modern_retro_cyber" target="_blank" rel="noopener noreferrer" style={{ color: THEME.primary, textDecoration: "none" }}>Twitter</a>
            <a href="https://discord.gg/modern-retro-cyber" target="_blank" rel="noopener noreferrer" style={{ color: THEME.primary, textDecoration: "none" }}>Discord</a>
            <Link to="/docs" style={{ color: THEME.primary, textDecoration: "none" }}>Documentation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
