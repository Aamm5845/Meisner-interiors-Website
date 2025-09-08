<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}

// Handle file upload
if ($_POST['upload'] ?? false) {
    $uploadDir = '../images/';
    $category = $_POST['category'] ?? 'general';
    
    // Create category folder if it doesn't exist
    $categoryDir = $uploadDir . $category . '/';
    if (!is_dir($categoryDir)) {
        mkdir($categoryDir, 0755, true);
    }
    
    $uploadedFiles = [];
    $errors = [];
    
    if (!empty($_FILES['images']['name'][0])) {
        foreach ($_FILES['images']['name'] as $key => $filename) {
            if ($_FILES['images']['error'][$key] === 0) {
                $fileExtension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
                $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
                
                if (in_array($fileExtension, $allowedExtensions)) {
                    // Generate unique filename
                    $newFilename = uniqid() . '_' . $filename;
                    $targetPath = $categoryDir . $newFilename;
                    
                    if (move_uploaded_file($_FILES['images']['tmp_name'][$key], $targetPath)) {
                        $uploadedFiles[] = $newFilename;
                        
                        // Auto-generate portfolio entry
                        $projectData = generateProjectEntry($category, $newFilename, $_POST['project_title'] ?? '');
                        updatePortfolioJS($projectData);
                    } else {
                        $errors[] = "Failed to upload $filename";
                    }
                } else {
                    $errors[] = "Invalid file type for $filename";
                }
            }
        }
    }
}

function generateProjectEntry($category, $filename, $title) {
    $projectId = uniqid();
    return [
        'id' => $projectId,
        'title' => $title ?: 'New Project',
        'category' => ucfirst($category),
        'filename' => $filename,
        'path' => "images/$category/$filename"
    ];
}

function updatePortfolioJS($projectData) {
    // This would update the portfolio.js file with the new project
    // For now, we'll just log it - you can implement the actual JS update logic
    error_log("New project added: " . json_encode($projectData));
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Manager - Meisner Interiors</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="admin-style.css" rel="stylesheet">
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <h1><i class="fas fa-images"></i> Portfolio Manager</h1>
            <a href="index.php" class="back-btn"><i class="fas fa-arrow-left"></i> Back to Dashboard</a>
        </div>
        
        <div class="admin-content">
            <?php if (!empty($uploadedFiles)): ?>
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    Successfully uploaded <?= count($uploadedFiles) ?> image(s)
                </div>
            <?php endif; ?>
            
            <?php if (!empty($errors)): ?>
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <?php foreach ($errors as $error): ?>
                        <div><?= htmlspecialchars($error) ?></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <div class="upload-card">
                <h2>Upload New Portfolio Images</h2>
                
                <form method="POST" enctype="multipart/form-data" class="upload-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="project_title">Project Title</label>
                            <input type="text" id="project_title" name="project_title" placeholder="e.g., Luxury Master Bedroom">
                        </div>
                        
                        <div class="form-group">
                            <label for="category">Category</label>
                            <select id="category" name="category" required>
                                <option value="">Select Category</option>
                                <option value="Master bedroom">Master Bedroom</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Living room">Living Room</option>
                                <option value="Dining room">Dining Room</option>
                                <option value="Bathroom">Bathroom</option>
                                <option value="Office">Office</option>
                                <option value="Ballroom">Ballroom</option>
                                <option value="Lobby">Lobby</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Playground">Playground</option>
                                <option value="Mikvah">Mikvah</option>
                                <option value="Sukkah">Sukkah</option>
                                <option value="Basement">Basement</option>
                                <option value="Staircase">Staircase</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="images">Select Images</label>
                        <input type="file" id="images" name="images[]" multiple accept="image/*" required>
                        <div class="file-info">
                            Supported formats: JPG, PNG, WebP. Max 10MB per file.
                        </div>
                    </div>
                    
                    <button type="submit" name="upload" class="btn btn-primary">
                        <i class="fas fa-upload"></i> Upload Images
                    </button>
                </form>
            </div>
            
            <div class="current-projects">
                <h2>Current Portfolio Projects</h2>
                <div class="projects-grid">
                    <?php
                    $imageDir = '../images/';
                    $categories = array_diff(scandir($imageDir), array('..', '.'));
                    
                    foreach ($categories as $category) {
                        if (is_dir($imageDir . $category)) {
                            $categoryPath = $imageDir . $category . '/';
                            $images = array_diff(scandir($categoryPath), array('..', '.'));
                            
                            foreach ($images as $image) {
                                if (in_array(strtolower(pathinfo($image, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'webp'])) {
                                    echo '<div class="project-item">';
                                    echo '<img src="' . $categoryPath . $image . '" alt="' . $category . '">';
                                    echo '<div class="project-info">';
                                    echo '<h4>' . ucfirst($category) . '</h4>';
                                    echo '<p>' . $image . '</p>';
                                    echo '</div>';
                                    echo '</div>';
                                }
                            }
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
