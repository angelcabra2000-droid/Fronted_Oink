// ─── ESTADO ─────────────────────────────────────────
let editingDebtId = null;
let editingSavingId = null;
let pendingDeleteDebtId = null;
let pendingDeleteSavingId = null;

// ─── RENDERIZAR DEUDA ────────────────────────────────
// Retorna un fragment con: [.debt-item] + [.edit-debt-form] como siblings
function renderDebtItem(d) {
    const fragment = document.createDocumentFragment();

    // ── Carta ──
    const div = document.createElement('div');
    div.classList.add('debt-item');
    div.dataset.id = d.id;

    div.innerHTML = `
        <div class="debt-top">
            <div class="debt-info">
                <span class="text text-main debt-title">${d.name}</span>
                <div class="history-item-meta">
                    <span class="icon-btn">
                        <img src="assets/icons/calendar.svg" class="icon icon-sm">
                    </span>
                    <span class="text text-secondary text-light">${d.due_date ? new Date(d.due_date).toLocaleDateString('es-CO') : 'Sin fecha'}</span>
                    <span class="text text-secondary text-light">Interés anual: ${d.interest}%</span>
                </div>
                <div class="history-item-meta">
                    <span class="icon-btn">
                        <img src="assets/icons/money.svg" class="icon icon-sm">
                    </span>
                    <span class="text text-secondary text-light">Categoría</span>
                    <span class="text text-secondary text-light">${d.category || 'Sin categoría'}</span>
                </div>
            </div>
            <div class="debt-actions">
                <button class="icon-btn btn-edit-debt" data-id="${d.id}">
                    <img src="assets/icons/edit.svg" class="icon icon-sm icon-balance">
                </button>
                <button class="icon-btn btn-delete-debt" data-id="${d.id}">
                    <img src="assets/icons/trash.svg" class="icon icon-sm icon-expense">
                </button>
            </div>
        </div>

        <div class="debt-item-stats">
            <div class="debt-stat">
                <span class="text text-secondary text-light">Total Original</span>
                <span class="text text-main debt-value">${formatMoney(d.total_amount)}</span>
            </div>
            <div class="debt-stat">
                <span class="text text-secondary text-light">Restante</span>
                <span class="text text-main text-debt debt-value">${formatMoney(d.remaining)}</span>
            </div>
            <div class="debt-stat">
                <span class="text text-secondary text-light">Valor Cuota</span>
                <span class="text text-main debt-value">${formatMoney(d.monthly_payment)}</span>
            </div>
            <div class="debt-stat">
                <span class="text text-secondary text-light">Cuotas</span>
                <span class="text text-main debt-value">${d.installments_paid} / ${d.total_installments}</span>
            </div>
            <div class="debt-stat">
                <span class="text text-secondary text-light">Cuotas Restantes</span>
                <span class="text text-main debt-value">${d.installments_left}</span>
            </div>
        </div>

        <div class="debt-item-progress">
            <div class="distribution-header">
                <span class="text text-secondary">Progreso de pago</span>
                <span class="text text-secondary">${d.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill progress-debt" style="width:${d.progress}%"></div>
            </div>
        </div>

        <div class="actions" style="margin-top:1rem">
            <button class="btn btn-debt btn-pay-debt" data-id="${d.id}">Registrar Pago</button>
        </div>
    `;

    // ── Formulario edición (FUERA de la carta) ──
    const form = document.createElement('div');
    form.classList.add('form', 'form-debt', 'edit-debt-form');
    form.dataset.debtId = d.id;
    form.style.display = 'none';

    form.innerHTML = `
        <div class="fields">
            <div class="field">
                <span class="text text-secondary">Nombre</span>
                <input class="input edit-debt-name" value="${d.name}">
            </div>
            <div class="field">
                <span class="text text-secondary">Monto Restante</span>
                <input class="input edit-debt-remaining" type="number" value="${d.remaining}">
            </div>
            <div class="field">
                <span class="text text-secondary">Tasa de interés anual (%)</span>
                <input class="input edit-debt-interest" type="number" value="${d.interest}">
            </div>
            <div class="field">
                <span class="text text-secondary">Cuotas totales</span>
                <input class="input edit-debt-installments" type="number" min="1" value="${d.total_installments}">
            </div>
            <div class="field">
                <span class="text text-secondary">Cuotas pagadas</span>
                <input class="input edit-debt-installments-paid" type="number" min="0" value="${d.installments_paid}">
            </div>
            <div class="field">
                <span class="text text-secondary">Categoría</span>
                <select class="edit-debt-category" id="edit-debt-category-${d.id}">
                    <option value="" disabled ${!d.category ? 'selected' : ''}>Selecciona una categoría</option>
                    <option value="tarjeta" ${d.category === 'tarjeta' ? 'selected' : ''}>Tarjeta de crédito</option>
                    <option value="prestamo" ${d.category === 'prestamo' ? 'selected' : ''}>Préstamo personal</option>
                    <option value="hipoteca" ${d.category === 'hipoteca' ? 'selected' : ''}>Hipoteca</option>
                    <option value="vehiculo" ${d.category === 'vehiculo' ? 'selected' : ''}>Crédito vehículo</option>
                    <option value="estudiantil" ${d.category === 'estudiantil' ? 'selected' : ''}>Préstamo estudiantil</option>
                    <option value="familiar" ${d.category === 'familiar' ? 'selected' : ''}>Deuda familiar</option>
                    <option value="negocio" ${d.category === 'negocio' ? 'selected' : ''}>Deuda de negocio</option>
                    <option value="otro" ${d.category === 'otro' ? 'selected' : ''}>Otro</option>
                </select>
            </div>
        </div>
        <div class="actions">
            <button class="btn btn-debt btn-update-debt">Guardar</button>
            <button class="btn btn-base btn-cancel-edit-debt">Cancelar</button>
        </div>
    `;

    // Inicializar TomSelect en el select de categoría del formulario de edición
    const selectEl = form.querySelector('.edit-debt-category');
    if (selectEl && typeof TomSelect !== 'undefined') {
        new TomSelect(selectEl, { create: false });
    }

    fragment.appendChild(div);
    fragment.appendChild(form);

    return fragment;
}

