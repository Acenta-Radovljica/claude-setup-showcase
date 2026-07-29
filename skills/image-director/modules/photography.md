# Photography module

Expert decision-tree for photographic imagery: product, food, lifestyle,
portrait, editorial. Fills the intent-spec craft fields (`style`, `composition`,
`light`, `optics`, `finish`, `negatives`) with real photographic decisions.

**Core principle:** the enemy is the "AI/CGI plastic" look. Every decision here
pushes toward material truth: real physics, optical imperfection, tangible
surfaces, sensor behavior. Quality:high is non-negotiable (see engine reference);
this module supplies the craft that makes quality:high actually read as a
photograph.

---

## 1. Sub-genre router

Identify the primary sub-genre from the request. Each has baseline defaults you
apply immediately, then override with specifics from the brief.

| Sub-genre | Default lens | Default light | Default staging |
|-----------|-------------|---------------|-----------------|
| **Product** | 100mm f/8 (full sharpness) | Single large softbox key 45 degrees camera-left + accent rim from behind-right | Textured surface (stone, wood, linen) + seamless or gradient backdrop |
| **Food** | 90mm f/4 (selective focus on hero dish) | Large window light camera-left, white bounce fill opposite, no direct flash | Styled plate on natural surface; props (cutlery, linen, ingredient scatter) |
| **Lifestyle** | 35mm f/2.8 (environmental context) | Golden-hour natural or large north-facing window; warm, directional | Real environment; subject interacting with space; candid energy |
| **Portrait** | 85mm f/1.8 (flattering compression, shallow DoF) | Rembrandt or loop pattern; key 45 degrees above eye-line; fill 2:1 ratio | Simple backdrop or environmental context; catchlight visible in eyes |
| **Editorial** | 50mm f/2 (natural perspective) | Hard light or mixed practical; high contrast; motivated by scene | Narrative staging; strong mood; location or set |

When a brief blends two (e.g. "lifestyle product"), pick the primary genre and
borrow the secondary's staging or lens.

---

## 2. Optics (`optics` field)

The lens choice communicates intent. Pick by what the image needs to say.

### Focal length by intent

| Focal length | Effect | Use for |
|---|---|---|
| 24mm | Wide, contextual, slight barrel distortion at edges | Environmental establishing; interior context; dramatic perspective |
| 35mm | Natural field of view, mild compression | Lifestyle, full-body, storytelling |
| 50mm | "Normal" eye, no distortion | Editorial, mid-body, product-in-context |
| 85mm | Flattering compression, strong subject isolation | Portraits, beauty, hero product close-ups |
| 100mm macro | Near-flat perspective, extreme detail | Texture detail, ingredients, product labels, material close-ups |
| 135mm | Maximum compression, creamy bokeh | Tight portraits, product detail with smooth falloff |

### Depth of field

| Aperture range | DoF character | Use for |
|---|---|---|
| f/1.4 to f/2 | Paper-thin focus plane, maximum subject isolation | Portraits, emotional/atmospheric hero shots |
| f/2.8 to f/4 | Selective: subject sharp, foreground/background soft | Food hero, product with context |
| f/5.6 to f/8 | Deep: entire product sharp, background slightly soft | Catalog product, packshot, group |
| f/11 to f/16 | Hyperfocal: everything sharp corner to corner | Architecture, landscape, flat-lay |

Write the optics field as a concrete spec, not a vague description:
`"85mm lens, f/1.8, shallow depth of field isolating the subject from a soft cream background"`

---

## 3. Lighting (`light` field)

Describe direction, quality (hard/soft), ratio, and colour temperature. Real
photographs have motivated, directional light; flat ambient reads as CGI.

### Product setups

- **Softbox key + rim:** Large softbox 45 degrees camera-left at subject height
  (key), strip light behind-right for edge separation (rim). Ratio 3:1 key to
  fill. Clean, commercial, Hasselblad lookbook.
- **Tent / diffused wrap:** Soft light from all sides via a light tent; no hard
  shadows. For reflective surfaces (glass, chrome, jewelry). Add a single
  specular highlight card for life.
- **Hard accent + dark field:** Small focused spot from above-behind for dramatic
  highlight; rest falls to black. Moody, premium, luxury spirits/fragrance.

### Food setups

- **Window light (the standard):** Large soft source 90 degrees to camera (side),
  white v-flat opposite as fill. Shadows visible but luminous. This is the #1
  food photography look.
- **Backlight hero:** Source behind and slightly above the dish; creates glow
  through steam, translucence in liquids, rim on textures. Fill from front at 4:1
  ratio.

### Portrait patterns

- **Rembrandt:** Key 45 degrees above and to the side; triangle of light on the
  shadow cheek. Dramatic, painterly.
