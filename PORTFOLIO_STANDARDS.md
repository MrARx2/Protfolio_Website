# Portfolio Standardization Rules

## 📋 Official Standards & Guidelines

This document contains the official rules and standards for maintaining consistency across the portfolio website.

---

## 🎨 Visual Design Standards

### **Card Title Gradients**

All card titles use **bottom-to-top gradients** (subtle effect from summary color):

#### **Games Section**:
```css
Gradient: Cyan (70%) → White (30% from bottom)
Animation: 8s slow glow
Colors: #00eaff → #ffffff
```

#### **Modeling Section**:
```css
Gradient: White (70%) → Cyan (30% from bottom)
Animation: 8s slow glow
Colors: #ffffff → #7ecbff
```

#### **Scenes & Environments**:
```css
Gradient: White (70%) → Purple (30% from bottom)
Animation: 8s slow glow
Colors: #ffffff → #b8a8ff
```

### **Summary Text Colors**

| Section | Color | Hex Code |
|---------|-------|----------|
| Games | Pure White | `#ffffff` |
| Modeling | Cyan | `#7ecbff` |
| Scenes | Purple | `#b8a8ff` |

---

## 🏷️ Naming Conventions

### **Render Engine Abbreviations**

**RULE**: When listing a render engine in the "Render" field, use abbreviations:

| Full Name | Abbreviation | Usage |
|-----------|--------------|-------|
| Unreal Engine 5 | **UE5** | Render field only |
| Arnold Renderer | **Arnold Renderer** | Keep as is |
| V-Ray | **V-Ray** | Keep as is |

**Examples**:

✅ **CORRECT**:
```javascript
{
  engine: 'Unreal Engine 5',  // Full name for engine field
  render: 'UE5'               // Abbreviated for render field
}
```

❌ **INCORRECT**:
```javascript
{
  engine: 'UE5',              // Don't abbreviate engine field
  render: 'Unreal Engine 5'   // Don't use full name in render field
}
```

### **Software Names**

Keep software names consistent:

| Software | Standard Name |
|----------|---------------|
| Maya | Maya |
| Blender | Blender |
| ZBrush | ZBrush |
| Substance Painter | Adobe Substance |
| 3ds Max | 3ds Max |
| Houdini | Houdini |

---

## 📝 Metadata Formatting

### **Modeling Card Labels**

**RULE**: No colons (`:`) in metadata labels

✅ **CORRECT**:
```
Time
1 week

Software
Maya

Render
UE5
```

❌ **INCORRECT**:
```
Time:
1 week

Software:
Maya

Render:
UE5
```

### **Time Format**

Use consistent time formatting:

| Duration | Format |
|----------|--------|
| Days | "X days" |
| Weeks | "X weeks" or "X week" |
| Months | "X months" or "X month" |

Examples:
- `"3 days"`
- `"1 week"`
- `"2 weeks"`
- `"1 month"`
- `"1.5 weeks"`

---

## ⚡ Animation Standards

### **Speed Guidelines**

**RULE**: All animations should be slow and relaxing

| Animation Type | Duration | Purpose |
|----------------|----------|---------|
| Card Title Glow | **8 seconds** | Subtle, calming |
| Game Detail Title | **10 seconds** | Eye-catching but gentle |
| Hover Transitions | **0.3s** | Responsive but smooth |
| Tab Transitions | **0.3s** | Quick feedback |

**Brightness Changes**:
- Card titles: Max **1.1-1.15x** brightness
- Detail titles: Max **1.15x** brightness
- Never exceed **1.2x** brightness (too intense)

### **Animation Easing**

Always use: `ease-in-out` for smooth, natural motion

---

## 🎯 Tab Styling Standards

### **Section-Specific Colors**

Each tab has unique colors matching its section theme:

#### **Games Tab**:
```css
Hover: Cyan (#00eaff)
Active: Cyan → Blue gradient
Border: Cyan glow
```

#### **Modeling Tab**:
```css
Hover: Light Cyan (#7ecbff)
Active: White → Cyan gradient
Border: Cyan glow
Text (when active): Dark (#0a1833)
```

