# 🤝 Contributing to Modern Retro Cyber

First off, thank you for considering contributing to Modern Retro Cyber! It's people like you that make this project an amazing tool for Web3 gaming development.

## 🌟 Ways to Contribute

- 🐛 **Report bugs** - Found an issue? Let us know!
- 💡 **Suggest features** - Have ideas for improvements?
- 🔧 **Submit pull requests** - Fix bugs or add features
- 📝 **Improve documentation** - Help make our docs better
- 🎮 **Create examples** - Build games using our framework
- 💬 **Answer questions** - Help other developers in discussions

## 🚀 Quick Start for Contributors

### Prerequisites
- Node.js 20+
- pnpm 9+
- Git
- Basic knowledge of TypeScript and React

### Setup Development Environment

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/your-username/modern-retro-cyber.git
cd modern-retro-cyber

# 3. Install dependencies
pnpm install

# 4. Build all packages
pnpm build

# 5. Start development
pnpm dev

# 6. Run tests
pnpm test
```

### Project Structure

```
modern-retro-cyber/
├── apps/                   # Applications
│   ├── web/               # Main Remix app
│   └── admin/             # Admin dashboard
├── packages/              # Shared packages
│   ├── ui/                # React components
│   ├── config/            # Configuration
│   └── tsconfig/          # TypeScript configs
├── contracts/             # Smart contracts
└── docs/                  # Documentation
```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

### 2. Make Changes

- Follow our coding standards (see below)
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Test Your Changes

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm --filter @modern-retro-cyber/ui test

# Run smart contract tests
pnpm --filter @modern-retro-cyber/contracts test

# Lint code
pnpm lint

# Format code
pnpm format
```

### 4. Commit Changes

We use conventional commits. Format your commit messages like:

```
type(scope): description

feat(ui): add new gaming component
fix(contracts): resolve mining rate calculation
docs(readme): update installation instructions
test(ui): add tests for Button component
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `test`: Test changes
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Maintenance tasks

### 5. Submit Pull Request

1. Push your branch to GitHub
2. Create a Pull Request
3. Fill out the PR template
4. Wait for review

## 📝 Coding Standards

### TypeScript Guidelines

- Use strict TypeScript configuration
- Prefer `interface` over `type` for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

```typescript
/**
 * Calculate mining reward based on player level
 * @param baseAmount Base mining amount
 * @param playerLevel Current player level
 * @returns Calculated mining reward
 */
function calculateMiningReward(
  baseAmount: number,
  playerLevel: number
): number {
  return baseAmount * (1 + playerLevel * 0.1);
}
```

### React Component Guidelines

- Use functional components with hooks
- Prefer composition over inheritance
- Use meaningful prop names and types
- Handle loading and error states

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick
}) => {
  // Component implementation
};
```

### Smart Contract Guidelines

- Follow OpenZeppelin standards
- Use clear function and variable names
- Add comprehensive NatSpec documentation
- Implement proper access controls
- Include security checks

```solidity
/**
 * @dev Mine tokens through gameplay
 * @param amount Base amount to mine
 */
function mineTokens(uint256 amount) 
    external 
    onlyActiveGame(msg.sender)
    respectsCooldown(msg.sender)
{
    // Implementation
}
```

## 🧪 Testing Guidelines

### Frontend Tests

- Write unit tests for components
- Test user interactions
- Mock external dependencies
- Use meaningful test descriptions

```typescript
describe('Button Component', () => {
  it('should render with correct variant styles', () => {
    // Test implementation
  });
  
  it('should call onClick when clicked', () => {
    // Test implementation
  });
});
```

### Smart Contract Tests

- Test all public functions
- Test edge cases and error conditions
- Test access controls
- Test events are emitted correctly

```typescript
describe('ModernRetroCyberToken', () => {
  it('should allow mining when game is active', async () => {
    // Test implementation
  });
  
  it('should prevent mining when paused', async () => {
    // Test implementation
  });
});
```

## 🎮 Gaming Features Guidelines

### Adding New Game Mechanics

1. **Design First**: Discuss the mechanic in an issue
2. **Smart Contract**: Implement logic in contracts
3. **Frontend**: Create React components
4. **Testing**: Write comprehensive tests
5. **Documentation**: Update docs and examples

### Game Balance Considerations

- Consider economic implications
- Test with different user scenarios
- Ensure fairness and fun
- Document configuration options

## 🔗 Web3 Integration Guidelines

### Wallet Integration

- Support multiple wallets
- Handle connection errors gracefully
- Provide clear user feedback
- Test on different networks

### Smart Contract Interaction

- Use type-safe contract calls
- Handle transaction failures
- Provide gas estimation
- Show transaction status

## 📄 Documentation Guidelines

- Use clear, concise language
- Provide code examples
- Include screenshots for UI features
- Update README for major changes
- Keep examples up to date

## 🎆 Recognition

All contributors will be:

- ✨ Listed in our Contributors section
- 🎫 Given early access to new features
- 🎖️ Awarded special GitHub profile badges
- 🎁 Invited to our exclusive Discord community
- 🏆 Featured in release notes for major contributions

## 💬 Getting Help

- 💬 [GitHub Discussions](https://github.com/Gzeu/modern-retro-cyber/discussions) for questions
- 🐛 [Issues](https://github.com/Gzeu/modern-retro-cyber/issues) for bugs and features
- 📝 [Documentation](https://docs.modern-retro-cyber.dev) for guides
- 📧 Email: contribute@modern-retro-cyber.dev

## 📆 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## 📄 License

By contributing to Modern Retro Cyber, you agree that your contributions will be licensed under the MIT License.

---

🎉 **Thank you for contributing to Modern Retro Cyber!** 🎉

Your contributions help make Web3 gaming development more accessible and enjoyable for everyone!