- **Loop:** Key 30 degrees to the side and slightly above; small shadow from nose
  does not touch the cheek shadow. Flattering, versatile.
- **Butterfly:** Key directly above and slightly in front; symmetrical shadow
  below the nose. Glamour, beauty, fashion.
- **Split:** Key 90 degrees to the side; half the face lit, half in shadow.
  Dramatic, editorial.

### Natural / environmental

- **Golden hour:** Low sun 15 degrees above horizon; warm (3200K), long shadows,
  specular rim on hair/edges. Lifestyle, romance, warmth.
- **Overcast soft:** Even, diffused daylight; no harsh shadows; cool (6500K).
  Fashion editorial, moody.
- **Hard noon:** Overhead sun; deep shadows under brows and chin; high contrast.
  Gritty, documentary, street.

Write the light field as a setup, not a mood word:
`"single large softbox key 45 degrees camera-left at subject height, strip light rim from behind-right for edge separation, 3:1 key-to-fill ratio, neutral 5500K"`

---

## 4. Camera and film look (`style` + `finish` fields)

### Digital clean (default for product/commercial)

- **Style:** "commercial product photography, medium-format digital sensor,
  Hasselblad/Phase One clarity"
- **Finish:** "crisp micro-contrast, neutral colour science, minimal grain, full
  tonal range from true black to specular highlight"

### Film stocks (editorial, lifestyle, portrait warmth)

| Stock | Character | Use for |
|---|---|---|
| Kodak Portra 400 | Warm skin tones, lifted shadows, fine grain | Portraits, lifestyle, wedding |
| Kodak Gold 200 | Saturated warm, nostalgic yellow cast, visible grain | Casual lifestyle, summer, travel |
| Fuji Pro 400H | Cool greens, pastel highlights, soft contrast | Fashion editorial, fine art |
| Cinestill 800T | Tungsten balance, halation around highlights, cinematic | Night, neon, moody editorial |
| Kodak Tri-X 400 | High contrast B&W, pronounced grain, rich blacks | Documentary, street, dramatic portrait |

When using a film look, state: "shot on [stock], developed standard push, scanned
from [format]." This anchors the model in real photographic process, not a filter
overlay.

### Format cues

- **Medium format (6x7, 6x6):** Shallower DoF at equivalent framing, finer grain
  relative to frame, "that medium-format look." Use for high-end commercial and
  fashion.
- **35mm:** Standard depth behavior, visible grain structure at ISO 400+. Use for
  editorial, documentary, lifestyle.
- **Large format (4x5):** Tilt/shift plane of focus, extreme detail, architectural.

---

## 5. Material physics and real-world imperfection (the anti-CGI lever)

This section is the single biggest differentiator between a convincing photograph
and a plastic render. CGI fails because it is too perfect, too smooth, too
symmetrical. Real photographs have:

### Always include (adapt to subject)

- **Surface texture at pixel level:** fabric weave, leather grain, paper fiber,
  brushed metal directionality, wood pore, stone aggregate
- **Optical phenomena:** real glass refraction and caustics, specular highlights
  that follow Fresnel, bokeh with cat-eye and longitudinal chromatic aberration at
  the edges
- **Environmental imperfection:** dust motes in a light beam, fingerprints on
  glass surfaces, condensation droplets with correct surface tension (round, not
  flat), steam with volumetric dissipation, crumbs and seasoning scatter on food
  surfaces
- **Organic asymmetry:** slightly uneven pour, imperfect food plating edge, one
  flyaway hair, natural skin pores and fine lines (never airbrushed), fabric that
  drapes with gravity not with symmetry

### Per sub-genre specifics

| Sub-genre | Key imperfection cues |
|---|---|
| Product | Condensation on cold glass; fingerprint on matte surface; dust on dark; micro-scratches on metal; label with slight edge curl |
| Food | Sauce drip imperfect; breadcrumb scatter; herb leaf slightly wilted; plate chip at edge; steam dissipating naturally |
| Portrait | Skin pores, under-eye texture, flyaway hair, visible peach fuzz in rim light, slight asymmetry in expression |
| Lifestyle | Worn fabric texture, scuffed shoe detail, imperfect posture, natural motion blur in hands |
| Editorial | Imperfect set (peeling paint, patina, dust), film halation, light leak at frame edge |

### How to encode in the spec

In the `finish` field, write 2 to 4 specific material/imperfection cues relevant
to the subject. Example:
`"real amber glass with visible caustics and refraction through liquid, condensation droplets with surface tension on cold surfaces, fine dust visible on matte black dropper cap, slight emboss shadow on label text, sensor grain (ISO 200 equivalent)"`

---

## 6. Composition (`composition` field)