#### **Scenes Tab**:
```css
Hover: Purple (#b8a8ff)
Active: Purple → Light Purple gradient
Border: Purple glow
```

---

## 📊 Project Data Structure

### **Required Fields**

#### **Game Projects**:
```javascript
{
  id: 'unique-id',           // Required
  title: 'Game Name',        // Required
  summary: 'Brief...',       // Required
  images: [...],             // Required (min 3)
  tags: [...],               // Required
  youtube: 'url',            // Optional
  details: 'Full...',        // Required
  role: 'Your Role',         // Required
  team: 'Team Size',         // Required
  time: 'Duration',          // Required
  engine: 'Engine Name'      // Required
}
```

#### **Modeling Projects**:
```javascript
{
  id: 'unique-id',           // Required
  title: 'Model Name',       // Required
  summary: 'Brief...',       // Required
  renders: [...],            // Required (min 2)
  paintwork: [...],          // Optional
  progression: [...],        // Optional
  references: [...],         // Optional
  tags: [...],               // Required
  time: 'Duration',          // Required
  software: 'Software',      // Required
  render: 'Renderer',        // Required (use abbreviations!)
  type: 'modeling',          // Required
  details: 'Full...'         // Required
}
```

#### **Scene Projects**:
```javascript
{
  id: 'unique-id',           // Required
  title: 'Scene Name',       // Required
  summary: 'Brief...',       // Required
  images: [...],             // Required (min 3)
  coolFeatures: [...],       // Optional
  tags: [...],               // Required
  time: 'Duration',          // Required
  engine: 'Engine Name',     // Required (full name OK here)
  type: 'scene',             // Required
  videoUrl: 'url',           // Optional
  details: 'Full...'         // Required
}
```

---

## 🎨 Color Palette Reference

### **Games Section**:
```css
Primary: #00eaff (Cyan)
Secondary: #00bfff (Light Blue)
Accent: #ffffff (White)
Background: rgba(10, 24, 51, 0.82)
```

### **Modeling Section**:
```css
Primary: #ffffff (White)
Secondary: #7ecbff (Cyan)
Accent: #e0f7ff (Light Cyan)
Background: rgba(6, 10, 24, 0.9)
```

### **Scenes Section**:
```css
Primary: #7f5cff (Purple)
Secondary: #b8a8ff (Light Purple)
Accent: #ffffff (White)
Background: rgba(20, 10, 40, 0.9)
```

---

## 📐 Typography Standards

### **Font Weights**

| Element | Weight | Usage |
|---------|--------|-------|
| Card Titles | 700-800 | Bold, prominent |
| Detail Titles | 800 | Extra bold |
| Body Text | 400-500 | Regular, readable |
| Meta Labels | 600 | Semi-bold |

### **Font Sizes**

| Element | Size | Usage |
|---------|------|-------|
| Card Titles | 1.35-1.4rem | Prominent but not overwhelming |
| Card Summary | 0.96-1.08rem | Readable |
| Detail Titles | 2.4rem | Hero element |
| Body Text | 1.08-1.15rem | Comfortable reading |

---

## 🔄 Update Checklist

### **When Adding a New Modeling Project**:

- [ ] Use abbreviated render engine name (e.g., "UE5")
- [ ] Remove colons from metadata labels
- [ ] Include all required fields
- [ ] Use consistent time format
- [ ] Add appropriate tags
- [ ] Verify image URLs work
- [ ] Check gradient displays correctly
- [ ] Test on mobile

### **When Adding a New Game Project**:

- [ ] Include YouTube video (if available)
- [ ] Add game mechanics data
- [ ] Use full engine name
- [ ] Include role, team, time
- [ ] Add 3+ screenshots
- [ ] Verify all tags are relevant
- [ ] Test detail page layout

### **When Adding a New Scene Project**:

- [ ] Use full engine name (not abbreviated)
- [ ] Add cool features (if applicable)
- [ ] Include video URL (if available)
- [ ] Add 3+ environment shots
- [ ] Verify purple theme displays
- [ ] Test responsive layout

