# 🚀 Meisner Interiors Deployment & Backend Setup Guide

## 📋 Overview
This guide covers deploying your interior design website to Hostinger and setting up the portfolio management backend.

## 🌐 Hostinger Deployment Options

### Option 1: Git Integration (Recommended)
1. **Create a GitHub Repository**
   - Go to GitHub.com and create a new repository
   - Copy the repository URL

2. **Link Your Local Project to GitHub**
   ```bash
   git remote set-url origin YOUR_GITHUB_REPO_URL
   git push origin main
   ```

3. **Set Up Hostinger Git Integration**
   - Login to your Hostinger control panel
   - Go to "Git" section
   - Connect your GitHub repository
   - Set up automatic deployments

4. **Easy Deployment Script**
   - Use the `deploy.bat` file I created
   - Double-click to deploy changes
   - Enter commit message when prompted

### Option 2: File Manager Upload
1. **Zip Your Project**
2. **Upload via Hostinger File Manager**
3. **Extract files to public_html folder**

### Option 3: FTP Upload
1. **Get FTP credentials from Hostinger**
2. **Use FileZilla or similar FTP client**
3. **Upload files to public_html directory**

## 🛠 Backend Setup (Portfolio Management)

### Step 1: Upload Admin Files
Upload the entire `/admin` folder to your Hostinger public_html directory.

### Step 2: Set Permissions
Set folder permissions to 755:
- `/admin` folder
- `/images` folder and all subfolders

### Step 3: Configure Admin Access
1. **Edit `/admin/index.php`**
2. **Change default credentials:**
   ```php
   $admin_username = 'your_admin_username';
   $admin_password = 'your_secure_password_123';
   ```

### Step 4: Create .htaccess Protection
Create `/admin/.htaccess`:
```apache
# Additional security for admin area
<Files "*.php">
    # Allow only specific IPs (optional)
    # Require ip 192.168.1.100
</Files>

# Prevent directory browsing
Options -Indexes

# Hide sensitive files
<Files ~ "^\.">
    Order allow,deny
    Deny from all
</Files>
```

## 🔐 Security Enhancements

### Enhanced Authentication (Optional)
Replace simple authentication with secure hashing:
```php
// In index.php, replace simple password check with:
$admin_password_hash = password_hash('your_password', PASSWORD_DEFAULT);

// For login verification:
if (password_verify($_POST['password'], $admin_password_hash)) {
    // Login successful
}
```

### Database Integration (Advanced)
For more robust portfolio management:
1. **Create MySQL database in Hostinger**
2. **Create projects table**
3. **Replace file-based project storage**

## 📁 File Structure After Deployment
```
public_html/
├── index.html
├── about.html
├── portfolio.html
├── contact.html
├── services.html
├── css/
├── js/
├── images/
│   ├── Master bedroom/
│   ├── Kitchen/
│   ├── Office/
│   └── ... (category folders)
├── assets/
├── admin/
│   ├── index.php (dashboard)
│   ├── login.php
│   ├── portfolio-manager.php
│   ├── admin-style.css
│   └── .htaccess
└── deploy.bat (keep local only)
```

## 🎯 Using the Portfolio Manager

### Accessing Admin Panel
1. **Visit:** `https://your-domain.com/admin`
2. **Login with credentials you set**
3. **Access Portfolio Manager**

### Uploading New Images
1. **Select category** (Master bedroom, Kitchen, etc.)
2. **Add project title**
3. **Upload images** (supports multiple files)
4. **Images auto-organize** into category folders

### Auto-Generated Folders
The system automatically creates:
- `/images/Master bedroom/`
- `/images/Kitchen/`
- `/images/Office/`
- etc.

## 🚀 Quick Deployment Workflow

### For Daily Updates:
1. **Make changes** to your website
2. **Double-click `deploy.bat`**
3. **Enter commit message**
4. **Changes go live automatically**

### For New Portfolio Images:
1. **Go to** `your-domain.com/admin`
2. **Upload images** via Portfolio Manager
3. **Images appear instantly** on website

## 🛡 Security Checklist
- [ ] Changed default admin credentials
- [ ] Set proper folder permissions (755)
- [ ] Created .htaccess protection
- [ ] Enabled HTTPS on Hostinger
- [ ] Regular backups via Hostinger

## 📞 Support
- **Hostinger Support:** Available 24/7
- **GitHub Issues:** For code-related problems
- **Admin Panel:** Built-in error reporting

## 🎨 Customization Tips
- **Colors:** Edit `admin-style.css` for admin panel theming
- **Categories:** Add new options in `portfolio-manager.php`
- **Validation:** Enhance file upload validation as needed

## 💡 Pro Tips
1. **Regular Backups:** Use Hostinger's backup feature
2. **Image Optimization:** Compress images before upload
3. **Monitoring:** Check admin panel logs regularly
4. **Updates:** Keep portfolio.js in sync with uploads

---

Your Meisner Interiors website is now ready for professional deployment with a complete backend management system! 🎉
