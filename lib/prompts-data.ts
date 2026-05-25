export interface PromptData {
  id: string
  title: string
  content: string
  description: string
  category: string
  images: Array<{
    id: string
    url: string
    model: string
  }>
  _count: {
    likes: number
    bookmarks: number
  }
}

export const promptsData: PromptData[] = [
  {
    id: "1",
    title: "Japanese High School Poolside",
    content: `Create a realistic vertical smartphone photo in the style of a bright Japanese summer beverage commercial, showing three cheerful high school girls cleaning an outdoor school swimming pool deck on a sunny day. The scene is candid and ultra-realistic, with natural daylight, blue sky, soft white clouds, wet reflective concrete, sparkling water spray, and a fresh youthful atmosphere. All students wear matching Japanese school uniforms: white short-sleeve button-up shirts, loosened navy striped neckties, blue plaid pleated skirts, and they are barefoot on the wet poolside. Count exactly three girls: the center girl is closest to camera, leaning forward while pushing a long-handled deck brush toward the viewer, with a short dark bob haircut and rolled-up sleeves; the left girl stands near a chain-link fence holding a running blue hose, spraying water onto the ground, with a navy school bag hanging from her shoulder and small cute keychains attached; the right girl stands upright with one hand on her waist, holding a cup of iced bubble tea with a straw in the other hand, long dark hair tied back, relaxed confident pose. Include exactly three main cleaning/drink props: one deck brush, one blue hose spraying water, and one bubble tea cup. Add one bright blue plastic bucket at the lower right edge. Background details: turquoise chain-link fence along the left side, school buildings and pool structures in the distance, bright blue swimming pool visible behind the girls. Composition: low eye-level to slightly low-angle full-body shot, 9:16 vertical framing, center subject dominant, left and right girls balancing the composition, shallow but realistic depth of field. Visual style: photorealistic Japanese commercial photography, crisp skin and fabric texture, glossy wet floor reflections, high dynamic range, clean color grading, summery blue-and-white palette, no text, no watermark, no extra people.`,
    description: "Bright Japanese summer commercial style showing high school girls cleaning a poolside on a sunny day with photorealistic details.",
    category: "Portrait",
    images: [
      { id: "1-1", url: "/prompts/01_japanese_school.png", model: "DALL-E 3" },
    ],
    _count: { likes: 128, bookmarks: 45 },
  },
  {
    id: "2",
    title: "Rooftop Walkway",
    content: `Narrow rooftop walkway between concrete walls, clothesline shadows, open bright sky above, small plastic bag and folded umbrella near the wall. She wears an oversized white boyfriend shirt with collar open, high-waisted black tailored shorts, sheer white socks and simple loafers. Walking slowly toward camera while turning torso slightly, one hand holding the shirt collar against the wind, the other carrying a condensation-covered glass lemonade bottle down by her thigh. Calm and distant, lips slightly parted, gaze just past camera. Tall vertical full-body-ish crop, accidental-looking footroom, slightly soft motion.`,
    description: "Cinematic rooftop walkway scene with soft motion blur and dreamy atmosphere.",
    category: "Portrait",
    images: [
      { id: "2-1", url: "/prompts/02_rooftop_walkway.png", model: "DALL-E 3" },
    ],
    _count: { likes: 95, bookmarks: 32 },
  },
  {
    id: "3",
    title: "Basketball Cheerleaders",
    content: `Create a realistic high-resolution sports event photograph of BEARS cheerleaders performing during a basketball game inside a large indoor arena. Show exactly 7 adult female cheerleaders: 2 central foreground cheerleaders standing very close together with their backs and shoulders angled toward the camera, wearing matching navy, white, and red cropped cheer tops and pleated mini skirts; 2 main jumpers at the far left and far right with arms raised in a V pose, one leg bent behind or lifted, white sneakers and white socks; 1 background cheerleader near center-left mid-jump; 1 partial cheerleader cropped at the far left edge; and 1 small distant cheerleader standing near the back of the court. The uniforms should be navy blue with red and white trim, pleated skirts, white athletic shoes, and red-white-blue hair bows, with the word BEARS clearly printed on the front of the visible tops. Set the scene on a glossy wooden basketball court with court lines and reflections, crowded stadium seating, overhead steel trusses, bright arena lights, and blue advertising boards in the background. Use dynamic action photography, wide-angle perspective, shallow depth of field, natural indoor lighting, crisp fabric detail, energetic game-day atmosphere, and realistic motion poses.`,
    description: "Dynamic sports photography of cheerleaders with action poses and arena lighting.",
    category: "Sports",
    images: [
      { id: "3-1", url: "/prompts/03_basketball_cheer.png", model: "DALL-E 3" },
    ],
    _count: { likes: 156, bookmarks: 67 },
  },
  {
    id: "4",
    title: "VR Headset Exploded View",
    content: `Product explosion view poster for VR Headset. Clean high-tech 3D render, studio lighting, glowing accents. Features vertical stacked explosion view of VR headset showing 9 layers of internal components: shell, camera sensors, motherboard with chip, Pancake lenses, internal frame, battery pack, side strap, top headband and facial interface pad. Includes 8 callout labels on left and right sides. Bottom section with headline "体验，源于结构的进化" and Meta infinity logo.`,
    description: "Technical product visualization with exploded view showing internal VR headset components.",
    category: "Product",
    images: [
      { id: "4-1", url: "/prompts/04_vr_headset.png", model: "DALL-E 3" },
    ],
    _count: { likes: 89, bookmarks: 28 },
  },
  {
    id: "5",
    title: "Martial Arts Battle",
    content: `An anime-style illustration of a high-impact martial arts battle between two young female fighters in a traditional wooden martial arts dojo. In the foreground, a girl with black hair in a high bun wears a red and white Chinese-style martial arts outfit with baggy pants. She is in a dynamic, low, forward-thrusting stance, surrounded by swirling red energy and water splashes. In the background to the right, a girl with light purple hair in twin buns wears a green and purple Chinese dress with gold embroidery and black tights. She is leaping through the air in a flying kick pose, surrounded by swirling blue energy. The wooden floorboards are splintering from the intense impact, with debris and dust flying through the air. Above them hangs a weathered wooden sign with the text "武術会". The scene features dramatic lighting, a low-angle dynamic perspective, and intense action effects.`,
    description: "Dynamic anime martial arts scene with energy effects and dramatic perspective.",
    category: "Anime",
    images: [
      { id: "5-1", url: "/prompts/05_martial_arts.png", model: "DALL-E 3" },
    ],
    _count: { likes: 234, bookmarks: 89 },
  },
  {
    id: "6",
    title: "Perler Bead Style",
    content: `Draw the main character in the picture in a perler bead style. The colors should be close to the effect in the image. Replace the background with simple decorations, and the overall feel should be warm.`,
    description: "Perler bead art style with warm colors and simplified background.",
    category: "Artistic",
    images: [
      { id: "6-1", url: "/prompts/06_perler_bead.png", model: "DALL-E 3" },
    ],
    _count: { likes: 67, bookmarks: 21 },
  },
  {
    id: "7",
    title: "Picasso Style Portrait",
    content: `Create a cute neo-expressionist cubist minimal vector portrait illustration. Picasso meets kawaii minimalism, inspired by stylized fashion editorials and playful modern art. Ultra-simplified exaggerated facial features with oversized abstract eyes, flat cartoon eye shapes, minimal black dots or single curved strokes, no realistic iris details. Tiny abstract nose drawn with one short angular line. Small single-stroke lips, tiny soft geometric mouth shape. Rounded cheeks, dreamy innocent expression, playful asymmetrical proportions, elongated elegant neck, simplified geometric facial planes. Use clean scalable vector shapes, flat color blocking, bold primitive contour lines. Add subtle oil pastel grain overlays, rough handmade brush accents. Vibrant limited color palette against deep matte black background.`,
    description: "Cubist-inspired portrait with Picasso meets kawaii aesthetic and bold geometric shapes.",
    category: "Artistic",
    images: [
      { id: "7-1", url: "/prompts/07_picasso_portrait.png", model: "DALL-E 3" },
    ],
    _count: { likes: 145, bookmarks: 56 },
  },
  {
    id: "8",
    title: "Tokyo Nocturnal Map",
    content: `Create a highly realistic physical museum-diorama map titled "TOKYO — NOCTURNAL URBAN ARCHIVE", showing Tokyo at night as a dense 3D architectural landscape archive model, photographed from an elevated oblique angle on a dark tabletop. Wide horizontal 3:2 composition, like a premium architectural archive board. The map fills most of the frame, with a thick dark border, thin cream drafting lines, coordinate ticks. Use a restrained night palette: charcoal black paper, deep navy water, warm amber street lights, cool white building lights. Main scene: detailed miniature city map combining flat printed street plan with raised 3D building clusters. Roads glow as fine golden and white illuminated lines. Water areas are dark navy with glossy reflections. Include three prominent illuminated 3D landmarks: Tokyo Tower glowing warm orange, Tokyo Skytree glowing cool blue and violet, and Rainbow Bridge crossing the bay. Add 9 black rectangular callout labels with Japanese text: 1) Shinjuku, 2) Shibuya, 3) Ueno, 4) Asakusa, 5) Tokyo Skytree, 6) Imperial Palace, 7) Ginza, 8) Odaiba, 9) Tokyo Bay. Bottom legend box with 8 items: JR Yamanote Line, JR Chuo Line, Ginza Line, Asakusa Line, Yurikamome Line, Water, Major Road, Expressway. Title text "TOKYO — NOCTURNAL URBAN ARCHIVE", "Landscape Archive Model", archive code "Archive Code: TKY-NAM-2024-001", scale bar "Scale 1:25,000".`,
    description: "Museum-quality diorama map of Tokyo at night with detailed landmarks and archival styling.",
    category: "Architecture",
    images: [
      { id: "8-1", url: "/prompts/08_tokyo_map.png", model: "DALL-E 3" },
    ],
    _count: { likes: 189, bookmarks: 73 },
  },
  {
    id: "9",
    title: "Pixar Style Miniature",
    content: `Create an ultra-detailed 3D Pixar-style miniature scene. A cute young man with long open black hair, soft expressive eyes, and a gentle natural smile is relaxing inside an open wireless earbuds charging case placed on a wooden desk. He is lying comfortably inside the earbuds case in a relaxed pose, resting his head on one hand while one leg is casually placed over the other. Next to the charging case, a modern smartphone is placed vertically on a stand displaying a clean minimal music player UI. The screen shows the song name 'ordinary' with elegant album art, a play button, and a progress bar. Two wireless earbuds are casually placed near the charging case on the desk. The environment has soft warm natural window lighting creating a cozy cinematic atmosphere. Background should be softly blurred with aesthetic bokeh and a minimal modern desk setup. Style should look like a premium cinematic 3D render with smooth textures, soft shadows, depth of field, ultra realistic lighting, highly detailed materials, and adorable Pixar-inspired proportions.`,
    description: "Cozy Pixar-style miniature scene with character relaxing in earbuds charging case.",
    category: "3D Render",
    images: [
      { id: "9-1", url: "/prompts/09_pixar_miniature.png", model: "DALL-E 3" },
    ],
    _count: { likes: 267, bookmarks: 98 },
  },
]

export const categories = [
  "Portrait",
  "Sports",
  "Product",
  "Anime",
  "Artistic",
  "Architecture",
  "3D Render",
] as const

export type Category = typeof categories[number]
