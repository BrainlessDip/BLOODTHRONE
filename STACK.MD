PROJECT NAME: BLOODTHRONE

Build a Game of Thrones-inspired personal developer portfolio using the following tech stack:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui for accessible UI primitives
- GSAP for cinematic animations and scroll-triggered effects
- Lucide React for icons

PROJECT IDENTITY
- Name: BLOODTHRONE
- Theme: Dark medieval fantasy, inspired by Game of Thrones
- Primary colors: Pure black (#000000), charcoal (#101010), blood red (#8B0000), and aged ivory (#E5DDCF).
- Absolutely NO gradients, neon, glassmorphism, or generic SaaS styling.
- Visual direction: Brutal, cinematic, mysterious, elegant, and immersive.

DESIGN AND IMPLEMENTATION RULES
- Use TypeScript throughout the project. Avoid `any` and prefer reusable, strongly typed components.
- Use shadcn/ui for appropriate accessible primitives, but customize their appearance to fit the medieval theme.
- Use GSAP for complex animations, timeline sequences, section reveals, sword slashes, and ScrollTrigger effects.
- Register and clean up GSAP animations correctly in React components to prevent duplicate animations and memory leaks.
- Keep animations performant and responsive.
- Respect `prefers-reduced-motion`.
- Do not use gradients anywhere in the UI.
- Keep the site fully responsive across desktop, tablet, and mobile.
- Use reusable components and a maintainable folder structure.
- Prioritize accessibility, performance, and real functionality over decorative effects.
- Do not add unnecessary dependencies or build fake interactions.

CORE EXPERIENCE
- A bloodied sword cursor on desktop.
- A "Sentence of Death" animation that slices clicked navigation text in half.
- A cinematic opening sequence featuring a custom royal sigil.
- An immersive hero section introducing the developer.
- The Great Hall for the About section.
- The Armory for skills and technologies.
- The War Table for projects and conquests.
- The Raven's Archive for experience and milestones.
- The Iron Throne for contact information.
- Optional hidden secrets, royal archives, and developer easter eggs.

ANIMATION DIRECTION
- Use GSAP timelines to coordinate cinematic sequences.
- Use ScrollTrigger for controlled section reveals and the developer's chronicle.
- Create custom sword-slash animations with layered text, a blade movement, and restrained blood effects.
- Use CSS transforms and opacity for lightweight transitions.
- Avoid animating every element or delaying navigation unnecessarily.
- Disable or simplify nonessential animations on touch devices and for reduced-motion users.

SHADCN/UI GUIDELINES
- Use shadcn/ui for dialogs, tooltips, accessible menus, and other suitable primitives.
- Restyle components using Tailwind CSS to match the blood-red and black medieval aesthetic.
- Avoid default rounded cards, pill buttons, bright accent colors, and conventional dashboard layouts.
- Prefer sharp edges, steel borders, restrained ornamental details, and medieval typography.

SUGGESTED PROJECT STRUCTURE
- app/
  - layout.tsx
  - page.tsx
  - globals.css
- components/
  - layout/
  - sections/
  - animations/
  - ui/
- hooks/
- lib/
- data/
- public/
  - images/
  - textures/
  - sigils/
  - cursors/

FINAL GOAL
Create a distinctive, production-quality portfolio that feels like entering a dangerous medieval kingdom. BLOODTHRONE should showcase the developer's real skills, projects, and experience through an immersive narrative rather than a conventional portfolio template.

DESIGN MOTTO:
"EVERY LINK HAS A PRICE. EVERY PROJECT IS A CONQUEST. EVERY CLICK DELIVERS A SENTENCE OF DEATH."