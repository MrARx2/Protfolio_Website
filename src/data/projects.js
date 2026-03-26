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
    summary: "Path of Embers is a fast-paced roguelike action mobile game where you battle through unique, procedurally generated arenas. Master combat and movement, adapt to new hazards in every run, and experience fluid 60 FPS gameplay built entirely from scratch.",
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
    tags: ["Roguelike", "Fantasy", "Action", "Mobile"],
    youtube: "https://www.youtube.com/watch?v=dq5IcuCCCZE",
    details: "Path of Embers is a fast-paced roguelike action mobile game where players battle through procedurally generated arenas, mastering combat, movement, and strategic decision-making. Each run introduces a new layout filled with enemies, hazards, and opportunities, encouraging players to adapt and refine their approach with every attempt. Designed for a smooth and responsive 60 FPS experience, the game emphasizes performance, precision, and fluid gameplay on mobile devices.\n\nAll assets were created from scratch, including 3D models, visual effects, audio, and gameplay systems, resulting in a cohesive and fully original experience. Built with scalability in mind, Path of Embers supports expanding content, more complex encounters, and deeper mechanics, offering strong potential for future development and replayability.",
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
    engine: "Unreal Engine 5.5.4"
  },
  {
    id: "slingshot",
    title: "Slingshot",
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
    engine: "Unity 6"
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
    { icon: '⚔️', label: 'Procedural Arena Generation', desc: 'Each run features dynamically generated arenas, ensuring unique combat scenarios every playthrough.' },
    { icon: '🔥', label: 'Action Combat System', desc: 'Fast-paced, responsive combat focused on movement, timing, and positioning against multiple enemies.' },
    { icon: '🧠', label: 'Dynamic AI Behavior', desc: 'Enemies react and adapt to the player, creating unpredictable and engaging encounters.' },
    { icon: '📈', label: 'Run-Based Progression', desc: 'Progress through each run by overcoming encounters, improving skill, and adapting strategies on the fly.' },
    { icon: '🎮', label: 'Mobile-Optimized Controls', desc: 'Designed for smooth and intuitive input, delivering a consistent and responsive 60 FPS gameplay experience.' },
    { icon: '🛠️', label: 'Fully Original Assets Pipeline', desc: 'All visuals, audio, and systems were built from scratch, ensuring a cohesive and scalable foundation for future expansion.' }
  ],
  'slingshot': [
    { icon: '⚡', label: 'Procedural Generation', desc: 'Levels and content are generated uniquely each playthrough.' },
    { icon: '🪐', label: 'Planetary Gravity Boosts', desc: 'Gain speed by slingshotting around planets.' },
    { icon: '🚩', label: 'Checkpoint Progression', desc: 'Pass checkpoints in sequence to advance.' },
    { icon: '🎮', label: '6-Axis Flight Controls', desc: 'Forward/backward thrust, strafing, and rolling.' },
    { icon: '📺', label: 'HUD Feedback', desc: 'Real-time speed and checkpoint completion.' },
    { icon: '🛸', label: 'Scalable Track System', desc: 'Designed for unlimited planets and curved track paths.' }
  ],
  'Ricochet': [
    { icon: '🔄', label: 'Alternating Roles', desc: 'Switch between striker and goalie each round, with the other role controlled by AI.' },
    { icon: '🎯', label: 'Physics-Driven Gameplay', desc: 'Shots bounce unpredictably off bumpers and walls.' },
    { icon: '🎮', label: 'Pong-Style Goalie Movement', desc: 'Defend along a vertical line using quick reflexes.' },
    { icon: '💥', label: 'Reactive Ball Effects', desc: 'Ball changes color and sparks on impact.' },
    { icon: '🌈', label: 'Arcade Neon Visuals', desc: 'Emissive environments and players for a high-energy feel.' },
    { icon: '🔊', label: 'Immersive Feedback', desc: 'Dynamic VFX and SFX for every hit and goal.' }
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
