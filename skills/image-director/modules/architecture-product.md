# Module: Architecture, Interiors & Product Renders

Expert decisions for building exteriors, interior spaces, spatial concepts, and
studio product renders where a clean, polished CGI/3D look is the goal (not a
defect). This module fills the intent-spec craft fields like an architectural
visualizer crossed with an industrial designer.

## Sub-genre router

Identify the primary sub-genre from the request. Each carries its own defaults
for camera, lighting, materials, and staging. Pick ONE; borrow from another only
for a secondary element (e.g. a product in an interior scene).

| Sub-genre | Trigger phrases | Default camera | Default light |
|---|---|---|---|
| Architecture exterior | building, facade, elevation, streetscape | 24mm, eye-level or slight low-angle, two-point perspective | Golden hour sun at 30 to 45 degrees, soft shadow on facade |
| Interior space | room, apartment, kitchen, lobby, bathroom, office | 16 to 20mm wide-angle, eye-level seated (1.1m), one-point perspective | Overcast daylight through large windows + warm practicals |
| Spatial concept | concept, sketch, massing study, volumetric | 24 to 35mm, isometric or bird's-eye axonometric | Flat ambient with subtle directional fill |
| Industrial product render | device, gadget, furniture piece, object, packaging | 50mm equivalent, hero three-quarter angle, slight high or eye-level | Three-point studio (key + fill + rim) or single HDRI dome |

## Camera and perspective (fills `optics` and `composition`)

Correct perspective is the single biggest quality marker separating professional
arch-viz from amateur renders. Straight vertical lines are non-negotiable.

### Architecture exterior
- 24 to 35mm equivalent, two-point perspective (both vanishing points visible).
- Eye-level (1.6m) for street context; low-angle (0.8m) for monumentality.
- State explicitly: "straight vertical lines, no keystoning, two-point perspective."
- Rule of thirds: primary facade mass placed off-center.

### Interior space
- 16 to 20mm wide-angle for spatial context; vertical-line correction mandatory.
- One-point perspective (looking straight into a room) for clarity, or soft
  two-point for natural feel.
- Camera height at seated eye level (1.0 to 1.2m) unless the intent is a
  standing POV or overhead plan view.
- State: "rectilinear wide-angle, straight verticals, no barrel distortion."

### Spatial concept
- 24 to 35mm or axonometric/isometric projection.
- Can drop strict perspective for diagrammatic clarity.
- Generous negative space around the volume.

### Industrial product render
- 50mm equivalent, shallow or infinite depth of field depending on product scale.
- Hero angle: three-quarter front, 15 to 30 degrees above eye level.
- Turntable dead-front for secondary variants.
- State: "studio lens, no distortion, product centered with breathing room."

## Lighting (fills `light`)

### Natural daylight presets
| Condition | Character | Use for |
|---|---|---|
| Golden hour | Warm directional (2700K to 3200K), long shadows, glow on surfaces | Exterior hero shots, warm interiors |
| Blue hour | Cool ambient (6500K+), artificial lights pop against deep sky | Exterior dusk shots, dramatic mood |
| Overcast | Soft, shadowless, even (5600K) | Interiors where you want materials to read cleanly |
| Bright noon | Hard, top-down, high contrast | Minimal white architecture, Mediterranean exteriors |

### Interior practicals
- Warm lamps (2700K) as secondary fill.
- Cove lighting, LED strip accents for architectural detail.
- Light spill from adjacent rooms or hallways for depth.
- Always state the balance: "daylight dominant with warm lamp fill" or "evening,
  practicals only, no window daylight."

### Studio HDRI (product renders)
- Three-point: large soft key (camera left), smaller fill (camera right at half
  stop), hard rim/edge (behind, opposing key).
- Or a single studio HDRI environment (soft gradient dome) for even, commercial look.
- State: "studio lighting, soft key from upper left, subtle rim, seamless
  background gradient."

## Materials and finish (fills `finish` and `style`)

Material honesty is the craft heart. Each surface must read with correct physics:
weight, texture scale, reflection behavior, contact edges.

### Core material palette (pick what the scene needs)
| Material | Key descriptors for the prompt |
|---|---|
| Concrete (raw) | board-formed concrete, slight surface imperfection, cool gray, matte, subtle aggregate texture |
| Oak / walnut | visible grain direction, warm tone, satin oil finish, tactile |
| Travertine / marble | veining pattern, honed or polished, slight depth in surface |
| Brushed steel | directional brushing marks, warm metallic reflection, not mirror |
| Matte black metal | powder-coated matte black, soft diffuse reflection, no gloss |
| Glass | real reflection and refraction, slight green edge tint, clean surface |
| Ceramic / porcelain | smooth, cool, slight sheen, clean edges |
| Fabric / linen | woven texture, soft folds, natural drape, light absorption |
| Plaster | smooth hand-applied plaster, warm white, slight undulation |

