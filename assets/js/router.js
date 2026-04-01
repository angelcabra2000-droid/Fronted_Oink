const navItems = document.querySelectorAll('.nav-item');
const mainContent = document.getElementById('main-content');

// Sidebar modos
const landingNav = document.getElementById("landing-nav");
const appNav = document.getElementById("app-nav");

// Modal login
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");

// =========================
// 📦 CARGA DE PÁGINAS
// =========================
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

        const selectEl = document.querySelector('#categoria-select');
        if (selectEl) {
            new TomSelect(selectEl, { create: false });
        }

        const dateEl = document.querySelector('.input-date');
        if (dateEl) {
            flatpickr(dateEl, {
                locale: 'es',
                dateFormat: 'd/m/Y',
                disableMobile: true,
            });
        }

        const chartEl = document.getElementById('ingresos-gastos-chart');
        if (chartEl) {
            new Chart(chartEl, {
                type: 'bar',
                data: {
                    labels: ['Ingresos', 'Gastos'],
                    datasets: [{
                        data: [100000, 50000],
                        backgroundColor: [
                            'rgba(0, 166, 62, 0.9)',
                            'rgba(231, 0, 11, 0.9)'
                        ],
                        borderRadius: 6,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            border: { display: false },
                        },
                        y: {
                            grid: { color: 'rgba(0,0,0,0.05)' },
                            border: { display: false },
                        }
                    }
                }
            });
        }

        // Gastos por categoría
        const gastosEl = document.getElementById('gastos-categoria-chart');
        if (gastosEl) {
            const gastosData = {
                labels: ['Alimentación', 'Transporte', 'Vivienda', 'Salud', 'Entretenimiento', 'Otro'],
                datasets: [{
                    data: [30, 20, 25, 10, 8, 7],
                    backgroundColor: [
                        '#E7000B',
                        '#F97316',
                        '#EAB308',
                        '#EC4899',
                        '#8B5CF6',
                        '#6B7280',
                    ],
                    borderWidth: 0,
                }]
            };

            new Chart(gastosEl, {
                type: 'pie',
                data: gastosData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: ctx => ` ${ctx.label}: ${ctx.parsed}%`
                            }
                        }
                    }
                }
            });

            // Leyenda manual
            const gastosLegend = document.getElementById('gastos-legend');
            gastosData.labels.forEach((label, i) => {
                gastosLegend.innerHTML += `
            <li>
                <div class="chart-legend-label">
                    <div class="chart-legend-dot" style="background:${gastosData.datasets[0].backgroundColor[i]}"></div>
                    <span class="text text-main2">${label}</span>
                </div>
                <span class="text text-main2">$0.00</span>
            </li>`;
            });
        }

        // Ingresos por categoría
        const ingresosEl = document.getElementById('ingresos-categoria-chart');
        if (ingresosEl) {
            const ingresosData = {
                labels: ['Salario', 'Freelance', 'Inversiones', 'Alquiler', 'Negocio', 'Otro'],
                datasets: [{
                    data: [50, 20, 15, 8, 5, 2],
                    backgroundColor: [
                        '#00A63E',
                        '#16A34A',
                        '#4ADE80',
                        '#86EFAC',
                        '#BBF7D0',
                        '#6B7280',
                    ],
                    borderWidth: 0,
                }]
            };

            new Chart(ingresosEl, {
                type: 'pie',
                data: ingresosData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: ctx => ` ${ctx.label}: ${ctx.parsed}%`
                            }
                        }
                    }
                }
            });

            const ingresosLegend = document.getElementById('ingresos-legend');
            ingresosData.labels.forEach((label, i) => {
                ingresosLegend.innerHTML += `
            <li>
                <div class="chart-legend-label">
                    <div class="chart-legend-dot" style="background:${ingresosData.datasets[0].backgroundColor[i]}"></div>
                    <span class="text text-main2">${label}</span>
                </div>
                <span class="text text-main2">$0.00</span>
            </li>`;
            });
        }

        const tendenciasEl = document.getElementById('tendencias-chart');
        if (tendenciasEl) {
            new Chart(tendenciasEl, {
                type: 'line',
                data: {
                    labels: ['Sept 2025', 'Oct 2025', 'Nov 2025', 'Dic 2025', 'Ene 2026', 'Feb 2026'],
                    datasets: [
                        {
                            label: 'Ingresos',
                            data: [0, 0, 0, 0, 5000, 100000],
                            borderColor: '#00A63E',
                            backgroundColor: 'rgba(0, 166, 62, 0.05)',
                            pointBackgroundColor: '#ffffff',
                            pointBorderColor: '#00A63E',
                            pointRadius: 5,
                            tension: 0.4,
                            fill: true,
                        },
                        {
                            label: 'Gastos',
                            data: [0, 0, 0, 0, 2000, 50000],
                            borderColor: '#E7000B',
                            backgroundColor: 'rgba(231, 0, 11, 0.05)',
                            pointBackgroundColor: '#ffffff',
                            pointBorderColor: '#E7000B',
                            pointRadius: 5,
                            tension: 0.4,
                            fill: true,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            align: 'end',
                            labels: {
                                font: { family: 'Inter', size: 12 },
                                usePointStyle: true,
                                pointStyle: 'circle',
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(0,0,0,0.05)' },
                            border: { display: false },
                            ticks: { font: { family: 'Inter', size: 11 } }
                        },
                        y: {
                            grid: { color: 'rgba(0,0,0,0.05)' },
                            border: { display: false },
                            ticks: { font: { family: 'Inter', size: 11 } }
                        }
                    }
                }
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
    // 🔐 ABRIR MODAL LOGIN
    // =========================
    if (e.target.closest("#btn-go-login")) {
        loginModal?.classList.remove("hidden");
    }

    // =========================
    // ❌ CERRAR MODAL (overlay)
    // =========================
    if (e.target.closest(".modal-overlay")) {
        loginModal?.classList.add("hidden");
    }

    // =========================
    // ❌ CERRAR MODAL (botón X)
    // =========================
    if (e.target.closest(".modal-close")) {
        loginModal?.classList.add("hidden");
    }

    // =========================
    // 🚀 LOGIN → ENTRAR APP
    // =========================
    if (e.target.closest("#btn-start")) {
        loginModal?.classList.add("hidden"); // cerrar modal

        loadPage("home");

        navItems.forEach(n => n.classList.remove('active'));
        document.querySelector('[data-page="home"]')?.classList.add('active');
    }

    // =========================
    // 🟣 ABRIR REGISTRO
    // =========================
    if (e.target.closest("#btn-go-register")) {
        loginModal?.classList.add("hidden");
        registerModal?.classList.remove("hidden");
    }

    // =========================
    // 🔐 VOLVER A LOGIN
    // =========================
    if (e.target.closest("#btn-go-login-from-register")) {
        registerModal?.classList.add("hidden");
        loginModal?.classList.remove("hidden");
    }

    // =========================
    // 🔄 LOGIN → REGISTER
    // =========================
    if (e.target.closest("#btn-go-register-from-login")) {
        loginModal?.classList.add("hidden");
        registerModal?.classList.remove("hidden");
    }
    // =========================
    // 🔄 REGISTER → LOGIN
    // =========================
    if (e.target.closest("#btn-go-login-from-register")) {
        registerModal?.classList.add("hidden");
        loginModal?.classList.remove("hidden");
    }
    // =========================
    // ❌ CERRAR REGISTER (overlay)
    // =========================
    if (e.target.closest("#register-modal .modal-overlay")) {
        registerModal?.classList.add("hidden");
    }

    // =========================
    // ❌ CERRAR REGISTER (X)
    // =========================
    if (e.target.closest("#register-modal .modal-close")) {
        registerModal?.classList.add("hidden");
    }

    // =========================
    // 🔴 LOGOUT
    // =========================
    if (e.target.closest("#btn-logout")) {

        // volver a landing
        loadPage("landing");

        // mostrar nav de landing
        if (landingNav) landingNav.style.display = "flex";
        if (appNav) appNav.style.display = "none";

        // limpiar selección
        navItems.forEach(n => n.classList.remove('active'));
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
// 🟢 INICIO
// =========================
loadPage('landing');