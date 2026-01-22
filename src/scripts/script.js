document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       Mobile Menu
    ========================= */
    const toggle = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuBox = menu?.querySelector('div'); // กล่องเมนูด้านใน

    if (!toggle || !menu || !menuBox) {
        console.error('mobile menu element missing');
        return;
    }

    // เปิด / ปิดเมนู
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
    });

    // กันคลิกในกล่องเมนูไม่ให้ปิด
    menuBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // คลิก backdrop → ปิด
    menu.addEventListener('click', () => {
        menu.classList.add('hidden');
    });

    // ESC → ปิด
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menu.classList.add('hidden');
        }
    });

    // คลิกลิงก์ → ปิด (UX มือถือ)
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

    /* =========================
       Contact Form Validation
    ========================= */
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (!form || !feedback) {
        console.error('contact form element missing');
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name')?.value.trim();
        const email = form.querySelector('#email')?.value.trim();
        const message = form.querySelector('#message')?.value.trim();

        feedback.textContent = '';
        feedback.className = 'mt-4 min-h-[24px] text-sm';

        if (!name || !email || !message) {
            feedback.textContent = 'กรุณากรอกข้อมูลให้ครบทุกช่อง';
            feedback.classList.add('text-red-400');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedback.textContent = 'รูปแบบ Email ไม่ถูกต้อง';
            feedback.classList.add('text-red-400');
            return;
        }

        feedback.textContent = 'ส่งข้อความเรียบร้อยแล้ว';
        feedback.classList.add('text-green-400');

        form.reset();
    });
});