# UI refinement plan — mrargaming.com

Audited 8 September 2026. Live version: `45d8f75`; verified production bundle `main.ac460fc2.js`.

The next improvement should make the site feel more deliberately composed: a strong image, a clear idea, and an obvious next action. The theme and project identities already work. The largest opportunities are excess vertical spacing, repeated introductions, and interface elements taking attention away from the work.

This document is the implementation plan. Website code and the live deployment were not changed during this audit.

## What was reviewed

- The live homepage from hero to contact, including all six project cards.
- All six case-study introductions at desktop and phone widths; game systems, modeling collections, the environment technical section, and case-study endings.
- Standard and phone galleries, full-screen viewing, a zoom interaction, a system breakdown, the docked mobile menu, and the resume panel.
- Main review sizes: 1440 × 1000 and 412 × 915. Additional checks: 768 × 1024, 915 × 412, and 320 × 800.
- Source inspection to identify the cause of observed layout issues and make the plan implementable.

These were responsive Chromium browser checks. Physical Galaxy S24+, Samsung Internet, Safari, and Firefox testing remains part of implementation validation. Pixel measurements below describe the audited viewport and may vary with fonts, width, and hover state. The usability judgments are design findings, not results from visitor testing.

## Keep the successful parts

Preserve the dark surfaces, responsive accent themes, strong type, shared right-aligned “View case study” action, phone presentation, alternating modeling layouts, and cinematic environment imagery. Preserve the working full-screen image fit, explicit zoom, keyboard dismissal, return position, and mobile menu portal.

The homepage hero video remains on hold, as requested. This plan changes no video assets. Changes proposed for the Path of Embers trailer concern its surrounding layout and labels.

Keep the mobile performance safeguards: static touch previews, responsive images, paused offscreen work, cached scroll measurements, and no root-level render on each scroll event.

## Findings and implementation decisions

### 1. Establish one spacing system — first priority

**Observed:** the last game card and the next category heading are about 209px apart on desktop; the next transition is about 218px. On the 412px phone layout, those gaps are approximately 163px and 174px. The final project and contact panel are approximately 198px apart on mobile.

The spacing adds several separate allowances together: outgoing section padding, inter-section margin, and incoming section padding. There is also a concrete style collision: the homepage uses `class="work-section modeling-section"`, while a later `.modeling-section` rule applies case-study padding. This is why that category has a different rhythm.

**Implement:**

- Give homepage sections their own scoped spacing rules and remove the overlapping use of `.modeling-section`.
- Set a single total gap between categories. Start with 96–120px on desktop and 56–72px on phone, measured from the preceding card to the next heading.
- Use approximately 28–36px from a category heading to its cards on desktop and 20–24px on phone.
- Keep one quiet separator between categories. Avoid adding padding independently on both sides of it.
- Use content-dependent case-study spacing: roughly 56–72px around substantial sections and 32–48px around short sections on phone. Short text must not inherit the same vertical treatment as a full gallery.

**Done when:** every category transition feels intentional at all reviewed widths; no stray class overrides affect homepage spacing; headings remain clear below the sticky navigation.

[Evidence: desktop section gap](./02-section-gap-desktop.png)

### 2. Bring card content and actions closer together — first priority

**Observed:** Path of Embers has about 138px between its contribution block and footer on desktop; Cozmo has about 129px. On phone, the featured card is about 945px high, including a 486px media stage. At 320 × 800, its title has not appeared by the bottom of the initial Games view.

**Implement:**

- Keep the shared information order and right-aligned CTA.
- Treat the descriptive content as one group. Target 24–40px between contribution and footer. Let necessary whitespace surround the group instead of separating related information.
- Reduce the featured desktop card toward 510–540px where its content fits, scaling the phone proportionally. Preserve room for wrapped text at intermediate widths.
- On phones, start with a featured media stage around 340–380px, including a proportionally smaller device. Keep media first, matching the other cards, while exposing the project name and synopsis sooner.
- Preserve equal footer alignment in the two standard game cards. Do not shorten their text with ellipses.
- Keep artwork crops specific to each project. The robot, dagger, or gameplay subject should remain easy to find; avoid letting decorative surroundings dominate a small preview.

