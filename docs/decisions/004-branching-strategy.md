# ADR-004: Git Branching Strategy

## Status
Accepted

## Date
2025-01-09

## Context
FlowEdge site needs a branching strategy that supports:
- Safe deployment workflow (test before production)
- Single developer efficiency (current state)
- Future team growth capability
- Railway's automatic deployment features
- Clear separation between production and development

### Current Situation
- Single developer (may grow)
- Direct pushes to main (risky)
- No staging environment
- Railway auto-deploys on push

## Decision
We will use a **Simple Two-Branch Strategy** with `main` and `develop` branches.

## Rationale

### Branch Structure
```
main (production)
└── develop (staging/active development)
```

### Why Two-Branch Over Other Models

| Strategy | Complexity | Solo Dev | Team Ready | Our Choice |
|----------|------------|----------|------------|------------|
| Single Branch (main only) | Too Simple | ✅ Easy | ❌ Risky | ❌ No staging |
| **Two-Branch (main/develop)** | **Just Right** | **✅ Perfect** | **✅ Scalable** | **✅ Selected** |
| GitFlow (5+ branches) | Too Complex | ❌ Overkill | ✅ Enterprise | ❌ Too much |
| GitHub Flow (main + features) | Moderate | ⚠️ OK | ✅ Good | ❌ Not yet needed |

### Key Benefits
1. **Safety**: Test everything in develop before production
2. **Simplicity**: Only two branches to manage
3. **Railway Integration**: Each branch gets its own environment
4. **Growth Path**: Easy to add feature branches later
5. **Industry Standard**: Familiar to any future developers

## Implementation

### Branch Purposes
- **main**: Production-ready code only
- **develop**: Active development and testing

### Workflow Rules
1. **Never commit directly to main** (except hotfixes)
2. **All work happens in develop**
3. **Merge develop → main only when stable**
4. **Tag main merges with version numbers**

### Railway Configuration
```yaml
Production Environment:
  Branch: main
  Domain: flowedgeintel.com
  Auto-deploy: Yes
  Environment: production

Staging Environment:
  Branch: develop
  Domain: staging-flowedge.railway.app
  Auto-deploy: Yes
  Environment: staging
```

### Merge Strategy
```bash
# Regular release flow
git checkout develop
git add .
git commit -m "Feature: New trading journal"
git push origin develop
# Test on staging...

# When ready for production
git checkout main
git merge develop --no-ff
git tag -a v1.1.0 -m "Release: Trading journal"
git push origin main --tags
```

### Hotfix Process
```bash
# Only for critical production bugs
git checkout main
git checkout -b hotfix/critical-bug
# Fix bug...
git commit -m "Hotfix: Critical bug"
git checkout main
git merge hotfix/critical-bug --no-ff
git push origin main
# Also merge to develop
git checkout develop  
git merge hotfix/critical-bug
git push origin develop
```

## Consequences

### Positive
- Production always stable
- Safe testing environment
- Clear deployment path
- Version history preserved
- Easy rollback capability

### Negative
- Extra merge step for releases
- Need to maintain two Railway environments
- Potential merge conflicts (minimal with solo dev)

### Migration Path
When team grows or complexity increases:
```
Current: main ← develop
Future:  main ← develop ← feature/*
Later:   main ← release/* ← develop ← feature/*
```

## Monitoring Success
- Zero production incidents from untested code
- Deployment confidence increases
- Clear version history
- Staging catches issues before production

## Future Considerations

### Add Feature Branches When:
- Multiple developers join
- Working on 2+ features simultaneously  
- Need isolated testing environments

### Add Release Branches When:
- Regular release cycles established
- Need release candidates
- Multiple versions in production

## References
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Railway Environments](https://docs.railway.app/develop/environments)