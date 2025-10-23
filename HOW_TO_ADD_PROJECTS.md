# How to Add New Projects to Your Portfolio

This guide shows you exactly where and how to add new projects to your portfolio website.

---

## 📁 File Location

All project data is stored in **ONE file**:

```
src/data/projects.js
```

Open this file to add or edit projects.

---

## 🎮 Adding a Game Project (Featured/Games Section)

### Step 1: Open the File

Navigate to: `src/data/projects.js`

### Step 2: Find the Games Array

Look for this section (around line 3):

```javascript
export const featuredProjects = [
  // Your game projects go here
];
```

### Step 3: Add Your Game Project

Copy this template and paste it inside the `featuredProjects` array:

```javascript
{
  id: 'your-game-id',                    // Unique ID (lowercase, no spaces)
  title: 'Your Game Title',              // Display name
  summary: 'Brief description of your game.',
  images: [
    'https://your-image-url-1.jpg',      // Screenshot 1
    'https://your-image-url-2.jpg',      // Screenshot 2
    'https://your-image-url-3.jpg'       // Screenshot 3 (add more if needed)
  ],
  youtube: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',  // Optional
  tags: ['Unity', 'C#', 'Multiplayer'],  // Technology tags
  role: 'Programmer',                    // Your role
  team: 'Solo',                          // Team size or 'Solo'
  time: '3 months',                      // Development time
  engine: 'Unity',                       // Game engine used
  type: 'game',                          // MUST be 'game'
  details: 'Detailed description of your game, gameplay mechanics, and what makes it special.'
},
```

### Step 4: Add Game Mechanics (Optional but Recommended)

Scroll down to find the `mechanicsData` object (around line 140):

```javascript
export const mechanicsData = {
  'your-game-id': [  // MUST match the id from Step 3
    { 
      icon: '🎮', 
      label: 'Mechanic Name', 
      desc: 'Description of this mechanic.' 
    },
    { 
      icon: '⚡', 
      label: 'Another Mechanic', 
      desc: 'What this mechanic does.' 
    },
    // Add up to 6 mechanics (displays in 2 columns)
  ],
};
```

### Example - Complete Game Project:

```javascript
{
  id: 'space-shooter',
  title: 'Galactic Defender',
  summary: 'Fast-paced space shooter with procedural levels and boss fights.',
  images: [
    'https://i.ibb.co/abc123/screenshot1.png',
    'https://i.ibb.co/def456/screenshot2.png',
    'https://i.ibb.co/ghi789/screenshot3.png'
  ],
  youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  tags: ['Unity', 'C#', 'Procedural Generation'],
  role: 'Lead Programmer',
  team: '4 people',
  time: '6 months',
  engine: 'Unity',
  type: 'game',
  details: 'A vertical scrolling space shooter featuring procedurally generated levels, multiple weapon types, and epic boss battles. Implemented advanced particle systems and optimized for 60 FPS gameplay.'
},
```

And the mechanics:

```javascript
export const mechanicsData = {
  'space-shooter': [
    { icon: '🚀', label: 'Procedural Levels', desc: 'Infinite unique levels generated on the fly.' },
    { icon: '💥', label: 'Weapon System', desc: '5 upgradeable weapons with unique behaviors.' },
    { icon: '👾', label: 'Boss Fights', desc: 'Multi-phase boss encounters with patterns.' },
    { icon: '⭐', label: 'Power-ups', desc: 'Collectible power-ups that stack effects.' },
  ],
};
```

---

## 🎨 Adding a 3D Modeling Project

### Step 1: Open the File

Navigate to: `src/data/projects.js`

### Step 2: Find the Modeling Array

Look for this section (around line 67):

```javascript
export const modelingProjects = [
  // Your 3D modeling projects go here
];
```

### Step 3: Add Your Modeling Project

Copy this template and paste it inside the `modelingProjects` array:

```javascript
{
  id: 'your-model-id',                   // Unique ID (lowercase, no spaces)
  title: 'Your Model Name',              // Display name
  summary: 'Brief description of what this model showcases.',
  renders: [
    'https://your-final-render-1.jpg',   // Final polished render 1
    'https://your-final-render-2.jpg',   // Final polished render 2
    'https://your-final-render-3.jpg'    // Final polished render 3
  ],
  paintwork: [
    'https://your-paintwork-1.jpg',      // Substance Painter work 1 (OPTIONAL)
    'https://your-paintwork-2.jpg'       // Substance Painter work 2 (OPTIONAL)
  ],
  progression: [
    'https://your-wip-1.jpg',            // Work-in-progress shot 1
    'https://your-topology.jpg',         // Topology/wireframe view
    'https://your-wip-2.jpg'             // Work-in-progress shot 2
  ],
  references: [
    'https://your-reference-1.jpg',      // Reference photo 1
    'https://your-reference-2.jpg'       // Reference photo 2
  ],
  tags: ['Character', 'Maya', 'Turntable'],  // Technology/category tags
  time: '1 month',                       // How long it took
  software: 'Maya',                      // Modeling software
  render: 'Unreal Engine 5',             // Rendering software (OPTIONAL)
  type: 'modeling',                      // MUST be 'modeling'
  details: 'Optional detailed description of the modeling process, challenges, and techniques used.'
},
```

