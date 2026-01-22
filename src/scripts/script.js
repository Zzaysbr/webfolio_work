// สคริปต์หลักสำหรับเว็บfolio



// ===================================
// DOM READY (กันปุ่มไม่ทำงานบน mobile)
// ===================================
document.addEventListener('DOMContentLoaded', () => {

  // ================================
  // CONFIG
  // ================================
  const HEADER_OFFSET = 96;

  // ================================
  // ELEMENTS
  // ================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  if (!menuBtn || !mobileMenu) {
    console.warn('menu-btn หรือ mobile-menu ไม่พบใน DOM');
    return;
  }

  // ================================
  // MENU STATE
  // ================================
  function openMenu() {
    mobileMenu.classList.remove('hidden');
    document.documentElement.classList.add('overflow-hidden'); // แก้ iOS
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    document.documentElement.classList.remove('overflow-hidden');
  }

  function toggleMenu() {
    mobileMenu.classList.contains('hidden')
      ? openMenu()
      : closeMenu();
  }

  // ================================
  // MENU EVENTS
  // ================================
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // ปิดเมนูเมื่อคลิกพื้นหลัง
  mobileMenu.addEventListener('click', (e) => {
    if (e.target.id === 'mobile-menu') {
      closeMenu();
    }
  });

  // ================================
  // SMOOTH SCROLL (ไม่วาร์ป)
  // ================================
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      HEADER_OFFSET;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }

  // ================================
  // NAV LINK HANDLER
  // ================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      e.preventDefault();
      closeMenu();

      // รอ menu ปิดก่อนค่อย scroll
      setTimeout(() => {
        smoothScrollTo(targetId);
      }, 200);
    });
  });

  // =================================
  // ACTIVE MENU (IntersectionObserver)
  // =================================
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.remove('text-earth-accent', 'font-semibold');
        });

        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          activeLink.classList.add(
            'text-earth-accent',
            'font-semibold'
          );
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  sections.forEach(section => observer.observe(section));

  // ================================
  // CONTACT FORM
  // ================================
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      feedback.textContent = '';
      feedback.className = '';

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        feedback.textContent = 'กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง';
        feedback.className = 'text-orange-600 text-sm';
        return;
      }

      if (!emailPattern.test(email)) {
        feedback.textContent = 'กรุณากรอกอีเมลให้ถูกต้อง';
        feedback.className = 'text-orange-600 text-sm';
        return;
      }

      form.classList.add('hidden');
      feedback.textContent =
        'ขอบคุณสำหรับการติดต่อ! เราจะติดต่อกลับโดยเร็วที่สุด';
      feedback.className =
        'text-emerald-500 text-center text-sm';
    });
  }
});