async function initCharts() {

    const getColor = (varName) =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();

    // Obtener datos del balance
    const balance = await apiGetBalance().catch(() => null);

    // =========================
    // 📊 INGRESOS VS GASTOS
    // =========================
    const chartEl = document.getElementById('ingresos-gastos-chart');
    if (chartEl) {
        const income = balance?.total_income || 0;
        const expenses = balance?.total_expenses || 0;

        new Chart(chartEl, {
            type: 'bar',
            data: {
                labels: ['Ingresos', 'Gastos'],
                datasets: [{
                    data: [income, expenses],
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
                    x: { grid: { display: false }, border: { display: false } },
                    y: { grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false } }
                }
            }
        });

        // Actualizar textos
        const setEl = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };
        setEl('analisis-total-income', formatMoney(income));
        setEl('analisis-total-expenses', formatMoney(expenses));
        setEl('analisis-net-balance', formatMoney(balance?.net_balance || 0));
    }

    // =========================
    // 🥧 GASTOS POR CATEGORÍA
    // =========================
    const gastosEl = document.getElementById('gastos-categoria-chart');
    if (gastosEl) {
        const categorias = balance?.expenses_by_category || [];

        const labels = categorias.length > 0
            ? categorias.map(c => c.Category || 'Sin categoría')
            : ['Sin datos'];
        const data = categorias.length > 0
            ? categorias.map(c => c.Total)
            : [1];

        const colors = [
            getColor('--color-1'), getColor('--color-2'), getColor('--color-3'),
            getColor('--color-4'), getColor('--color-5'), getColor('--color-6'),
        ];

        new Chart(gastosEl, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => ` ${ctx.label}: ${formatMoney(ctx.raw)}`
                        }
                    }
                }
            }
        });

        const gastosLegend = document.getElementById('gastos-legend');
        if (gastosLegend) {
            gastosLegend.innerHTML = '';
            labels.forEach((label, i) => {
                gastosLegend.innerHTML += `
                <li>
                    <div class="chart-legend-label">
                        <div class="chart-legend-dot" style="background:${colors[i]}"></div>
                        <span class="text text-main2">${label}</span>
                    </div>
                    <span class="text text-main2">${formatMoney(data[i])}</span>
                </li>`;
            });
        }
    }

    // =========================
    // 🥧 INGRESOS POR CATEGORÍA
    // =========================
    const ingresosEl = document.getElementById('ingresos-categoria-chart');
    if (ingresosEl) {
        const categorias = balance?.income_by_category || [];

        const labels = categorias.length > 0
            ? categorias.map(c => c.Category || 'Sin categoría')
            : ['Sin datos'];
        const data = categorias.length > 0
            ? categorias.map(c => c.Total)
            : [1];

        const colors = [
            getColor('--color-4'), getColor('--color-5'), getColor('--color-6'),
            getColor('--color-7'), getColor('--color-8'), getColor('--color-9'),
        ];

        new Chart(ingresosEl, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => ` ${ctx.label}: ${formatMoney(ctx.raw)}`
                        }
                    }
                }
            }
        });

        const ingresosLegend = document.getElementById('ingresos-legend');
        if (ingresosLegend) {
            ingresosLegend.innerHTML = '';
            labels.forEach((label, i) => {
                ingresosLegend.innerHTML += `
                <li>
                    <div class="chart-legend-label">
                        <div class="chart-legend-dot" style="background:${colors[i]}"></div>
                        <span class="text text-main2">${label}</span>
                    </div>
                    <span class="text text-main2">${formatMoney(data[i])}</span>
                </li>`;
            });
        }
    }
}

