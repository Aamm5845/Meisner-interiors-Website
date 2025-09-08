<?php
session_start();

// Simple authentication - change these credentials!
$admin_username = 'meisner_admin';
$admin_password = 'your_secure_password_here'; // CHANGE THIS!

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    // Handle login
    if ($_POST['username'] ?? '' === $admin_username && 
        $_POST['password'] ?? '' === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: index.php');
        exit;
    }
    
    // Show login form
    include 'login.php';
    exit;
}

// Handle logout
if ($_GET['logout'] ?? false) {
    session_destroy();
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meisner Interiors - Admin Dashboard</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="admin-style.css" rel="stylesheet">
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <h1><i class="fas fa-palette"></i> Meisner Interiors Admin</h1>
            <a href="?logout=1" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
        
        <div class="admin-content">
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <i class="fas fa-images"></i>
                    <h3>Portfolio Management</h3>
                    <p>Upload and manage portfolio images</p>
                    <a href="portfolio-manager.php" class="btn btn-primary">Manage Portfolio</a>
                </div>
                
                <div class="dashboard-card">
                    <i class="fas fa-folder"></i>
                    <h3>Image Library</h3>
                    <p>Browse all uploaded images</p>
                    <a href="image-library.php" class="btn btn-secondary">View Library</a>
                </div>
                
                <div class="dashboard-card">
                    <i class="fas fa-cog"></i>
                    <h3>Settings</h3>
                    <p>Configure website settings</p>
                    <a href="settings.php" class="btn btn-tertiary">Settings</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
