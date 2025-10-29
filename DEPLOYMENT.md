# 🚀 GitHub Pages Deployment Guide

## Quick Steps to Deploy Your Landlordi Project

### ✅ Prerequisites Completed:
- ✅ Git repository initialized
- ✅ All files committed
- ✅ .gitignore created
- ✅ LICENSE added (MIT)
- ✅ README.md updated with live demo link
- ✅ Remote URL configured

---

## 📤 Step-by-Step Deployment

### **1. Create GitHub Repository**

Go to: **https://github.com/new**

Fill in:
```
Repository name: Landlordi
Description: Malawi's trusted property marketplace
Visibility: ☑️ Public (REQUIRED for GitHub Pages)
Initialize: ☐ Don't check any boxes
```

Click **"Create repository"**

---

### **2. Authenticate with GitHub**

**Option A: GitHub CLI (Easiest)**
```powershell
# Download from: https://cli.github.com/
gh auth login
```

**Option B: Personal Access Token**
1. Visit: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "Landlordi Deploy"
4. Select scope: ☑️ repo (check all boxes under repo)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

---

### **3. Push Your Code**

Open PowerShell in your project folder and run:

```powershell
cd "c:\Users\TIMOTHY\Desktop\Landlord"
git push -u origin master
```

When prompted:
- **Username**: Papwright
- **Password**: [Paste your token if using Option B]

---

### **4. Enable GitHub Pages**

1. Go to: **https://github.com/Papwright/Landlordi**
2. Click **"Settings"** (top right)
3. Click **"Pages"** (left sidebar, under "Code and automation")
4. Under **"Build and deployment"**:
   - Source: **Deploy from a branch**
   - Branch: **master** | Folder: **/ (root)**
5. Click **"Save"**

⏳ Wait 1-2 minutes for deployment...

---

### **5. Access Your Live Site**

Your live website will be available at:

🌐 **https://papwright.github.io/Landlordi/**

---

## 🎨 Optional: Custom Domain

If you have a domain name:

1. In GitHub Pages settings, add your custom domain
2. Update your DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Host: www
   Value: papwright.github.io
   ```

---

## 🔄 Updating Your Live Site

To update your live website after making changes:

```powershell
cd "c:\Users\TIMOTHY\Desktop\Landlord"
git add .
git commit -m "Describe your changes here"
git push
```

GitHub Pages will automatically rebuild and deploy within 1-2 minutes!

---

## 🐛 Troubleshooting

### Push Failed?
- Make sure you created the repository on GitHub
- Check your authentication (token or GitHub CLI)
- Verify remote: `git remote -v`

### Pages Not Showing?
- Wait 2-3 minutes after enabling
- Check Settings > Pages for deployment status
- Look for green checkmark ✅ next to deployment

### 404 Error?
- Ensure branch is set to `master`
- Check that `index.html` is in root directory
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## 📊 Repository Status

- **Repository**: https://github.com/Papwright/Landlordi
- **Live Site**: https://papwright.github.io/Landlordi/
- **Issues**: https://github.com/Papwright/Landlordi/issues

---

## 🎉 Success Checklist

- [ ] Created repository on GitHub
- [ ] Pushed code successfully
- [ ] Enabled GitHub Pages
- [ ] Verified live site is working
- [ ] Shared the live demo link

---

**Need Help?**
- GitHub Pages Docs: https://docs.github.com/en/pages
- GitHub Support: https://support.github.com/

**Made with ❤️ for Malawi's property market**