- **Rule of thirds:** place the subject at a power point, not dead center (unless
  symmetry is the explicit intent, e.g. beauty/flat-lay).
- **Negative space:** leave breathing room on the side the subject faces or where
  a headline will go (marketing hero); specify which side.
- **Hero placement:** the main product or subject occupies 40 to 60% of the frame
  for a hero shot; 20 to 30% for an environmental/in-context shot.
- **Surface + backdrop:** always specify both. Surface = what the subject sits on
  (wet dark slate, weathered oak, marble, linen); backdrop = what is behind
  (seamless gradient, blurred environment, solid dark).
- **Camera angle:** slightly above (3/4 view) for product; eye-level for portrait;
  overhead for flat-lay/food; low angle for drama/power.

Write composition as placement + angle + space allocation:
`"subject placed at right-third power point, shot from slightly above (15 degrees), 60% frame occupation, negative space to the left for headline, dark slate surface, gradient backdrop falling to black"`

---

## 7. Anti-softness and anti-CGI (`negatives` field)

Every photography spec MUST include these negatives (adapt emphasis to sub-genre):

```
no soft Gaussian blur, no hazy wash, no over-denoised airbrushed look, crisp and
sharp with fine high-frequency detail, defined edges. Photographic realism with
real material physics, not a 3D render, not CGI, not a digital illustration.
No plastic skin, no uncanny smoothness, no symmetrical perfection, no flat
lighting. Real optical behavior: natural bokeh, chromatic aberration at edges,
sensor grain appropriate to ISO.
```

For portraits specifically, add: `no airbrushed skin, visible pores and texture,
real under-eye area, natural skin colour variation`

For products specifically, add: `no floating objects, real contact shadows,
physically correct reflections, real material weight and gravity`

---

## 8. Verbatim text on labels and packaging (`verbatim_text` field)

When a product has visible text (label, packaging, screen), spell out every
character that must appear. The model renders text best when:

