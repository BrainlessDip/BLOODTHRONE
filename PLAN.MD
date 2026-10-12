PROJECT: A GAME OF THRONES-INSPIRED PORTFOLIO WEBSITE

CORE CONCEPT
- Build a dark, medieval fantasy portfolio inspired by Game of Thrones.
- The website should feel like entering a dangerous kingdom where every interaction has consequences.
- The experience should be immersive, intimidating, cinematic, and memorable rather than a typical developer portfolio.
- Use blood red, near-black, charcoal, and muted steel colors.
- Absolutely NO gradients, neon colors, glassmorphism, or generic modern SaaS aesthetics.
- Every animation and visual element must support the medieval atmosphere without making the website difficult to use.

1. VISUAL IDENTITY
- Primary background: pure black (#000000) and deep charcoal (#101010).
- Blood-red accent: dark crimson (#8B0000).
- Brighter blood-red accent for important interactions: (#B5121B).
- Text: aged ivory (#E5DDCF), muted grey, and dark steel.
- Use medieval serif typography for headings and a clean, readable font for body text.
- Add subtle distressed textures, scratches, worn parchment, weathered metal, and faint blood stains.
- Use thin steel borders, sharp corners, and medieval ornamental separators.
- Avoid rounded cards, pill buttons, and overly polished UI.
- No gradients anywhere, including backgrounds, buttons, borders, or text.

2. CURSOR: THE BLOODIED SWORD
- Replace the default cursor with a custom sword cursor.
- The sword should look like a medieval steel blade with blood along its edge.
- Use a custom transparent cursor asset or an SVG where practical.
- The sword should rotate or tilt slightly based on pointer movement.
- Add a subtle blood trail when moving the cursor, but keep it lightweight.
- On hover over interactive elements, the sword should briefly change angle as if preparing to strike.
- On click, play a short sword-slash animation with a tiny blood-splatter effect.
- Respect reduced-motion settings and provide a usable fallback cursor on touch devices.
- Keep the cursor responsive and avoid blocking pointer interactions.

3. SENTENCE OF DEATH: LINK EXECUTION
- Every important navigation link should feel like a target sentenced to death.
- When a user clicks a link, animate the text being sliced horizontally in half by a sword.
- Split the text into upper and lower layers, offsetting them in opposite directions.
- Add a brief steel slash, a thin crimson cut line, and a restrained blood effect.
- After the execution animation, transition to the selected page or section.
- The animation should be fast, dramatic, and satisfyingly precise.
- Use the phrase "SENTENCE OF DEATH" for this interaction system.
- Do not delay navigation excessively; keep the entire interaction short.
- Avoid making every tiny control trigger a dramatic execution.
- Provide keyboard-accessible navigation and an animation-free alternative.

4. HERO SECTION: ENTER THE KINGDOM
- Full-screen opening scene with an almost entirely black background.
- Display a personal sigil or custom coat of arms in the center.
- Introduce my name with a slow, cinematic reveal.
- Main heading ideas:
  "I BUILD. I BREAK. I REBUILD."
  "A MIND FOR CODE. A KINGDOM OF MY OWN."
  "NOT BORN TO FOLLOW. BUILT TO CREATE."
- Subtitle: a short introduction describing me as a developer and builder.
- Add a small "PRIVATE REALM" or "THE DEVELOPER'S KINGDOM" label.
- Include two main actions:
  "ENTER THE KINGDOM" to explore the portfolio.
  "VIEW MY CONQUESTS" to explore projects.
- Add a subtle, low-contrast hint inviting users to scroll.
- Keep the first screen clean, dramatic, and free from unnecessary UI.
- No autoplay audio.

5. THE ROYAL SIGIL
- Create an original personal coat of arms representing my identity.
- Combine a sword, raven, crown, dragon-inspired silhouette, or crossed blades.
- Keep the design monochromatic with blood-red details.
- Use it as the central visual identity throughout the website.
- Animate the sigil on initial load with a subtle metallic reveal.
- The sigil can also serve as a loading indicator, favicon, and section marker.
- Avoid copying the exact Game of Thrones logo, house sigils, or copyrighted artwork.
- Create an original identity that captures the same dark medieval atmosphere.

6. THE GREAT HALL: ABOUT ME
- Present the About section as entering a royal hall.
- Use a dark stone background with faint architectural details.
- Display my introduction as a royal proclamation.
- Example heading: "THE ONE WHO WIELDS THE KEYBOARD."
- Present my skills as weapons in an armory rather than ordinary skill cards.
- Each skill can have an icon, proficiency indicator, and a short description.
- Reveal information progressively as the user scrolls.
- Use ornamental dividers inspired by medieval manuscripts.
- Include a short personal philosophy or developer oath.

7. THE ARMORY: SKILLS AND TECHNOLOGIES
- Display programming languages and technologies as medieval weapons.
- Examples:
  JavaScript: The King's Blade
  Python: The Raven's Eye
  React: The Architect's Shield
  FastAPI: The Iron Gate
  Node.js: The Warhorse
  SQL: The Royal Archives
- Give each technology a custom monochromatic icon or a restrained steel illustration.
- Use a horizontal armory layout or a weapon-rack-inspired grid.
- On hover, reveal the technology's name, experience, and what I build with it.
- Keep the layout readable and ensure skill levels represent actual experience.
- Do not use fake percentage-based proficiency scores.

8. THE WAR TABLE: PROJECTS
- Present projects as campaigns, conquests, or territories under my banner.
- Each project should have:
  Project name
  Custom emblem
  Short description
  Technologies used
  Current status
  Live demo link
  Source code link
- Use a dark war-table aesthetic with maps, engraved borders, and red location markers.
- Hovering over a project reveals its details like a commander inspecting a territory.
- Clicking a project opens a dedicated detail view or modal.
- Project transitions should feel like opening an ancient war dossier.
- Use "CONQUESTS", "CAMPAIGNS", or "THE KINGDOM'S LEGACY" as section titles.
- Keep real project information more prominent than decorative effects.

9. THE RAVEN'S ARCHIVE: EXPERIENCE AND HISTORY
- Present my developer journey as a historical chronicle.
- Use a vertical timeline resembling a royal record or ancient manuscript.
- Each milestone should include its date, achievement, project, or experience.
- Animate a raven or a moving red marker as the user progresses through the timeline.
- Use headings such as:
  "THE CHRONICLES"
  "A HISTORY WRITTEN IN CODE"
  "THE ROAD TO THE THRONE"
- Avoid inventing employment, clients, awards, or accomplishments.

10. THE IRON THRONE: CONTACT SECTION
- Make the final section feel like reaching the throne room.
- Place a custom iron throne illustration or silhouette against a black background.
- Heading: "THE THRONE AWAITS."
- Supporting line: "Every great alliance begins with a conversation."
- Show email, GitHub, social profiles, and other actual contact methods.
- Treat each link as an interaction with the Sentence of Death animation.
- Add a direct contact action such as "SEND A RAVEN".
- The email action should open a valid email link or a working contact form.
- Finish with a short, memorable closing line.

11. LOADING SCREEN: THE KINGDOM AWAKENS
- Create a brief opening sequence on the initial visit.
- Start with a black screen and a subtle steel soundless visual.
- Reveal the personal sigil.
- Show a short line such as:
  "THE REALM IS AWAKE."
  "ALL HAIL THE BUILDER."
  "THE GATES ARE OPENING."
- Transition into the hero section with a controlled reveal.
- Keep the initial animation short and skip it on subsequent navigation.
- Avoid forcing visitors to watch a long intro before seeing the portfolio.
- Support reduced-motion preferences.

12. TRANSITIONS: STEEL AND BLOOD
- Use custom transitions between major sections.
- Possible effects:
  A sword slash wipes across the screen.
  A crimson cut briefly divides the page.
  An iron gate opens to reveal a new section.
  A parchment dossier unfolds to reveal project details.
- Keep transitions consistent and use them sparingly.
- Never animate every component independently without a clear purpose.
- Maintain fast page navigation and avoid unnecessary delays.

13. BACKGROUND ATMOSPHERE
- Use subtle, static or gently animated environmental details:
  Faint scratches on black steel.
  Occasional drifting ash.
  Tiny embers against dark stone.
  A barely visible raven silhouette.
  Weathered parchment in selected sections.
- Blood splatter should appear only during meaningful interactions.
- Avoid constant particles, excessive motion, or visual clutter.
- Do not use gradients to simulate lighting or depth.
- Create depth through solid color layers, borders, texture, shadows, and illustration.

14. THE DEATH LEDGER: INTERACTION FEEDBACK
- Use medieval terminology for selected interface states.
- Examples:
  Loading: "THE RAVENS ARE CARRYING WORDS..."
  Opening a project: "UNSEALING THE ROYAL ARCHIVE..."
  Sending a message: "THE RAVEN HAS BEEN DISPATCHED."
  Successful submission: "YOUR MESSAGE HAS REACHED THE KINGDOM."
  Missing information: "THE RECORD IS INCOMPLETE."
  Broken link: "THIS PATH LEADS NOWHERE."
- Keep important errors understandable.
- Use thematic wording for flavor, but always explain the actual issue clearly.

15. THE DEVELOPER'S OATH
- Add a short manifesto or personal statement presented like an oath.
- Example:
  "I do not build to fill the realm with noise.
   I build to solve problems, challenge limits,
   and leave something worth remembering."
- Reveal the text line by line or through a restrained typewriter effect.
- Make the wording personal and authentic rather than generic fantasy dialogue.

16. HIDDEN SECRETS AND EASTER EGGS
- Clicking the personal sigil several times could reveal a hidden royal archive.
- Add a secret command or keyboard shortcut that unlocks a developer dossier.
- Include a hidden page with experimental projects or a playful developer message.
- Make certain ornamental symbols reveal additional details on interaction.
- Add a secret "KINGSLAYER" achievement for discovering a hidden feature.
- Keep all hidden content accessible through an alternative route where appropriate.
- Do not hide essential portfolio information behind easter eggs.

17. SOUND DESIGN
- Keep sound disabled by default.
- If sound is added, use subtle, optional effects:
  A short sword unsheathing.
  A muted metallic strike.
  A distant raven call.
  A soft iron-gate movement.
- Include a visible sound toggle.
- Never autoplay music or loud effects.
- Ensure the experience remains complete when sound is disabled.

18. RESPONSIVE DESIGN
- Design mobile layouts as a first-class experience.
- Replace the sword cursor with normal touch interaction on mobile.
- Adapt the war table into a clean project list or stacked dossier layout.
- Simplify particle effects and large transitions on lower-powered devices.
- Ensure headings never overflow and navigation remains usable.
- Keep buttons and links large enough for touch.
- Test on mobile, tablet, and desktop.

19. PERFORMANCE AND ACCESSIBILITY
- Use lightweight CSS animations wherever possible.
- Avoid heavy video backgrounds and unnecessary animation libraries.
- Use semantic HTML, proper heading hierarchy, and keyboard navigation.
- Maintain readable contrast between blood-red accents and dark backgrounds.
- Respect prefers-reduced-motion.
- Ensure text slicing is not the only feedback for navigation.
- Keep all links accessible to screen readers.
- Never make decorative effects block clicks or scrolling.
- Avoid layout shifts during hover and transition animations.

20. FINAL EXPERIENCE
- The website should feel like a dark fantasy kingdom, not a generic developer portfolio with red buttons.
- Every major section should have a distinct medieval identity.
- Use blood red as an accent, not as a background for everything.
- Prioritize typography, composition, atmosphere, and meaningful interactions.
- No gradients, no neon, no glassmorphism, no generic dashboard cards.
- The overall mood should be brutal, elegant, mysterious, and cinematic.

FINAL DESIGN PRINCIPLE:
"EVERY LINK HAS A PRICE. EVERY PROJECT IS A CONQUEST.
EVERY CLICK DELIVERS A SENTENCE OF DEATH."