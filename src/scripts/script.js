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

// ================================
// MENU STATE
// ================================
function openMenu() {
  mobileMenu.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeMenu() {
  mobileMenu.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

function toggleMenu() {
  mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
}

// ================================
// MENU EVENTS
// ================================
menuBtn.addEventListener('click', toggleMenu);

// ปิดเมนูเมื่อคลิกพื้นหลัง overlay
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    closeMenu();
  }
});

// ================================
// SMOOTH SCROLL
// ================================
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;

  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;

  window.scrollTo({
    top: targetPosition,
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

    // รอ menu animation ปิดก่อนเลื่อน
    setTimeout(() => {
      smoothScrollTo(targetId);
    }, 100);
  });
});


// ================================= //
// สคริปต์นี้ใช้เพื่อเน้นเมนูตามส่วนที่เลื่อนผ่าน
// ================================= //
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove("text-earth-accent", "font-semibold");
        });

        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          activeLink.classList.add("text-earth-accent", "font-semibold");
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.6 // โฟกัส section กลางจอ
  }
);

sections.forEach(section => observer.observe(section));



//================================== //
// สคริปจัดการส่วนการติดต่อ Contact Form
//================================== //

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const feedback = document.getElementById('form-feedback');


// ฟังก์ชันเพื่อจัดการการส่งฟอร์ม
form.addEventListener('submit', (e) => {
    e.preventDefault();

    feedback.textContent = "";
    feedback.className = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ตรวจสอบข้อมูลที่กรอก
    if (!name || !email || !message){
        feedback.textContent = "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง.";
        feedback.className = "text-orange-600 text-sm";
        return;
    }

    if (!emailPattern.test(email)) {
        feedback.textContent = "กรุณากรอกอีเมลที่ถูกต้อง.";
        feedback.className = "text-orange-600 text-sm";
        return;
    }

    // ถ้าข้อมูลถูกต้อง แสดงข้อความยืนยัน
    form.classList.add("hidden");

    feedback.textContent = "ขอบคุณสำหรับการติดต่อ! เราจะติดต่อกลับโดยเร็วที่สุด.";
    feedback.className = "text-emerald-500 text-center text-sm";
});