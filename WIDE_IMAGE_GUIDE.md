# Wide Image Guide for Portfolio Section

## What You Need

You need to create **ONE wide image** that will be split across three categories.

## Image Requirements

- **Aspect ratio**: Wide landscape (like 3:1 or 4:1 ratio)
- **Width**: At least 3000px wide 
- **Height**: 1000px tall (or proportional)
- **Content**: Should work when split into 3 equal parts

## How to Create the Wide Image

### Option 1: Combine 3 Existing Images
1. Take your 3 current images:
   - `MASTER BEDROOM IMG 01 061925.jpg`
   - `STAIRCASE IMG 02 052825.jpg` 
   - `STUDY ROOM 070725 IMG01.jpg`

2. Using any image editor (Photoshop, GIMP, Canva):
   - Create a new canvas: 3000px x 1000px
   - Place bedroom image on the LEFT third (0-1000px)
   - Place staircase image in the MIDDLE third (1000-2000px)  
   - Place study room on the RIGHT third (2000-3000px)
   - Save as `wide-portfolio.jpg`

### Option 2: Use One Panoramic Image
- Find or create one wide interior image that looks good when split
- Should be interesting across the full width

## Where to Put the Image

1. Save your wide image as: `images/wide-portfolio.jpg`
2. The CSS will automatically use it and split it into thirds

## Current Status

Right now, I'm using just the bedroom image repeated. Once you create the wide image, just replace the filename in the CSS and it will work perfectly!

## CSS Location to Update

In `css/style.css`, find this line:
```css
background-image: url('images/MASTER BEDROOM IMG 01 061925.jpg');
```

Replace with:
```css
background-image: url('images/wide-portfolio.jpg');
```

## Result

- **Commercial card**: Shows left 1/3 of your wide image
- **Residential card**: Shows middle 1/3 of your wide image  
- **Institutional card**: Shows right 1/3 of your wide image
- **On hover**: Complete wide image appears as background