### Example - Complete Modeling Project:

```javascript
{
  id: 'sci-fi-helmet',
  title: 'Sci-Fi Combat Helmet',
  summary: 'High-poly helmet with PBR textures and detailed surface work.',
  renders: [
    'https://i.ibb.co/abc123/helmet-front.png',
    'https://i.ibb.co/def456/helmet-side.png',
    'https://i.ibb.co/ghi789/helmet-back.png',
    'https://i.ibb.co/jkl012/helmet-detail.png'
  ],
  paintwork: [
    'https://i.ibb.co/abc789/helmet-substance1.png',
    'https://i.ibb.co/def012/helmet-substance2.png'
  ],
  progression: [
    'https://i.ibb.co/mno345/helmet-blockout.png',
    'https://i.ibb.co/pqr678/helmet-topology.png',
    'https://i.ibb.co/stu901/helmet-texturing.png'
  ],
  references: [
    'https://i.ibb.co/vwx234/ref-helmet1.jpg',
    'https://i.ibb.co/yza567/ref-helmet2.jpg'
  ],
  tags: ['Hard Surface', 'Maya', 'Substance Painter'],
  time: '2 weeks',
  software: 'Maya',
  render: 'Unreal Engine 5',
  type: 'modeling',
  details: 'Created using Maya for modeling and Substance Painter for texturing. Features detailed panel work, wear and tear, and realistic metallic materials.'
},
```

---

## 📊 Understanding the Structure

### Image Categories for Modeling Projects:

1. **`renders`** - Final, polished renders
   - These appear FIRST and LARGEST
   - Your best work, fully lit and rendered
   - Typically 3-5 images

2. **`paintwork`** - Paint Work in Substance
   - These appear SECOND, medium-large size
   - Texturing and material work from Substance Painter
   - Shows your painting process, color IDs, material layers
   - Typically 2-3 images
   - **Optional** - Only include if you have Substance work to show

3. **`progression`** - WIP shots and topology
   - These appear THIRD, medium size
   - Show your process: blockout, topology, texturing stages
   - Typically 2-4 images

4. **`references`** - Reference photos
   - These appear LAST, smaller size
   - Source images you used for modeling
   - Typically 2-4 images

---

## 🎯 Metadata Fields Explained

### For Game Projects:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | ✅ Yes | Unique identifier (lowercase, dashes) | `'space-shooter'` |
| `title` | ✅ Yes | Display name | `'Galactic Defender'` |
| `summary` | ✅ Yes | Short description (1-2 sentences) | `'Fast-paced shooter...'` |
| `images` | ✅ Yes | Array of screenshot URLs | `['url1', 'url2']` |
| `youtube` | ❌ No | YouTube video URL | `'https://youtube.com/...'` |
| `tags` | ✅ Yes | Technology tags | `['Unity', 'C#']` |
| `role` | ✅ Yes | Your role in the project | `'Programmer'` |
| `team` | ✅ Yes | Team size | `'Solo'` or `'4 people'` |
| `time` | ✅ Yes | Development time | `'3 months'` |
| `engine` | ✅ Yes | Game engine used | `'Unity'` or `'Unreal'` |
| `type` | ✅ Yes | MUST be `'game'` | `'game'` |
| `details` | ❌ No | Long description | `'Detailed info...'` |

### For Modeling Projects:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | ✅ Yes | Unique identifier | `'sci-fi-helmet'` |
| `title` | ✅ Yes | Display name | `'Sci-Fi Helmet'` |
| `summary` | ✅ Yes | Short description | `'High-poly helmet...'` |
| `renders` | ✅ Yes | Final render URLs | `['url1', 'url2']` |
| `paintwork` | ❌ No | Substance Painter URLs | `['url1', 'url2']` |
| `progression` | ❌ No | WIP/topology URLs | `['url1', 'url2']` |
| `references` | ❌ No | Reference photo URLs | `['url1', 'url2']` |
| `tags` | ✅ Yes | Category tags | `['Character', 'Maya']` |
| `time` | ✅ Yes | Time spent | `'2 weeks'` |
| `software` | ✅ Yes | Modeling software | `'Maya'` or `'Blender'` |
| `render` | ❌ No | Rendering software | `'Unreal Engine 5'` |
| `type` | ✅ Yes | MUST be `'modeling'` | `'modeling'` |
| `details` | ❌ No | Long description | `'Process details...'` |

---

## 🖼️ Image Hosting

