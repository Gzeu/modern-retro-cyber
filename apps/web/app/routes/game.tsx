import { useState, useEffect } from "react";
import { Brand, Card } from "@modern-retro-cyber/ui";
import TokenMinerGame from "@modern-retro-cyber/ui/src/gaming/TokenMinerGame";
import { THEME } from "@modern-retro-cyber/config";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Token Miner Game - Modern Retro Cyber" },
    { name: "description", content: "Experience the future of Web3 gaming with our interactive token mining game. Level up, earn tokens, and mint real crypto rewards." },
  ];
};

// Mock Web3 provider for demo purposes
const MockWeb3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mock-web3-provider">
      {children}
    </div>
  );
};

export default function GamePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setAddress("0x742d35Cc6634C0532925a3b8D6095e0f73B6d265");
      setIsLoading(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress(undefined);
  };

  const handleMint = async (tokens: number) => {
    console.log(`Minting ${tokens} tokens to ${address}`);
    // Simulate transaction
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Successfully minted ${tokens} MRC tokens!`);
        resolve(true);
      }, 2000);
    });
  };

  return (
    <MockWeb3Provider>
      <div style={{ minHeight: "100vh", background: THEME.bg }}>
        {/* Header */}
        <header style={{
          padding: "20px 40px",
          borderBottom: `1px solid ${THEME.surface}`,
          background: `${THEME.bg}95`,
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                <Brand />
              </div>
            </Link>
            
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {!isConnected ? (
                <button
                  onClick={handleConnect}
                  disabled={isLoading}
                  style={{
                    background: THEME.gradients.cyber,
                    color: THEME.bg,
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.7 : 1,
                    fontFamily: "inherit"
                  }}
                >
                  {isLoading ? "Connecting..." : "🔗 Connect Wallet"}
                </button>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{
                    background: THEME.surface,
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: `1px solid ${THEME.primary}`,
                    fontSize: "14px",
                    fontFamily: "monospace"
                  }}>
                    🟢 {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                  <button
                    onClick={handleDisconnect}
                    style={{
                      background: "transparent",
                      color: THEME.accent,
                      border: `1px solid ${THEME.accent}`,
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontFamily: "inherit"
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ padding: "40px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Game Title */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1 style={{
                fontSize: "3rem",
                margin: "20px 0",
                background: THEME.gradients.gaming,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                🎮 Token Miner Game
              </h1>
              <p style={{
                fontSize: "1.2rem",
                color: THEME.accent,
                margin: "0 auto",
                maxWidth: "600px",
                lineHeight: 1.6
              }}>
                Experience the future of Web3 gaming! Mine tokens, level up your character, 
                and mint real crypto rewards. Connect your wallet to get started.
              </p>
            </div>

            {/* Game Component */}
            <TokenMinerGame 
              onMint={handleMint}
              isConnected={isConnected}
            />

            {/* Info Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginTop: "60px"
            }}>
              <Card title="🎯 How to Play" glowing>
                <div style={{ lineHeight: 1.8 }}>
                  <p><strong>1. Connect Wallet:</strong> Click the connect button to link your Web3 wallet</p>
                  <p><strong>2. Start Mining:</strong> Click the mining rig to earn MRC tokens</p>
                  <p><strong>3. Level Up:</strong> Gain experience to increase your mining rate</p>
                  <p><strong>4. Upgrade:</strong> Spend tokens to boost your mining efficiency</p>
                  <p><strong>5. Mint Rewards:</strong> Convert game tokens to real crypto</p>
                </div>
              </Card>

              <Card title="⚡ Game Features">
                <div style={{ lineHeight: 1.8 }}>
                  <p>🎮 <strong>Interactive Mining:</strong> Click-to-earn mechanics with smooth animations</p>
                  <p>📈 <strong>Level System:</strong> Gain XP and unlock higher mining rates</p>
                  <p>🔄 <strong>Auto-Mining:</strong> Set and forget passive token generation</p>
                  <p>🎨 <strong>Particle Effects:</strong> Beautiful visual feedback for actions</p>
                  <p>💎 <strong>Real Rewards:</strong> Mint actual ERC-20 tokens from gameplay</p>
                </div>
              </Card>

              <Card title="🔧 Technical Stack">
                <div style={{ lineHeight: 1.8 }}>
                  <p>⚛️ <strong>Remix:</strong> Modern full-stack web framework</p>
                  <p>📘 <strong>TypeScript:</strong> Type-safe development experience</p>
                  <p>🔗 <strong>Viem + Wagmi:</strong> Modern Web3 integration</p>
                  <p>💎 <strong>Smart Contracts:</strong> Solidity + OpenZeppelin</p>
                  <p>🎨 <strong>Custom UI:</strong> Gaming-optimized React components</p>
                </div>
              </Card>
            </div>

            {/* Developer Info */}
            <div style={{
              textAlign: "center",
              marginTop: "80px",
              padding: "40px",
              background: THEME.surface,
              borderRadius: "16px",
              border: `1px solid ${THEME.accent}`
            }}>
              <h3 style={{ color: THEME.primary, marginBottom: "20px" }}>🚀 Ready to Build Your Own?</h3>
              <p style={{ color: THEME.text, marginBottom: "30px", fontSize: "1.1rem" }}>
                This game is built with Modern Retro Cyber - the ultimate Web3 gaming development framework.
                Get started in 60 seconds with our automated setup!
              </p>
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                <a 
                  href="https://github.com/Gzeu/modern-retro-cyber" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    background: THEME.gradients.cyber,
                    color: THEME.bg,
                    padding: "12px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold"
                  }}
                >
                  ⭐ View Source Code
                </a>
                <Link 
                  to="/"
                  style={{
                    background: "transparent",
                    color: THEME.primary,
                    border: `2px solid ${THEME.primary}`,
                    padding: "10px 24px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold"
                  }}
                >
                  📚 Learn More
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MockWeb3Provider>
  );
}
