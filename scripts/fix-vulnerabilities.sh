#!/usr/bin/env bash
# scripts/fix-vulnerabilities.sh
# Run this locally to apply fixes for the current batch of alerts.
# Usage: bash scripts/fix-vulnerabilities.sh

set -e

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Security Vulnerability Fix Script${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cd "$(git rev parse --show-toplevel)/frontend" 2>/dev/null || cd frontend

echo -e "${YELLOW}📋 Current audit status:${NC}"
npm audit --audit-level=none 2>/dev/null | tail -5 || true
echo ""

# ── 1. Safe auto-fix (no breaking changes) ──────────────────────────────────
echo -e "${BLUE}Step 1/4: Running npm audit fix (safe patches)...${NC}"
npm audit fix
echo -e "${GREEN}✓ Safe fixes applied${NC}"
echo ""

# ── 2. Upgrade known bad packages manually ──────────────────────────────────
echo -e "${BLUE}Step 2/4: Upgrading high-risk packages...${NC}"

# axios: multiple critical CVEs — upgrade to latest
echo "  → axios"
npm install axios@latest

# lodash: prototype pollution + code injection
echo "  → lodash (consider replacing with lodash-es or native alternatives)"
npm install lodash@latest

# react-router: XSS via open redirects
echo "  → react-router"
npm install react-router@latest react-router-dom@latest

# follow-redirects: header leakage
echo "  → follow-redirects"
npm install follow-redirects@latest

echo -e "${GREEN}✓ Manual upgrades done${NC}"
echo ""

# ── 3. Audit again to see what remains ──────────────────────────────────────
echo -e "${BLUE}Step 3/4: Re-auditing after fixes...${NC}"
REMAINING=$(npm audit --json 2>/dev/null | jq '.metadata.vulnerabilities.total // 0')
echo ""
if [ "$REMAINING" -eq "0" ]; then
  echo -e "${GREEN}🎉 All vulnerabilities resolved!${NC}"
else
  echo -e "${YELLOW}⚠️  $REMAINING vulnerabilities remain (may require major version bumps or manual review)${NC}"
  npm audit --audit-level=none 2>/dev/null | tail -10
fi
echo ""

# ── 4. Run tests ─────────────────────────────────────────────────────────────
echo -e "${BLUE}Step 4/4: Running tests...${NC}"
npm run test --if-present && echo -e "${GREEN}✓ Tests passed${NC}" || echo -e "${RED}✗ Tests failed — review changes before committing${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  Next: ${YELLOW}git diff frontend/package*.json${NC} to review"
echo -e "  Then: ${YELLOW}git add frontend/package*.json && git commit${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"