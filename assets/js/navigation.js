// =========================
// NAVEGACIÓN (YA TENÍAS)
// =========================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const page = item.dataset.page;
        loadPage(page);

        // 🔥 Cerrar menú en mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});


// =========================
// MENU HAMBURGUESA
// =========================
const toggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}


// =========================
// CERRAR AL TOCAR AFUERA (PRO)
// =========================
document.addEventListener('click', (e) => {
    if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
    ) {
        sidebar.classList.remove('active');
    }
});