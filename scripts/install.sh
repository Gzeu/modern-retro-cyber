#!/bin/bash

# Modern Retro Cyber - Quick Installation Script
# This script sets up the complete development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis
ROCKET="🚀"
CHECK="✅"
CROSS="❌"
WARNING="⚠️"
INFO="📊"
GAME="🎮"

echo -e "${PURPLE}"
echo "  ___  ___         _                 ___     _            _____      _"
echo " |   \/   |       | |               |   \   | |          /  __ \    | |"
echo " | .  . | ___  __| | ___ _ __ _ __  | |\ \  | |  _ _ _ _ _| /  \/ _ _| |_ ___ _ __"
echo " | |\/| |/ _ \/ _` |/ _ \ '__| '_ \ | | \ \ | | | | | | '_| |    | | | _| _/ _ \ '__|"
echo " | |  | | (_) |  _` |  __/ |  | | | || |_\ \| |_| |_| | | | \__/\ |_| |_|  __/ |"
echo " \_|  |_/\___/ \_,_|\___|_|  |_| |_||____/ \___|\__, | |  \____/\__, |_|_|\___|_|"
echo "                                              __/ |         __/ |"
echo "                                             |___/         |___/"
echo -e "${NC}"
echo -e "${CYAN}The Future of Web3 Gaming Development${NC}"
echo ""

# Function to print colored output
print_status() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_error() {
    echo -e "${RED}${CROSS} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${BLUE}${INFO} $1${NC}"
}

print_rocket() {
    echo -e "${PURPLE}${ROCKET} $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Node.js if not present
install_node() {
    if ! command_exists node; then
        print_info "Installing Node.js..."
        if command_exists curl; then
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command_exists brew; then
            brew install node@20
        else
            print_error "Please install Node.js 20+ manually from https://nodejs.org"
            exit 1
        fi
    else
        NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -lt 20 ]; then
            print_error "Node.js version must be 20+. Current version: $(node -v)"
            exit 1
        fi
    fi
    print_status "Node.js $(node -v) is ready"
}

# Install pnpm if not present
install_pnpm() {
    if ! command_exists pnpm; then
        print_info "Installing pnpm..."
        npm install -g pnpm@9
    fi
    print_status "pnpm $(pnpm -v) is ready"
}

# Main installation function
main() {
    echo -e "${GAME} ${CYAN}Starting Modern Retro Cyber setup...${NC}"
    echo ""
    
    # Check prerequisites
    print_info "Checking prerequisites..."
    
    if ! command_exists git; then
        print_error "Git is required but not installed. Please install Git first."
        exit 1
    fi
    print_status "Git is available"
    
    install_node
    install_pnpm
    
    echo ""
    print_rocket "Prerequisites check completed!"
    echo ""
    
    # Get project name from user or use default
    read -p "$(echo -e ${CYAN}Enter project name [my-retro-game]: ${NC})" PROJECT_NAME
    PROJECT_NAME=${PROJECT_NAME:-my-retro-game}
    
    # Clone repository
    print_info "Cloning Modern Retro Cyber..."
    if [ -d "$PROJECT_NAME" ]; then
        print_warning "Directory $PROJECT_NAME already exists. Using existing directory."
        cd "$PROJECT_NAME"
    else
        git clone https://github.com/Gzeu/modern-retro-cyber.git "$PROJECT_NAME"
        cd "$PROJECT_NAME"
        print_status "Repository cloned successfully"
    fi
    
    # Install dependencies
    print_info "Installing dependencies (this may take a few minutes)..."
    pnpm install --frozen-lockfile
    print_status "Dependencies installed"
    
    # Build packages
    print_info "Building packages..."
    pnpm build
    print_status "Packages built successfully"
    
    # Run tests to verify setup
    print_info "Running tests to verify setup..."
    if pnpm test --run; then
        print_status "All tests passed"
    else
        print_warning "Some tests failed, but setup is complete"
    fi
    
    # Create .env file from example
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_status "Created .env file from example"
        print_warning "Please edit .env file with your configuration"
    fi
    
    echo ""
    print_rocket "Setup completed successfully!"
    echo ""
    
    # Display next steps
    echo -e "${GREEN}✨ Next steps:${NC}"
    echo ""
    echo -e "  1. ${CYAN}cd $PROJECT_NAME${NC}"
    echo -e "  2. ${CYAN}Edit .env file with your configuration${NC}"
    echo -e "  3. ${CYAN}pnpm dev${NC}     - Start development servers"
    echo ""
    echo -e "${GREEN}📊 Available commands:${NC}"
    echo -e "  ${CYAN}pnpm dev${NC}          - Start all development servers"
    echo -e "  ${CYAN}pnpm build${NC}        - Build all packages and apps"
    echo -e "  ${CYAN}pnpm test${NC}         - Run all tests"
    echo -e "  ${CYAN}pnpm lint${NC}         - Lint all code"
    echo -e "  ${CYAN}pnpm format${NC}       - Format all code"
    echo -e "  ${CYAN}pnpm clean${NC}        - Clean all build artifacts"
    echo ""
    echo -e "${GREEN}🌐 Development URLs:${NC}"
    echo -e "  ${CYAN}Web App:${NC}          http://localhost:3000"
    echo -e "  ${CYAN}Admin Panel:${NC}      http://localhost:3001"
    echo -e "  ${CYAN}Storybook:${NC}        http://localhost:6006"
    echo ""
    echo -e "${GREEN}📚 Resources:${NC}"
    echo -e "  ${CYAN}Documentation:${NC}    https://docs.modern-retro-cyber.dev"
    echo -e "  ${CYAN}GitHub:${NC}           https://github.com/Gzeu/modern-retro-cyber"
    echo -e "  ${CYAN}Issues:${NC}           https://github.com/Gzeu/modern-retro-cyber/issues"
    echo -e "  ${CYAN}Discussions:${NC}      https://github.com/Gzeu/modern-retro-cyber/discussions"
    echo ""
    echo -e "${PURPLE}${GAME} Happy coding! Welcome to the future of Web3 gaming! ${GAME}${NC}"
    echo ""
}

# Run main function
main "$@"
