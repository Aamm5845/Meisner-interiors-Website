// Portfolio Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectShowcases = document.querySelectorAll('.project-showcase');

    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            filterProjects(category);
        });
    });

    function filterProjects(category) {
        projectShowcases.forEach(project => {
            if (category === 'all') {
                // Show all projects
                project.style.display = 'grid';
            } else {
                // Show only projects matching the category
                if (project.classList.contains(category)) {
                    project.style.display = 'grid';
                } else {
                    project.style.display = 'none';
                }
            }
        });
    }

    // Initialize - show all projects by default
    filterProjects('all');
    
    // Trigger portfolio background text animation on page load
    setTimeout(() => {
        const portfolioHeader = document.querySelector('.portfolio-header');
        if (portfolioHeader) {
            portfolioHeader.classList.add('animate');
        }
    }, 500);
});

// ===================================
// PROJECT MODAL FUNCTIONALITY
// ===================================

// Project data with multiple images for each project
const projectData = {
    // RESIDENTIAL PROJECTS
    'master-suite': {
        title: 'Luxury Master Suite',
        category: 'Master Suite',
        description: 'An elegant master bedroom featuring sophisticated design elements, premium materials, and thoughtful details that create the ultimate private retreat for rest and relaxation.',
        images: [
            'images/Master%20bedroom/Master%20Bedroom%20.jpg',
            'images/Master%20bedroom/Gross%20master.jpg',
            'images/MASTER%20BEDROOM%20IMG%2001%20061925.jpg',
            'images/Master%20bedroom%202/BEDROOM%20IMG01%20062525.jpg',
            'images/Master%20bedroom%202/BEDROOM%20IMG02%20062525.jpg'
        ]
    },
    'study-room': {
        title: 'Professional Home Office',
        category: 'Executive Study',
        description: 'A sophisticated workspace combining rich wood finishes, custom built-ins, and strategic lighting to create an inspiring environment for productivity and focus.',
        images: [
            'images/STUDY%20ROOM%20070725%20IMG01.jpg',
            'images/Study%20room/STUDY%20ROOM%20IMG01%20070725.jpg',
            'images/Study%20room/STUDY%20ROOM%20IMG02%20070725.jpg',
            'images/Study%20room/STUDY%20ROOM%20IMG03%20070725.jpg'
        ]
    },
    'kitchen-modern': {
        title: 'Contemporary Kitchen',
        category: 'Culinary Space',
        description: 'A modern culinary space featuring sleek cabinetry, premium appliances, and innovative storage solutions designed for both functionality and aesthetic appeal.',
        images: [
            'images/kitchen%202/KITCHEN%20IMG01%20082525.jpg',
            'images/kitchen%202/KITCHEN%20IMG03%20082525.jpg',
            'images/Kitchen%203/KITCHEN%20IMG01%20062525.jpg',
            'images/Kitchen%203/KITCHEN%20IMG02%20062525.jpg',
            'images/Kitchen4/KITCHEN%20IMG01%20072525.jpg',
            'images/Kitchen4/KITCHEN%20IMG02%20072525.jpg'
        ]
    },
    'staircase': {
        title: 'Statement Staircase',
        category: 'Architectural Feature',
        description: 'A striking architectural centerpiece featuring clean lines, premium materials, and dramatic lighting that transforms circulation into a sculptural design element.',
        images: [
            'images/STAIRCASE%20IMG%2002%20052825.jpg',
            'images/Staircase/STAIRCASE%20IMG01%20052825.jpg',
            'images/Staircase/STAIRCASE%20IMG03%20052825.jpg',
            'images/Staircase%202/STAIRCASE%20IMG01%20062825.jpg',
            'images/Staircase%202/STAIRCASE%20IMG02%20062825.jpg'
        ]
    },
    'dining-room': {
        title: 'Formal Dining Room',
        category: 'Dining Experience',
        description: 'A sophisticated dining space designed for memorable gatherings, featuring elegant furnishings, refined lighting, and carefully curated details that enhance the dining experience.',
        images: [
            'images/Dining%20room/DINING%20ROOM%20IMG01%20062525.jpg',
            'images/Dining%20room/DINING%20ROOM%20IMG02%20062525.jpg',
            'images/Dining%20room/DINING%20ROOM%20IMG03%20062525.jpg'
        ]
    },
    'basement': {
        title: 'Luxury Basement Lounge',
        category: 'Entertainment Space',
        description: 'A sophisticated lower-level entertainment area featuring custom built-ins, premium finishes, and thoughtful lighting design that creates the perfect space for relaxation and entertaining.',
        images: [
            'images/Basement/BASEMENT%20IMG01%20062825.jpg',
            'images/Basement/BASEMENT%20IMG02%20062825.jpg',
            'images/Basement/BASEMENT%20IMG03%20062825.jpg',
            'images/Basment%202/BASEMENT%20IMG01%20072525.jpg',
            'images/Basment%202/BASEMENT%20IMG02%20072525.jpg'
        ]
    },
    'entrance': {
        title: 'Welcoming Foyer',
        category: 'Grand Entrance',
        description: 'An impressive entrance that sets the tone for the entire home, featuring dramatic design elements, custom millwork, and strategic lighting that creates a memorable first impression.',
        images: [
            'images/Entrence/ENTRENCE%20IMG01%20072525.jpg',
            'images/Entrence/ENTRENCE%20IMG02%20072525.jpg',
            'images/Entrence/ENTRENCE%20IMG03%20072525.jpg'
        ]
    },
    
    // COMMERCIAL PROJECTS
    'office': {
        title: 'Executive Workspace',
        category: 'Corporate Office',
        description: 'A professional office environment designed for productivity and success, featuring modern furnishings, efficient layouts, and sophisticated finishes that reflect corporate excellence.',
        images: [
            'images/Office/OFFICE%20IMG01%20072525.jpg',
            'images/Office/OFFICE%20IMG02%20072525.jpg',
            'images/Office/OFFICE%20IMG03%20072525.jpg'
        ]
    },
    'ballroom': {
        title: 'Luxury Ballroom',
        category: 'Event Venue',
        description: 'An opulent event space featuring crystal chandeliers, rich drapery, and elegant furnishings that create the perfect setting for luxury celebrations and memorable occasions.',
        images: [
            'images/Ballroom/BALLROOM%20IMG01%20081925.jpg',
            'images/Ballroom/BALLROOM%20IMG03%20081925.jpg',
            'images/Ballroom/BALLROOM%20IMG04%20081925.jpg',
            'images/Ballroom/BALLROOM%20IMG05%20081925.jpg',
            'images/Ballroom.jpg',
            'images/Ballroom%202/BALLROOM%20IMG01%20081925.jpg',
            'images/Ballroom%202/BALLROOM%20IMG02%20081925.jpg'
        ]
    },
    'lobby': {
        title: 'Grand Hotel Lobby',
        category: 'Hospitality Design',
        description: 'A sophisticated lobby design that welcomes guests with elegance and comfort, featuring premium materials, thoughtful seating arrangements, and artistic elements that create a memorable hospitality experience.',
        images: [
            'images/Lobby/LOBBY%20IMG01%20072525.jpg',
            'images/Lobby/LOBBY%20IMG02%20072525.jpg',
            'images/Lobby/LOBBY%20IMG03%20072525.jpg'
        ]
    },
    'grocery': {
        title: 'Premium Market',
        category: 'Retail Design',
        description: 'A modern retail space designed for optimal shopping experience, featuring efficient layouts, attractive displays, and premium finishes that enhance the customer journey and brand image.',
        images: [
            'images/Grocery/GROCERY%20IMG01%20072525.jpg',
            'images/Grocery/GROCERY%20IMG02%20072525.jpg',
            'images/Grocery/GROCERY%20IMG03%20072525.jpg'
        ]
    },
    
    // COMMUNAL PROJECTS
    'playground': {
        title: 'Interactive Playground',
        category: 'Play Environment',
        description: 'A vibrant and safe play environment designed to stimulate creativity and learning through thoughtful space planning, colorful elements, and child-friendly materials.',
        images: [
            'images/Playground%201%20s.jpg',
            'images/Playground%202%20s.jpg',
            'images/Playground%203%20s.jpg',
            'images/Playground%204%20s.jpg',
            'images/Playground%205%20s.jpg',
            'images/Playground%207%20s.jpg',
            'images/pLAYGROUND/FUN%20CORNER%2001.jpg',
            'images/pLAYGROUND/FUN%20CORNER%2002.jpg',
            'images/pLAYGROUND/FUN%20CORNER%2003.jpg',
            'images/pLAYGROUND/FUN%20CORNER%2004.jpg',
            'images/pLAYGROUND/Playground%203%20s.jpg'
        ]
    },
    'mikvah': {
        title: 'Mikvah Sanctuary',
        category: 'Sacred Space',
        description: 'A serene and sacred space designed with respect for tradition and modern comfort, featuring natural materials, calming colors, and thoughtful details that enhance the spiritual experience.',
        images: [
            'images/Mikvah/MIKVAH%20IMG01%20062825.jpg',
            'images/Mikvah/mikvah2.jpg',
            'images/Mikvah/MKV%2004.jpg',
            'images/Mikvah/MKV%2005.jpg',
            'images/Mikvah/NEW%20LOBBY2.jpg',
            'images/Mikvah%202/MIKVAH%20IMG01%20072525.jpg',
            'images/Mikvah%202/MIKVAH%20IMG02%20072525.jpg',
            'images/mikvah%20booth.jpg',
            'images/booth%20mikvah.jpg',
            'images/booth%20mikvah2.jpg'
        ]
    },
    'sukkah': {
        title: 'Elegant Sukkah',
        category: 'Festival Space',
        description: 'A beautifully designed temporary structure that honors tradition while providing comfort and style, featuring natural elements, thoughtful lighting, and decorative details that create a warm gathering space.',
        images: [
            'images/Sukkah/SUKKAH%20IMG01%20092625.jpg',
            'images/Sukkah/SUKKAH%20IMG02%20092625.jpg',
            'images/Sukkah/SUKKAH%20IMG03%20092625.jpg'
        ]
    }
};

