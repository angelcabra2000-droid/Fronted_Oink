

function initCharts() {

    const getColor = (varName) =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();

    // =========================
    // 📊 INGRESOS VS GASTOS
    // =========================
    const chartEl = document.getElementById('ingresos-gastos-chart');
    if (chartEl) {
        new Chart(chartEl, {
            type: 'bar',
            data: {
                labels: ['Ingresos', 'Gastos'],
                datasets: [{
                    data: [100000, 50000],
                    backgroundColor: [
                        getColor('--color-4'),
                        getColor('--color-1')
                    ],
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
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

    // =========================
    // 🥧 GASTOS POR CATEGORÍA
    // =========================
    const gastosEl = document.getElementById('gastos-categoria-chart');
    if (gastosEl) {

        const gastosData = {
            labels: ['Alimentación', 'Transporte', 'Vivienda', 'Salud', 'Entretenimiento', 'Otro'],
            datasets: [{
                data: [30, 20, 25, 10, 8, 7],
                backgroundColor: [
                    getColor('--color-1'),
                    getColor('--color-2'),
                    getColor('--color-3'),
                    getColor('--color-4'),
                    getColor('--color-5'),
                    getColor('--color-6'),
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

        // 🔥 Leyenda manual
        const gastosLegend = document.getElementById('gastos-legend');
        if (gastosLegend) {
            gastosLegend.innerHTML = ""; // limpiar antes

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
    }

    // =========================
    // 🥧 INGRESOS POR CATEGORÍA
    // =========================
    const ingresosEl = document.getElementById('ingresos-categoria-chart');
    if (ingresosEl) {

        const ingresosData = {
            labels: ['Salario', 'Freelance', 'Inversiones', 'Alquiler', 'Negocio', 'Otro'],
            datasets: [{
                data: [50, 20, 15, 8, 5, 2],
                backgroundColor: [
                    getColor('--color-4'),
                    getColor('--color-5'),
                    getColor('--color-6'),
                    getColor('--color-7'),
                    getColor('--color-8'),
                    getColor('--color-9'),
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
        if (ingresosLegend) {
            ingresosLegend.innerHTML = ""; // limpiar

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
    }

    // =========================
    // 📈 TENDENCIAS
    // =========================
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
                        borderColor: getColor('--color-4'),
                        backgroundColor: `${getColor('--color-4')}0D`,
                        pointBackgroundColor: '#ffffff',
                        pointRadius: 5,
                        tension: 0.4,
                        fill: true,
                    },
                    {
                        label: 'Gastos',
                        data: [0, 0, 0, 0, 2000, 50000],
                        borderColor: getColor('--color-1'),
                        backgroundColor: `${getColor('--color-1')}0D`,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: getColor('--color-1'),
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
                    }
                }
            }
        });
    }
}