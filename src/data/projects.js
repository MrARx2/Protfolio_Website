/**
 * PROJECT DATA
 * 
 * This file contains all project data for the portfolio.
 * Each project type has specific required and optional fields.
 * 
 * See IMPROVEMENTS_V2.md for detailed usage guide.
 */

/* ===== GAME PROJECTS ===== */
export const gameProjects = [
  {
    id: "path-of-embers",
    title: "Path of Embers",
    thumbnail: "/Images/Path Of Embers/Gameplay4.jpg",
    featuredPreview: {
      presentation: "phone",
      frames: [
        { src: "/Images/Path Of Embers/Gameplay4.jpg", label: "Combat" },
        { src: "/Images/Path Of Embers/Gameplay7.jpg", label: "Boss encounter" },
        { src: "/Images/Path Of Embers/TalentWheel.jpg", label: "Talent progression" }
      ]
    },
    summary: "Path of Embers is a fast-paced mobile roguelike built around stackable talents, tactical combat, and a performance-aware 16-segment map. Build powerful synergies, manage encounter pacing, and fight through handcrafted progression at a responsive 60 FPS.",
    images: [
      "/Images/Path Of Embers/MainMenu.jpg",
      "/Images/Path Of Embers/Gameplay1.jpg",
      "/Images/Path Of Embers/Gameplay2.jpg",
      "/Images/Path Of Embers/Gameplay3.jpg",
      "/Images/Path Of Embers/Gameplay4.jpg",
      "/Images/Path Of Embers/Gameplay5.jpg",
      "/Images/Path Of Embers/Gameplay6.jpg",
      "/Images/Path Of Embers/Gameplay7.jpg",
      "/Images/Path Of Embers/Gameplay8.jpg",
      "/Images/Path Of Embers/Gameplay9.jpg",
      "/Images/Path Of Embers/Shop.jpg",
      "/Images/Path Of Embers/TalentWheel.jpg",
      "/Images/Path Of Embers/InGameMenu.jpg",
      "/Images/Path Of Embers/SoundSettings.jpg"
    ],
    galleryPresentation: "phone-showcase",
    galleryGroups: [
      { label: "Gameplay & game flow", indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { label: "Menus & progression", indexes: [10, 11, 12, 13] }
    ],
    tags: ["Roguelike", "Fantasy", "Action", "Mobile"],
    youtube: "https://youtube.com/shorts/dq5IcuCCCZE?si=XXSu6e6ErcHqHsTS",
    videoAspectRatio: "6 / 13",
    videoAspectLabel: "9:19.5",
    videoCaptureLabel: "Galaxy S24+ · 1440 × 3120",
    details: "Path of Embers is a fast-paced mobile roguelike built around stackable talents, tactical combat, and deliberate encounter pacing. Its 16 handcrafted map segments follow a fixed progression, with the miniboss on segment 11 and the final boss on segment 16. A performance-aware streaming system keeps only the two or three segments nearest the player active, suspends or despawns distant enemies, and preserves stable mobile performance.\n\nChoosing when to fight is part of the run. Clearing a segment can trigger a second wave and more opportunities to strengthen the build, while rushing forward leaves rewards behind and increases the difficulty of later encounters. A moving meteor fireline prevents stagnation and keeps that choice fast-paced. All gameplay systems and the game’s original visual assets were built for a responsive 60 FPS mobile experience.",
    role: "Programmer / Technical Artist",
    team: "3",
    time: "4 months",
    engine: "Unity 6",
    teamCredits: {
      intro: "This project was developed in collaboration with my talented teammates Tamir Goldman and Ido Korliker, each contributing key elements that shaped the final experience.",
      members: [
        {
          name: "Tamir Goldman",
          description: "Tamir Goldman played a central role across multiple disciplines, leading both the creative and implementation aspects of the game. He was responsible for 3D modeling, including key characters and assets, as well as the full UI/UX design, ensuring a cohesive and intuitive player experience. Tamir also designed and implemented the boss encounter, handling both its visual creation and combat behavior. In addition, he contributed extensively to map design and asset creation, while producing the game's complete audio layer—covering sound effects, background music, and overall sound design—resulting in a polished and immersive experience.",
          linkedin: "https://www.linkedin.com/in/tamir-goldman-4a3b25313/"
        },
        {
          name: "Ido Korliker",
          description: "Ido Korliker focused on visual effects and 3D asset creation. He developed the VFX that enhance gameplay clarity and impact, and was responsible for modeling the main character, miniboss, and various map assets, contributing significantly to the game's visual depth and overall presentation."
        }
      ]
    }
  },
  {
    id: "Ricochet",
    title: "Ricochet",
    thumbnail: "/Images/Ricochet/Mid-Match.jpg",
    caseStudyHero: {
      src: "/Images/Ricochet/Mid-Match.jpg",
      label: "Live match",
      position: "center center"
    },
    cardPreview: {
      presentation: "game",
      glow: "206, 64, 255",
      contribution: "Gameplay systems, AI, and match flow",
      depth: "7 screens · gameplay video · systems breakdown",
      cta: "Explore gameplay & systems",
      frames: [
        { src: "/Images/Ricochet/Mid-Match.jpg", label: "Compete" },
        { src: "/Images/Ricochet/StartOfMatch.jpg", label: "Prepare" },
        { src: "/Images/Ricochet/Winner Screen.jpg", label: "Victory" }
      ]
    },
    summary: "Ricochet blends the chaos of pinball with the precision of air hockey and the quick reflexes of Pong. Play alternating rounds as a striker or goalie, using physics, bouncers, and neon-lit action to outscore your opponent.",
    images: [
      "/Images/Ricochet/Intro.jpg", // Logo/Title screen first
      "/Images/Ricochet/StartOfMatch.jpg", // Gameplay
      "/Images/Ricochet/Mid-Match.jpg", // Gameplay
      "/Images/Ricochet/Mid-Match-StartOfRound.jpg", // Gameplay
      "/Images/Ricochet/Play Match Settings - Quickplay.jpg", // UI
      "/Images/Ricochet/PauseMenu.jpg", // UI
      "/Images/Ricochet/Winner Screen.jpg" // UI
    ],
    tags: ["Arcade", "Physics-Based", "Sports", "Neon", "Air Hockey", "Pinball"],
    youtube: "https://youtu.be/pj1mnLXYDjI",
    details: "Ricochet is a high-energy arcade physics game where players take turns as either the striker or the goalie. In striker rounds, you control a puck-like player aiming to score in the rival's goal while bouncing shots off speed-boosting bumpers that add unpredictability and challenge. In goalie rounds, you defend your goal along a vertical line—just like Pong—blocking fast, chaotic rebounds. One role is always controlled by AI, keeping matches dynamic. The game's neon-emissive visuals, colorful ball reactions, and punchy VFX/SFX create a vibrant, arcade-like atmosphere that keeps the action intense and unpredictable.",
    role: "Programmer",
    team: "2",
    time: "2 months",
    engine: "Unreal Engine 5.5.4",
    teamCredits: {
      intro: "Ricochet was developed in collaboration with Jack Lavy, whose creative direction helped give the game its energetic arcade identity and strengthen its competitive experience.",
      members: [
        {
          name: "Jack Lavy",
          description: "Jack led the art direction, UI implementation, 3D asset creation, and sound design, establishing Ricochet's distinctive neon presentation and punchy arcade feedback. He also collaborated on refining the gameplay loop within the systems I developed, improving match pacing and the transition between striker and goalkeeper rounds.",
          linkedin: "https://www.linkedin.com/in/jack-lavy-144bb812b/"
        }
      ]
    }
  },
  {
    id: "slingshot",
    title: "Slingshot",
    thumbnail: "/Images/Slingshot/Slingshot -midrace-red-planet.jpg",
    cardPreview: {
      presentation: "game",
      glow: "116, 78, 255",
      contribution: "Flight systems, procedural tracks, and race flow",
      depth: "6 screens · gameplay video · systems breakdown",
      cta: "Explore the racing system",
      frames: [
        { src: "/Images/Slingshot/Slingshot -midrace-red-planet.jpg", label: "Accelerate" },
        { src: "/Images/Slingshot/Slingshot - Launch.jpg", label: "Launch" },
        { src: "/Images/Slingshot/Slingshot - checkpoint captured.jpg", label: "Navigate" }
      ]
    },
    summary: "Slingshot is a fast-paced space racer where you harness planetary gravity to speed through unique, procedurally generated tracks. Master 6-axis controls, hit checkpoints in order, and use close flybys for high-speed, precision racing.",
    images: [
      "/Images/Slingshot/Slingshot - Intro.jpg", // Logo/Title screen first
      "/Images/Slingshot/Slingshot - checkpoint captured.jpg", // Gameplay
      "/Images/Slingshot/Slingshot - Launch.jpg", // Gameplay
      "/Images/Slingshot/Slingshot -midrace-red-planet.jpg", // Gameplay
      "/Images/Slingshot/Menu.jpg", // UI
      "/Images/Slingshot/End of round - Menu.jpg" // UI
    ],
    tags: ["Space", "Racer", "Procedural Tracks"],
    youtube: "https://www.youtube.com/watch?v=4CMdh4ahHq4",
    details: "Slingshot is a fast-paced space racing demo where players use planetary gravity to boost around procedurally generated tracks. Each race features 10 planets acting as checkpoints, color-coded to show your progress. With full 6-axis controls, you must hit checkpoints in order and master close flybys to gain momentum. Designed for expansion, the system supports unique curved tracks and an unlimited number of planets, offering huge potential for more complex and varied races.",
    role: "Programmer",
    team: "2",
    time: "2 weeks",
    engine: "Unity 6",
    teamCredits: {
      intro: "Slingshot was created alongside Jack Lavy, whose visual and design contributions helped turn its movement systems into a clearer and more cohesive racing experience.",
      members: [
        {
          name: "Jack Lavy",
          description: "Jack shaped the game's art direction, implemented its interface, created its 3D assets, and produced the sound design that reinforces its space-racing atmosphere. He also helped tune the gameplay loop built around my core systems, improving checkpoint clarity, the sense of speed, and the overall flow of each race.",
          linkedin: "https://www.linkedin.com/in/jack-lavy-144bb812b/"
        }
      ]
    }
  },
  /*
  {
    id: "foxs-tale",
    title: "Fox's Tale",
    summary: "A charming 2D platformer where you jump on enemies to defeat them and use interactive objects to survive traps and reach the goal.",
    images: [
      "/Images/Fox's Tale/Intro.jpg", // Logo/Title screen first
      "/Images/Fox's Tale/Using Interactables to take down enemies.jpg", // Gameplay
      "/Images/Fox's Tale/Boss Fight.jpg", // Gameplay
      "/Images/Fox's Tale/Parkour.jpg", // Gameplay
      "/Images/Fox's Tale/Menu.jpg", // UI
      "/Images/Fox's Tale/EndScreen.jpg" // UI
    ],
    tags: ["Platformer", "Pixel Art", "2D", "Adventure"],
    youtube: "https://www.youtube.com/watch?v=fxfBp4WnvdY",
    details: "Fox's Tale is a classic 2D platformer demo inspired by timeless platforming adventures. You play as a fox journeying through handcrafted levels filled with enemies, traps, and clever interactables.\nDefeat enemies by jumping on them, and use environmental objects—like switches, pushable crates, and trigger platforms—to outsmart hazards and clear your path forward.\nEach level challenges your timing, precision, and creativity. With only two lives per run, failure means starting over—making every jump and interaction count. Designed for replayability, Fox's Tale captures the fun and simplicity of old-school platformers with modern polish and tight controls.",
    role: "Programmer",
    team: "2",
    time: "1 week",
    engine: "Unity 6"
  }
  */
];

/* ===== 3D MODELING PROJECTS ===== */
export const modelingProjects = [
  {
    id: 'cozmo-robot',
    title: 'Cozmo Robot',
    thumbnail: '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00004.png',
    cardPreview: {
      presentation: 'modeling',
      glow: '92, 174, 255',
      contribution: 'Modeling, texturing, and real-time presentation',
      depth: '5 renders · materials · progression',
      cta: 'View modeling breakdown',
      frames: [
        { src: '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00011.png', label: 'Front study', position: 'center 72%' },
        { src: '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00012.png', label: 'Side profile', position: 'center 68%' },
        { src: '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00013.png', label: 'Top details', position: 'center 58%' }
      ]
    },
    summary: 'Portfolio project: stylized Cozmo robot modeled, textured and rendered.',
    renders: [
      '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00004.png',
      '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00011.png',
      '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00012.png',
      '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00010.png',
      '/Images/Renders and Modeling/Cozmo/Highres-Screenshot00013.png'
    ],
    paintwork: [
      '/Images/Renders and Modeling/Cozmo/Paintwork.jpg',
      '/Images/Renders and Modeling/Cozmo/Vertex Color ID.jpg'
    ],
    progression: [
      '/Images/Renders and Modeling/Cozmo/COZMO-ALMOST-DONE.jpg',
      '/Images/Renders and Modeling/Cozmo/COZMO-ALMOST-DONE2.jpg',
      '/Images/Renders and Modeling/Cozmo/COZMO-ALMOST-DONE3.jpg'
    ],
    references: [
      '/Images/Renders and Modeling/Cozmo/412ro2-Z5u-GL-AC-SY300-SX300-QL70-ML2.jpg',
      '/Images/Renders and Modeling/Cozmo/cozmo-anki-front.jpg',
      '/Images/Renders and Modeling/Cozmo/Cozmo-Anki-Side.jpg',
      '/Images/Renders and Modeling/Cozmo/Cozmo-Anki-Top.jpg'
    ],
    tags: ['3D Character', 'Robot', 'Half-Rigged', 'Maya', 'Adobe Substance', 'Unreal Engine 5'],
    time: '1 month',
    software: 'Maya',
    render: 'UE5',
    type: 'modeling',
    details: 'Cozmo robot model and render study showcasing materials, silhouette, and lighting.'
  },
  {
    id: 'rainbow-dagger',
    title: 'Rainbow Dagger',
    thumbnail: '/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00006.png',
    cardPreview: {
      presentation: 'modeling',
      glow: '246, 132, 255',
      contribution: 'Hard-surface modeling, PBR materials, and presentation',
      depth: '3 renders · materials · topology',
      cta: 'View modeling breakdown',
      frames: [
        { src: '/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00006.png', label: 'Hero render' },
        { src: '/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00007.png', label: 'Side profile' },
        { src: '/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00008.png', label: 'Surface detail' }
      ]
    },
    summary: 'Realistic dagger with detailed materials and PBR texturing, designed for a more grounded aesthetic.',
    renders: [
      '/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00006.png',
      '/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00007.png',
      '/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00008.png'
    ],
    paintwork: [
      '/Images/Renders and Modeling/Rainbow_Dagger/Paintwork-in-adobe-substance.jpg',
      '/Images/Renders and Modeling/Rainbow_Dagger/Roughness.jpg'
    ],
    progression: [
      '/Images/Renders and Modeling/Rainbow_Dagger/LowPoly - HighPoly.jpg',
      '/Images/Renders and Modeling/Rainbow_Dagger/LowPoly - HighPoly - prespective view.jpg'
    ],
    references: [
      '/Images/Renders and Modeling/Rainbow_Dagger/7151ea987de342d95d0c3ed6ff3a4a92.jpg'
    ],
    tags: ['Hard Surface', 'Weapon', 'Maya', 'Adobe Substance', 'Unreal Engine 5'],
    time: '1 week',
    software: 'Maya',
    render: 'UE5',
    type: 'modeling',
    details: 'Realistic dagger model with focus on material accuracy and detailed surface work. Modeled in Maya and rendered in Unreal Engine 5.'
  },
  /*
  {
    id: 'stormbird-lowpoly',
    title: 'Stormbird LowPoly',
    summary: 'A stylized low-poly reimagining of Horizon Zero Dawn\'s iconic Stormbird, featuring clean topology and a unique artistic interpretation of the mechanical creature.',
    renders: [
      '/Images/Renders and Modeling/Stormbird_LowPoly/Prespective-View.jpg',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Prespective-Top.jpg',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Front-View.jpg',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Face-View.jpg',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Render1.jpg'
    ],
    progression: [
      '/Images/Renders and Modeling/Stormbird_LowPoly/Wireframe-on-shaded-Top.jpg',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Wireframe-on-Shaded-Prespective.jpg',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Wireframe-on-Shaded-Tail.jpg'
    ],
    references: [
      '/Images/Renders and Modeling/Stormbird_LowPoly/Right-Front-Orthographic.png',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Top-Prespective-with-references-on-screen.jpg',
      '/Images/Renders and Modeling/Stormbird_LowPoly/Wings.jpg'
    ],
    tags: ['Low Poly', 'Robot', 'Creature', 'Game-Ready', 'Maya', 'Arnold Renderer'],
    time: '1.5 weeks',
    software: 'Maya',
    render: 'Arnold Renderer',
    type: 'modeling',
    details: 'Inspired by the majestic Stormbird from Horizon Zero Dawn, this low-poly interpretation captures the essence of the mechanical creature while embracing a stylized, minimalist aesthetic. The project showcases clean topology optimized for game engines, with careful attention to silhouette and form. By reducing detail and focusing on bold shapes, this freestyle take brings a fresh perspective to the iconic design, balancing recognizable elements with creative reinterpretation. The model demonstrates efficient polygon usage while maintaining visual impact, making it ideal for real-time applications.'
  }
  */
];

/* ===== SCENES & ENVIRONMENTS PROJECTS ===== */
export const sceneProjects = [
  {
    id: 'star-wars-scene',
    title: 'Star Wars Scene',
    thumbnail: '/Images/Scenes/Starwars Scene/Highres-Screenshot00000.png',
    cardPreview: {
      presentation: 'scene',
      glow: '98, 155, 255',
      contribution: 'Environment assembly, lighting, and real-time rendering',
      depth: '5 views · video showcase · Nanite breakdown',
      cta: 'Enter the environment',
      frames: [
        { src: '/Images/Scenes/Starwars Scene/Highres-Screenshot00000.png', label: 'Establishing shot' },
        { src: '/Images/Scenes/Starwars Scene/Highres-Screenshot00003.png', label: 'Atmosphere' },
        { src: '/Images/Scenes/Starwars Scene/Highres-Screenshot00006.png', label: 'Composition' }
      ]
    },
    summary: 'Cinematic environment recreation featuring advanced Unreal Engine 5 technologies including Nanite virtualized geometry.',
    images: [
      '/Images/Scenes/Starwars Scene/Highres-Screenshot00000.png',
      '/Images/Scenes/Starwars Scene/Highres-Screenshot00001.png',
      '/Images/Scenes/Starwars Scene/Highres-Screenshot00003.png',
      '/Images/Scenes/Starwars Scene/Highres-Screenshot00004.png',
      '/Images/Scenes/Starwars Scene/Highres-Screenshot00006.png'
    ],
    coolFeatures: [
      {
        title: 'Nanite Virtualized Geometry',
        description: 'This scene leverages Unreal Engine 5\'s revolutionary Nanite technology, enabling film-quality assets with millions of polygons to be rendered in real-time. The visualization below shows the Nanite mesh complexity, demonstrating how the engine dynamically streams and renders only the geometry detail you can see.',
        image: '/Images/Scenes/Starwars Scene/Highres-Screenshot00002.png',
        icon: '🔷'
      }
    ],
    tags: ['Environment', 'Cinematic', 'Sci-Fi', 'Unreal Engine 5', 'Nanite', 'Real-time Rendering'],
    time: '2 weeks',
    engine: 'Unreal Engine 5',
    type: 'scene',
    videoUrl: 'https://www.youtube.com/watch?v=PMFyZR_8rm8',
    details: 'Immersive Star Wars-inspired environment built in Unreal Engine 5, showcasing cutting-edge real-time rendering techniques and next-generation graphics technology.'
  }
];

/* ===== GAME MECHANICS DATA =====
 * Maps game project IDs to the systems shown in their case study.
 *
 * Writing guide — these strings are read inside a modal, so keep them scannable:
 *   desc      One sentence, ~20 words. What the player experiences. Shown on the grid card.
 *   purpose   Two or three sentences. What the system is, and the one idea that makes it interesting.
 *   structure Labels are concrete, 2-3 words. Each detail is one active sentence, ~25 words max.
 *   flow      4-7 steps. Short active fragments, ~8 words each. No step repeats the structure.
 *   value     One or two plain sentences on why it was built this way. Never restate the structure.
 */
export const mechanicsData = {
  'path-of-embers': [
    {
      icon: '🎲',
      label: 'Roguelike Talent System',
      desc: 'Stackable Common, Rare, and Legendary talents let every run grow into a focused, increasingly powerful build.',
      purpose: 'Every talent reward runs through two wheels that spin together. Each spin pulls 15 candidates out of the talent database — five per rarity — and the rarity that resolves decides which five can actually be won. The player takes one of the two results, and taking the same talent again stacks its effect.',
      visualFlowTitle: 'From reward to build',
      visualFlow: [
        {
          label: 'Trigger the reward',
          caption: 'Filling the reward bar spins the wheels with a randomly resolved rarity.',
          src: '/Images/Path Of Embers/TalentEconomy-CoinThresholds.jpg',
          alt: 'Path of Embers reward bar approaching its full-state talent trigger',
          fit: 'contain'
        },
        {
          label: 'Choose between two',
          caption: 'Both wheels land on a talent of that rarity. The player keeps one.',
          src: '/Images/Path Of Embers/TalentSystem-DualWheels.jpg',
          alt: 'Path of Embers dual Talent Wheels presenting two talents for the player to choose from',
          fit: 'contain'
        },
        {
          label: 'Track every stack',
          caption: 'The pause menu lists the live build and how many times each talent is stacked.',
          src: '/Images/Path Of Embers/TalentSystem-RunBuild.jpg',
          alt: 'Path of Embers pause menu showing active talents and numerical stack counts',
          fit: 'contain'
        }
      ],
      structure: [
        { label: 'Talent database', detail: 'Holds every talent across Common, Rare, and Legendary, along with the presentation and gameplay data the ability system needs.' },
        { label: 'Wheel population', detail: 'Each spin draws five talents from every rarity — 15 candidates in total — and lays them out across both wheels.' },
        { label: 'Rarity gate', detail: 'The rarity that resolves for this spin marks which five of the 15 candidates are valid results.' },
        { label: 'Twin results', detail: 'Both wheels land on an eligible talent, so the player always chooses between two real options.' },
        { label: 'Ability handoff', detail: 'The chosen talent’s data passes to the Player Abilities component, which applies the effect or strengthens it.' },
        { label: 'Build and stacking', detail: 'Taking a talent again stacks it. The pause menu shows every active talent with its stack count, so synergies can be planned rather than stumbled into.' },
        { label: 'Shop override', detail: 'A shop purchase runs the same sequence but supplies the rarity directly instead of rolling for it.' }
      ],
      flow: [
        'Reward bar fills, or the player buys a spin',
        'Five talents drawn from each rarity — 15 candidates',
        'Rarity resolves: random on reward, chosen at the shop',
        'Both wheels spin across all 15 candidates',
        'Each wheel lands on one talent of that rarity',
        'Player keeps one of the two',
        'Player Abilities applies it and the stack count updates'
      ],
      value: 'Talent data, rarity input, wheel presentation, and gameplay effect stay separate, so the reward bar and the shop can drive the same system from opposite ends. The player always sees the build they are assembling, which makes stacking a decision instead of an accident.'
    },
    {
      icon: '🗺️',
      label: 'Performance-Aware Map System',
      desc: 'Only the segments near the player stay loaded, while an advancing fireline decides how long you can afford to keep fighting.',
      purpose: 'The map is 16 authored segments, with a miniboss on 11 and the final boss on 16. Only the two or three nearest the player stay active — everything else unloads, and enemies left far behind despawn with their coins. A meteor fireline creeps forward whenever the player stalls, so the system that protects mobile performance also sets the pace of the run.',
      structure: [
        { label: 'Segment map', detail: 'An ordered list of 16 handcrafted segments, with the miniboss on segment 11 and the final boss on segment 16.' },
        { label: 'Active window', detail: 'Only the two or three segments closest to the player stay loaded as the run advances.' },
        { label: 'Player tracking', detail: 'The player’s position decides which segments, encounters, and enemies are still relevant.' },
        { label: 'Enemy lifecycle', detail: 'Distant enemies have their AI suspended. Ones left far enough behind despawn, and their coins are forfeited for good.' },
        { label: 'Meteor fireline', detail: 'A battle-royale-style wall of meteor fire advances whenever the player lingers, forcing them to keep moving.' },
        { label: 'Second wave', detail: 'Clearing a segment’s first wave summons a second one. Its rewards are only reachable if the clear is fast enough to beat the fireline.' },
        { label: 'Pacing payoff', detail: 'Rushing leaves coins and talents behind; stalling invites the fireline. Fast, tactical clears build the strongest run.' }
      ],
      flow: [
        'Player advances into a new segment',
        'Nearest two or three segments load, the rest unload',
        'Fireline advances if the player stalls',
        'Clearing wave one in time summons wave two',
        'Fight for the extra rewards, or move on',
        'Enemies left behind despawn, their coins forfeited'
      ],
      value: 'One system covers both performance and pacing. Keeping only a few segments live is what holds 60 FPS on mobile, and the fireline turns that same constraint into the central question of every run — how much of a segment can you afford to clear before it is time to move.'
    },
    {
      icon: '🛒',
      label: 'Strategic Talent Economy',
      desc: 'Marked thresholds on the coin bar unlock shop rarities, but filling the bar resets it and spends the progress on a random spin.',
      purpose: 'Coins from every kill fill a bar with visible rarity markers. Cross a marker and that rarity can be bought at the shop with a guaranteed outcome. Let the bar overflow and it resets into a random-rarity spin instead — which makes knowing when not to take a kill part of the game.',
      visualFlowTitle: 'From progress to purchase',
      visualFlow: [
        {
          label: 'Read the thresholds',
          caption: 'Coloured markers show what each rarity costs.',
          src: '/Images/Path Of Embers/TalentEconomy-CoinThresholds.jpg',
          alt: 'Path of Embers coin bar showing colored shop-rarity thresholds',
          fit: 'contain'
        },
        {
          label: 'Protect the balance',
          caption: 'Hold the bar below a fill and reach the shop with the progress intact.',
          src: '/Images/Path Of Embers/TalentEconomy-ShopApproach.jpg',
          alt: 'Path of Embers player approaching the talent shop with stored coin-bar progress',
          fit: 'contain'
        },
        {
          label: 'Choose the outcome',
          caption: 'A purchase feeds the chosen rarity straight into the wheels.',
          src: '/Images/Path Of Embers/TalentEconomy-ShopOptions.jpg',
          alt: 'Path of Embers shop popup offering guaranteed talent rarity choices',
          fit: 'contain'
        }
      ],
      structure: [
        { label: 'Coin bar', detail: 'Coins from defeated enemies fill a single bar that persists for the whole run.' },
        { label: 'Rarity markers', detail: 'Visible thresholds show exactly how much is needed to unlock each rarity at the shop.' },
        { label: 'Guaranteed purchase', detail: 'Buying an unlocked rarity runs the normal wheel sequence with that rarity locked in.' },
        { label: 'Overflow spin', detail: 'Filling the bar completely resets it and spends the progress on a random-rarity spin.' },
        { label: 'Holding the bar', detail: 'Skipping or delaying a kill that would overflow the bar preserves the progress for the shop.' },
        { label: 'Planning ahead', detail: 'Careful spending and kill selection can line up several guaranteed Legendary purchases in a single run.' }
      ],
      flow: [
        'Kills add coins to the bar',
        'Crossing a marker unlocks that shop rarity',
        'Keep fighting, or hold the balance for the shop',
        'Buy a rarity — the wheels spin with it locked in',
        'Or let the bar overflow into a random spin',
        'Repeat, planning kills around the next purchase'
      ],
      value: 'The bar makes the whole economy legible at a glance, and it adds a second question to every enemy beyond whether you can kill it: do you want the coins right now? Planning ahead ends up worth as much as fighting well.'
    },
    {
      icon: '👾',
      label: 'Distinct Enemy Archetypes',
      desc: 'Chaser, Sniper, Bomber, Miniboss, and Final Boss — five archetypes, each forcing a different spacing and target priority.',
      purpose: 'Five enemy types built on one shared combat core. Health, damage, targeting, and activation live in the base, and each archetype overrides only how it moves and attacks — so the Chaser closes distance, the Sniper punishes standing still, and the Bomber takes space away.',
      structure: [
        { label: 'Shared combat core', detail: 'Health, damage, targeting, and activation are handled once and reused by every enemy.' },
        { label: 'Archetype behaviour', detail: 'Chaser, Sniper, and Bomber each override only their own movement and attack rules.' },
        { label: 'Boss extensions', detail: 'The miniboss and final boss build on the same core with their own encounter logic.' },
        { label: 'Distance gating', detail: 'The map system decides when an enemy’s AI runs and when it is suspended.' }
      ],
      flow: [
        'Enemy activates in range',
        'Player evaluated as a target',
        'Archetype rules pick a response',
        'Movement, attack, and feedback resolve'
      ],
      value: 'Keeping the shared combat needs in one place means each archetype is a small, readable set of differences — and each one asks the player a different question.'
    },
    {
      icon: '👑',
      label: 'Distinct Boss Encounters',
      desc: 'The miniboss changes its attack based on whether it can see you; the final boss runs three health bars.',
      purpose: 'Two authored encounters break the normal combat rhythm. The miniboss checks line of sight before every attack — a clear view means a staff fireball, a blocked view means summoned meteors — so cover changes what it does rather than whether it connects. The final boss closes the run across three health bars.',
      structure: [
        { label: 'Fixed placement', detail: 'The map reserves segment 11 for the miniboss and segment 16 for the final boss.' },
        { label: 'Line-of-sight check', detail: 'The miniboss tests whether it currently has a clear view of the player.' },
        { label: 'Conditional attack', detail: 'Clear sight fires a staff fireball; blocked sight summons meteors instead.' },
        { label: 'Final encounter', detail: 'The final boss runs three health bars and its own attack logic as the run’s conclusion.' }
      ],
      flow: [
        'Encounter begins',
        'Position and line of sight evaluated',
        'Attack chosen to match',
        'Damage, health, and encounter state update'
      ],
      value: 'The miniboss reads the player’s position instead of looping one pattern, which makes cover a real tactic. The final boss stretches that pressure across three bars.'
    },
    {
      icon: '🎨',
      label: 'Fully Original Art Pipeline',
      desc: 'Every model, texture, and shader in the game was built in-house in Maya and Blender.',
      purpose: 'A complete internal art pipeline with no store assets. Environments, characters, materials, and the game’s whole visual identity were taken from blockout to final Unity prefab, with the mobile performance budget shaping decisions at every stage.',
      structure: [
        { label: 'Modeling', detail: 'Original meshes built in Maya and Blender, from blockout through final geometry.' },
        { label: 'Surfacing', detail: 'Textures, materials, and shaders authored to hold one consistent handcrafted look.' },
        { label: 'Unity assembly', detail: 'Finished assets become reusable prefabs and environment sets.' },
        { label: 'Mobile budget', detail: 'Geometry, materials, and scene composition are tuned against the target device.' }
      ],
      flow: [
        'Concept and blockout',
        'Modeling and surfacing',
        'Shader and material setup',
        'Unity assembly and mobile tuning'
      ],
      value: 'Owning the whole pipeline let art direction and performance budget move together, instead of colliding late in production.'
    }
  ],
  'slingshot': [
    {
      icon: '⚡',
      label: 'Procedural Generation',
      desc: 'Every race assembles a new course from reusable parts and placement rules.',
      purpose: 'Course layout is generated per race rather than authored. Rules define how much content goes down and how it can be spaced, then the generator builds a route and populates it — so no two races run the same line.',
      structure: [
        { label: 'Layout rules', detail: 'Configuration data sets how many elements appear, how far apart, and in what arrangements.' },
        { label: 'Route builder', detail: 'The generator lays down an ordered path for this race.' },
        { label: 'Content placement', detail: 'Planets, checkpoints, and track elements are positioned along that path.' },
        { label: 'Active course', detail: 'The finished layout is held as the live course until the race ends.' }
      ],
      flow: [
        'Race requested',
        'Rules build a route',
        'Planets and checkpoints placed',
        'Course goes live'
      ],
      value: 'Content and layout rules stay separate, so new races come from configuration instead of hand-built scenes.'
    },
    {
      icon: '🪐',
      label: 'Planetary Gravity Boosts',
      desc: 'Fly close to a planet and its gravity bends your course into free speed.',
      purpose: 'Planets pull on the ship continuously. A close pass converts that pull into both a turn and an acceleration, so the line taken past a planet is the difference between losing time and gaining it.',
      structure: [
        { label: 'Gravity wells', detail: 'Each planet exposes the position and pull strength the flight model reads.' },
        { label: 'Ship response', detail: 'The ship samples nearby gravity and folds the resulting force into its velocity.' },
        { label: 'Angle and distance', detail: 'How close and how sharply you pass decides how much you are redirected and accelerated.' },
        { label: 'Speed feedback', detail: 'Visual and speed cues tell the player the moment a pass actually paid off.' }
      ],
      flow: [
        'Ship enters a planet’s pull',
        'Approach angle and distance measured',
        'Gravity bends velocity',
        'Boost reads back on the HUD'
      ],
      value: 'One force does both jobs, steering and speed, which makes every planet an obstacle and the fastest way past it at the same time.'
    },
    {
      icon: '🚩',
      label: 'Checkpoint Progression',
      desc: 'Checkpoints have to be taken in order, so the generated route is the only route.',
      purpose: 'Ten colour-coded planets act as ordered checkpoints. The race controller only accepts the next expected one, which stops a procedurally generated course from being shortcut straight to the finish.',
      structure: [
        { label: 'Ordered registry', detail: 'Every checkpoint is stored in the order it has to be taken.' },
        { label: 'Next-up state', detail: 'The race controller tracks which checkpoint is currently valid.' },
        { label: 'Entry validation', detail: 'Passing a checkpoint only counts when it is the expected one.' },
        { label: 'HUD update', detail: 'A valid capture advances progress and marks the next target.' }
      ],
      flow: [
        'Ship passes through a checkpoint',
        'Order checked against the expected index',
        'Progress advances on a match',
        'Next checkpoint becomes the target'
      ],
      value: 'Validating the sequence in one place keeps procedural courses honest and makes progress impossible to desync.'
    },
    {
      icon: '🎮',
      label: '6-Axis Flight Controls',
      desc: 'Thrust, strafe, pitch, yaw, and roll — full freedom of movement in every direction.',
      purpose: 'A movement controller that treats translation and rotation as separate problems. Thrust and strafing move the ship, pitch, yaw, and roll aim it, and both resolve through physics so momentum carries the way space flight should.',
      structure: [
        { label: 'Input split', detail: 'Player input is separated into movement commands and rotation commands.' },
        { label: 'Thrust', detail: 'Forward, reverse, and lateral forces move the ship through space.' },
        { label: 'Rotation', detail: 'Pitch, yaw, and roll aim the ship independently of where it is travelling.' },
        { label: 'Physics pass', detail: 'Both sets of commands resolve through the ship’s runtime physics state.' }
      ],
      flow: [
        'Input sampled',
        'Movement and rotation split apart',
        'Forces and torque calculated',
        'Physics state updated'
      ],
      value: 'Separating the axes gives precise aim without killing momentum. Pointing one way while drifting another is exactly what makes a slingshot pass readable.'
    },
    {
      icon: '📺',
      label: 'HUD Feedback',
      desc: 'Live speed and checkpoint state, readable without looking away from the flight.',
      purpose: 'A presentation layer that reads race state and turns it into cues the player can absorb at speed. The HUD listens for changes rather than the flight code pushing updates into it, so neither side depends on the other.',
      structure: [
        { label: 'Telemetry', detail: 'The ship and race controller expose speed, current checkpoint, and completion.' },
        { label: 'HUD presenter', detail: 'Interface components turn those raw values into readable screen elements.' },
        { label: 'Change events', detail: 'Important state changes notify the HUD without wiring UI into flight logic.' },
        { label: 'Cues', detail: 'Visual response reinforces acceleration, checkpoint capture, and the finish.' }
      ],
      flow: [
        'Race state changes',
        'New values published',
        'HUD elements react',
        'Player gets instant confirmation'
      ],
      value: 'Decoupling the HUD from flight keeps both sides simple, and gives the player confirmation fast enough to act on at racing speed.'
    },
    {
      icon: '🛸',
      label: 'Scalable Track System',
      desc: 'Built to grow — unlimited planets, more checkpoints, and curved routes.',
      purpose: 'Planets and checkpoints are configurable building blocks placed against a generated path rather than a fixed scene. Adding more content, or curving the route, never requires touching the race controller.',
      structure: [
        { label: 'Reusable elements', detail: 'Planets and checkpoints are configurable pieces, not scene-specific objects.' },
        { label: 'Path data', detail: 'The route is stored as ordered spatial data, so a curved layout is just different data.' },
        { label: 'Placement layer', detail: 'Elements are positioned relative to the path instead of hardcoded into a scene.' },
        { label: 'Room to grow', detail: 'New content slots in without rebuilding race progression.' }
      ],
      flow: [
        'Track configuration chosen',
        'Path defined',
        'Reusable elements populate the route',
        'Course registered with race progression'
      ],
      value: 'The track foundation scales on its own, so course size and variety can grow without the flight or checkpoint systems changing.'
    }
  ],
  'Ricochet': [
    {
      icon: '🔄',
      label: 'Alternating Roles',
      desc: 'Each round you swap between striker and goalie, and the AI always takes the other side.',
      purpose: 'The match controller owns the round and assigns both roles fresh each time. Player input is routed to whichever controller matches the current role and the AI picks up the other, so a single match tests attacking and defending in turn.',
      structure: [
        { label: 'Match state', detail: 'The match controller holds the round, score, timer, and who is playing which role.' },
        { label: 'Role assignment', detail: 'Each round puts the player and the AI on opposite responsibilities.' },
        { label: 'Input routing', detail: 'Player input goes to the controller for the role they currently hold.' },
        { label: 'Round swap', detail: 'When a round ends the roles trade and the next one begins.' }
      ],
      flow: [
        'Round starts',
        'Player and AI take opposite roles',
        'Input routes to the matching controller',
        'Round ends, roles swap'
      ],
      value: 'One arena, one scoring system, and one round loop cover two completely different skill tests.'
    },
    {
      icon: '🎯',
      label: 'Physics-Driven Gameplay',
      desc: 'Shots ricochet off bumpers and walls, so no two rallies play out the same way.',
      purpose: 'Nothing about the ball’s path is authored. A strike sets it moving, and walls, speed bumpers, and the next contact keep reshaping the trajectory until someone saves it or it finds the goal.',
      structure: [
        { label: 'Ball state', detail: 'The ball carries the velocity and collision state that drives the whole rally.' },
        { label: 'Surfaces', detail: 'Arena walls and speed bumpers redirect it through their own physical response.' },
        { label: 'Player contact', detail: 'A striker’s hit is what starts a shot or turns one around.' },
        { label: 'Goal detection', detail: 'Crossing the goal boundary resolves the rally and reports the result to match state.' }
      ],
      flow: [
        'Striker hits the ball',
        'Physics carries the trajectory',
        'Walls and bumpers redirect it',
        'Save, return, or goal ends the exchange'
      ],
      value: 'Letting physics own the ball produces rallies nobody scripted, including the ones the shooter never intended.'
    },
    {
      icon: '🎮',
      label: 'Pong-Style Goalie Movement',
      desc: 'The goalie slides along a single line, so defending comes down to reading and reacting.',
      purpose: 'The goalkeeper is deliberately limited to one axis. Taking positioning out of the equation leaves anticipation and reaction speed as the entire skill, and it keeps the role simple enough for the AI to play convincingly on the rounds the player is not.',
      structure: [
        { label: 'Separate input', detail: 'Goalkeeper controls are isolated from the striker scheme.' },
        { label: 'One axis', detail: 'Movement is projected onto the vertical defensive line.' },
        { label: 'Goal clamp', detail: 'Position limits keep the keeper inside the valid goal area.' },
        { label: 'Shared with AI', detail: 'The same defensive role runs from player input or AI decisions without changing.' }
      ],
      flow: [
        'Defensive input received',
        'Movement locked to one axis',
        'Position clamped to the goal',
        'Keeper intercepts, or does not'
      ],
      value: 'A player understands the role inside one round, and the same constraint is what lets the AI defend believably.'
    },
    {
      icon: '💥',
      label: 'Reactive Ball Effects',
      desc: 'The ball recolours and throws sparks on impact, so a rally can be read at a glance.',
      purpose: 'The ball reports its collisions instead of drawing its own reactions. A presentation layer picks up those events and answers with colour changes and sparks, which keeps movement logic clean and makes a hard hit look different from a soft one.',
      structure: [
        { label: 'Collision events', detail: 'The ball publishes impacts rather than embedding visuals inside its movement code.' },
        { label: 'Colour state', detail: 'Ball colour reflects who last touched it and what state the rally is in.' },
        { label: 'Impact bursts', detail: 'Contact events fire sparks and other short-lived reactions.' },
        { label: 'Intensity scaling', detail: 'Effects respond to the type and strength of the collision.' }
      ],
      flow: [
        'Collision registers',
        'Impact classified',
        'Colour and effects update',
        'Player reads the result instantly'
      ],
      value: 'Splitting presentation from physics keeps movement simple and turns every rebound into information the player can act on.'
    },
    {
      icon: '🌈',
      label: 'Arcade Neon Visuals',
      desc: 'Emissive materials and bloom give the arena its neon identity and keep it readable at speed.',
      purpose: 'One shared material language runs across the arena and both players. Team colour comes from gameplay state, lighting and bloom push the bright elements off a dark field, and the whole look doubles as a readability system.',
      structure: [
        { label: 'Material language', detail: 'Reusable emissive materials treat the arena and the players consistently.' },
        { label: 'Colour from state', detail: 'Sides and roles drive the colours the visuals use.' },
        { label: 'Lighting and bloom', detail: 'Scene lighting lifts emissive elements off a darker field.' },
        { label: 'Readability first', detail: 'Emphasis separates active objects, boundaries, and scoring moments.' }
      ],
      flow: [
        'Gameplay state supplies the context',
        'Materials take the matching colours',
        'Lighting and bloom reinforce them',
        'Arena stays readable at match speed'
      ],
      value: 'The look and the readability come out of the same system — the arcade identity is exactly what makes the action easy to follow.'
    },
    {
      icon: '🔊',
      label: 'Immersive Feedback',
      desc: 'Every hit, save, and goal answers back with matched visual effects and sound.',
      purpose: 'Gameplay events publish what happened, and a feedback layer decides how it looks and sounds. Because both responses come off the same event, visuals and audio can never drift out of sync with the play.',
      structure: [
        { label: 'Gameplay events', detail: 'Hits, bumper contacts, saves, and goals publish what just happened.' },
        { label: 'Feedback routing', detail: 'A presentation layer maps each event to the right response.' },
        { label: 'Visuals', detail: 'Sparks, flashes, and goal effects sell the impact.' },
        { label: 'Audio', detail: 'Sound communicates contact type, intensity, and scoring.' }
      ],
      flow: [
        'Gameplay event resolves',
        'Feedback request emitted',
        'VFX and SFX selected',
        'Both play together'
      ],
      value: 'Driving everything from one event keeps visuals and audio locked together, so every important moment lands with weight.'
    }
  ],
  /*
  'foxs-tale': [
    { icon: '🕹️', label: 'Jump-to-Eliminate Combat', desc: 'Defeat enemies by landing on them, classic platformer style.' },
    { icon: '🛠️', label: 'Environmental Interactables', desc: 'Use levers, moving platforms, or traps to eliminate enemies or clear obstacles.' },
    { icon: '💀', label: 'Limited Lives System', desc: 'Two lives per level; losing both restarts the stage from the beginning.' },
    { icon: '🎯', label: 'Precision Platforming', desc: 'Responsive jump and movement physics for fluid control.' },
    { icon: '🔔', label: 'Visual Feedback', desc: 'Clear cues for lives, enemy states, and interactable objects.' }
  ]
  */
};
