# ADR-002: Repository Structure - Separate Repositories

## Status
Accepted

## Date
2025-01-09

## Context
FlowEdge consists of multiple components:
- **Backend**: Web scrapers, n8n workflows, Discord bots, PostgreSQL schemas
- **Frontend**: Public website, future trading journal, user dashboard

We need to decide whether to maintain these in a single monorepo or separate repositories.

### Current Structure
- `flowedge/` - Backend services and automation (Python/TypeScript)
- `flowedge-site/` - Public website (HTML, future Next.js)

### Requirements
- Independent deployment cycles for frontend and backend
- Clear separation of concerns
- Ability to scale teams independently
- Simple CI/CD pipelines
- Minimal complexity for current team size

## Decision
We will maintain **separate repositories** for the frontend website and backend services.

## Rationale

### Comparison

| Aspect | Separate Repos | Monorepo |
|--------|---------------|----------|
| Deployment Independence | ✅ Excellent | ❌ Coupled |
| CI/CD Complexity | ✅ Simple | ⚠️ Complex |
| Code Sharing | ⚠️ Requires effort | ✅ Easy |
| Repository Size | ✅ Small, fast | ❌ Large |
| Tech Stack Flexibility | ✅ Independent | ⚠️ Constrained |
| Team Scaling | ✅ Independent teams | ⚠️ Coordination needed |
| Initial Setup | ✅ Simple | ⚠️ Tooling required |

### Key Reasons for Separation

1. **Deployment Independence**
   - Deploy website updates without touching backend
   - Backend fixes don't trigger frontend rebuilds
   - Different deployment schedules (website: frequent, backend: careful)

2. **Technology Differences**
   - Frontend: Next.js, React, Tailwind
   - Backend: Python scrapers, Node.js workflows, PostgreSQL
   - Different testing strategies and build tools

3. **Performance**
   - Faster clone and CI/CD operations
   - Smaller Docker images
   - Focused dependency trees

4. **Security**
   - Frontend has no access to backend secrets
   - Clear security boundaries
   - Separate access controls possible

## Consequences

### Positive
- Clear ownership and responsibilities
- Fast, focused CI/CD pipelines
- Independent versioning and releases
- Easier onboarding (clone only what you need)
- Natural security boundary

### Negative
- Potential code duplication (types, utilities)
- Cross-repo coordination for breaking changes
- Need to maintain two repositories

### Mitigation Strategies

1. **Shared Types**
   ```typescript
   // Option 1: npm package
   @flowedge/shared-types
   
   // Option 2: Git submodule
   flowedge-shared/
   ```

2. **API Contract**
   - Use OpenAPI/Swagger for API documentation
   - Version APIs properly
   - Maintain backwards compatibility

3. **Coordination**
   - Use GitHub Projects for cross-repo planning
   - Semantic versioning for API changes
   - Clear communication channels

## Implementation

### Repository Structure
```
flowedge/                 # Backend repository
├── scrapers/            # Python/Node scrapers
├── workflows/           # n8n workflows
├── discord/            # Discord bot
├── database/           # PostgreSQL schemas
└── api/                # REST API endpoints

flowedge-site/           # Frontend repository  
├── app/                # Next.js app
├── components/         # React components
├── public/            # Static assets
└── docs/              # Documentation & ADRs
```

### Cross-Repository Communication
```yaml
# flowedge-site/.env
NEXT_PUBLIC_API_URL=https://api.flowedge.railway.app

# flowedge/api/openapi.yaml
openapi: 3.0.0
info:
  title: FlowEdge API
  version: 1.0.0
```

## Future Considerations

### When to Reconsider Monorepo
- Team size exceeds 10 developers
- Significant code sharing requirements
- Need for atomic cross-component changes
- Advanced tooling becomes available

### Current Scale Assessment
- Team size: 1-2 developers ✅ Separate repos optimal
- Shared code: Minimal ✅ Separation works well
- Deployment coupling: None needed ✅ Independence valuable

## References
- [Monorepo vs Polyrepo](https://monorepo.tools/)
- [GitHub Repository Best Practices](https://docs.github.com/en/repositories)
- FlowEdge Deployment Analysis (internal memory)