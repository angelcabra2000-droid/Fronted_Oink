const navItems = document.querySelectorAll('.nav-item');
const mainContent = document.getElementById('main-content');

// 👇 NUEVO: referencias de los dos modos del sidebar
const landingNav = document.getElementById("landing-nav");
const appNav = document.getElementById("app-nav");

async function loadPage(page) {
    try {

        // =========================
        // 🔁 CAMBIO DE MODO
        // =========================
        if (page === "landing") {
            if (landingNav) landingNav.style.display = "flex";
            if (appNav) appNav.style.display = "none";
        } else {
            if (landingNav) landingNav.style.display = "none";
            if (appNav) appNav.style.display = "block";
        }

        const response = await fetch(`pages/${page}.html`);
        const html = await response.text();
        mainContent.innerHTML = html;

        // =========================
        // 🧩 LIBRERIAS
        // =========================

        // TomSelect
        const selectEl = document.querySelector('#categoria-select');
        if (selectEl) {
            new TomSelect(selectEl, { create: false });
        }

        // Flatpickr
        const dateEl = document.querySelector('.input-date');
        if (dateEl) {
            flatpickr(dateEl, {
                locale: 'es',
                dateFormat: 'd/m/Y',
                disableMobile: true,
            });
        }

    } catch (error) {
        mainContent.innerHTML = '<p>Error al cargar la página.</p>';
    }
}


// =========================
// 🎯 EVENTOS GLOBALES
// =========================
document.addEventListener("click", (e) => {

    // =========================
    // 🚀 BOTÓN LANDING → ENTRAR
    // =========================
    if (e.target.closest("#btn-start")) {
        loadPage("home");

        navItems.forEach(n => n.classList.remove('active'));
        document.querySelector('[data-page="home"]')?.classList.add('active');
    }

    // =========================
    // 🟢 INGRESOS
    // =========================
    if (e.target.closest(".btn-edit-income")) {
        const card = e.target.closest(".history-card");
        card.querySelector(".form-income")?.classList.add("active");
    }

    if (e.target.closest(".btn-cancel-income")) {
        e.target.closest(".form-income")?.classList.remove("active");
    }

    // =========================
    // 🔴 GASTOS
    // =========================
    if (e.target.closest(".btn-edit-expense")) {
        const card = e.target.closest(".history-card");
        card.querySelector(".form-expense")?.classList.add("active");
    }

    if (e.target.closest(".btn-cancel-expense")) {
        e.target.closest(".form-expense")?.classList.remove("active");
    }

    // =========================
    // 🟣 DEUDAS
    // =========================
    if (e.target.closest(".btn-add-debt")) {
        const card = e.target.closest(".history-card");
        card.querySelector(".form-debt")?.classList.add("active");
    }

    if (e.target.closest(".btn-cancel-debt")) {
        e.target.closest(".form-debt")?.classList.remove("active");
    }

    // =========================
    // 🟣 AHORROS
    // =========================
    if (e.target.closest(".btn-add-savings")) {
        const card = e.target.closest(".history-card");
        card.querySelector(".form-savings")?.classList.add("active");
    }

    if (e.target.closest(".btn-cancel-savings")) {
        e.target.closest(".form-savings")?.classList.remove("active");
    }

});


// =========================
// 🧭 NAVEGACIÓN NORMAL
// =========================
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const page = item.dataset.page;
        loadPage(page);
    });
});


// =========================
// 🟢 INICIO DE LA APP
// =========================
loadPage('landing');