---

## 🚫 Common Mistakes to Avoid

### **DON'T**:
- ❌ Use "Unreal Engine 5" in render field (use "UE5")
- ❌ Add colons to modeling metadata labels
- ❌ Use fast animations (< 5 seconds)
- ❌ Mix gradient directions (always bottom-to-top)
- ❌ Use inconsistent time formats
- ❌ Forget to test on mobile
- ❌ Use high brightness values (> 1.2x)

### **DO**:
- ✅ Abbreviate render engines appropriately
- ✅ Keep animations slow (8-10 seconds)
- ✅ Use bottom-to-top gradients
- ✅ Test all new content
- ✅ Follow color palette
- ✅ Maintain consistent spacing
- ✅ Use semantic HTML

---

## 🎯 Quality Standards

### **Images**:
- Minimum resolution: 1280x720
- Maximum file size: 2MB
- Format: JPG or PNG
- Aspect ratio: 16:9 or 16:10 preferred

### **Videos**:
- Platform: YouTube only
- Quality: 1080p minimum
- Length: 30 seconds - 5 minutes
- Include captions if possible

### **Text**:
- Summary: 1-2 sentences
- Details: 2-4 paragraphs
- No spelling errors
- Professional tone
- Clear and concise

---

## 📱 Responsive Design

### **Breakpoints**:
```css
Desktop: > 1200px (3 columns)
Tablet: 768px - 1200px (2 columns)
Mobile: < 768px (1 column)
```

### **Testing Requirements**:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (1024x768)
- [ ] Mobile (414x896)
- [ ] Mobile (375x667)

---

## 🔧 Maintenance

### **Regular Checks**:
- Review all image links monthly
- Test all YouTube embeds
- Verify animations work smoothly
- Check for console errors
- Test on multiple browsers
- Validate responsive design

### **When Updating**:
1. Read this document first
2. Follow all standards
3. Test changes locally
4. Verify on mobile
5. Check browser console
6. Deploy with confidence

---

## 📚 Quick Reference

### **Render Engine Abbreviations**:
- Unreal Engine 5 → **UE5** (render field only)
- Keep full name in "engine" field

### **Metadata Labels**:
- No colons (`:`)
- Format: `Time` not `Time:`

### **Animation Speeds**:
- Card titles: **8 seconds**
- Detail titles: **10 seconds**
- Hover effects: **0.3 seconds**

### **Gradient Direction**:
- Always **bottom-to-top**
- Main color 70%, accent 30%

### **Tab Colors**:
- Games: Cyan
- Modeling: White/Cyan
- Scenes: Purple

---

## ✅ Compliance Checklist

Before deploying any changes:

- [ ] All render engines abbreviated correctly
- [ ] No colons in modeling metadata
- [ ] All animations are slow (8-10s)
- [ ] Gradients go bottom-to-top
- [ ] Tab colors match section themes
- [ ] Images optimized and working
- [ ] Text is professional and clear
- [ ] Tested on mobile devices
- [ ] No console errors
- [ ] Follows color palette

---

## 🎉 Summary

### **Key Rules**:
1. **Abbreviate**: UE5 for render field
2. **No Colons**: In modeling metadata
3. **Slow Animations**: 8-10 seconds
4. **Bottom Gradients**: Always bottom-to-top
5. **Section Colors**: Match tabs to themes
6. **Relaxing**: Gentle, calming experience

### **Remember**:
> "Every element should contribute to a relaxing, professional browsing experience. Slow animations, subtle gradients, and consistent styling create a cohesive portfolio that showcases work without overwhelming visitors."

---

**Last Updated**: October 23, 2025  
**Version**: 1.0  
**Status**: Official Standards ✅

---

## 📞 Need Help?

If unsure about any standard:
1. Check this document first
2. Look at existing projects for examples
3. Test changes locally before deploying
4. When in doubt, keep it simple and consistent

**Consistency is key to a professional portfolio!**