let currentProject = null;
let currentImageIndex = 0;

function openProjectModal(projectId) {
    currentProject = projectId;
    const project = projectData[projectId];
    
    if (!project) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalDescription').textContent = project.description;
    
    // Setup gallery
    setupGallery(project.images);
    
    // Show modal
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentImageIndex = 0;
}

function setupGallery(images) {
    currentImageIndex = 0;
    
    // Set main image
    const mainImage = document.getElementById('mainGalleryImage');
    mainImage.src = images[0];
    mainImage.alt = projectData[currentProject].title;
    
    // Setup thumbnails
    const thumbnailContainer = document.getElementById('galleryThumbnails');
    thumbnailContainer.innerHTML = '';
    
    if (images.length > 1) {
        images.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.onclick = () => setActiveImage(index);
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${projectData[currentProject].title} - Image ${index + 1}`;
            
            thumbnail.appendChild(img);
            thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    // Update navigation buttons
    updateNavigationButtons(images.length);
}

function setActiveImage(index) {
    const project = projectData[currentProject];
    if (!project || index < 0 || index >= project.images.length) return;
    
    currentImageIndex = index;
    
    // Update main image
    const mainImage = document.getElementById('mainGalleryImage');
    mainImage.src = project.images[index];
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    
    // Update navigation buttons
    updateNavigationButtons(project.images.length);
}

function previousImage() {
    const project = projectData[currentProject];
    if (!project || currentImageIndex <= 0) return;
    
    setActiveImage(currentImageIndex - 1);
}

function nextImage() {
    const project = projectData[currentProject];
    if (!project || currentImageIndex >= project.images.length - 1) return;
    
    setActiveImage(currentImageIndex + 1);
}

function updateNavigationButtons(totalImages) {
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    
    if (totalImages <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }
    
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    
    prevBtn.classList.toggle('disabled', currentImageIndex === 0);
    nextBtn.classList.toggle('disabled', currentImageIndex === totalImages - 1);
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('projectModal').classList.contains('active')) {
        closeProjectModal();
    }
});
