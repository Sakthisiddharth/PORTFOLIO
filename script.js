// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Loading Animation
  setTimeout(() => {
    document.querySelector(".loading").classList.add("hidden");
  }, 1000);

  // Custom Cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 100);
  });

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .project-card, .skill-category, .education-card"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      cursorFollower.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      cursorFollower.classList.remove("hover");
    });

    element.addEventListener("mousedown", () => {
      cursor.classList.add("click");
    });

    element.addEventListener("mouseup", () => {
      cursor.classList.remove("click");
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.querySelector(".scroll-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
      scrollTopBtn.classList.add("visible");
    } else {
      navbar.classList.remove("scrolled");
      scrollTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top button
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile menu when clicking a link
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add("active");
      } else {
        navLink?.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // Animate skill bars on scroll
  function animateSkills() {
    const skillCategories = document.querySelectorAll(".skill-category");

    skillCategories.forEach((category) => {
      const categoryPosition = category.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (categoryPosition < screenPosition) {
        category.classList.add("animate");

        const skillProgressBars = category.querySelectorAll(".skill-progress");
        skillProgressBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          bar.style.setProperty("--progress-width", width + "%");
        });
      }
    });
  }

  window.addEventListener("scroll", animateSkills);
  animateSkills(); // Initial check

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".project-card, .education-card, .timeline-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Initial check

  // Form submission
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    alert("Thank you for your message! I will get back to you soon.");

    // Reset form
    contactForm.reset();

    // Reset floating labels
    const labels = contactForm.querySelectorAll("label");
    labels.forEach((label) => {
      label.style.top = "1.2rem";
      label.style.fontSize = "1rem";
      label.style.color = "rgba(255, 255, 255, 0.6)";
    });
  });

  // Floating label effect
  const formInputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea"
  );

  formInputs.forEach((input) => {
    const label = input.nextElementSibling;

    input.addEventListener("focus", () => {
      if (label && label.tagName === "LABEL") {
        label.style.top = "-10px";
        label.style.fontSize = "0.85rem";
        label.style.color = "var(--primary-color)";
      }
    });

    input.addEventListener("blur", () => {
      if (label && label.tagName === "LABEL" && !input.value) {
        label.style.top = "1.2rem";
        label.style.fontSize = "1rem";
        label.style.color = "rgba(255, 255, 255, 0.6)";
      }
    });

    // Check on page load
    if (input.value) {
      label.style.top = "-10px";
      label.style.fontSize = "0.85rem";
      label.style.color = "var(--primary-color)";
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Prevent context menu on images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("contextmenu", (e) => e.preventDefault());
  });
});