// ─── RENDERIZAR AHORRO ───────────────────────────────
// Retorna un fragment con: [.history-item] + [.edit-saving-form] como siblings
function renderSavingItem(s) {
    const fragment = document.createDocumentFragment();

    // ── Carta ──
    const div = document.createElement('div');
    div.classList.add('history-item');
    div.dataset.id = s.id;

    div.innerHTML = `
        <div class="history-item-info">
            <span class="text text-main" style="font-weight:600">${s.name}</span>
            <div class="history-item-meta">
                <span class="icon-btn">
                    <img src="assets/icons/percent.svg" class="icon icon-sm">
                </span>
                <span class="text text-secondary text-light">${s.percentage}%</span>
                <span class="text text-secondary text-light">Porcentaje</span>
            </div>
        </div>
        <div class="history-item-actions">
            <span class="text text-main text-savings" style="font-weight:600">${formatMoney(s.assigned)}</span>
            <button class="icon-btn btn-edit-saving" data-id="${s.id}">
                <img src="assets/icons/edit.svg" class="icon icon-sm icon-balance">
            </button>
            <button class="icon-btn btn-delete-saving" data-id="${s.id}">
                <img src="assets/icons/trash.svg" class="icon icon-sm icon-expense">
            </button>
        </div>
    `;

    // ── Formulario edición (FUERA de la carta) ──
    const form = document.createElement('div');
    form.classList.add('form', 'form-savings', 'edit-saving-form');
    form.dataset.savingId = s.id;
    form.style.display = 'none';

    form.innerHTML = `
        <div class="fields">
            <div class="field">
                <span class="text text-secondary">Nombre</span>
                <input class="input edit-saving-name" value="${s.name}">
            </div>
            <div class="field">
                <span class="text text-secondary">Porcentaje</span>
                <input class="input edit-saving-percentage" type="number" value="${s.percentage}">
            </div>
        </div>
        <div class="actions">
            <button class="btn btn-savings btn-update-saving">Guardar</button>
            <button class="btn btn-base btn-cancel-edit-saving">Cancelar</button>
        </div>
    `;

    fragment.appendChild(div);
    fragment.appendChild(form);

    return fragment;
}

// ─── CARGAR DEUDAS ───────────────────────────────────
async function loadDebts() {
    const list = document.getElementById('debt-list');
    if (!list) return;

    const res = await apiGetDebts();
    if (res.error) return;

    list.innerHTML = '';

    if (!res.debts || res.debts.length === 0) {
        list.innerHTML = '<p class="text text-secondary" style="padding:1rem">No hay deudas registradas.</p>';
        return;
    }

    res.debts.forEach(d => list.appendChild(renderDebtItem(d)));
}

