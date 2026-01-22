document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // CONFIG
  // ================================
  const HEADER_OFFSET = 96;

  // ================================
  // ELEMENTS
  // ================================
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // ================================
  // MOBILE MENU 
  // ================================
  if (menuBtn && mobileMenu) {
    function openMenu() {
      mobileMenu.classList.remove("hidden");
      document.documentElement.classList.add("overflow-hidden");
    }

    function closeMenu() {
      mobileMenu.classList.add("hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }

    function toggleMenu() {
      mobileMenu.classList.contains("hidden") ? openMenu() : closeMenu();
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId.startsWith("#")) return;

        e.preventDefault();
        closeMenu();

        setTimeout(() => {
          const target = document.querySelector(targetId);
          if (!target) return;

          const y =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            HEADER_OFFSET;

          window.scrollTo({ top: y, behavior: "smooth" });
        }, 200);
      });
    });
  }

  // ================================
  // ACTIVE MENU
  // ================================
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link =>
          link.classList.remove("text-earth-accent", "font-semibold")
        );

        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );

        if (active) {
          active.classList.add("text-earth-accent", "font-semibold");
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));
  }

  // ================================
  // CONTACT FORM 
  // ================================
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const feedback = document.getElementById("form-feedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    feedback.textContent = "";
    feedback.className = "mt-4 text-sm";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      feedback.textContent = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
      feedback.classList.add("text-orange-500");
      return;
    }

    if (!emailPattern.test(email)) {
      feedback.textContent = "รูปแบบอีเมลไม่ถูกต้อง";
      feedback.classList.add("text-orange-500");
      return;
    }

    feedback.textContent = "ขอบคุณสำหรับการติดต่อ เราจะตอบกลับโดยเร็ว";
    feedback.classList.add("text-emerald-500");

    form.reset();
  });

});