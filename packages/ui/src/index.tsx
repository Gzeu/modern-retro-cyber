import React from 'react';

export const Brand = () => (
  <span style={{ 
    fontFamily: 'monospace', 
    color: '#00FFD1',
    fontSize: 'inherit',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #00FFD1 0%, #FF2D95 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }}>
    modern-retro-cyber
  </span>
);

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  size = 'medium'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}) => {
  const baseStyles = {
    fontFamily: 'monospace',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    border: 'none',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  };

  const sizeStyles = {
    small: { padding: '8px 16px', fontSize: '12px' },
    medium: { padding: '12px 24px', fontSize: '14px' },
    large: { padding: '16px 32px', fontSize: '16px' }
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #00FFD1 0%, #FF2D95 100%)',
      color: '#0A0A0F'
    },
    secondary: {
      background: 'transparent',
      color: '#00FFD1',
      border: '2px solid #00FFD1'
    },
    ghost: {
      background: 'transparent',
      color: '#FF2D95'
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant]
      }}
    >
      {children}
    </button>
  );
};

export const Card = ({ 
  children, 
  title,
  glowing = false
}: {
  children: React.ReactNode;
  title?: string;
  glowing?: boolean;
}) => (
  <div style={{
    border: glowing ? '1px solid #00FFD1' : '1px solid #FF2D95',
    padding: '1.5rem',
    backgroundColor: '#1A1A2E',
    borderRadius: '12px',
    margin: '1rem 0',
    boxShadow: glowing 
      ? '0 0 20px #00FFD140, inset 0 0 20px #00FFD110' 
      : '0 0 15px #FF2D9520',
    transition: 'all 0.3s ease'
  }}>
    {title && (
      <h3 style={{ 
        color: '#00FFD1', 
        margin: '0 0 1rem 0',
        fontFamily: 'monospace',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}>
        {title}
      </h3>
    )}
    {children}
  </div>
);

export const Badge = ({
  children,
  variant = 'primary',
  size = 'small'
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'small' | 'medium';
}) => {
  const variants = {
    primary: { bg: '#00FFD1', color: '#0A0A0F' },
    secondary: { bg: '#FF2D95', color: '#FFFFFF' },
    success: { bg: '#00FF88', color: '#0A0A0F' },
    warning: { bg: '#FFB800', color: '#0A0A0F' }
  };

  const sizes = {
    small: { padding: '4px 8px', fontSize: '10px' },
    medium: { padding: '6px 12px', fontSize: '12px' }
  };

  return (
    <span style={{
      ...variants[variant],
      ...sizes[size],
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'inline-block'
    }}>
      {children}
    </span>
  );
};

export const LoadingSpinner = ({ size = 24 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      border: '2px solid transparent',
      borderTop: '2px solid #00FFD1',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}
  />
);

// CSS-in-JS Animation (to be added to global styles)
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
`;
