# ADR-003: Frontend Framework - Next.js Migration Strategy

## Status
Accepted

## Date
2025-01-09

## Context
FlowEdge website currently consists of a single HTML file with inline CSS and JavaScript. As we plan to add features like a trading journal, user authentication, and real-time dashboards, we need a modern frontend framework.

### Current State
- Single `index.html` file (13KB)
- Inline styles and scripts
- No build process
- No component structure
- Large unoptimized logo (867KB)

### Future Requirements
- SEO optimization for content marketing
- Server-side rendering for performance
- User authentication system
- Trading journal with database integration
- Real-time data updates
- API routes for backend communication
- Professional component library

## Decision
We will migrate to **Next.js 14+** with App Router using a phased approach.

## Rationale

### Framework Comparison

| Feature | Next.js | Remix | SvelteKit | Vue/Nuxt | Plain React |
|---------|---------|-------|-----------|----------|-------------|
| SEO | ✅ Excellent | ✅ Excellent | ✅ Good | ✅ Good | ❌ Poor |
| Performance | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Good | ⚠️ Depends |
| Railway Support | ✅ Perfect | ✅ Good | ✅ Good | ✅ Good | ✅ Good |
| Ecosystem | ✅ Huge | ⚠️ Growing | ⚠️ Small | ✅ Large | ✅ Huge |
| Learning Curve | ✅ Moderate | ⚠️ Steep | ✅ Easy | ✅ Moderate | ✅ Easy |
| Full-Stack | ✅ Yes | ✅ Yes | ✅ Yes | ⚠️ Limited | ❌ No |

### Why Next.js Wins

1. **SEO Critical**: Trading content needs search visibility
2. **Railway Optimized**: First-class support on our chosen platform
3. **Full-Stack Ready**: API routes for email collection, trading journal
4. **Performance**: Automatic optimizations (images, fonts, scripts)
5. **Ecosystem**: Largest React ecosystem, most components available
6. **Future-Proof**: App Router is the modern standard

## Migration Strategy

### Phase 1: Foundation (Week 1)
```bash
npx create-next-app@latest flowedge-site --typescript --tailwind --app
npm install @radix-ui/react-* framer-motion
```

- Set up Next.js with TypeScript
- Install Tailwind CSS and shadcn/ui
- Migrate current HTML to Next.js page
- Optimize logo (867KB → <50KB)
- Deploy to Railway

### Phase 2: Enhancement (Week 2-3)
- Add email collection API route
- Integrate with email service (Resend/SendGrid)
- Add analytics (Vercel Analytics or Plausible)
- Implement SEO optimizations
- Add meta tags and Open Graph

### Phase 3: Features (Month 2)
- Blog/insights section for content marketing
- Improved animations with Framer Motion
- Dark mode support
- Performance monitoring

### Phase 4: Trading Platform (Month 3+)
- User authentication (Clerk or NextAuth)
- Trading journal pages
- Dashboard with charts (Recharts/Tremor)
- Real-time updates (Server-Sent Events)
- PostgreSQL integration

## Implementation Details

### Tech Stack
```json
{
  "framework": "Next.js 14+",
  "styling": "Tailwind CSS",
  "components": "shadcn/ui",
  "animations": "Framer Motion",
  "forms": "React Hook Form + Zod",
  "api": "Next.js API Routes",
  "database": "PostgreSQL (Railway)",
  "auth": "Clerk or NextAuth",
  "analytics": "Plausible",
  "deployment": "Railway"
}
```

### Project Structure
```
flowedge-site/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx            # Landing page
│   ├── journal/
│   │   ├── page.tsx        # Journal dashboard
│   │   └── [id]/page.tsx   # Trade details
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/page.tsx # Blog post
│   └── api/
│       ├── subscribe/      # Email collection
│       └── trades/         # Trading journal API
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/            # Header, Footer
│   └── features/          # Feature components
├── lib/
│   ├── db.ts              # Database client
│   └── utils.ts           # Utilities
└── public/                # Static assets
```

## Consequences

### Positive
- Modern, maintainable codebase
- Excellent SEO capabilities
- Full-stack features in one framework
- Automatic performance optimizations
- Large ecosystem of components
- Great developer experience

### Negative
- Learning curve for Next.js specifics
- More complex than static HTML
- Requires build process
- Larger deployment size

### Mitigation
- Start with minimal features, add complexity gradually
- Use shadcn/ui for rapid UI development
- Leverage Next.js documentation and community
- Keep Phase 1 simple and focused

## Success Metrics
- Lighthouse score > 90
- Page load time < 2 seconds
- SEO improvements measurable in 30 days
- Email signup conversion > 5%
- Zero downtime migration

## Alternative Considered
**Keep HTML + Add JavaScript Framework Gradually**
- Rejected: Technical debt would accumulate
- Rejected: No SEO benefits
- Rejected: Harder to maintain two systems

## References
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js on Railway](https://docs.railway.app/guides/nextjs)
- [shadcn/ui Components](https://ui.shadcn.com)
- FlowEdge Site Improvement Plan (internal memory)