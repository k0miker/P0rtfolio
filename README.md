 # Colin Blome - Personal Portfolio Website

Welcome to the repository for my personal portfolio website, [colinblome.dev](https://colinblome.dev).

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Legal & Privacy](#legal--privacy)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project

[Colin Blome - Personal Portfolio](https://colinblome.dev) is a showcase of my work, skills, and projects as a freelance web developer based in Fürstenau, Germany. It serves as a digital resume and a way for potential clients, employers, and collaborators to learn more about me and my professional journey in web development.

## Features

- **Responsive Design**: Optimized for viewing on devices of all sizes
- **Projects Showcase**: A detailed view of my projects with descriptions, technologies used, and links to live demos or repositories
- **Contact Form**: GDPR-compliant contact form powered by Netlify Forms
- **Cookie Consent**: Comprehensive cookie management with Google Analytics integration
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Performance Optimization**: Performance mode toggle for reduced animations
- **SEO Optimized**: Local SEO for Fürstenau and surrounding areas
- **Multilingual Content**: German and English project descriptions

## Technologies Used

- **Frontend**:
  - [Astro](https://astro.build) - Static Site Generator with component islands
  - HTML5 & CSS3
  - JavaScript/TypeScript
  - Tailwind CSS for utility-first styling
  - FontAwesome for icons

- **Analytics & Tracking**:
  - Google Analytics 4 (GA4) with GDPR compliance
  - Google Tag Manager for tag management

- **Form Handling**:
  - [Netlify Forms](https://www.netlify.com/products/forms/) - GDPR-compliant form processing

- **Deployment & Hosting**:
  - [Netlify](https://netlify.app) for deployment and hosting
  - Continuous deployment from GitHub

- **Development Tools**:
  - Git & GitHub for version control
  - VS Code with Astro extensions
  - Node.js and npm for package management

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 18 or higher)
- npm (comes with Node.js) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/k0miker/P0rtfolio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd P0rtfolio
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:4321` to view the website.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the built project locally
- `npm run astro` - Run Astro CLI commands

## Project Structure

```text
src/
├── assets/          # Static assets (images, documents)
├── components/      # Reusable Astro components
│   ├── ui/         # UI components (buttons, modals, etc.)
│   └── ...         # Main components (Nav, Contact, etc.)
├── css/            # Global styles and CSS files
├── data/           # Project data and configuration
├── layouts/        # Layout components
├── pages/          # Page components (routes)
├── scripts/        # JavaScript utilities
├── stores/         # State management
└── utils/          # Utility functions
```

## Deployment

The website is automatically deployed to Netlify when changes are pushed to the main branch. The deployment includes:

- Automatic builds from GitHub
- Form handling through Netlify Forms
- SSL certificate management
- CDN distribution
- Branch previews for pull requests

### Environment Variables

For local development, you may need to set up the following environment variables:

```bash
# Google Analytics
GOOGLE_ANALYTICS_ID=G-DPXY96XYN3
GOOGLE_TAG_MANAGER_ID=GTM-WFG6LFSX
```

## Legal & Privacy

This website implements comprehensive GDPR compliance:

- **Cookie Consent**: Users can choose to accept or reject analytics cookies
- **Privacy Policy**: Detailed information about data processing
- **Contact Form**: GDPR-compliant form processing through Netlify
- **Analytics**: Google Analytics 4 with anonymized IPs and consent management

### Data Processing

- Contact form data is processed through Netlify Forms
- Analytics data is processed through Google Analytics 4 (only with user consent)
- No personal data is stored without explicit user consent

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to report bugs, please open an issue or create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add some YourFeature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Test your changes thoroughly
- Update documentation when necessary
- Ensure GDPR compliance for any data processing features

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

**Colin Blome**  
Freelance Web Developer  
Based in Fürstenau, Germany

- **Email**: [info@colinblome.dev](mailto:info@colinblome.dev)
- **Website**: [https://colinblome.dev](https://colinblome.dev)
- **GitHub**: [https://github.com/k0miker](https://github.com/k0miker)

**Service Areas**: Fürstenau, Samtgemeinde Bersenbrück, Landkreis Osnabrück

---

*This portfolio showcases my journey as a freelance web developer specializing in modern web technologies and GDPR-compliant solutions for local businesses.*

