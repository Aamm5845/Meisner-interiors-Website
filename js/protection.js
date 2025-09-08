/**
 * Website Protection Script
 * Prevents screenshots, right-click, and image downloads
 * © 2025 Meisner Interiors
 */

(function() {
    'use strict';
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    // Disable image dragging
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable text selection on images
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable F12 (Developer Tools)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+A (Select All)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+P (Print)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+C (Copy)
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+V (Paste)
        if (e.ctrlKey && e.keyCode === 86) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+X (Cut)
        if (e.ctrlKey && e.keyCode === 88) {
            e.preventDefault();
            return false;
        }
        
        // Disable PrintScreen
        if (e.keyCode === 44) {
            e.preventDefault();
            return false;
        }
        
        // Disable Alt+PrintScreen
        if (e.altKey && e.keyCode === 44) {
            e.preventDefault();
            return false;
        }
        
        // Disable Windows+PrintScreen
        if (e.metaKey && e.keyCode === 44) {
            e.preventDefault();
            return false;
        }
    });
    
    // Additional protection for mobile devices
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });
    
    // Disable long press on mobile
    document.addEventListener('touchend', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
        }
    });
    
    // Prevent screenshot via canvas manipulation
    function preventScreenshot() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Make canvas invisible overlay
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '999999';
        canvas.style.opacity = '0.01';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Fill with noise pattern
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = Math.random() * 255;     // Red
            imageData.data[i + 1] = Math.random() * 255; // Green  
            imageData.data[i + 2] = Math.random() * 255; // Blue
            imageData.data[i + 3] = 1;                   // Alpha
        }
        
        ctx.putImageData(imageData, 0, 0);
        document.body.appendChild(canvas);
        
        // Refresh noise pattern periodically
        setInterval(() => {
            const newImageData = ctx.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < newImageData.data.length; i += 4) {
                newImageData.data[i] = Math.random() * 255;
                newImageData.data[i + 1] = Math.random() * 255;
                newImageData.data[i + 2] = Math.random() * 255;
                newImageData.data[i + 3] = 1;
            }
            ctx.putImageData(newImageData, 0, 0);
        }, 100);
    }
    
    // Initialize protection when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preventScreenshot);
    } else {
        preventScreenshot();
    }
    
    // Disable console
    setInterval(() => {
        debugger;
    }, 100);
    
    // Clear console periodically
    setInterval(() => {
        console.clear();
    }, 1000);
    
    // Override console methods
    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
    
    // Detect developer tools
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                // Redirect or show warning
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial;font-size:24px;z-index:999999;">Developer tools detected. Please close them to continue.</div>';
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
})();
