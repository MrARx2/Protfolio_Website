# Quick Start Guide

## 🚀 Running the Portfolio

### Development Mode
```bash
npm start
```
Opens at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates optimized build in `build/` folder

---

## 📝 Updating Content

### Adding a New Game Project

Edit `src/data/projects.js` and add to `featuredProjects` array:

```javascript
{
  id: "my-new-game",
  title: "My New Game",
  summary: "Short description of your game",
  images: [
    "https://your-image-url-1.jpg",
    "https://your-image-url-2.jpg"
  ],
  tags: ["Genre", "Engine", "Feature"],
  youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  details: "Detailed description of your game...",
  role: "Programmer",
  team: "3",
  time: "2 months",
  engine: "Unity 6"
}
```

### Adding Game Mechanics

Edit `src/data/projects.js` and add to `mechanicsData`:

```javascript
'my-new-game': [
  { 
    icon: '🎮', 
    label: 'Mechanic Name', 
    desc: 'Description of the mechanic' 
  },
  // Add more mechanics...
]
```

### Adding a 3D Modeling Project

Edit `src/data/projects.js` and add to `modelingProjects` array:

```javascript
{
  id: 'my-model',
  title: 'My 3D Model',
  summary: 'Description of the model',
  renders: [
    'https://final-render-1.jpg',
    'https://final-render-2.jpg'
  ],
  progression: [
    'https://wip-stage-1.jpg',
    'https://wip-stage-2.jpg',
    'https://topology-view.jpg'
  ],
  references: [
    'https://reference-photo-1.jpg',
    'https://reference-photo-2.jpg'
  ],
  tags: ['Character', 'Maya'],
  time: '3 days',
  software: 'Maya',
  type: 'modeling',
  details: 'Details about the modeling process...'
}
```

**Note**: 
- `renders` - Final, polished renders (shown first, larger)
- `progression` - WIP shots, topology, modeling stages (shown second)
- `references` - Reference photos used (shown last, smaller)

### Updating Personal Information

Edit `src/data/personalInfo.js`:

```javascript
export const personalInfo = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio...",
  avatar: "https://your-avatar-url.jpg",
  skills: ['Skill 1', 'Skill 2', ...],
  social: {
    github: { url: "https://github.com/username", label: "GitHub" },
    linkedin: { url: "https://linkedin.com/in/username", label: "LinkedIn" },
    twitter: { url: "https://twitter.com/username", label: "Twitter" }
  },
  resume: "/resume.pdf"
};
```

---

## 🎨 Customizing Styles

### Colors

Edit `src/style.css` - look for these color values:
- **Primary**: `#7ecbff` (cyan blue)
- **Secondary**: `#00eaff` (bright cyan)
- **Accent**: `#7f5cff` (purple)
- **Background**: `#0a1833` (dark blue)
- **Text**: `#c3f3ff` (light cyan)

### Fonts

Change font in `src/style.css`:
```css
body {
  font-family: 'Your Font', 'Segoe UI', 'Roboto', Arial, sans-serif;
}
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx           # Navigation bar with mobile menu
│   │   ├── AnimatedDotsBg.jsx   # Animated background
│   │   └── ErrorBoundary.jsx    # Error handling
│   ├── sections/
│   │   └── AboutSection.jsx     # About me section
│   ├── cards/
│   │   ├── FrostedCard.jsx      # Game project cards
│   │   └── ModelingCard.jsx     # 3D modeling cards
│   ├── modals/
│   │   └── ImageModal.jsx       # Full-screen image viewer
│   └── project/
│       └── ProjectDetail.jsx    # Detailed project view
├── data/
│   ├── projects.js              # All project data
│   └── personalInfo.js          # Personal information
├── utils/
│   └── youtubeHelpers.js        # YouTube URL helpers
├── App.js                       # Main app component
├── index.js                     # React entry point
└── style.css                    # All styles
```

---

## 🔧 Common Tasks

### Change Navigation Links

Edit `src/data/personalInfo.js` - update the `social` object

### Add a New Page/Section

1. Create component in `src/components/sections/`
2. Import in `src/App.js`
3. Add to the render method

### Change SEO Information

Edit `public/index.html` - update meta tags in `<head>`

### Add Favicon

Place `favicon.ico` in `public/` folder

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
taskkill /F /IM node.exe

# Then restart
npm start
```

### Images Not Loading
- Check image URLs are correct and accessible
- Ensure images are hosted on a reliable CDN
- Check browser console for CORS errors

### Styles Not Updating
```bash
# Clear cache and restart
rm -rf node_modules/.cache
npm start
```

### Build Errors
```bash
# Clean install
rm -rf node_modules
npm install
npm run build
```

---

## 📦 Deployment

### Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy:
npm run deploy
```

---

## ✨ New Features Added

### ✅ Completed Improvements
- **Modular Components**: Split 826-line file into 15+ components
- **Data Separation**: Easy content updates without touching code
- **Loading States**: Skeleton loaders for images
- **Mobile Menu**: Hamburger menu for small screens
- **Error Boundaries**: Graceful error handling
- **Accessibility**: ARIA labels, focus management, skip links
- **SEO**: Meta tags, Open Graph, structured data
- **Responsive Design**: Optimized for all screen sizes
- **Performance**: Lazy loading, preconnect hints
- **Better UX**: Smooth animations, better contrast

### 🎯 Key Improvements
- **826 lines → 106 lines** in main App.js
- **15+ reusable components**
- **Separate data files** for easy updates
- **Mobile-first navigation**
- **WCAG AA accessibility**
- **Production-ready SEO**

---

## 📚 Documentation

- **README.md**: Complete project overview
- **IMPROVEMENTS.md**: Detailed improvement recommendations
- **PROJECT_SUMMARY.md**: Analysis and assessment
- **QUICK_START.md**: This file!

---

## 🆘 Need Help?

### Resources
- [React Documentation](https://react.dev/)
- [CSS Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Common Issues
- Check browser console for errors (F12)
- Verify all imports are correct
- Ensure data files have correct structure
- Test in multiple browsers

---

**Last Updated**: October 2025  
**Version**: 2.0 (Refactored & Improved)