**Done when:** Path of Embers retains its featured identity, the CTA reads as part of its description, and the name is visible in the initial Games view at 320 × 800 and 412 × 915.

[Desktop card](./01-featured-desktop.png) · [Phone card](./08-featured-mobile.png)

### 3. Fix case-study metadata and oversized introductions — first priority

**Observed:** a shared four-column grid displays only three fields for modeling projects and two for the environment. This leaves one-quarter or half the desktop bar empty. On phone, modeling metadata becomes three tall rows. Some case-study heroes also preserve a large minimum height despite short content; Slingshot has a conspicuous gap above its title on phone and tablet.

**Implement:**

- Use a shared metadata component with layouts based on the fields actually present: four, three, or two equal columns on desktop.
- Use compact phone layouts that wrap gracefully and give an unmatched final field a deliberate full-width row.
- Replace fixed mobile hero height with content-driven sizing and controlled padding.
- Keep bold project titles, while reducing repeated section headings to approximately 30–36px on phone. Reserve the largest type for the project identity.
- Review each case-study cover crop at desktop, tablet, and phone widths. Preserve the subject and text contrast.
- Remove redundant tool tags already stated in metadata; retain informative genre or subject tags.

**Done when:** there are no empty metadata cells, roles remain readable, and each introduction earns its height through visible content or useful imagery.

[Evidence: modeling metadata and introduction](./03-modeling-intro-desktop.png)

### 4. Reshape case studies around what visitors learn — second pass

**Observed:** Cozmo’s desktop “About the work” section is about 428px tall for a sentence that largely repeats its introduction. Rainbow Dagger and the environment have the same repetition. Path of Embers starts with a text-only introduction, then a separate portrait trailer section; the phone trailer section alone is approximately 1,114px tall. Its large heading and recording-format graphic delay the play button.

**Implement:**

- Fold the short modeling and environment descriptions into their introductions. Remove the redundant About/Story navigation entries when there is no independent section to visit.
- For Path of Embers, compose the overview and existing playable portrait preview together on desktop. On phone, use a compact introduction followed by the playable preview.
- Use a shorter trailer heading such as “Gameplay”. Place “Captured on mobile” below the preview as a small caption; remove the prominent aspect-ratio diagram and recording resolution from the main reading flow.
- Keep the portrait image fully proportioned. Retain click-to-play and the external YouTube link.
- Preserve substantive game explanations, but split long paragraphs into concise sections about the player experience and Ariel’s contribution. Use only existing supported facts.
- For the environment, present the Nanite image and explanation once. Keep the dedicated technical section with its enlarge action and remove the duplicate technical gallery collection.

**Done when:** each section adds information, useful media appears earlier, and navigation entries correspond to distinct content. No new claims about ownership, results, or performance are introduced.

[Desktop portrait section](./05-portrait-trailer-desktop.png) · [Phone trailer section](./07-trailer-mobile.png)

### 5. Make systems and galleries easier to browse — second pass

**Observed:** Ricochet’s six system summaries occupy about 1,834px on phone; Path of Embers’ systems section is about 1,952px. Icons, titles, descriptions, and repeated actions are spaced as large independent blocks. In mobile galleries, the heading, collection tabs, repeated collection label, stage padding, and controls can take more space than the image itself. The phone gallery requires scrolling to see the whole screen and its previous/next controls together.

**Implement:**

- Keep the desktop system grid. Use compact phone rows with the icon beside the title, a short description beneath, and one clear disclosure cue.
- Start with 140–170px per phone system row, allowing longer text to grow. Keep every existing breakdown available.
- Preserve the detailed system dialogs and their focus/Back behavior; the main change is how visitors discover them.
- Consolidate gallery collection name, count, and navigation instead of repeating them in separate bars. Keep collection tabs when they represent real content choices.
- Remove the fixed 300px landscape-stage floor on small phones where the fitted image needs less height. Maintain a stable frame for each collection to prevent jumps between images.
- Reduce mobile stage padding while retaining `object-fit: contain` and the complete image.
- Size the inline phone gallery against the available viewport so the full device and previous/next actions can be seen together after the gallery stage reaches the sticky header.
- Keep its thumbnail index compact. Use a thin accent selection border and an obvious horizontal-scroll affordance on phone.
- Standardize image actions: “Expand image” in the page; “Zoom in” and “Fit image” in the viewer. Currently “Inspect details” can mean opening the viewer or zooming inside it.
- Add brief, project-specific captions where the existing data supports them, connecting the image to the feature being demonstrated.