1. Each distinct text element is on its own line in `verbatim_text`
2. Case, punctuation, and spacing are exact
3. The prompt also describes WHERE the text sits ("embossed on the amber glass
   label", "printed in sans-serif on the matte black box lid")

Example for a serum bottle:
```yaml
verbatim_text:
  - "LUMEN"
  - "Vitamin C Serum"
  - "30ml / 1 fl oz"
```

---

## 9. Subject consistency (pointer)

When the same product or person must appear across multiple shots, follow
`consistency.md`:

- Render the canonical "hero" shot first at quality:high.
- Use that render as `--ref` for every subsequent scene.
- Restate invariant features in prose ("same amber glass bottle, same matte black
  dropper cap, same label reading 'LUMEN' / 'Vitamin C Serum' / '30ml'").
- Force quality:high on all reference renders; the spike proved that medium
  references lose subject identity.

---

## 10. Inspect checklist (photography-specific, feeds render-loop)

After every render, `Read` the PNG and answer each question. If any answer is
"no," apply the targeted fix from the render-loop table and re-render.

1. **Reads as a photograph?** Does it look like a camera captured it, or does it
   have the telltale CGI sheen / plastic smoothness / uncanny symmetry?
2. **Sharp where it should be?** Is the focus plane correct? Is there unwanted
   softness or haze?
3. **Realistic materials and imperfection?** Can you see texture (grain, pores,
   weave, surface irregularity)? Are there real-world micro-details (dust,
   droplets, fingerprint, slight asymmetry)?
4. **Label text correct?** Every `verbatim_text` string present, spelled right,
   unwarped, legible?
5. **Lighting believable?** Single consistent light direction? Shadow/highlight
   logic coherent? No impossible ambient glow?
6. **Skin / food / product natural?** Skin has pores and variation (not plastic)?
   Food looks edible (not wax)? Product has weight and sits on its surface with a
   real contact shadow?
7. **Background and surface?** Specified backdrop and surface present? No muddy
   smear or unintentional elements?
8. **Composition?** Subject placement matches the spec? Negative space where
   intended?

---

## 11. Worked examples

### A. Premium product shot (validated: the LUMEN serum bottle)

This is the exact approach that turned a cheap 3D-render look (quality:medium)
into a genuine studio photograph (quality:high + these cues).

```yaml
intent:
  domain: photography
  use: hero product shot for brand landing page
  output:
    aspect: 1024x1536
    format: png
  subject: luxury vitamin C serum in amber glass dropper bottle, matte black cap

  style: commercial product photography, medium-format digital clarity, Hasselblad colour science
  composition: bottle placed at center-right third, shot from slightly above (10 degrees), 55% frame occupation, negative space upper-left for headline, wet dark slate surface, backdrop gradient from charcoal to black
  light: single large softbox key 45 degrees camera-left at product height creating soft wrap with gentle shadow transition, narrow strip light rim from behind-right for glass edge separation, subtle warm accent from below-left bouncing off wet slate, 3:1 key-to-fill ratio, neutral 5500K
  optics: 100mm macro lens, f/8, deep focus rendering the entire bottle tack-sharp with slight background falloff
  palette:
    locked: false
    tokens: ["#1a0f00", "#2d1a00", "#0a0a0a", "#f5e6d0"]
  finish: real amber glass with visible caustics and refraction through golden liquid, condensation droplets with correct surface tension on cold bottle surface, fine dust on matte black cap, slight emboss shadow on cream label text, micro-water-beading on dark slate, sensor grain (ISO 200 equivalent), natural specular highlights following Fresnel
  verbatim_text:
    - "LUMEN"
    - "Vitamin C Serum"
    - "30ml / 1 fl oz"
  references: []
  consistency_kind: none
  negatives: "no soft Gaussian blur, no hazy wash, no over-denoised airbrushed look, crisp and sharp with fine high-frequency detail, defined edges. Photographic realism with real material physics, not a 3D render, not CGI. No floating object, real contact shadow on wet stone, physically correct glass refraction, real liquid viscosity visible in the dropper. No plastic texture, no symmetrical perfection."
  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

**Compiled prompt (abridged):**

> A wet dark slate surface recedes into a gradient backdrop from charcoal to pure
> black. At center-right of the frame, a luxury amber glass dropper bottle of
> vitamin C serum stands at slight above angle (10 degrees camera tilt). The
> bottle is tack-sharp, shot at 100mm f/8 on a medium-format digital sensor.
> Single large softbox key 45 degrees camera-left wraps the bottle in soft light
> with a gentle shadow transition; a narrow strip light from behind-right creates
> bright edge separation on the glass. The amber glass shows real caustics and
> refraction through the golden liquid inside. Condensation droplets with natural
> surface tension bead on the cold glass. Fine dust is visible on the matte black
> dropper cap. The cream-coloured label is slightly embossed and reads exactly:
> "LUMEN" on the first line, "Vitamin C Serum" below, "30ml / 1 fl oz" at the
> bottom. The wet slate surface shows micro water beading and a real contact
> shadow beneath the bottle. Fine sensor grain at ISO 200. Crisp and sharp with
> high-frequency detail. Photographic, not a 3D render, not CGI. No soft blur, no
> hazy wash, no airbrushed smoothness, no floating object.

### B. Editorial food shot

```yaml
intent:
  domain: photography
  use: magazine feature image for a pasta recipe article
  output:
    aspect: 1536x1024
    format: png
  subject: hand-made tagliatelle with slow-cooked ragu, parmesan shavings, fresh basil, in a rustic ceramic bowl

  style: editorial food photography, shot on Kodak Portra 400, 35mm film scanned, warm nostalgic register
  composition: bowl placed at lower-left third, overhead angle (80 degrees), 40% frame occupation, scattered ingredients filling negative space (torn bread, olive oil in a ceramic dish, linen napkin), weathered oak table surface
  light: large north-facing window light from camera-left (soft, directional, 5800K), white linen bounce on the opposite side at 2:1 ratio, visible shadow of the window frame falling diagonally across the table
  optics: 50mm lens at f/2.8, selective focus on the pasta ribbons with the peripheral props falling slightly soft
  palette:
    locked: false
    tokens: ["#8B4513", "#F5DEB3", "#2E8B57", "#FFF8DC", "#6B3A1F"]
  finish: Kodak Portra 400 colour science with warm lifted shadows and fine organic grain, visible pasta flour dust on the table, sauce with real viscosity (not flat paint), parmesan shavings with natural breakage and crystalline texture, basil leaf with one slightly wilted edge, ceramic bowl with handmade glaze variation and a tiny chip on the rim, breadcrumb scatter
  verbatim_text: []
  references: []
  consistency_kind: none
  negatives: "no soft Gaussian blur, no hazy wash, no over-denoised look, crisp detail in the pasta texture. No food that looks like wax or plastic. No perfect symmetry in plating. Real sauce viscosity, real steam dissipation, real gravity on the parmesan shavings. Not a 3D render, not food illustration, photographic realism. No oversaturated HDR look."
  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

---

## Quick reference: the five questions before compiling

1. What sub-genre? (routes all defaults)
2. What lens and aperture? (controls perspective and isolation)
3. What light setup? (the single biggest quality lever after quality:high)
4. What makes this look REAL, not rendered? (the imperfection cues for `finish`)
5. What text must appear verbatim? (the #1 anti-gibberish lever)

Answer all five, fill the spec, compile, render, inspect. That is the workflow.