### Where to Host Images:

1. **ImgBB** (Recommended) - https://imgbb.com
   - Free, fast, reliable
   - Direct image links
   - No account required

2. **GitHub** - Your repository
   - Put images in `public/images/`
   - Use path: `/images/your-image.jpg`

3. **Imgur** - https://imgur.com
   - Popular, reliable
   - Free hosting

### Getting the Image URL:

1. Upload your image to ImgBB
2. Click "Get share links"
3. Copy the **Direct link** (ends with .jpg or .png)
4. Paste into your project array

**Example:**
```
https://i.ibb.co/abc123/my-screenshot.png
```

---

## ✅ Checklist Before Adding a Project

### Game Project:
- [ ] Unique `id` (no spaces, lowercase)
- [ ] Clear `title`
- [ ] Compelling `summary`
- [ ] At least 3 `images` (screenshots)
- [ ] Relevant `tags`
- [ ] Accurate `role`, `team`, `time`, `engine`
- [ ] `type: 'game'`
- [ ] (Optional) YouTube video link
- [ ] (Optional) Game mechanics in `mechanicsData`

### Modeling Project:
- [ ] Unique `id` (no spaces, lowercase)
- [ ] Clear `title`
- [ ] Compelling `summary`
- [ ] At least 2 `renders` (final images)
- [ ] (Optional) `progression` images
- [ ] (Optional) `references` images
- [ ] Relevant `tags`
- [ ] Accurate `time` and `software`
- [ ] `type: 'modeling'`

---

## 🔧 Common Issues & Solutions

### Issue: Project doesn't appear

**Solution**: Check that:
- You added a comma after the previous project
- The `type` field is correct (`'game'` or `'modeling'`)
- There are no syntax errors (missing quotes, brackets)

### Issue: Images don't load

**Solution**: 
- Verify the image URL works (paste in browser)
- Use direct image links (ending in .jpg, .png, etc.)
- Check for `https://` at the start

### Issue: Game mechanics don't show

**Solution**:
- Verify the `id` in `mechanicsData` matches your project `id` exactly
- Check that it's inside the `mechanicsData` object

---

## 📝 Example: Adding Both Types

Here's a complete example showing where to add both project types:

```javascript
// src/data/projects.js

// GAME PROJECTS (Featured/Games section)
export const featuredProjects = [
  {
    id: 'slingshot',
    title: 'Slingshot Racer',
    // ... existing project ...
  },
  // ADD YOUR NEW GAME PROJECT HERE:
  {
    id: 'my-new-game',
    title: 'My Awesome Game',
    summary: 'An incredible gaming experience.',
    images: ['url1', 'url2', 'url3'],
    tags: ['Unity', 'C#'],
    role: 'Programmer',
    team: 'Solo',
    time: '4 months',
    engine: 'Unity',
    type: 'game',
    details: 'Full description here.'
  },
];

// MODELING PROJECTS
export const modelingProjects = [
  {
    id: 'cozmo-robot',
    title: 'Cozmo Robot',
    // ... existing project ...
  },
  // ADD YOUR NEW MODELING PROJECT HERE:
  {
    id: 'my-new-model',
    title: 'My 3D Model',
    summary: 'A beautiful 3D creation.',
    renders: ['url1', 'url2'],
    progression: ['url3', 'url4'],
    references: ['url5'],
    tags: ['Character', 'Maya'],
    time: '1 week',
    software: 'Maya',
    type: 'modeling'
  },
];

// GAME MECHANICS (Optional, for game projects only)
export const mechanicsData = {
  'slingshot': [
    // ... existing mechanics ...
  ],
  // ADD MECHANICS FOR YOUR NEW GAME:
  'my-new-game': [
    { icon: '🎮', label: 'Cool Feature', desc: 'What it does.' },
    { icon: '⚡', label: 'Another Feature', desc: 'How it works.' },
  ],
};
```

---

## 🎉 You're Done!

After adding your project:

1. **Save the file** (`Ctrl+S` or `Cmd+S`)
2. **Refresh your browser** to see the changes
3. **Check both tabs** (Games and Modeling) to verify

Your new project should appear immediately!

---

## 💡 Pro Tips

1. **Use descriptive IDs**: `'space-shooter'` not `'project1'`
2. **Write compelling summaries**: Hook the viewer in 1-2 sentences
3. **Choose your best images**: Quality over quantity
4. **Be accurate with metadata**: Helps showcase your skills
5. **Add game mechanics**: Makes game projects more impressive
6. **Show your process**: Use progression images for modeling

---

## 📞 Need Help?

If something isn't working:
1. Check for syntax errors (missing commas, quotes, brackets)
2. Verify image URLs load in your browser
3. Make sure `type` is exactly `'game'` or `'modeling'`
4. Check the browser console for error messages (F12)

---

**Happy showcasing! 🎨🎮**