**Done when:** visitors can scan multiple systems without a long repeated stack; gallery controls stay discoverable; images remain uncropped; changing collections does not produce avoidable layout jumps.

[Evidence: mobile phone gallery](./06-phone-gallery-mobile.png)

### 6. Clarify navigation and provide a next step — second pass

**Observed:** category pills resemble filters, but all categories remain on the page. The environment’s “Story” navigation item leads to an “Overview” heading. The generic “Case study” toolbar label does little to maintain context. Case studies end after a gallery, credits, or technical block with no nearby next-project action. The sticky Back button works, but it is the only continuation route.

**Implement:**

- Preserve continuous browsing. Add a small “Jump to” label to the undocked category navigation, and use in-page link semantics with the existing controlled scroll behavior.
- Keep stable category names between mobile and desktop; prefer “Models” and “Scenes” as intentional short labels, with full accessible names.
- Align section labels with their destinations. Keep the active section visible in the horizontal case-study rail.
- Replace the generic toolbar label with the current project name where space permits. Preserve the prominent Back action and current compact landscape behavior.
- Add a shared case-study ending: one small next-project preview with “Next project: [name]”, plus a secondary “Back to all work” action.
- Follow the homepage order through all six projects; finish the last project with a contact invitation and return-to-work action.
- Scope next-project behavior carefully: switch the case study to its top, update title/history, preserve the original portfolio return context, and close child overlays before switching.
- Use internal arrows consistently; reserve the external-link arrow for destinations that open elsewhere.

**Done when:** the visitor understands whether an action jumps, switches a project, expands media, or leaves the website. Browser Back, keyboard focus, and portfolio return position remain correct.

[Evidence: case-study ending](./04-case-study-ending.png)

### 7. Give the contact section a cleaner finish — third pass

**Observed:** the phone contact panel is approximately 783px tall after a 198px gap. It repeats the introductory message and gives GitHub and the resume two additional full-width rows beneath LinkedIn.

**Implement:**

- Bring the panel closer to the final project using the shared spacing scale.
- Use a shorter heading, for example “Let’s build together.” Follow it with one specific sentence about game programming, technical art, and project opportunities.
- Keep LinkedIn as the primary contact action already configured on the site. Present GitHub and the resume as secondary links in a compact row that wraps with adequate touch targets.
- Bring the copyright and Back to top control closer to the actions. Start with a 520–620px phone panel, letting text size and wrapping determine its final height.
- Refine category descriptions to make the work concrete. For example, Games could read: “Mobile roguelikes, arcade competition, and gravity-driven racing.”

**Done when:** the ending provides a clear invitation and useful actions without feeling like a second hero section.

[Evidence: mobile contact panel](./09-contact-mobile.png)

### 8. Add expression through hierarchy and restrained motion — third pass

- Use the existing artwork and accent color to distinguish projects. Let a strong image lead into a concise explanation of what makes the work interesting.
- Retain the shared card structure while allowing the phone, modeling compositions, and environment to retain different silhouettes.
- On fine-pointer desktop devices, limit card emphasis to a subtle border/accent response and, if useful, a small arrow movement. Avoid competing lift, glow, image scale, and text effects on the same interaction.
- Keep section entrances brief and one-time. Use existing observers; do not replay entrances on fast scroll reversals.
- On touch and reduced-motion layouts, preserve the static previews. Hide the slideshow counter/progress decoration when the preview is static: “01 / 03” currently suggests a carousel the visitor can browse, while tapping opens a case study.
- Use clear still-image captions on static cards. Keep whole-card activation, without adding nested controls simply to make a preview indicator actionable.
- Keep body text around 15–17px on phone and important supporting labels around 12–13px where space permits. Preserve at least 44px interactive targets.

