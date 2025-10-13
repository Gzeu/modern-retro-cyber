import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Badge } from '../index';

interface GameState {
  tokens: number;
  level: number;
  miningRate: number;
  upgradeCost: number;
  totalMined: number;
  isActive: boolean;
  experience: number;
  achievements: string[];
}

interface MiningRigProps {
  gameState: GameState;
  onMine: () => void;
  onUpgrade: () => void;
  disabled?: boolean;
}

const MiningRig: React.FC<MiningRigProps> = ({ 
  gameState, 
  onMine, 
  onUpgrade, 
  disabled 
}) => {
  const [animation, setAnimation] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const handleMine = useCallback(() => {
    if (disabled || !gameState.isActive) return;
    
    setAnimation(true);
    onMine();
    
    // Create particle effect
    const newParticle = {
      id: Date.now(),
      x: Math.random() * 200,
      y: Math.random() * 100
    };
    setParticles(prev => [...prev, newParticle]);
    
    setTimeout(() => {
      setAnimation(false);
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 800);
  }, [disabled, gameState.isActive, onMine]);

  return (
    <div style={{
      position: 'relative',
      width: '320px',
      height: '240px',
      background: `linear-gradient(135deg, #1A1A2E 0%, #0A0A0F 100%)`,
      border: `2px solid ${gameState.isActive ? '#00FFD1' : '#FF2D95'}`,
      borderRadius: '16px',
      padding: '20px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transform: animation ? 'scale(1.03)' : 'scale(1)',
      transition: 'all 0.3s ease',
      boxShadow: animation 
        ? `0 0 40px #00FFD160, inset 0 0 20px #00FFD120` 
        : `0 0 20px #FF2D9530`,
      overflow: 'hidden'
    }}
    onClick={handleMine}
    >
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: '4px',
            height: '4px',
            background: '#00FFD1',
            borderRadius: '50%',
            animation: 'particleFloat 0.8s ease-out forwards'
          }}
        />
      ))}

      {/* Status Indicator */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        width: '12px',
        height: '12px',
        background: gameState.isActive ? '#00FF88' : '#FF4444',
        borderRadius: '50%',
        animation: gameState.isActive ? 'pulse 2s infinite' : 'none',
        boxShadow: `0 0 10px ${gameState.isActive ? '#00FF88' : '#FF4444'}`
      }} />

      {/* Level Badge */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px'
      }}>
        <Badge variant="primary" size="medium">
          LVL {gameState.level}
        </Badge>
      </div>

      {/* Mining Rate Display */}
      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        color: '#00FFD1',
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        textShadow: '0 0 10px #00FFD150'
      }}>
        +{gameState.miningRate} MRC/click
      </div>

      {/* Experience Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        background: '#0A0A0F',
        borderRadius: '4px',
        marginTop: '20px',
        overflow: 'hidden',
        border: '1px solid #333'
      }}>
        <div style={{
          width: `${(gameState.experience % 100)}%`,
          height: '100%',
          background: `linear-gradient(90deg, #9D4EDD, #00FFD1)`,
          transition: 'width 0.5s ease',
          boxShadow: '0 0 10px #9D4EDD50'
        }} />
      </div>
      
      <div style={{
        textAlign: 'center',
        fontSize: '10px',
        color: '#9D4EDD',
        marginTop: '5px',
        fontFamily: 'monospace'
      }}>
        XP: {gameState.experience % 100}/100
      </div>

      {/* Upgrade Button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button 
          variant="secondary" 
          size="small"
          onClick={(e) => {
            e?.stopPropagation();
            onUpgrade();
          }}
          disabled={gameState.tokens < gameState.upgradeCost}
        >
          Upgrade ({gameState.upgradeCost} MRC)
        </Button>
      </div>
    </div>
  );
};

const TokenMinerGame: React.FC<{
  onMint?: (tokens: number) => void;
  isConnected?: boolean;
}> = ({ onMint, isConnected = false }) => {
  const [gameState, setGameState] = useState<GameState>({
    tokens: 0,
    level: 1,
    miningRate: 1,
    upgradeCost: 50,
    totalMined: 0,
    isActive: false,
    experience: 0,
    achievements: []
  });

  const [isLoading, setIsLoading] = useState(false);

  // Auto-mine effect
  useEffect(() => {
    if (!gameState.isActive) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const mined = Math.floor(prev.miningRate / 4);
        const newExp = prev.experience + 1;
        
        return {
          ...prev,
          tokens: prev.tokens + mined,
          totalMined: prev.totalMined + mined,
          experience: newExp
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.isActive, gameState.miningRate]);

  // Level up effect
  useEffect(() => {
    if (gameState.experience > 0 && gameState.experience % 100 === 0) {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        miningRate: Math.floor(prev.miningRate * 1.2)
      }));
    }
  }, [gameState.experience]);

  const handleMine = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      tokens: prev.tokens + prev.miningRate,
      totalMined: prev.totalMined + prev.miningRate,
      experience: prev.experience + prev.miningRate
    }));
  }, []);

  const handleUpgrade = useCallback(() => {
    if (gameState.tokens < gameState.upgradeCost) return;

    setGameState(prev => ({
      ...prev,
      tokens: prev.tokens - prev.upgradeCost,
      level: prev.level + 1,
      miningRate: Math.floor(prev.miningRate * 1.5),
      upgradeCost: Math.floor(prev.upgradeCost * 2.2),
      experience: prev.experience + 25
    }));
  }, [gameState.tokens, gameState.upgradeCost]);

  const handleMintTokens = useCallback(async () => {
    if (!isConnected || gameState.tokens < 100) return;
    
    setIsLoading(true);
    try {
      await onMint?.(Math.min(gameState.tokens, 1000));
      setGameState(prev => ({
        ...prev,
        tokens: prev.tokens - Math.min(prev.tokens, 1000)
      }));
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, gameState.tokens, onMint]);

  const toggleGame = () => {
    setGameState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const resetGame = () => {
    setGameState({
      tokens: 0,
      level: 1,
      miningRate: 1,
      upgradeCost: 50,
      totalMined: 0,
      isActive: false,
      experience: 0,
      achievements: []
    });
  };

  if (!isConnected) {
    return (
      <Card title="🎮 Token Miner Game" glowing>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#FF2D95', marginBottom: '20px', fontSize: '18px' }}>
            🔌 Connect your wallet to start mining tokens!
          </p>
          <p style={{ color: '#9D4EDD', fontSize: '14px' }}>
            Experience the future of Web3 gaming with our interactive token mining system.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Card title="🎮 Token Miner Game - Web3 Edition" glowing>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'auto 1fr', 
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Game Area */}
          <div>
            <MiningRig 
              gameState={gameState}
              onMine={handleMine}
              onUpgrade={handleUpgrade}
              disabled={isLoading}
            />
            
            <div style={{ 
              marginTop: '20px', 
              textAlign: 'center',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center'
            }}>
              <Button onClick={toggleGame} size="small">
                {gameState.isActive ? '⏸️ Pause' : '▶️ Auto-Mine'}
              </Button>
              <Button onClick={resetGame} variant="ghost" size="small">
                🔄 Reset
              </Button>
            </div>
          </div>

          {/* Stats Panel */}
          <div style={{ minWidth: '300px' }}>
            <div style={{ 
              background: '#1A1A2E', 
              border: `1px solid #00FFD1`,
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 0 20px #00FFD120'
            }}>
              <h3 style={{ 
                color: '#00FFD1', 
                marginBottom: '20px',
                fontSize: '20px',
                fontFamily: 'monospace'
              }}>
                📊 Mining Statistics
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#9D4EDD' }}>Balance:</span>
                  <span style={{ color: '#00FFD1', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    {gameState.tokens.toLocaleString()} MRC
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#9D4EDD' }}>Level:</span>
                  <span style={{ color: '#00FFD1', fontFamily: 'monospace' }}>
                    {gameState.level}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#9D4EDD' }}>Mining Rate:</span>
                  <span style={{ color: '#00FFD1', fontFamily: 'monospace' }}>
                    {gameState.miningRate}/click
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#9D4EDD' }}>Total Mined:</span>
                  <span style={{ color: '#00FFD1', fontFamily: 'monospace' }}>
                    {gameState.totalMined.toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#9D4EDD' }}>Status:</span>
                  <Badge variant={gameState.isActive ? 'success' : 'secondary'}>
                    {gameState.isActive ? 'ACTIVE' : 'PAUSED'}
                  </Badge>
                </div>
              </div>

              <div style={{ marginTop: '25px' }}>
                <Button 
                  onClick={handleMintTokens}
                  disabled={gameState.tokens < 100 || isLoading}
                  variant="primary"
                  style={{ width: '100%' }}
                >
                  {isLoading 
                    ? '⏳ Minting...' 
                    : `🪙 Mint ${Math.min(gameState.tokens, 1000)} Real Tokens`}
                </Button>
                
                <p style={{ 
                  fontSize: '12px', 
                  color: '#9D4EDD', 
                  marginTop: '10px',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  Minimum 100 MRC • Maximum 1000 per mint
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes particleFloat {
          0% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.5); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.8; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1); 
          }
        }
      `}</style>
    </div>
  );
};

export default TokenMinerGame;
