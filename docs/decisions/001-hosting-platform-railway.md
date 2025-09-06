# ADR-001: Hosting Platform Selection - Railway

## Status
Accepted

## Date
2025-01-09

## Context
FlowEdge requires a hosting platform for its public-facing website that will evolve from a simple landing page to a full-featured trading intelligence platform with user accounts, trading journal, and real-time features.

### Requirements
- Static site hosting for initial landing page
- Backend API support for email collection and future features
- Database support for trading journal and user data
- Cost-effective at current scale
- Simple deployment process
- Ability to scale without platform migration

### Options Considered
1. **Railway** - Full-stack PaaS with built-in database support
2. **Vercel** - Best-in-class Next.js hosting
3. **Netlify** - Excellent static site hosting with serverless functions
4. **AWS** - Complete cloud infrastructure platform

## Decision
We will use **Railway** as our hosting platform.

## Rationale

### Why Railway Won

| Criteria | Railway | Vercel | Netlify | AWS |
|----------|---------|--------|---------|-----|
| Static Hosting | Good | Excellent | Excellent | Good |
| Backend Support | Excellent | Good | Limited | Excellent |
| Database | Built-in | External ($) | External ($) | Complex |
| Monthly Cost | $5 | $20 | $19 | Variable |
| Learning Curve | Easy | Easy | Easy | Hard |
| Full-Stack Ready | Yes | Partial | No | Yes |

### Key Advantages
1. **Unified Platform**: Can host static site, Node.js backend, and PostgreSQL database in one place
2. **Cost Effective**: $5/month covers all current and near-future needs
3. **Growth Path**: No platform migration needed as we add features
4. **Simple Deployment**: Git push to deploy, automatic HTTPS, zero configuration
5. **PostgreSQL Included**: One-click database provisioning for trading journal

### Cost Analysis
- Railway: $5/month (all-in)
- Alternative: Vercel ($20) + Supabase ($25) = $45/month
- **Annual Savings: $480**

## Consequences

### Positive
- Single platform for entire application lifecycle
- Significant cost savings ($480/year)
- No vendor lock-in (standard Node.js/PostgreSQL)
- Simplified DevOps and deployment
- Built-in database for future features

### Negative
- Not specialized for static sites (vs Vercel/Netlify)
- Smaller community compared to major providers
- Less extensive edge network for global distribution

### Mitigation
- Use Cloudflare CDN if global performance becomes critical
- Railway's performance is sufficient for current target market (US traders)

## Implementation
```json
// railway.json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "restartPolicyType": "always"
  }
}
```

## Future Considerations
- Monitor performance as traffic grows
- Consider CDN integration if needed
- Evaluate multi-region deployment when scaling internationally

## References
- [Railway Documentation](https://docs.railway.app)
- [Railway vs Vercel Comparison](https://railway.app/compare/vercel)
- FlowEdge Deployment Analysis (internal memory)