### PBR accuracy cues (always include 2 to 3 of these)
- "Physically accurate material reflections"
- "Ambient occlusion in crevices and where surfaces meet"
- "Contact shadows where objects rest on surfaces"
- "Correct Fresnel falloff on glass and polished surfaces"
- "Real-scale texture (grain at 1:1 proportion to the space)"

## Staging and dressing

Props set scale and inject life. Too many clutters; too few leaves the space
dead. Follow the "one story per surface" rule.

- **Furniture**: one to three pieces, arranged as in use (a chair pulled slightly
  out, an open book, a blanket draped).
- **Plants**: a single large plant (fiddle leaf, olive tree) or two to three
  small pots; never a jungle.
- **Textiles**: a rug anchoring the seating area, cushions in complementary
  tones, a throw for warmth.
- **Scale markers**: a coffee cup, a person silhouette in the distance, a fruit
  bowl. These anchor the viewer's sense of size.
- **Negative space**: leave surfaces and walls breathing. Emptiness is part of
  the composition.

For product renders: minimal staging. A single shadow-casting surface (stone
slab, fabric fold, leaf) placed behind or beside the product. Never compete
with the hero object.

## Render style dial (fills `style`)

State the intended register explicitly. The engine needs to know whether to
pursue camera-like photorealism or a polished digital render.

| Register | When to use | Prompt language |
|---|---|---|
| Photoreal arch-viz | Client presentation, marketing, portfolio | "Photorealistic architectural visualization, indistinguishable from a professional photograph, high dynamic range" |
| Clean polished render | Concept presentation, moodboard, social | "Polished 3D render, clean and precise, Unreal Engine quality, commercial arch-viz" |
| Stylized / illustrative | Diagram, concept sketch, exploded view | "Clean stylized render, white background, soft shadows, architectural illustration" |
| Blueprint / technical | Plans, elevations, technical communication | "Technical architectural drawing, clean linework, white background, no materials" |

## Negatives (fills `negatives`)

Always include the anti-softness clause from intent-spec, plus these domain specifics:

```
no warped geometry, no melted or impossible architecture, no curved lines where
straight lines are intended, no keystoning or barrel distortion, no floating
objects, no incorrect perspective, no soft Gaussian blur, no hazy wash, no
over-denoised airbrushed look, crisp and sharp with fine high-frequency detail,
defined edges, no watermark, no text overlay unless specified
```

For product renders add: "no fingerprints, no dust, no scratches unless specified
as intentional patina."

## Product render specifics

When the sub-genre is industrial product render:

- **Backdrop**: seamless studio gradient (light gray to white, or dark charcoal
  to black) or a solid matte surface (concrete slab, oak board, fabric).
- **Hero angle**: three-quarter front, 15 to 30 degrees elevation.
- **Edge highlights**: the rim/edge light is what separates the product from the
  background and reads as "expensive." Always request it.
- **Shadow**: soft contact shadow plus a gentle reflection on a glossy surface
  (if the surface warrants it).
- **Detail/exploded view**: if the user wants internals shown, state "exploded
  diagram view, components separated along their assembly axis, clean dotted
  connection lines."
- **Verbatim text**: if the product has labels, logos, or model names, fill
  `verbatim_text` with the EXACT strings. This is the realism driver.

## Consistency (cross-reference `consistency.md`)

- For a recurring building or product: render one hero at quality:high, save it
  as the canonical reference, and pass it via `--ref` on all subsequent views.
- For a set of rooms in the same project: lock the material + light block
  (identical words in every prompt) and set `palette.locked: true`.
- For a product colorway set: lock everything except the material color token;
  vary only that one field per variant.

## Inspect checklist (feeds render-loop)

After each render, `Read` the PNG and check:

1. **Perspective and verticals**: are vertical lines straight? Is the vanishing
   point system consistent and correct? Any keystoning or barrel distortion?
2. **Materials**: do surfaces read as their intended material? Correct scale of
   grain/pattern? Believable reflections and Fresnel?
3. **Lighting and shadows**: is the light direction consistent across all objects?
   Do shadows fall in the right direction and soften correctly with distance?
4. **Scale**: do objects relate to each other at correct proportions? Does a door
   read as ~2.1m, a chair seat as ~45cm?
5. **Geometry integrity**: no warped, melted, or impossible structural elements?
   Clean intersections? Correct symmetry where expected?
6. **Cleanliness**: for product renders, is the backdrop seamless? Edge highlights
   present? No artifacts floating in the scene?
7. **Sharpness**: anti-softness check per the universal clause.
8. **Text**: if `verbatim_text` was specified, is it present, legible, and correct?

If any check fails, apply ONE targeted fix per pass (see render-loop.md).

## Worked examples

