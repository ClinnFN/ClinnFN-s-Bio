!function() {
  // ClinnFN's Bio Main Script
  console.log("ClinnFN's Bio JavaScript", "color: purple; font-size: 16px;");

  // Theme Toggle System
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  }

  themeToggle?.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  loadTheme();

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Section Highlighter on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  function highlightSection() {
    let index = sections.length;
    while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[index]?.classList.add('active');
  }

  window.addEventListener('scroll', highlightSection);
  highlightSection();

  // Typing Effect for Hero Section
  const typeTarget = document.getElementById('typing-text');
  const phrases = ["Web Developer", "Creative Thinker", "Gamer", "Content Creator"];
  let charIndex = 0, phraseIndex = 0, typing = true;

  function typeLoop() {
    if (!typeTarget) return;
    const currentPhrase = phrases[phraseIndex];
    if (typing) {
      typeTarget.textContent = currentPhrase.slice(0, ++charIndex);
      if (charIndex === currentPhrase.length) {
        typing = false;
        setTimeout(typeLoop, 1000);
      } else {
        setTimeout(typeLoop, 100);
      }
    } else {
      typeTarget.textContent = currentPhrase.slice(0, --charIndex);
      if (charIndex === 0) {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 500);
      } else {
        setTimeout(typeLoop, 50);
      }
    }
  }

  typeLoop();
 
  // Visitor Counter Using localStorage
  const visitDisplay = document.getElementById('visit-count');
  if (visitDisplay) {
    let visits = localStorage.getItem('visits') || 0;
    visits++;
    localStorage.setItem('visits', visits);
    visitDisplay.textContent = `Visits: ${visits}`;
  }

  // Responsive Footer Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Darken navbar on scroll
  const navbar = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        obs.unobserve(img);
      }
    });
  });

  images.forEach(img => imgObserver.observe(img));

  // Floating Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  quoteBtn?.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
  });

  // Scroll percentage progress bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrolled / height) * 100}%`;
  });

  openModalBtn?.addEventListener("click", () => modal?.classList.add("show"));
  closeModalBtn?.addEventListener("click", () => modal?.classList.remove("show"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal?.classList.remove("show");
  });

}()
