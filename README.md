# Nikhil Kumar Maurya - Portfolio Website

A modern, professional portfolio website showcasing skills, experience, and achievements as a Full-Stack Web Developer.

## 🚀 Features

- **Modern Design**: Cyberpunk-inspired aesthetic with animated backgrounds and glowing effects
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Scroll-triggered reveals and smooth transitions
- **Performance Optimized**: Clean code with optimized assets
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Stylesheet
├── js/
│   └── script.js      # JavaScript functionality
├── assets/
│   └── images/        # Image assets
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript**: Vanilla JS for interactivity
- **Google Fonts**: JetBrains Mono & Syne

## 📦 Installation & Setup

1. **Download or Clone**
   ```bash
   # If using git
   git clone <repository-url>
   
   # Or simply download the ZIP file
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

3. **For Development**
   - Use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   - Then open `http://localhost:8000` in your browser

## ✏️ Customization

### Update Personal Information

1. **Contact Details** (`index.html`)
   - Email: Line 217
   - Phone: Line 223
   - LinkedIn: Line 229
   - GitHub: Line 235

2. **Content Sections**
   - Hero Section: Lines 47-60
   - Skills: Lines 68-116
   - Experience: Lines 123-161
   - Hackathons: Lines 168-200
   - Contact: Lines 207-241

### Modify Colors (`css/style.css`)

Update CSS variables at the top of the file:
```css
:root {
    --primary: #00ff88;      /* Main accent color */
    --secondary: #0047ff;    /* Secondary accent */
    --dark: #0a0e27;        /* Dark background */
    --accent: #ff006e;       /* Highlight color */
}
```

### Add Your Images

1. Place your images in `assets/images/` folder
2. Update image references in `index.html`
3. Recommended images:
   - Profile photo/avatar
   - Project screenshots
   - Certification badges
   - Company logos

## 🌐 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Your site will be live at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the portfolio folder to Netlify
2. Or connect your GitHub repository
3. Deploy automatically

### Vercel
```bash
npm i -g vercel
vercel
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎨 Design Credits

- Font: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) & [Syne](https://fonts.google.com/specimen/Syne)
- Icons: Unicode Emojis & SVG
- Color Scheme: Custom cyberpunk-inspired palette

## 📄 License

This project is open source and available for personal and commercial use.

## 👤 Author

**Nikhil Kumar Maurya**
- Email: nikhilmaurya217@gmail.com
- LinkedIn: [linkedin.com/in/nikhil217](https://linkedin.com/in/nikhil217)
- GitHub: [github.com/NIKHILmaurya217](https://github.com/NIKHILmaurya217)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📝 To-Do / Future Enhancements

- [ ] Add project showcase section
- [ ] Implement blog integration
- [ ] Add contact form with backend
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Add animations library (GSAP)
- [ ] Include testimonials section
- [ ] Add downloadable resume button

---

Built with ❤️ by Nikhil Kumar Maurya