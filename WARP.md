# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Application Overview

Meisner Interiors is a luxury interior design website featuring:

1. **Spectacular Homepage Experience**: Opens with elegant logo animation on white background, followed by Minale + Mann style screen opening transition
2. **Logo Animation Sequence**: Black logo on white background with main text fading in and side elements sliding in with gentle delays
3. **Screen Opening Transition**: Inspired by Minale + Mann - screen opens from top and bottom to reveal full-screen hero image
4. **Hero Image**: Full-screen bedroom image with subtle zoom animation
5. **Minimal Navigation**: Logo on left, hamburger menu on right (no text menu bar)
6. **Multi-page Architecture**: Services, Portfolio, About, and Contact pages with consistent design language
7. **Mobile-First Responsive Design**: Optimized for all devices with elegant transitions

## Core Architecture

### Frontend Structure
- **HTML**: Semantic markup with accessibility features
- **CSS**: Modern CSS with custom properties, animations, and responsive grid layouts
- **JavaScript**: Vanilla JS with modular functions for animations and interactions
- **Assets**: Logo SVG with embedded styling for white branding

### Key Design System
- **Typography**: Playfair Display (headings) + Inter (body text)
- **Color Palette**: Dark backgrounds (#0a0a0a, #1a1a1a) with gold accents (#c9a96e)
- **Animation Philosophy**: Smooth, high-end transitions with staggered timing
- **Mobile Strategy**: Vertical project stacking with maintained hover states

### Homepage Flow Architecture
1. **Logo Animation Phase** (0-3s): Black SVG logo elements animate in sequence on white background
2. **Screen Opening Transition** (3-4.2s): Minale + Mann style - white panels open from center revealing hero image
3. **Hero Reveal Phase** (4.2s+): Full-screen bedroom image with subtle zoom animation
4. **Navigation Ready**: Minimal header appears with logo left, hamburger menu right

## Development Commands

### Local Development
```bash
# Start development server (any HTTP server)
# Option 1: Python
python -m http.server 8000
# Access at: http://localhost:8000

# Option 2: Node.js (if you have http-server installed)
npx http-server -p 8000

# Option 3: Live Server (VS Code extension)
# Right-click index.html -> "Open with Live Server"
```

### File Structure
```
interior-design-website/
├── index.html              # Homepage with logo animation & projects
├── services.html           # Services page
├── portfolio.html          # Portfolio with filtering
├── about.html             # About page with team info
├── contact.html           # Contact form
├── assets/
│   └── logo.svg          # Main logo (white version for dark backgrounds)
├── css/
│   └── style.css         # Complete stylesheet with animations
└── js/
    └── main.js           # Homepage animations & site interactions
```

### Key Animation Timings
- **Logo Main Text**: Fades in at 0.5s, duration 1s
- **Logo Symbol**: Slides in at 1.1s, duration 0.8s  
- **Logo Sub-text**: Slides in at 1.2s, duration 0.8s
- **Logo Circle**: Slides in at 1.3s, duration 0.8s
- **Screen Opening**: Starts at 3s, duration 1.2s
- **Hero Image Reveal**: Appears at 4.2s with zoom animation

## Logo Animation Implementation

### SVG Structure
The logo uses your original SVG with modified styling:
- **Main Text**: "MEISNER" - large, prominent fade-in
- **Sub Text**: "INTERIORS" - slides in from right with delay
- **Symbol & Circle**: Architectural elements that slide in gracefully
- **Color**: All elements black (#231f20) for white background contrast
- **White Background**: Clean, elegant white background during logo animation

### Animation Classes
```css
.logo-main-text    /* Main fade-in animation */
.logo-sub-text     /* Slide in from right */
.logo-symbol       /* Symbol slide animation */  
.logo-circle       /* Circle slide animation */
```

## Hero Image System

### Hero Image Structure
- **Full-Screen Display**: Hero image covers entire viewport after screen opening
- **Image Source**: Uses uploaded bedroom image: `images/MASTER BEDROOM IMG 01 061925.jpg`
- **Zoom Animation**: Subtle 25-second zoom cycle (scale 1 to 1.05)
- **Background Positioning**: Center-positioned, cover-sized for optimal display

### Current Hero Image
- **Master Bedroom**: Luxury bedroom suite showcasing elegant interior design
- **High Quality**: Professional photography displaying your design work
- **Optimized Display**: Responsive scaling for all device sizes

### Updating Hero Image
Replace the background-image URL in CSS:
```css
.hero-background {
    background-image: url('../images/YOUR-NEW-IMAGE.jpg');
}
```

## Interactive Features

### Homepage Navigation
- **Minimal Header**: Logo on left, hamburger menu on right
- **No Text Menu**: Clean design with hidden navigation menu
- **Hamburger Menu**: Three-line icon opens full navigation overlay
- **Responsive Logo**: Scales appropriately across devices
- **Accessibility**: Keyboard navigation and focus management

### Mobile Adaptations
- **Logo Scaling**: 500px desktop → 400px tablet → 280px mobile
- **Header Logo**: 40px desktop → 35px tablet → 30px mobile
- **Hamburger**: Responsive sizing and positioning
- **Touch Optimized**: Larger touch targets for mobile interaction

## Animation Performance

### Optimization Features
- **CSS Animations**: Hardware-accelerated transforms and opacity
- **Staggered Loading**: Projects animate in sequence (200ms apart)
- **Smooth Transitions**: 60fps animations with proper easing
- **Background Effects**: Slow zoom (20s cycle) for subtle movement

### Browser Support
- **Modern Browsers**: Full animation support
- **Fallbacks**: Graceful degradation for older browsers
- **Mobile**: Optimized for touch devices and smaller screens

## Customization Guidelines

### Logo Modifications
- Edit `assets/logo.svg` for logo changes
- Update CSS colors in the SVG `<style>` section
- Maintain white fill for dark background visibility

### Project Updates
- Update project titles in HTML
- Replace background images in CSS
- Modify project descriptions and numbering as needed

### Animation Timing
- Adjust delays in CSS keyframe animations
- Modify JavaScript setTimeout values for transitions
- Maintain smooth flow between animation phases

### Color Scheme Changes
- Logo Animation Background: `#ffffff` (white)
- Logo Color: `#231f20` (black)
- Navigation Background: `#1a1a1a` (dark with transparency)
- Header Logo: `#ffffff` (white on dark header)
- Accent Gold: `#c9a96e` (highlights)

## Testing Strategy

### Animation Testing
```bash
# Test logo animation sequence
# 1. Load homepage
# 2. Watch 4.5s logo animation
# 3. Verify smooth transition to projects
# 4. Test project hover states
```

### Responsiveness Testing
```bash
# Test breakpoints
# Desktop: 1200px+
# Tablet: 768px-1199px  
# Mobile: 480px-767px
# Small Mobile: <480px
```

### Accessibility Testing
- Tab navigation through all interactive elements
- Screen reader compatibility with ARIA labels
- Keyboard-only navigation functionality
- Focus indicators and management

## Performance Considerations

### Loading Strategy
- **Critical CSS**: Inline above-the-fold styles
- **Logo SVG**: Embedded inline for immediate availability
- **Background Images**: Lazy load project images
- **JavaScript**: Minimal payload for animation control

### Animation Efficiency
- **GPU Acceleration**: Uses transform3d and opacity
- **Avoid Layout Thrashing**: No width/height animations
- **Smooth Timing**: RequestAnimationFrame for smooth playback
- **Mobile Optimizations**: Reduced animation complexity on small screens

This architecture creates a high-end, professional website experience that showcases your interior design work with elegant animations and seamless user interactions.
