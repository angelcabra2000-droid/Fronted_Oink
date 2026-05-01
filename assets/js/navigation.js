// =========================
// NAVEGACIÓN 
// =========================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const page = item.dataset.page;
        loadPage(page);

        // Cerrar menú en mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }
    });
});


// =========================
// MENU HAMBURGUESA
// =========================
const toggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

if (toggle && sidebar && sidebarOverlay) {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });
}


// =========================
// CERRAR AL TOCAR AFUERA
// =========================
document.addEventListener('click', (e) => {
    if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
    ) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    if (
        e.target.closest('#btn-start') ||
        e.target.closest('#btn-logout') ||
        e.target.closest('#btn-go-login') ||
        e.target.closest('#btn-go-register') ||
        e.target.closest('#btn-go-register-from-login')
    ) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }
});