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
 * Maps game project IDs to their mechanics/features
 * Each mechanic has: icon, label, and description
 */
export const mechanicsData = {
  'path-of-embers': [
    {
      icon: '🎲',
      label: 'Roguelike Talent System',
      desc: 'Each run is shaped by stackable Common, Rare, and Legendary talents, enabling focused synergies and increasingly powerful builds.',
      purpose: 'A data-driven reward system built around two synchronized Talent Wheels. Each spin randomly draws 15 talents from a larger database, with five displayed candidates per rarity. The resolved rarity determines which five are eligible, and every acquired talent can be stacked to strengthen the player\'s build throughout the run.',
      visualFlowTitle: 'From reward to build',
      visualFlow: [
        {
          label: 'Trigger the reward',
          caption: 'Filling the reward bar can begin the standard sequence with a randomly resolved rarity.',
          src: '/Images/Path Of Embers/TalentEconomy-CoinThresholds.jpg',
          alt: 'Path of Embers reward bar approaching its full-state talent trigger',
          fit: 'contain'
        },
        {
          label: 'Choose between two',
          caption: 'The synchronized wheels each resolve one valid talent from the five candidates belonging to the selected rarity.',
          src: '/Images/Path Of Embers/TalentSystem-DualWheels.jpg',
          alt: 'Path of Embers dual Talent Wheels presenting two talents for the player to choose from',
          fit: 'contain'
        },
        {
          label: 'Track every stack',
          caption: 'The pause menu shows the active run build and numerical stack counts for deliberate future choices.',
          src: '/Images/Path Of Embers/TalentSystem-RunBuild.jpg',
          alt: 'Path of Embers pause menu showing active talents and numerical stack counts',
          fit: 'contain'
        }
      ],
      structure: [
        { label: 'Talent Database', detail: 'Organizes the complete talent catalog across Common, Rare, and Legendary tiers, including the presentation and gameplay data required by the Player Abilities component.' },
        { label: 'Random Wheel Population', detail: 'At the start of each spin, five talents are randomly drawn from every rarity tier. These 15 temporary candidates are positioned on the two wheels for the synchronized presentation.' },
        { label: 'Rarity Eligibility', detail: 'The resolved rarity identifies which five of the 15 displayed talents are valid results for the current spin.' },
        { label: 'Synchronized Selection', detail: 'Each wheel resolves one talent from the five eligible options, producing the two choices shown to the player.' },
        { label: 'Player Abilities Middleware', detail: 'After the player chooses one of the two talents from the selected rarity, its data is sent to the Player Abilities component for application.' },
        { label: 'Run Build & Stacking', detail: 'The pause menu displays every talent currently active in the run together with its numerical stack count. Because each talent can be selected again to strengthen its effect, players can track their build precisely and plan focused stacks and ability synergies.' },
        { label: 'Shop Rarity Input', detail: 'A shop purchase starts the same dual-wheel sequence with a deterministic rarity based on the tier selected by the player, replacing only the random rarity decision.' }
      ],
      flow: ['A new talent reward or shop spin is requested', 'Five talents are randomly drawn from each rarity tier', 'The 15 selected talents are placed into the dual-wheel presentation', 'The rarity is selected randomly for a reward or supplied deterministically by the shop purchase', 'Both wheels spin together while displaying the 15 temporary candidates', 'The selected rarity limits valid results to its five matching talents', 'Each wheel selects one eligible talent, creating two choices', 'The player chooses one of the two talents', 'Player Abilities applies the talent or strengthens its existing stack', 'The pause menu updates the active talent and its numerical stack count'],
      value: 'The system separates talent data, rarity input, dual-wheel presentation, and gameplay application while keeping the resulting build visible to the player. This supports deliberate stacking, stronger synergies, and more informed choices throughout each run.'
    },
    {
      icon: '🗺️',
      label: 'Performance-Aware Map System',
      desc: 'Maintains nearby map segments, despawns abandoned enemies, and balances two-wave rewards against an advancing meteor fireline.',
      purpose: 'A runtime map and encounter system that maintains only the two or three segments nearest the player across a 16-part authored map. Abandoned enemies despawn while a battle-royale-style meteor fireline prevents stagnation, creating a deliberate balance between forward momentum, tactical clearing, and player power.',
      structure: [
        { label: 'Segment Registry', detail: 'An ordered array defines the complete 16-segment map, with the miniboss encounter at segment 11 and final boss at segment 16.' },
        { label: 'Active Segment Window', detail: 'Only the two or three segments nearest the player remain active as the run progresses.' },
        { label: 'Player Tracking', detail: 'The system follows the player’s location to determine which segments, encounters, and enemies remain relevant.' },
        { label: 'Enemy Lifecycle', detail: 'Distant enemy AI is suspended, and enemies left too far behind are despawned. Their remaining coin rewards are permanently forfeited.' },
        { label: 'Advancing Meteor Fireline', detail: 'A battle-royale-style line of meteor-filled fire advances when the player remains in one area for too long, preventing stagnation and forcing continued movement through the map.' },
        { label: 'Two-Wave Encounters', detail: 'Fully clearing a segment’s first enemy wave triggers a second wave. Its additional rewards can only be secured when the player clears quickly and tactically before the fireline forces them forward.' },
        { label: 'Progression Through Pacing', detail: 'Rushing skips coins and talent opportunities, while lingering too long invites the fireline. Efficient tactical clears provide the strongest build without sacrificing forward momentum.' }
      ],
      flow: ['The player enters or advances into a map segment', 'The required two or three nearby segments are calculated', 'Relevant segments and their enemy encounters remain active', 'The meteor fireline advances if the player stagnates for too long', 'Clearing the first wave quickly enough triggers the segment’s second wave', 'The player fights for its additional rewards or advances before pressure overtakes them', 'Enemies left beyond the supported distance are despawned and can no longer provide coins', 'Distant map segments and unnecessary runtime activity are removed', 'Efficient tactical clearing strengthens the player while maintaining the required pace'],
      value: 'The system creates a controlled pacing window while preserving stable mobile performance. Rushing forfeits combat rewards and leaves the player weaker, but lingering triggers the advancing fireline. The strongest runs come from clearing segments quickly and tactically, earning second-wave rewards while distant environments and abandoned enemies are removed from active play.'
    },
    {
      icon: '🛒',
      label: 'Strategic Talent Economy',
      desc: 'Visible coin-bar thresholds unlock targeted shop purchases, while overflowing the bar resets it and triggers a random-rarity Talent Wheel spin.',
      purpose: 'A threshold-based economy that turns enemy rewards into strategic talent decisions. Visible markers on the coin bar show when each shop rarity becomes available, while filling the bar trades that control for an immediate random-rarity reward.',
      visualFlowTitle: 'From progress to purchase',
      visualFlow: [
        {
          label: 'Read the thresholds',
          caption: 'Colored markers communicate when each rarity becomes eligible for purchase.',
          src: '/Images/Path Of Embers/TalentEconomy-CoinThresholds.jpg',
          alt: 'Path of Embers coin bar showing colored shop-rarity thresholds',
          fit: 'contain'
        },
        {
          label: 'Protect the balance',
          caption: 'The player can preserve the bar and approach the shop without triggering an overflow.',
          src: '/Images/Path Of Embers/TalentEconomy-ShopApproach.jpg',
          alt: 'Path of Embers player approaching the talent shop with stored coin-bar progress',
          fit: 'contain'
        },
        {
          label: 'Choose the outcome',
          caption: 'An eligible shop purchase supplies the chosen rarity to the normal dual-wheel system.',
          src: '/Images/Path Of Embers/TalentEconomy-ShopOptions.jpg',
          alt: 'Path of Embers shop popup offering guaranteed talent rarity choices',
          fit: 'contain'
        }
      ],
      structure: [
        { label: 'Coin Bar', detail: 'Coins earned from defeated enemies accumulate inside a persistent progress bar during the run.' },
        { label: 'Rarity Thresholds', detail: 'Visible markers identify the amount required to become eligible to purchase each talent rarity.' },
        { label: 'Deterministic Shop Spin', detail: 'Buying an eligible rarity starts the normal dual-wheel sequence with the player’s purchased rarity supplied as its deterministic input.' },
        { label: 'Overflow Reward', detail: 'Filling the bar completely resets it and starts the normal Talent Wheel sequence with a randomly selected rarity.' },
        { label: 'Overflow Control', detail: 'Players can avoid or delay an enemy kill when its reward would fill the bar, preserving their progress for an upcoming shop.' },
        { label: 'Repeatable Strategy', detail: 'Careful spending and encounter choices can secure multiple guaranteed Legendary talent opportunities during a single run.' }
      ],
      flow: ['Defeated enemies add coins to the bar', 'Crossing a marked threshold unlocks its corresponding shop rarity', 'The player continues fighting or preserves the current balance', 'At the shop, an eligible rarity can be purchased', 'The purchased rarity is supplied deterministically to the Talent Wheel', 'If the bar fills first, it resets and triggers a random-rarity spin', 'The cycle continues, allowing skilled players to plan multiple high-rarity purchases'],
      value: 'The bar makes currency management readable while giving every enemy encounter strategic weight. Players balance immediate random rewards against preserving progress for guaranteed shop outcomes, rewarding planning as much as combat performance.'
    },
    {
      icon: '👾',
      label: 'Distinct Enemy Archetypes',
      desc: 'Five specialized enemies include the Chaser, Sniper, Bomber, Miniboss, and Final Boss. Each creates different threats and combat priorities throughout the run.',
      purpose: 'A collection of five enemy archetypes designed around different movement, spacing, and target-priority pressures.',
      structure: [
        { label: 'Shared combat responsibilities', detail: 'Common enemy needs such as health, damage, targeting, and activation form the foundation of each archetype.' },
        { label: 'Specialized behaviour', detail: 'Chaser, Sniper, and Bomber enemies each own distinct movement and attack rules.' },
        { label: 'Encounter-specific AI', detail: 'The miniboss and final boss extend the combat structure with dedicated encounter logic.' },
        { label: 'Distance control', detail: 'The map system determines when enemy AI should remain active or be suspended.' }
      ],
      flow: ['Enemy becomes active', 'The player is evaluated as a target', 'Archetype conditions select a response', 'Movement, attack, damage, and feedback are resolved'],
      value: 'Separating shared combat needs from specialized behaviour keeps enemy logic readable while allowing every archetype to create a different tactical problem.'
    },
    {
      icon: '👑',
      label: 'Distinct Boss Encounters',
      desc: 'The miniboss fires a fireball from its staff when the player is visible and summons meteors when line of sight is blocked. The final boss has three health bars and serves as the run’s ultimate challenge.',
      purpose: 'Two authored encounters interrupt the regular combat rhythm with stronger enemies and dedicated attack logic.',
      structure: [
        { label: 'Encounter placement', detail: 'The map sequence reserves segment 11 for the miniboss and segment 16 for the final boss.' },
        { label: 'Visibility decision', detail: 'The miniboss checks whether it currently has direct line of sight to the player.' },
        { label: 'Conditional attacks', detail: 'Clear sight triggers a staff-fired fireball, while blocked sight triggers a meteor summon.' },
        { label: 'Final encounter state', detail: 'The final boss uses three health bars and its own encounter behaviour to conclude the run.' }
      ],
      flow: ['Boss encounter begins', 'Player position and visibility are evaluated', 'An appropriate attack is selected', 'Attack, health, and encounter state are updated'],
      value: 'The miniboss reacts to player positioning instead of repeating one pattern, while the final boss creates a longer and more demanding conclusion.'
    },
    {
      icon: '🎨',
      label: 'Fully Original Art Pipeline',
      desc: 'Every environment uses original models, textures, and shaders created in Maya and Blender, giving the game a cohesive, handcrafted visual identity.',
      purpose: 'A complete internal production pipeline for creating the environments, characters, materials, and visual identity of the game.',
      structure: [
        { label: 'Source creation', detail: 'Original models are developed in Maya and Blender from blockout through final geometry.' },
        { label: 'Surface development', detail: 'Textures, materials, and shaders establish a consistent handcrafted visual language.' },
        { label: 'Engine integration', detail: 'Finished assets are assembled into reusable Unity prefabs and environment sets.' },
        { label: 'Mobile presentation', detail: 'Geometry, materials, and scene composition are prepared with the target device performance in mind.' }
      ],
      flow: ['Concept and blockout', 'Modeling and surface creation', 'Shader and material setup', 'Unity integration and mobile refinement'],
      value: 'Developing the visuals internally allowed the artistic direction and technical requirements to evolve together as one cohesive production pipeline.'
    }
  ],
  'slingshot': [
    {
      icon: '⚡', label: 'Procedural Generation', desc: 'Levels and content are generated uniquely each playthrough.',
      purpose: 'A generation layer that assembles a fresh race layout from reusable track content and placement rules.',
      structure: [
        { label: 'Generation rules', detail: 'Configuration data defines the amount, spacing, and allowable arrangement of track content.' },
        { label: 'Path builder', detail: 'The generator creates an ordered route for the current race.' },
        { label: 'Content placement', detail: 'Planets, checkpoints, and track elements are positioned along the generated path.' },
        { label: 'Run state', detail: 'The completed layout is stored as the active course until the race ends.' }
      ],
      flow: ['A new race is requested', 'Generation rules build a route', 'Course elements are placed', 'The finished layout becomes playable'],
      value: 'Separating reusable content from generation rules creates replayable courses without requiring every layout to be authored by hand.'
    },
    {
      icon: '🪐', label: 'Planetary Gravity Boosts', desc: 'Gain speed by slingshotting around planets.',
      purpose: 'A flight-physics interaction that converts close planetary approaches into changes in direction and speed.',
      structure: [
        { label: 'Gravity source', detail: 'Each planet exposes the position and influence used by the flight calculation.' },
        { label: 'Ship physics', detail: 'The ship evaluates nearby gravity and applies the resulting force to its movement.' },
        { label: 'Velocity response', detail: 'Approach angle and distance affect how strongly the ship is redirected or accelerated.' },
        { label: 'Feedback layer', detail: 'Speed and visual feedback communicate when the maneuver produces a useful boost.' }
      ],
      flow: ['Ship enters planetary influence', 'Direction and distance are evaluated', 'Gravity modifies velocity', 'The resulting boost is shown to the player'],
      value: 'Using the same force for navigation and acceleration turns planets into both obstacles and opportunities for skilled routing.'
    },
    {
      icon: '🚩', label: 'Checkpoint Progression', desc: 'Pass checkpoints in sequence to advance.',
      purpose: 'An ordered validation system that ensures players follow the generated course rather than skipping directly to the finish.',
      structure: [
        { label: 'Checkpoint registry', detail: 'Every checkpoint is stored in the intended completion order.' },
        { label: 'Progress state', detail: 'The race controller tracks the next valid checkpoint index.' },
        { label: 'Trigger validation', detail: 'A checkpoint only advances progress when it matches the expected entry.' },
        { label: 'UI notification', detail: 'Successful progress updates the HUD and prepares the next objective.' }
      ],
      flow: ['Ship enters a checkpoint', 'Its order is validated', 'Race progress advances', 'The next checkpoint becomes active'],
      value: 'Centralized sequence validation keeps procedural courses readable and prevents progress from becoming inconsistent.'
    },
    {
      icon: '🎮', label: '6-Axis Flight Controls', desc: 'Forward/backward thrust, strafing, and rolling.',
      purpose: 'A full spatial movement controller supporting thrust, strafing, pitch, yaw, and roll.',
      structure: [
        { label: 'Input mapping', detail: 'Player inputs are separated into translation and rotation commands.' },
        { label: 'Thrust controller', detail: 'Forward, reverse, and lateral forces control the ship’s position.' },
        { label: 'Rotation controller', detail: 'Pitch, yaw, and roll inputs control orientation independently.' },
        { label: 'Physics integration', detail: 'Movement commands are applied through the ship’s runtime physics state.' }
      ],
      flow: ['Input is sampled', 'Translation and rotation are separated', 'Forces and torque are calculated', 'The ship physics state is updated'],
      value: 'Separating movement axes produces precise control while preserving the momentum and freedom expected from space flight.'
    },
    {
      icon: '📺', label: 'HUD Feedback', desc: 'Real-time speed and checkpoint completion.',
      purpose: 'A presentation layer that translates live race state into immediate, readable player feedback.',
      structure: [
        { label: 'Telemetry source', detail: 'The ship and race controller expose speed, checkpoint, and completion data.' },
        { label: 'HUD presenter', detail: 'Interface components convert runtime values into readable screen elements.' },
        { label: 'State events', detail: 'Important changes notify the HUD without coupling interface logic to flight behaviour.' },
        { label: 'Feedback cues', detail: 'Visual changes reinforce acceleration, checkpoint capture, and race completion.' }
      ],
      flow: ['Gameplay state changes', 'Current values are exposed', 'HUD elements update', 'Player receives immediate confirmation'],
      value: 'Clear feedback lets players make high-speed decisions without taking attention away from flight.'
    },
    {
      icon: '🛸', label: 'Scalable Track System', desc: 'Designed for unlimited planets and curved track paths.',
      purpose: 'A reusable track architecture that supports expanding the number of planets, checkpoints, and curved route configurations.',
      structure: [
        { label: 'Reusable course elements', detail: 'Planets and checkpoints are treated as configurable building blocks.' },
        { label: 'Path representation', detail: 'The route stores ordered spatial information for curved course layouts.' },
        { label: 'Placement layer', detail: 'Track elements are positioned against the generated path rather than a fixed scene.' },
        { label: 'Expansion rules', detail: 'Additional content can be introduced without rebuilding the race controller.' }
      ],
      flow: ['Track configuration is selected', 'A path is defined', 'Reusable elements populate the route', 'The course is registered with race progression'],
      value: 'A modular track foundation allows course scale and variety to grow independently from the core flight and checkpoint systems.'
    }
  ],
  'Ricochet': [
    {
      icon: '🔄', label: 'Alternating Roles', desc: 'Switch between striker and goalie each round, with the other role controlled by AI.',
      purpose: 'A round-state system that alternates the player between striker and goalkeeper while assigning the remaining role to AI.',
      structure: [
        { label: 'Match state', detail: 'The match controller owns the current round, score, timer, and active role.' },
        { label: 'Role assignment', detail: 'Each round maps the player and AI to opposite gameplay responsibilities.' },
        { label: 'Input routing', detail: 'Player input is directed to the controller belonging to the current role.' },
        { label: 'Round transition', detail: 'Role ownership is swapped when a round finishes and the next state begins.' }
      ],
      flow: ['Round begins', 'Player and AI roles are assigned', 'Role-specific controllers receive input', 'Round ends and assignments swap'],
      value: 'One match can test two different skill sets while reusing the same arena, scoring, and round-management foundation.'
    },
    {
      icon: '🎯', label: 'Physics-Driven Gameplay', desc: 'Shots bounce unpredictably off bumpers and walls.',
      purpose: 'A collision-driven ball system where walls, bumpers, and player hits continuously reshape the shot trajectory.',
      structure: [
        { label: 'Ball physics', detail: 'The ball carries the velocity and collision state used throughout a rally.' },
        { label: 'Collision surfaces', detail: 'Arena walls and bumpers modify direction through their physical response.' },
        { label: 'Player impact', detail: 'Striker contact adds the force that begins or redirects the shot.' },
        { label: 'Scoring boundary', detail: 'Goal detection resolves the rally and reports the result to match state.' }
      ],
      flow: ['Player strikes the ball', 'Physics advances its trajectory', 'Surfaces redirect momentum', 'A save, return, or goal resolves the exchange'],
      value: 'Systemic rebounds create expressive shots and unexpected rallies without requiring authored ball paths.'
    },
    {
      icon: '🎮', label: 'Pong-Style Goalie Movement', desc: 'Defend along a vertical line using quick reflexes.',
      purpose: 'A constrained goalkeeper controller designed for fast, readable vertical defense.',
      structure: [
        { label: 'Role input', detail: 'Goalkeeper input is isolated from the striker control scheme.' },
        { label: 'Axis constraint', detail: 'Movement is projected onto the permitted vertical defensive line.' },
        { label: 'Boundary clamp', detail: 'Position limits keep the goalkeeper inside the valid goal area.' },
        { label: 'AI compatibility', detail: 'The same defensive responsibility can be driven by player or AI decisions.' }
      ],
      flow: ['Defensive input is received', 'Movement is restricted to one axis', 'Position is clamped', 'Goalkeeper intercepts or misses the shot'],
      value: 'The restricted movement model is immediately understandable and shifts the challenge toward anticipation and reaction speed.'
    },
    {
      icon: '💥', label: 'Reactive Ball Effects', desc: 'Ball changes color and sparks on impact.',
      purpose: 'An event-driven feedback layer that changes the ball’s presentation whenever meaningful contact occurs.',
      structure: [
        { label: 'Collision events', detail: 'The ball reports impacts without embedding every visual response inside its movement logic.' },
        { label: 'Visual state', detail: 'Ball color reflects its current gameplay or ownership state.' },
        { label: 'Impact effects', detail: 'Contact events trigger sparks and other short-lived reactions.' },
        { label: 'Feedback scaling', detail: 'Effect intensity can respond to the type or strength of the collision.' }
      ],
      flow: ['Collision occurs', 'Impact data is classified', 'Ball state and effects update', 'The player reads the result immediately'],
      value: 'Separating physics from presentation keeps movement logic focused while making every rebound easier and more satisfying to read.'
    },
    {
      icon: '🌈', label: 'Arcade Neon Visuals', desc: 'Emissive environments and players for a high-energy feel.',
      purpose: 'A coordinated visual system using emissive materials, team color, and post-processing to establish the arena’s arcade identity.',
      structure: [
        { label: 'Material language', detail: 'Reusable emissive materials provide consistent treatment across the arena and players.' },
        { label: 'Team color binding', detail: 'Gameplay roles and sides drive the colors used by relevant visual elements.' },
        { label: 'Lighting response', detail: 'Scene lighting and bloom reinforce bright gameplay elements against a darker field.' },
        { label: 'Readability rules', detail: 'Visual emphasis distinguishes active objects, boundaries, and scoring moments.' }
      ],
      flow: ['Gameplay state supplies visual context', 'Materials receive the relevant colors', 'Lighting and bloom reinforce emission', 'The arena remains readable at match speed'],
      value: 'A shared visual language gives the project a distinctive identity while making teams, objects, and interactions easier to recognize.'
    },
    {
      icon: '🔊', label: 'Immersive Feedback', desc: 'Dynamic VFX and SFX for every hit and goal.',
      purpose: 'A coordinated response system that connects gameplay events to visual effects, sound, and match reactions.',
      structure: [
        { label: 'Gameplay events', detail: 'Hits, bumper contacts, saves, and goals publish meaningful interaction results.' },
        { label: 'Feedback routing', detail: 'A presentation layer translates each event into the appropriate response.' },
        { label: 'Visual response', detail: 'Sparks, flashes, and goal effects reinforce impact and success.' },
        { label: 'Audio response', detail: 'Sound cues communicate contact type, intensity, and scoring outcomes.' }
      ],
      flow: ['Gameplay event is resolved', 'Feedback request is emitted', 'VFX and SFX are selected', 'Synchronized responses play'],
      value: 'Driving feedback from gameplay events keeps the systems synchronized and gives every important action a clear sense of weight.'
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
