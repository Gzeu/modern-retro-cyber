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
  BASE_URL: process.env.NEXTPUBLIC_APP_URL || 'http://localhost:3000',
  WS_URL: process.env.NEXTPUBLIC_WS_URL || 'ws://localhost:3001'
};

export const GAME_CONFIG = {
  MINING_RATE: 1,
  UPGRADE_MULTIPLIER: 1.5,
  BASE_UPGRADE_COST: 50,
  MAX_LEVEL: 100,
  MIN_MINT_AMOUNT: 100
};
