

// ================================= //
// สคริปต์นี้ใช้เพื่อจัดการเมนูมือถือและการเลื่อนหน้าอย่างราบรื่น
// ================================= //
// สร้างตัวแปรเพื่อเก็บการอ้างอิงไปยังองค์ประกอบต่างๆ ใน DOM
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');


// ฟังก์ชันเพื่อสลับการแสดงผลเมนูมือถือ
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ฟังก์ชั่นเลื่อนหน้าไปยังส่วนต่างๆ ของหน้าเว็บเมื่อคลิกที่ลิงก์ในเมนู
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });

        // ซ่อนเมนูมือถือหลังจากคลิกเลือกเมนู
        mobileMenu.classList.add('hidden');
    });
});



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

    // ตรวจสอบข้อมูลที่กรอก
    if (!name || !email || !message){
        feedback.textContent = "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง.";
        feedback.className = "text-orange-600 text-sm";
        return;
    }

    if (!email.includes('@')){
        feedback.textContent = "กรุณากรอกอีเมลที่ถูกต้อง.";
        feedback.className = "text-orange-600 text-sm";
        return;
    }

    // ถ้าข้อมูลถูกต้อง แสดงข้อความยืนยัน
    form.classList.add("hidden");

    feedback.textContent = "ขอบคุณสำหรับการติดต่อ! เราจะติดต่อกลับโดยเร็วที่สุด.";
    feedback.className = "text-emerald-500 text-center text-sm";
});