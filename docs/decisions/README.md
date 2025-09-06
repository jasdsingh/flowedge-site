# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the FlowEdge website project.

## What are ADRs?

ADRs are documents that capture important architectural decisions made along with their context and consequences. They help us:
- Remember why we made specific choices
- Onboard new team members effectively
- Revisit decisions when context changes
- Maintain consistency across the project

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [001](001-hosting-platform-railway.md) | Hosting Platform Selection - Railway | Accepted | 2025-01-09 |
| [002](002-repository-structure-separate.md) | Repository Structure - Separate Repositories | Accepted | 2025-01-09 |
| [003](003-frontend-framework-nextjs.md) | Frontend Framework - Next.js Migration Strategy | Accepted | 2025-01-09 |

## ADR Template

When creating new ADRs, use this template:

```markdown
# ADR-XXX: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Date
YYYY-MM-DD

## Context
[What is the issue we're addressing?]

## Decision
[What have we decided to do?]

## Rationale
[Why did we make this decision?]

## Consequences
### Positive
[What good comes from this decision?]

### Negative
[What are the drawbacks?]

## References
[Links to relevant documentation]
```

## Categories

### Infrastructure
- [001 - Hosting Platform (Railway)](001-hosting-platform-railway.md)

### Architecture
- [002 - Repository Structure](002-repository-structure-separate.md)
- [003 - Frontend Framework](003-frontend-framework-nextjs.md)

## Quick Reference

### Current Stack Decisions
- **Hosting**: Railway ($5/month)
- **Repository**: Separate frontend/backend repos
- **Frontend**: Next.js 14+ (planned migration)
- **Database**: PostgreSQL on Railway
- **Deployment**: Git-based via Railway

### Cost Analysis
- Current: $5/month (Railway)
- Alternative: $45/month (Vercel + Supabase)
- Annual Savings: $480

## Related Documentation
- [FlowEdge Main Repository](https://github.com/jasdsingh/flowedge)
- [Railway Documentation](https://docs.railway.app)
- [Next.js Documentation](https://nextjs.org/docs)