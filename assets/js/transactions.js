// ─── HELPERS ────────────────────────────────────────
const formatMoney = (amount) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);

const formatDate = (dateStr) => {
    if (!dateStr) return 'Sin fecha';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// ─── RENDERIZAR ITEM DE TRANSACCIÓN ─────────────────
function renderTransactionItem(t) {
    const div = document.createElement('div');
    div.classList.add('history-item');
    div.dataset.id = t.id;

    const isIncome = t.type === 'ingreso';
    const colorClass = isIncome ? 'text-income' : 'text-expense';
    const formClass = isIncome ? 'form-income' : 'form-expense';
    const btnClass = isIncome ? 'btn-income' : 'btn-expense';
    const btnEdit = isIncome ? 'btn-edit-income' : 'btn-edit-expense';
    const btnDelete = isIncome ? 'btn-delete-income' : 'btn-delete-expense';

    div.innerHTML = `
        <div class="history-item-info">
            <span class="text text-main" style="font-weight:600">${t.name}</span>
            <div class="history-item-meta">
                <span class="icon-btn">
                    <img src="assets/icons/calendar.svg" class="icon icon-sm">
                </span>
                <span class="text text-secondary text-light">${formatDate(t.date)}</span>
            </div>
            <div class="history-item-meta">
                <span class="icon-btn">
                    <img src="assets/icons/money.svg" class="icon icon-sm">
                </span>
                <span class="text text-secondary text-light">Categoría</span>
                <span class="text text-secondary text-light">${t.category || 'Sin categoría'}</span>
            </div>
        </div>
        <div class="history-item-actions">
            <span class="text text-main ${colorClass}" style="font-weight:600">${formatMoney(t.amount)}</span>
            <button class="icon-btn ${btnEdit}">
                <img src="assets/icons/edit.svg" class="icon icon-sm icon-balance">
            </button>
            <button class="icon-btn ${btnDelete}" data-id="${t.id}">
                <img src="assets/icons/trash.svg" class="icon icon-sm icon-expense">
            </button>
        </div>

        <!-- Formulario de edición -->
        <div class="${formClass} edit-form" style="display:none">
            <div class="fields">
                <div class="field">
                    <span class="text text-secondary">Nombre</span>
                    <input class="input edit-name" value="${t.name}">
                </div>
                <div class="field">
                    <span class="text text-secondary">Monto</span>
                    <input class="input edit-amount" type="number" value="${t.amount}">
                </div>
                <div class="field">
                    <span class="text text-secondary">Categoría</span>
                    <input class="input edit-category" value="${t.category || ''}">
                </div>
            </div>
            <div class="actions">
                <button class="btn ${btnClass} btn-update-transaction">Guardar</button>
                <button class="btn btn-base btn-cancel-edit">Cancelar</button>
            </div>
        </div>
    `;

    return div;
}

// ─── CARGAR TRANSACCIONES ────────────────────────────
async function loadTransactions(type) {
    const listId = type === 'ingreso' ? 'income-list' : 'expense-list';
    const list = document.getElementById(listId);
    if (!list) return;

    const res = await apiGetTransactions();
    if (res.error) return;

    const filtered = res.transactions.filter(t => t.type === type);
    list.innerHTML = '';

    if (filtered.length === 0) {
        list.innerHTML = `<p class="text text-secondary" style="padding:1rem">No hay ${type === 'ingreso' ? 'ingresos' : 'gastos'} registrados.</p>`;
        return;
    }

    filtered.forEach(t => list.appendChild(renderTransactionItem(t)));
}

// ─── CARGAR BALANCE EN HOME ──────────────────────────
async function loadHomeBalance() {
    const res = await apiGetBalance();
    if (res.error) return;

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    set('home-total-income', formatMoney(res.total_income));
    set('home-total-expenses', formatMoney(res.total_expenses));
    set('home-total-debt', formatMoney(res.total_monthly_debt));
    set('home-net-balance', formatMoney(res.net_balance));
    set('home-state-income', formatMoney(res.total_income));
    set('home-state-expenses', formatMoney(res.total_expenses));
    set('home-state-debt', formatMoney(res.total_monthly_debt));
    set('home-state-balance', formatMoney(res.net_balance));
    set('home-expenses-percent', `${res.expenses_percent.toFixed(1)}%`);
    set('home-savings-percent', `${res.savings_percent.toFixed(1)}%`);

    const expBar = document.getElementById('home-expenses-bar');
    const savBar = document.getElementById('home-savings-bar');
    if (expBar) expBar.style.width = `${Math.min(res.expenses_percent, 100)}%`;
    if (savBar) savBar.style.width = `${Math.min(res.savings_percent, 100)}%`;
}

// ─── EVENTOS ─────────────────────────────────────────
document.addEventListener('click', async (e) => {

    // ── Guardar ingreso desde home ──
    if (e.target.closest('#btn-save-home-income')) {
        const name = document.getElementById('home-income-name')?.value.trim();
        const amount = document.getElementById('home-income-amount')?.value;
        if (!name || !amount) return alert('Nombre y monto son obligatorios');

        const res = await apiCreateTransaction('ingreso', name, Number(amount));
        if (res.error) return alert(res.error);

        document.getElementById('home-income-name').value = '';
        document.getElementById('home-income-amount').value = '';
        await loadHomeBalance();
    }

    // ── Guardar gasto desde home ──
    if (e.target.closest('#btn-save-home-expense')) {
        const name = document.getElementById('home-expense-name')?.value.trim();
        const amount = document.getElementById('home-expense-amount')?.value;
        if (!name || !amount) return alert('Nombre y monto son obligatorios');

        const res = await apiCreateTransaction('gasto', name, Number(amount));
        if (res.error) return alert(res.error);

        document.getElementById('home-expense-name').value = '';
        document.getElementById('home-expense-amount').value = '';
        await loadHomeBalance();
    }

    // ── Guardar ingreso desde página ingresos ──
    if (e.target.closest('#btn-save-income')) {
        const name = document.getElementById('income-name')?.value.trim();
        const amount = document.getElementById('income-amount')?.value;
        if (!name || !amount) return alert('Nombre y monto son obligatorios');

        const res = await apiCreateTransaction('ingreso', name, Number(amount));
        if (res.error) return alert(res.error);

        document.getElementById('income-name').value = '';
        document.getElementById('income-amount').value = '';
        await loadTransactions('ingreso');
    }

    // ── Guardar gasto desde página gastos ──
    if (e.target.closest('#btn-save-expense')) {
        const name = document.getElementById('expense-name')?.value.trim();
        const amount = document.getElementById('expense-amount')?.value;
        if (!name || !amount) return alert('Nombre y monto son obligatorios');

        const res = await apiCreateTransaction('gasto', name, Number(amount));
        if (res.error) return alert(res.error);

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        await loadTransactions('gasto');
    }

    // ── Abrir edición ──
    if (e.target.closest('.btn-edit-income, .btn-edit-expense')) {
        const item = e.target.closest('.history-item');
        item?.querySelector('.edit-form')?.style.setProperty('display', 'block');
    }

    // ── Cancelar edición ──
    if (e.target.closest('.btn-cancel-edit')) {
        e.target.closest('.edit-form')?.style.setProperty('display', 'none');
    }

    // ── Guardar edición ──
    if (e.target.closest('.btn-update-transaction')) {
        const item = e.target.closest('.history-item');
        const id = item?.dataset.id;
        const name = item?.querySelector('.edit-name')?.value.trim();
        const amount = item?.querySelector('.edit-amount')?.value;
        const category = item?.querySelector('.edit-category')?.value.trim();

        const res = await apiUpdateTransaction(id, { name, amount: Number(amount), category });
        if (res.error) return alert(res.error);

        // Recargar la lista correcta
        const type = res.transaction.type;
        await loadTransactions(type);
    }

    // ── Eliminar transacción ──
    if (e.target.closest('.btn-delete-income, .btn-delete-expense')) {
        const btn = e.target.closest('[data-id]');
        const id = btn?.dataset.id;
        if (!id) return;

        if (!confirm('¿Eliminar esta transacción?')) return;

        const res = await apiDeleteTransaction(id);
        if (res.error) return alert(res.error);

        await loadTransactions(res.message.includes('ingreso') ? 'ingreso' : 'gasto');
    }
});