**Done when:** the work is expressive through composition and meaning, and rapid scrolling does not trigger more animation, decoding, or layout work.

## Delivery order

| Pass | Scope | Review checkpoint |
| --- | --- | --- |
| 1 — Layout foundation | Scoped spacing, metadata columns, card proportions, responsive introductions | Compare the same desktop and phone screenshots before/after; review all six cards and hero layouts |
| 2 — Reading and navigation | Remove repeated sections, integrate the featured trailer, compact systems/galleries, add case-study endings | Walk homepage → project → system/gallery → next project → Back on desktop and phone |
| 3 — Final expression | Captions, copy, contact, static-preview indicators, restrained interaction polish | Review every accent theme, keyboard use, reduced motion, and rapid scrolling |

Use separate commits for these passes. Review locally before publishing a cohesive update through GitHub/Vercel. The plan does not require new libraries, new video assets, or a redesign of the working image viewers.

## Implementation map

| Area | Files to work in |
| --- | --- |
| Homepage section spacing and contact | `src/App.js`, `src/style.css` |
| Featured proportions and shared details | `src/components/cards/FeaturedProjectCard.css`, `FeaturedProjectCard.jsx`, `ProjectCardDetails.css` |
| Static preview indicators and captions | `src/components/cards/ProjectPreviewMedia.jsx`, `src/data/projects.js` |
| Shared metadata and streamlined case studies | `src/components/project/ProjectDetail.jsx`, `ModelingDetail.jsx`, `SceneDetail.jsx`; add a shared metadata component |
| Galleries and media layout | `src/components/project/ProjectGallery.jsx`, `PhoneShowcaseGallery.jsx`, `VideoPreview.jsx`, `src/style.css` |
| Consistent viewer labels | `src/components/modals/PhoneImageModal.jsx`, `ImageModal.jsx` |
| Jump navigation and next project | `src/components/layout/CategoryNav.jsx`, `src/components/project/CaseStudyNav.jsx`, `ProjectDetail.jsx`, `src/App.js`; add a shared case-study ending |
| Performance safeguards | Preserve `src/performance.css`, `src/utils/scrollTracking.js`, `src/hooks/usePortfolioScroll.js`, and `src/components/layout/ScrollProgress.jsx` |

Consolidate obsolete rules in the specific areas being changed. Avoid adding another layer of competing responsive overrides, and avoid an unrelated rewrite of the entire stylesheet.

## Validation and release criteria

1. Compare all six cards and introductions at 320, 390/412, 768, 1024, and 1440px widths, plus a short landscape viewport. Check for clipped text, horizontal overflow, inconsistent action alignment, and obstructed anchor headings.
2. Verify full descriptions, subject-aware image crops, complete fitted gallery images, visible image controls, and readable text at enlarged browser text/zoom settings.
3. Walk the docked mobile menu, category jumps, each case study, next-project navigation, galleries, zoom, system dialogs, resume panel, browser Back/Forward, and direct project URLs. Check keyboard focus restoration and reduced-motion behavior.
4. Run the existing regression suite, including the no-app-render-on-scroll and static-preview tests, and the production build. Add behavior tests for next-project/history changes; verify visual spacing through screenshots rather than brittle pixel tests.
5. Compare rapid-scroll traces before and after using the same route and device conditions. Preserve zero card re-renders from ordinary page scrolling and no touch-preview timers/preloading. Investigate any new layout/paint spikes or long tasks.
6. Validate the final pass on a physical Galaxy S24+ in the browser used for the original lag report, plus Samsung Internet/Chrome as available; also check iOS Safari and desktop Firefox before claiming broad browser coverage. Responsive Chromium checks alone do not establish phone smoothness.
7. After publishing, verify the live bundle matches the release and repeat the main navigation and mobile card checks.

The intended result is a portfolio where each scroll reveals meaningful work sooner, each section has a clear purpose, and the next action is easy to understand.
