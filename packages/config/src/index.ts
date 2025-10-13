export const APP_NAME = 'modern-retro-cyber';
export const VERSION = '0.1.0';

export const THEME = {
  primary: '#00FFD1',
  accent: '#FF2D95',
  secondary: '#9D4EDD',
  bg: '#0A0A0F',
  surface: '#1A1A2E',
  text: '#FFFFFF',
  gradients: {
    cyber: 'linear-gradient(135deg, #00FFD1 0%, #FF2D95 100%)',
    retro: 'linear-gradient(135deg, #9D4EDD 0%, #00FFD1 100%)',
    gaming: 'linear-gradient(45deg, #FF2D95 0%, #9D4EDD 50%, #00FFD1 100%)'
  }
};

export const CONTRACTS = {
  // Contract addresses will be populated after deployment
  TOKEN_ADDRESS: '',
  NETWORK_ID: 11155111, // Sepolia testnet
  CHAIN_NAME: 'sepolia'
};

export const API_ENDPOINTS = {
  BASE_URL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  WS_URL: typeof window !== 'undefined' 
    ? `ws://${window.location.hostname}:3001` 
    : 'ws://localhost:3001'
};

export const GAME_CONFIG = {
  MINING_RATE: 1,
  UPGRADE_MULTIPLIER: 1.5,
  BASE_UPGRADE_COST: 50,
  MAX_LEVEL: 100,
  MIN_MINT_AMOUNT: 100
};

// Global styles for the application
export const globalStyles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px #00FFD1; }
  50% { box-shadow: 0 0 20px #00FFD1, 0 0 30px #00FFD1; }
}

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

@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Cyber theme scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0A0A0F;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #00FFD1, #FF2D95);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #FF2D95, #9D4EDD);
}

/* Selection styles */
::selection {
  background: #00FFD150;
  color: #FFFFFF;
}

/* Base styles */
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0A0A0F;
  color: #FFFFFF;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.2;
}

code, pre {
  font-family: 'JetBrains Mono', monospace;
}

a {
  color: #00FFD1;
  text-decoration: none;
}

a:hover {
  color: #FF2D95;
  text-decoration: underline;
}
`;