// ─── CARGAR AHORROS ──────────────────────────────────
async function loadSavings() {
    const list = document.getElementById('savings-list');
    if (!list) return;

    const res = await apiGetSavings();
    if (res.error) return;

    // Actualizar tarjetas de resumen
    const setEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };
    setEl('savings-available', formatMoney(res.available));
    setEl('savings-assigned', formatMoney(res.total_assigned));
    setEl('savings-remaining', formatMoney(res.remaining));

    list.innerHTML = '';

    if (!res.savings || res.savings.length === 0) {
        list.innerHTML = '<p class="text text-secondary" style="padding:1rem">No hay ahorros registrados.</p>';
        return;
    }

    res.savings.forEach(s => list.appendChild(renderSavingItem(s)));
}

// ─── EVENTOS ─────────────────────────────────────────
document.addEventListener('click', async (e) => {

    // ── Mostrar formulario crear deuda ──
    if (e.target.closest('.btn-add-debt')) {
        const form = document.getElementById('form-create-debt');
        if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }

    // ── Cancelar crear deuda ──
    if (e.target.closest('.btn-cancel-debt')) {
        const form = document.getElementById('form-create-debt');
        if (form) form.style.display = 'none';
    }

    // ── Guardar nueva deuda ──
    if (e.target.closest('#btn-save-debt')) {
        const name = document.getElementById('debt-name')?.value.trim();
        const total = document.getElementById('debt-total')?.value;
        const remaining = document.getElementById('debt-remaining')?.value;
        const installments = document.getElementById('debt-installments')?.value;
        const installmentsPaid = document.getElementById('debt-installments-paid')?.value;
        const category = document.getElementById('debt-category-select')?.value;
        const dateStr = document.getElementById('debt-date')?.value;
        const interest = document.getElementById('debt-interest')?.value;

        if (!name || !total) return alert('Nombre y monto total son obligatorios');
        if (!installments || Number(installments) < 1) return alert('El número de cuotas debe ser mayor a 0');

        const data = {
            name,
            total_amount: Number(total),
            remaining: Number(remaining || total),
            total_installments: Number(installments),
            installments_paid: Number(installmentsPaid || 0),
            category: category || '',
            interest: Number(interest || 0)
        };

        if (dateStr) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                data.due_date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
            }
        }

        const res = await apiCreateDebt(data);
        if (res.error) return alert(res.error);

        document.getElementById('form-create-debt').style.display = 'none';
        document.getElementById('debt-name').value = '';
        document.getElementById('debt-total').value = '';
        document.getElementById('debt-remaining').value = '';
        document.getElementById('debt-installments').value = '';
        document.getElementById('debt-installments-paid').value = '0';
        document.getElementById('debt-interest').value = '';
        await loadDebts();
    }

    // ── Abrir edición deuda ──
    // La carta es .debt-item → el formulario es el siguiente sibling (.edit-debt-form)
    if (e.target.closest('.btn-edit-debt')) {
        const debtId = e.target.closest('[data-id]')?.dataset.id;
        // Cerrar cualquier otro formulario de deuda abierto
        document.querySelectorAll('.edit-debt-form').forEach(f => f.style.display = 'none');
        // Abrir el que corresponde a este id
        const form = document.querySelector(`.edit-debt-form[data-debt-id="${debtId}"]`);
        if (form) form.style.display = 'block';
    }

    // ── Cancelar edición deuda ──
    if (e.target.closest('.btn-cancel-edit-debt')) {
        e.target.closest('.edit-debt-form')?.style.setProperty('display', 'none');
    }

    // ── Guardar edición deuda ──
    if (e.target.closest('.btn-update-debt')) {
        const form = e.target.closest('.edit-debt-form');
        const id = form?.dataset.debtId;
        const name = form?.querySelector('.edit-debt-name')?.value.trim();
        const remaining = form?.querySelector('.edit-debt-remaining')?.value;
        const interest = form?.querySelector('.edit-debt-interest')?.value;
        const category = form?.querySelector('.edit-debt-category')?.value || '';
        const totalInstallments = form?.querySelector('.edit-debt-installments')?.value;
        const installmentsPaid = form?.querySelector('.edit-debt-installments-paid')?.value;

        const res = await apiUpdateDebt(id, {
            name,
            remaining: Number(remaining),
            interest: Number(interest),
            category,
            total_installments: Number(totalInstallments),
            installments_paid: Number(installmentsPaid)
        });
        if (res.error) return alert(res.error);
        await loadDebts();
    }

    // ── Eliminar deuda → abrir modal ──
    if (e.target.closest('.btn-delete-debt')) {
        pendingDeleteDebtId = e.target.closest('[data-id]')?.dataset.id;
        document.getElementById('delete-debt-modal')?.classList.remove('hidden');
    }

    // ── Confirmar eliminar deuda ──
    if (e.target.closest('#btn-confirm-delete-debt')) {
        if (!pendingDeleteDebtId) return;
        const res = await apiDeleteDebt(pendingDeleteDebtId);
        if (res.error) return alert(res.error);
        document.getElementById('delete-debt-modal')?.classList.add('hidden');
        pendingDeleteDebtId = null;
        await loadDebts();
    }

    // ── Registrar pago deuda ──
    if (e.target.closest('.btn-pay-debt')) {
        const id = e.target.closest('[data-id]')?.dataset.id;
        const res = await apiPayDebt(id);
        if (res.error) return alert(res.error);
        if (res.paid) alert('¡Deuda pagada completamente!');
        await loadDebts();
    }

    // ── Mostrar formulario crear ahorro ──
    if (e.target.closest('.btn-add-savings')) {
        const form = document.getElementById('form-create-savings');
        if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }

    // ── Cancelar crear ahorro ──
    if (e.target.closest('.btn-cancel-savings')) {
        const form = document.getElementById('form-create-savings');
        if (form) form.style.display = 'none';
    }

    // ── Guardar nuevo ahorro ──
    if (e.target.closest('#btn-save-saving')) {
        const name = document.getElementById('saving-name')?.value.trim();
        const percentage = document.getElementById('saving-percentage')?.value;

        if (!name || !percentage) return alert('Nombre y porcentaje son obligatorios');

        const res = await apiCreateSaving(name, Number(percentage));
        if (res.error) return alert(res.error);

        document.getElementById('saving-name').value = '';
        document.getElementById('saving-percentage').value = '';
        document.getElementById('form-create-savings').style.display = 'none';
        await loadSavings();
    }

    // ── Abrir edición ahorro ──
    // La carta es .history-item → el formulario es el siguiente sibling (.edit-saving-form)
    if (e.target.closest('.btn-edit-saving')) {
        const savingId = e.target.closest('[data-id]')?.dataset.id;
        // Cerrar cualquier otro formulario de ahorro abierto
        document.querySelectorAll('.edit-saving-form').forEach(f => f.style.display = 'none');
        // Abrir el que corresponde a este id
        const form = document.querySelector(`.edit-saving-form[data-saving-id="${savingId}"]`);
        if (form) form.style.display = 'block';
    }

    // ── Cancelar edición ahorro ──
    if (e.target.closest('.btn-cancel-edit-saving')) {
        e.target.closest('.edit-saving-form')?.style.setProperty('display', 'none');
    }

    // ── Guardar edición ahorro ──
    if (e.target.closest('.btn-update-saving')) {
        const form = e.target.closest('.edit-saving-form');
        const id = form?.dataset.savingId;
        const name = form?.querySelector('.edit-saving-name')?.value.trim();
        const percentage = form?.querySelector('.edit-saving-percentage')?.value;

        const res = await apiUpdateSaving(id, name, Number(percentage));
        if (res.error) return alert(res.error);
        await loadSavings();
    }

    // ── Eliminar ahorro → abrir modal ──
    if (e.target.closest('.btn-delete-saving')) {
        pendingDeleteSavingId = e.target.closest('[data-id]')?.dataset.id;
        document.getElementById('delete-savings-modal')?.classList.remove('hidden');
    }

    // ── Confirmar eliminar ahorro ──
    if (e.target.closest('#btn-confirm-delete-savings')) {
        if (!pendingDeleteSavingId) return;
        const res = await apiDeleteSaving(pendingDeleteSavingId);
        if (res.error) return alert(res.error);
        document.getElementById('delete-savings-modal')?.classList.add('hidden');
        pendingDeleteSavingId = null;
        await loadSavings();
    }
});