### Example 1: Warm minimalist interior at golden hour

```yaml
intent:
  domain: architecture-product
  use: portfolio hero for interior design firm
  output:
    aspect: 1536x1024
    format: png
  subject: Open-plan living room with double-height ceiling and floor-to-ceiling glazing

  style: Photorealistic architectural visualization, warm minimalist, Scandinavian restraint
  composition: 18mm rectilinear wide-angle, one-point perspective looking into the room, eye-level at 1.1m seated height, straight verticals, primary seating group at left third
  light: Late golden hour sun entering through west-facing glazing at 25 degrees, warm 3000K wash across oak floor, single floor lamp (2700K) as fill, soft long shadows
  optics: 18mm rectilinear, deep depth of field, entire scene in focus
  palette:
    locked: false
    tokens: ["#F5F0E8", "#C4A882", "#2C2C2C", "#8B7355"]
  finish: Board-formed concrete feature wall with subtle formwork lines, wide-plank white oak floor with satin oil finish showing grain, honed travertine coffee table with visible veining, linen upholstery on low sofa, ambient occlusion in all crevices, contact shadows beneath furniture

  verbatim_text: []
  references: []
  consistency_kind: none
  negatives: "no warped geometry, no keystoning, no barrel distortion, no floating objects, straight verticals, no soft Gaussian blur, no hazy wash, crisp and sharp with fine high-frequency detail, defined edges, no watermark"

  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

Compiled prompt (prose):

> A photorealistic architectural visualization of an open-plan living room with
> a double-height ceiling and floor-to-ceiling west-facing glazing. Late golden
> hour sunlight enters at a low angle, casting long warm shadows across a
> wide-plank white oak floor with satin oil finish showing natural grain. A
> board-formed concrete feature wall with subtle formwork texture anchors the
> left side. A low linen sofa faces a honed travertine coffee table with visible
> veining. A single floor lamp glows warm (2700K) beside the sofa. A large
> fiddle leaf fig plant stands near the window. Shot at 18mm rectilinear
> wide-angle, one-point perspective, eye-level at seated height (1.1m), straight
> vertical lines throughout, no keystoning. Ambient occlusion in all crevices,
> contact shadows beneath all furniture, physically accurate material
> reflections. Warm minimalist Scandinavian restraint. Crisp and sharp with fine
> high-frequency detail, defined edges. No soft blur, no haze, no watermark.

### Example 2: Studio product render of a matte-black device

```yaml
intent:
  domain: architecture-product
  use: e-commerce hero image
  output:
    aspect: 1024x1024
    format: png
  subject: Cylindrical matte-black smart speaker on seamless dark gradient backdrop

  style: Polished commercial product render, premium electronics aesthetic
  composition: 50mm studio lens, three-quarter front hero angle at 20 degrees above eye-level, product centered with generous negative space, no distortion
  light: Three-point studio lighting, large soft key from upper left, subtle fill from right, hard rim/edge light from behind separating product from background
  optics: 50mm, infinite depth of field, entire product tack-sharp
  palette:
    locked: false
    tokens: ["#1A1A1A", "#0D0D0D", "#FFFFFF", "#3A3A3A"]
  finish: Matte powder-coated black metal body with soft diffuse reflection, brushed aluminum ring detail at top with directional grain, fabric mesh speaker grille with woven micro-texture, subtle Fresnel at glancing angles, contact shadow on surface

  verbatim_text:
    - "AURA"
  references: []
  consistency_kind: none
  negatives: "no fingerprints, no dust, no scratches, no floating objects, no warped geometry, no soft Gaussian blur, no hazy wash, crisp and sharp with fine high-frequency detail, defined edges, no watermark, no extra text beyond specified label"

  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

Compiled prompt (prose):

> A polished commercial product render of a cylindrical matte-black smart speaker
> named "AURA" (this text appears as a small debossed label on the front face).
> Shot with a 50mm studio lens, three-quarter front hero angle at 20 degrees
> elevation, product centered with generous breathing room. Seamless dark
> gradient backdrop transitioning from charcoal (#1A1A1A) at top to near-black
> (#0D0D0D) at bottom. Three-point studio lighting: large soft key from upper
> left casting gentle gradient across the matte surface, subtle fill from the
> right, and a hard rim/edge light from behind that cleanly separates the product
> silhouette from the dark background. The body is powder-coated matte black
> metal with soft diffuse reflection. A brushed aluminum ring at the top shows
> directional grain. The lower third is a fabric mesh speaker grille with visible
> woven micro-texture. Subtle Fresnel reflection at glancing angles. Soft contact
> shadow on the surface below. Infinite depth of field, entire product
> tack-sharp. Premium electronics product photography aesthetic. Crisp and sharp
> with fine high-frequency detail, defined edges. No fingerprints, no dust, no
> scratches, no soft blur, no watermark.
