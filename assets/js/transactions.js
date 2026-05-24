// ─── HELPERS ────────────────────────────────────────
const formatMoney = (amount) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);

const formatDate = (dateStr) => {
    if (!dateStr) return 'Sin fecha';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

let editingId = null;
let pendingDeleteId = null;

function renderTransactionItem(t) {
    const div = document.createElement('div');
    div.classList.add('history-item');
    div.dataset.id = t.id;

    const isIncome = t.type === 'ingreso';
    const colorClass = isIncome ? 'text-income' : 'text-expense';
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
            <button class="icon-btn ${btnEdit}" data-id="${t.id}">
                <img src="assets/icons/edit.svg" class="icon icon-sm icon-balance">
            </button>
            <button class="icon-btn ${btnDelete}" data-id="${t.id}">
                <img src="assets/icons/trash.svg" class="icon icon-sm icon-expense">
            </button>
        </div>
    `;

    return div;
}

async function loadTransactions(type) {
    const listId = type === 'ingreso' ? 'income-list' : 'expense-list';
    const list = document.getElementById(listId);
    if (!list) return;

    const res = await apiGetTransactions();
    if (res.error) return;

    const filtered = res.transactions.filter(t => t.type === type);
    list.innerHTML = '';
    editingId = null;

    if (filtered.length === 0) {
        list.innerHTML = `<p class="text text-secondary" style="padding:1rem">No hay ${type === 'ingreso' ? 'ingresos' : 'gastos'} registrados.</p>`;
        return;
    }

    filtered.forEach(t => list.appendChild(renderTransactionItem(t)));
}

async function loadHomeBalance() {
    const profileName = localStorage.getItem('profile_name') || 'Usuario';
    const profileColor = localStorage.getItem('profile_color') || '';
    const firstLetter = profileName.charAt(0).toUpperCase();

    const headerTitle = document.getElementById('header-title');
    const headerAvatar = document.getElementById('header-avatar');
    if (headerTitle) headerTitle.textContent = `Bienvenido, ${profileName}`;
    if (headerAvatar) {
        headerAvatar.textContent = firstLetter;
        if (profileColor) headerAvatar.style.background = profileColor;
    }

    const res = await apiGetBalance();
    if (res.error) return;

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    set('home-total-income', formatMoney(res.total_income));
    set('home-total-expenses', formatMoney(res.total_expenses));
    set('home-total-debt', formatMoney(res.total_monthly_debt));

    const savings = await apiGetSavings();
    set('home-net-balance', formatMoney(savings.error ? 0 : (savings.total_assigned ?? 0)));

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

    const income = res.total_income;
    const expenses = res.total_expenses;
    const debt = res.total_monthly_debt;
    const saving = savings.total_assigned ?? 0;

    const MAX_HEIGHT = 188;
    const pct = (val) => income > 0 ? Math.min((val / income) * 100, 100) : 0;

    const setBarHeight = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) el.style.height = `${(pct(val) / 100) * MAX_HEIGHT}px`;
    };

    setBarHeight('.chart-bar-item.bg-income', income);
    setBarHeight('.chart-bar-item.bg-expense', expenses);
    setBarHeight('.chart-bar-item.bg-debt', debt);
    setBarHeight('.chart-bar-item.bg-savings', saving);
}

function fillFormForEdit(t) {
    const isIncome = t.type === 'ingreso';

    if (isIncome) {
        const nameEl = document.getElementById('income-name');
        const amountEl = document.getElementById('income-amount');
        if (nameEl) nameEl.value = t.name;
        if (amountEl) amountEl.value = t.amount;
        const btn = document.getElementById('btn-save-income');
        if (btn) btn.textContent = 'Guardar cambios';
    } else {
        const nameEl = document.getElementById('expense-name');
        const amountEl = document.getElementById('expense-amount');
        if (nameEl) nameEl.value = t.name;
        if (amountEl) amountEl.value = t.amount;
        const btn = document.getElementById('btn-save-expense');
        if (btn) btn.textContent = 'Guardar cambios';
    }

    editingId = t.id;
}

function resetForm(type) {
    if (type === 'ingreso') {
        const nameEl = document.getElementById('income-name');
        const amountEl = document.getElementById('income-amount');
        if (nameEl) nameEl.value = '';
        if (amountEl) amountEl.value = '';
        const btn = document.getElementById('btn-save-income');
        if (btn) btn.textContent = 'Guardar';
    } else {
        const nameEl = document.getElementById('expense-name');
        const amountEl = document.getElementById('expense-amount');
        if (nameEl) nameEl.value = '';
        if (amountEl) amountEl.value = '';
        const btn = document.getElementById('btn-save-expense');
        if (btn) btn.textContent = 'Guardar';
    }
    editingId = null;
}

document.addEventListener('click', async (e) => {

    // ── Guardar ingreso desde home ──
    if (e.target.closest('#btn-save-home-income')) {
        const name = document.getElementById('home-income-name')?.value.trim();
        const amount = document.getElementById('home-income-amount')?.value;
        if (!name || !amount) return showToast('Nombre y monto son obligatorios');
        const res = await apiCreateTransaction('ingreso', name, Number(amount));
        if (res.error) return showToast(res.error);
        document.getElementById('home-income-name').value = '';
        document.getElementById('home-income-amount').value = '';
        showToast('Ingreso registrado', 'success');
        await loadHomeBalance();
    }

    // ── Guardar gasto desde home ──
    if (e.target.closest('#btn-save-home-expense')) {
        const name = document.getElementById('home-expense-name')?.value.trim();
        const amount = document.getElementById('home-expense-amount')?.value;
        if (!name || !amount) return showToast('Nombre y monto son obligatorios');
        const res = await apiCreateTransaction('gasto', name, Number(amount));
        if (res.error) return showToast(res.error);
        document.getElementById('home-expense-name').value = '';
        document.getElementById('home-expense-amount').value = '';
        showToast('Gasto registrado', 'success');
        await loadHomeBalance();
    }

    // ── Guardar ingreso (editar) ──
    if (e.target.closest('#btn-save-income')) {
        if (!editingId) return;
        const name = document.getElementById('income-name')?.value.trim();
        const amount = document.getElementById('income-amount')?.value;
        const category = document.getElementById('categoria-select')?.value;
        const dateStr = document.getElementById('income-date')?.value;

        if (!name || !amount) return showToast('Nombre y monto son obligatorios');

        const data = { name, amount: Number(amount) };
        if (category) data.category = category;
        if (dateStr) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                data.date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
            }
        }

        const res = await apiUpdateTransaction(editingId, data);
        if (res.error) return showToast(res.error);
        resetForm('ingreso');
        showToast('Ingreso actualizado', 'success');
        await loadTransactions('ingreso');
        document.querySelector('.form-income.active')?.classList.remove('active');
    }

    // ── Guardar gasto (editar) ──
    if (e.target.closest('#btn-save-expense')) {
        if (!editingId) return;
        const name = document.getElementById('expense-name')?.value.trim();
        const amount = document.getElementById('expense-amount')?.value;
        const category = document.getElementById('categoria-select')?.value;
        const dateStr = document.getElementById('expense-date')?.value;

        if (!name || !amount) return showToast('Nombre y monto son obligatorios');

        const data = { name, amount: Number(amount) };
        if (category) data.category = category;
        if (dateStr) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                data.date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
            }
        }

        const res = await apiUpdateTransaction(editingId, data);
        if (res.error) return showToast(res.error);
        resetForm('gasto');
        showToast('Gasto actualizado', 'success');
        await loadTransactions('gasto');
        document.querySelector('.form-expense.active')?.classList.remove('active');
    }

    // ── Botón editar ingreso ──
    if (e.target.closest('.btn-edit-income')) {
        const id = e.target.closest('[data-id]')?.dataset.id;
        const res = await apiGetTransactions();
        const t = res.transactions?.find(t => String(t.id) === String(id));
        if (t) fillFormForEdit(t);
    }

    // ── Botón editar gasto ──
    if (e.target.closest('.btn-edit-expense')) {
        const id = e.target.closest('[data-id]')?.dataset.id;
        const res = await apiGetTransactions();
        const t = res.transactions?.find(t => String(t.id) === String(id));
        if (t) fillFormForEdit(t);
    }

    // ── Eliminar ingreso ──
    if (e.target.closest('.btn-delete-income')) {
        pendingDeleteId = e.target.closest('[data-id]')?.dataset.id;
        document.getElementById('delete-income-modal')?.classList.remove('hidden');
    }

    // ── Eliminar gasto ──
    if (e.target.closest('.btn-delete-expense')) {
        pendingDeleteId = e.target.closest('[data-id]')?.dataset.id;
        document.getElementById('delete-expense-modal')?.classList.remove('hidden');
    }

    // ── Confirmar eliminar ingreso ──
    if (e.target.closest('#btn-confirm-delete-income')) {
        if (!pendingDeleteId) return;
        const res = await apiDeleteTransaction(pendingDeleteId);
        if (res.error) return showToast(res.error);
        document.getElementById('delete-income-modal')?.classList.add('hidden');
        pendingDeleteId = null;
        showToast('Ingreso eliminado', 'info');
        await loadTransactions('ingreso');
    }

    // ── Confirmar eliminar gasto ──
    if (e.target.closest('#btn-confirm-delete-expense')) {
        if (!pendingDeleteId) return;
        const res = await apiDeleteTransaction(pendingDeleteId);
        if (res.error) return showToast(res.error);
        document.getElementById('delete-expense-modal')?.classList.add('hidden');
        pendingDeleteId = null;
        showToast('Gasto eliminado', 'info');
        await loadTransactions('gasto');
    }
});