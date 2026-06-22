# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable Resources Direction

- Use “Resources” instead of “Case Study” in shared navigation and expose the index at `/resources`.
- Keep exactly two resources on the Resources index: OpenAI Enterprise Academy Teardown and ClearVu-IQ. Do not add a second row of placeholder cards.
- Feature the OpenAI resource in a card that spans two grid columns, with its title and supporting copy on the left and its image on the right. Use a single-column secondary card for ClearVu-IQ.
- Keep each resource as a standalone editorial article linked from the Resources index.
- Tell the Academy case as an evidence chain: content crawl, inventory pattern, mapping to enterprise adoption stages, then conclusions and recommendations.
- Source the ClearVu-IQ case from Gabrielle's work samples and emphasize the role-by-workflow map, dual navigation, atomic modules, and measurable support-volume reduction.

## Durable Visual Direction

- Keep Home plus the Resources index and its two resource article routes. Do not restore an About page or link.
- Name the paired Home lifecycle/context and pressure-diagram section “The Bottleneck,” expose it at `#the-bottleneck`, and include that anchor in both desktop and mobile header navigation.
- Expose “Our Offerings” at `#our-offerings` and “How We Solve That” at `#how-we-solve-that`, and include both anchors in desktop and mobile header navigation.
- Keep Home section titles left-aligned, including the Our Offerings and How We Solve That headings.
- Label the desktop and mobile header booking actions “Let’s talk”; label every other booking action across Home and Resources “Book a free intro session.” Preserve Cal.com booking behavior everywhere.
- Keep the shared header brand as “Metiful” only; do not append “/ Content Velocity.”
- Use Mintlify's current marketing site as the visual benchmark across both pages: Inter-led typography, compact fixed navigation, immersive dark hero, centered messaging, pill controls, rounded product frames, pale-gray section bands, restrained borders, and generous white space.
- Preserve Metiful's orange text accent for labels, emphasis, active states, and small signals. Keep Metiful's content, routes, resource-article evidence, and Cal.com booking behavior.
- Home hero tagline: “We make customer education your growth drive.” Highlight “customer education” in orange.
- Keep the Home hero free of announcement banners and eyebrow text above the tagline.
- Replace the former Home “The Problem” section with “The Context.” Parse the customer-lifecycle screenshot into native, responsive text and data components; do not embed the screenshot itself.
- Keep every uppercase section subtitle small and left-aligned.
- In the Home context panel, use Option B’s concise explanatory line plus the lifecycle labels/icons; omit the survey question and percentages.
- Keep the Home context and problems panel titles restrained (roughly 28 px desktop / 27 px mobile) and the diagram labels clearly readable.
- Pair Context and Problems as adjacent light, rounded panels on desktop, stacking them on smaller screens. Keep exactly four native problem nodes: Manual Content Updates / Repurposing, Scattered Educational Assets, Resource Constraints, and Lack of Strategy.
- On Home, place “Our Offerings” before “The System,” and keep “Delivered as a service. Designed as an operating system.” as the final section before the footer.
- Keep the Home “Our Offerings” label and “Start with clarity. Build momentum when ready.” heading left-aligned.
- Keep exactly three service offerings: Content Clarity Audit ($1,500), SaaS Academy built from scratch ($10,000), and Ongoing Monthly Partnership ($2,000/month).
- Feature Service 02 as the dominant, largest offering card.
- In the Home System stage selector, use three pencil-scribble zones: a small Service 01 circle around stage 01, one large Service 02 circle around stages 02–04, and a small Service 03 circle around stage 05. Label them only “Service 01,” “Service 02,” and “Service 03”—never prefix the labels with circle numbers.
- Home System section label: “HOW WE SOLVE THAT”. Heading: “Human strategizing, AI scaling, Human gating”.
- Treat Option B (“Pressure Box”) from `Lifecycle Sections.html` as the source of truth for the Home Context and Problems redesign: pair a lifecycle orbit panel with a four-force pressure diagram in adjacent rounded cards, using Metiful orange instead of the concept’s green.
- In the Home lifecycle orbit, distribute all seven stage icons at equal angular intervals on one shared radius, keep the tracer animation linear, and use clearly readable labels (about 14 px desktop / 13 px mobile).
