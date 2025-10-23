# Portfolio Code Guide

## 📖 Quick Reference for Easy Updates

This guide helps you make common changes without needing deep technical knowledge.

---

## 🎯 Common Tasks

### 1. Adding a New Game Project

**File**: `src/data/projects.js`

**Location**: Add to `gameProjects` array

```javascript
{
  id: "my-game",                    // Unique ID (lowercase, no spaces)
  title: "My Game Title",           // Display name
  summary: "Short description...",  // Brief summary (1-2 sentences)
  images: [                         // Screenshots (at least 3-5)
    "https://your-image-url-1.jpg",
    "https://your-image-url-2.jpg",
    // Add more...
  ],
  tags: ["Genre", "Style", ...],    // Categories/tags
  youtube: "https://www.youtube.com/watch?v=VIDEO_ID",  // Optional
  details: "Full description...",   // Detailed description
  role: "Your Role",                // Your role in the project
  team: "Team Size",                // Number of team members
  time: "Development Time",         // How long it took
  engine: "Game Engine"             // Unity, Unreal, etc.
}
```

**Then add mechanics** (optional):

```javascript
// In mechanicsData object
'my-game': [
  { 
    icon: '🎮',                     // Emoji icon
    label: 'Feature Name',          // Short title
    desc: 'Description...'          // What it does
  },
  // Add more features...
]
```

---

### 2. Adding a New 3D Model

**File**: `src/data/projects.js`

**Location**: Add to `modelingProjects` array

```javascript
{
  id: 'my-model',                   // Unique ID
  title: 'Model Name',              // Display name
  summary: 'Brief description...',  // Short summary
  renders: [                        // Main render images
    'https://render-1.jpg',
    'https://render-2.jpg',
    // Add more...
  ],
  paintwork: [                      // Texture work (optional)
    'https://texture-1.jpg',
  ],
  progression: [                    // WIP shots (optional)
    'https://wip-1.jpg',
  ],
  references: [                     // Reference images (optional)
    'https://ref-1.jpg',
  ],
  tags: ['Type', 'Software', ...],  // Categories
  time: '1 week',                   // Time taken
  software: 'Maya',                 // Modeling software
  render: 'Unreal Engine 5',        // Rendering software
  type: 'modeling',                 // Don't change this
  details: 'Full description...'    // Detailed info
}
```

---

### 3. Adding a New Scene/Environment

**File**: `src/data/projects.js`

**Location**: Add to `sceneProjects` array

```javascript
{
  id: 'my-scene',                   // Unique ID
  title: 'Scene Name',              // Display name
  summary: 'Brief description...',  // Short summary
  images: [                         // Environment screenshots
    'https://screenshot-1.jpg',
    'https://screenshot-2.jpg',
    // Add more...
  ],
  coolFeatures: [                   // Special features (optional)
    {
      title: 'Feature Name',
      description: 'Technical explanation...',
      image: 'https://visualization.jpg',
      icon: '✨'                    // Emoji icon
    }
  ],
  tags: ['Environment', 'Engine', ...],  // Categories
  time: '2 weeks',                  // Time taken
  engine: 'Unreal Engine 5',        // Game engine used
  type: 'scene',                    // Don't change this
  videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',  // Optional
  details: 'Full description...'    // Detailed info
}
```

---

## 🎨 Styling Changes

### Changing Colors

**File**: `src/style.css`

**Games Section (Cyan/Blue)**:
```css
/* Search for these colors: */
#00eaff  /* Main cyan */
#00bfff  /* Light blue */
#7ecbff  /* Sky blue */
```

**Modeling Section (Cyan/Orange)**:
```css
/* Search for these colors: */
#7ecbff  /* Cyan */
#ffcb7e  /* Orange accent */
```

**Scenes Section (Purple/Cyan)**:
```css
/* File: src/styles/scenes.css */
#7f5cff  /* Purple */
#00eaff  /* Cyan */
#e0d0ff  /* Light purple */
```

---

### Changing Spacing

**Common spacing values used**:
- Small: `8px`, `12px`, `16px`
- Medium: `20px`, `24px`, `28px`, `32px`
- Large: `36px`, `48px`, `60px`, `80px`, `120px`

**Example - Change card gap**:
```css
.card-grid {
  gap: 28px;  /* Change this number */
}
```

---

### Changing Font Sizes

**File**: `src/style.css`

```css
h1 {
  font-size: 2.6rem;  /* Main title */
}

.subtitle {
  font-size: 1.15rem;  /* Subtitles */
}

/* Card titles */
.frosted-card h2 {
  font-size: 1.35rem;
}
```

---

## 📝 Text Content Changes

### Updating Personal Info

**File**: `src/data/personalInfo.js`

```javascript
export const personalInfo = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio...",
  // Add more fields as needed
};
```

### Updating About Section

**File**: `src/components/sections/AboutSection.jsx`

Edit the text directly in the component.

---

## 🖼️ Image Management

### Best Practices:

1. **Image Hosting**: Use reliable hosts like:
   - ImgBB (https://imgbb.com/)
   - Imgur (https://imgur.com/)
   - Cloudinary (https://cloudinary.com/)

2. **Image Sizes**:
   - Screenshots: 1920x1080 or 1280x720
   - Thumbnails: 800x600 minimum
   - Keep file sizes under 2MB

3. **Image Formats**:
   - Use `.jpg` for photos/screenshots
   - Use `.png` for graphics with transparency
   - Use `.webp` for better compression (modern browsers)

4. **Getting Image URLs**:
   - Upload to hosting service
   - Copy direct image link
   - Paste into project data

---

## 🎥 Adding YouTube Videos

### Format Options:

**Watch URL** (auto-converted):
```javascript
youtube: "https://www.youtube.com/watch?v=VIDEO_ID"
```

**Embed URL** (direct):
```javascript
youtube: "https://www.youtube.com/embed/VIDEO_ID"
```

**Short URL** (auto-converted):
```javascript
youtube: "https://youtu.be/VIDEO_ID"
```

---

## 🏷️ Tags Best Practices

### Good Tags:
- **Specific**: "Space Racer" not just "Game"
- **Relevant**: Include genre, style, tools
- **Consistent**: Use same format across projects

### Examples:

**Games**:
```javascript
tags: ["Space", "Racer", "Procedural", "Unity"]
```

**Modeling**:
```javascript
tags: ["3D Character", "Robot", "Maya", "Unreal Engine 5"]
```

**Scenes**:
```javascript
tags: ["Environment", "Cinematic", "Sci-Fi", "Unreal Engine 5", "Nanite"]
```

---

## 🔧 Troubleshooting

### Images Not Showing

**Check**:
1. Is the URL correct?
2. Is the image publicly accessible?
3. Check browser console for errors (F12)
4. Try opening URL directly in browser

**Fix**:
- Re-upload image
- Get new direct link
- Update URL in projects.js

---

### Videos Not Playing

**Check**:
1. Is YouTube URL correct?
2. Is video public (not private)?
3. Check browser console for errors

**Fix**:
- Make video public on YouTube
- Copy correct video ID
- Use full YouTube URL

---

### Styling Not Applying

**Check**:
1. Did you save the file?
2. Did you refresh the browser?
3. Try hard refresh (Ctrl+Shift+R)

**Fix**:
- Clear browser cache
- Check CSS syntax
- Look for typos in class names

---

### Project Not Showing

**Check**:
1. Is project in correct array?
2. Is `id` unique?
3. Are all required fields filled?
4. Check browser console for errors

**Fix**:
- Verify data structure
- Check for missing commas
- Ensure quotes are closed

---

## 📱 Testing Your Changes

### Checklist:

1. **Desktop** (1920px, 1440px)
   - All images load
   - Text is readable
   - Spacing looks good

2. **Tablet** (1024px, 768px)
   - Layout adjusts properly
   - Cards stack correctly
   - Navigation works

3. **Mobile** (414px, 375px)
   - Single column layout
   - Touch targets big enough
   - Text not too small

### How to Test:

1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Select different screen sizes
4. Check each section

---

## 🚀 Deployment

### Before Deploying:

- [ ] Test all links
- [ ] Check all images load
- [ ] Test on different browsers
- [ ] Test on mobile device
- [ ] Check for console errors
- [ ] Verify all videos play

### Build Command:

```bash
npm run build
```

This creates optimized files in the `build` folder.

---

## 📚 File Reference

### Main Files You'll Edit:

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `src/data/projects.js` | Project data | Often |
| `src/data/personalInfo.js` | Personal info | Rarely |
| `src/style.css` | Main styling | Sometimes |
| `src/styles/scenes.css` | Scene styling | Rarely |

### Files You Probably Won't Edit:

| File | Purpose |
|------|---------|
| `src/App.js` | Main app logic |
| `src/components/**/*.jsx` | UI components |
| `src/utils/youtubeHelpers.js` | YouTube utilities |

---

## 💡 Tips

### Do's:
✅ Keep backups before major changes
✅ Test after each change
✅ Use consistent formatting
✅ Add descriptive comments
✅ Optimize images before uploading

### Don'ts:
❌ Don't edit multiple files at once
❌ Don't skip testing
❌ Don't use huge images (>2MB)
❌ Don't forget commas in arrays
❌ Don't mix quotes (' and ")

---

## 🆘 Getting Help

### Common Error Messages:

**"Unexpected token"**
- Missing comma or bracket
- Check JSON syntax

**"Cannot read property of undefined"**
- Missing required field
- Check data structure

**"Failed to load resource"**
- Image URL broken
- Check image hosting

### Debug Steps:

1. Open browser console (F12)
2. Look for red error messages
3. Click error to see file/line
4. Check that line for issues
5. Fix and refresh

---

## 📖 Additional Resources

- **React Docs**: https://react.dev/
- **CSS Guide**: https://css-tricks.com/
- **MDN Web Docs**: https://developer.mozilla.org/

---

**Remember**: Make small changes, test often, and keep backups!

**Last Updated**: October 23, 2025
