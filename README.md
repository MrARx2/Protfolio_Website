# Game Developer Portfolio

A modern, interactive portfolio website showcasing game development projects and 3D modeling work. Built with React 18, featuring glassmorphism design, animated backgrounds, and rich project presentations.

## 🎮 Overview

This portfolio showcases **Ariel Cohen's** game development work, including:
- **3 Featured Game Projects**: Slingshot (space racer), Ricochet (arcade physics), and Fox's Tale (2D platformer)
- **3D Modeling Projects**: Character and environment renders created in Maya
- Interactive project galleries with YouTube video integration
- Detailed game mechanics breakdowns
- Professional presentation with smooth animations

## ✨ Features

### Design & UX
- **Glassmorphism UI**: Modern frosted glass cards with backdrop filters
- **Animated Dot Background**: Dynamic particle system that reacts to scroll
- **Responsive Layout**: Adapts seamlessly to different screen sizes
- **Image Modal Gallery**: Full-screen image viewer with keyboard navigation
- **Smooth Transitions**: Polished hover effects and animations

### Project Presentation
- **Dual Tab System**: Separate views for game projects and 3D modeling work
- **Rich Project Details**: 
  - Multiple screenshots per project
  - Embedded YouTube videos
  - Game mechanics breakdown with icons
  - Team info, role, timeline, and engine used
- **Modeling Projects**: Separate presentation with renders, progression, and reference photos

### Navigation & Interaction
- **Sticky Navbar**: Glass-effect navigation with social links (GitHub, LinkedIn, Twitter)
- **About Section**: Personal introduction with avatar and skill tags
- **Keyboard Accessible**: Full keyboard navigation support
- **Resume Download**: Direct link to downloadable resume

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mygamedevprotofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

## 📁 Project Structure

```
mygamedevprotofolio/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── App.js              # Main React component (826 lines)
│   ├── index.js            # React DOM render
│   └── style.css           # All styles (24KB)
├── App.js                  # Legacy standalone version
├── index.html              # Legacy HTML file
├── style.css               # Legacy styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Technology Stack

- **React 18**: Component-based UI framework
- **CSS3**: Custom styling with advanced features (backdrop-filter, gradients, animations)
- **JavaScript ES6+**: Modern JavaScript features
- **React Hooks**: useState, useEffect, useRef for state management
- **YouTube Embed API**: Video integration
- **SVG**: Custom icons and animated backgrounds

## 🔧 Customization

### Adding New Projects

Edit `src/App.js` and add to the `featuredProjects` or `modelingProjects` arrays:

```javascript
{
  id: "project-id",
  title: "Project Title",
  summary: "Short description",
  images: ["url1", "url2", ...],
  tags: ["Tag1", "Tag2"],
  youtube: "https://youtube.com/watch?v=...",
  details: "Detailed description"
}
```

### Updating Personal Info

- **Name & Bio**: Edit the `AboutSection` component in `src/App.js`
- **Avatar**: Replace the image URL in `AboutSection`
- **Social Links**: Update URLs in the `Navbar` component
- **Skills**: Modify the skills array in `AboutSection`

### Styling

All styles are in `src/style.css`. Key classes:
- `.frosted-card`: Project cards
- `.animated-dots-bg`: Background animation
- `.navbar-glass`: Navigation bar
- `.about-section`: About me section
- `.mechanics-section`: Game mechanics display

## 📊 Current State Analysis

### Strengths
✅ Modern, professional design with glassmorphism effects  
✅ Rich project presentation with multiple media types  
✅ Smooth animations and transitions  
✅ Well-organized component structure  
✅ Responsive design  
✅ Keyboard accessible  

### Areas for Improvement
See **IMPROVEMENTS.md** for detailed recommendations on:
- Code organization and maintainability
- Performance optimizations
- Feature enhancements
- Visual polish
- Accessibility improvements

## 🐛 Known Issues

- Duplicate file structure (root vs. src/)
- Some inline styles that should be in CSS
- Hardcoded project metadata (could be data-driven)
- No loading states for images/videos
- Limited mobile optimization for complex layouts

## 📝 License

This is a personal portfolio project. Feel free to use as inspiration for your own portfolio.

## 👤 Contact

**Ariel Cohen** - Game Developer
- GitHub: [@MrARx2](https://github.com/MrARx2)
- LinkedIn: [Ariel Cohen](https://www.linkedin.com/in/ariel-cohen-116804191/)

---

**Last Updated**: October 2025
"# MyWebsite" 
