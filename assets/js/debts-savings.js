// ─── ESTADO ─────────────────────────────────────────
let editingDebtId = null;
let editingSavingId = null;
let pendingDeleteDebtId = null;
let pendingDeleteSavingId = null;

function renderDebtItem(d) {
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
                <span class="text text-secondary text-light">Pago Mensual</span>
                <span class="text text-main debt-value">${formatMoney(d.monthly_payment)}</span>
            </div>
            <div class="debt-stat">
                <span class="text text-secondary text-light">Meses Restantes</span>
                <span class="text text-main debt-value"${d.installments_left} Cuotas</span>
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

        <div class="form form-debt edit-debt-form" style="display:none">
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
                    <span class="text text-secondary">Tasa de interés</span>
                    <input class="input edit-debt-interest" type="number" value="${d.interest}">
                </div>
            </div>
            <div class="actions">
                <button class="btn btn-debt btn-update-debt">Guardar</button>
                <button class="btn btn-base btn-cancel-edit-debt">Cancelar</button>
            </div>
        </div>
    `;

    return div;
}

function renderSavingItem(s) {
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

        <div class="form form-savings edit-saving-form" style="display:none">
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
        </div>
    `;

    return div;
}

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

async function loadSavings() {
    const list = document.getElementById('savings-list');
    if (!list) return;

    const res = await apiGetSavings();
    if (res.error) return;

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

        const name =
            document.getElementById('debt-name')?.value.trim();

        const total =
            document.getElementById('debt-total')?.value;

        const remaining =
            document.getElementById('debt-remaining')?.value;

        const installments =
            document.getElementById('debt-installments')?.value;

        const installmentsPaid =
            document.getElementById('debt-installments-paid')?.value;

        const category =
            document.getElementById('debt-category-select')?.value;

        const dateStr =
            document.getElementById('debt-date')?.value;

        const interest =
            document.getElementById('debt-interest')?.value;

        if (!name || !total) {
            return showToast(
                'Nombre y monto total son obligatorios'
            );
        }

        if (!installments || Number(installments) < 1) {
            return showToast(
                'Debe ingresar un número de cuotas válido'
            );
        }

        if (Number(installmentsPaid || 0) < 0) {
            return showToast(
                'Las cuotas pagadas no pueden ser negativas'
            );
        }

        if (
            Number(installmentsPaid || 0) >
            Number(installments)
        ) {
            return showToast(
                'Las cuotas pagadas no pueden superar las cuotas totales'
            );
        }



        const data = {
            name,
            total_amount: Number(total),
            remaining: Number(remaining || total),
            category: category || '',
            interest: Number(interest || 0),
            total_installments: Number(installments),
            installments_paid: Number(installmentsPaid || 0)
        };

        console.log(data);

        if (dateStr) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                data.due_date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
            }
        }

        console.log(data);

        const res = await apiCreateDebt(data);
        if (res.error) return showToast(res.error);

        document.getElementById('debt-name').value = '';
        document.getElementById('debt-total').value = '';
        document.getElementById('debt-remaining').value = '';
        document.getElementById('debt-interest').value = '';
        document.getElementById('form-create-debt').style.display = 'none';
        showToast('Deuda creada correctamente', 'success');
        await loadDebts();
    }

    // ── Abrir edición deuda ──
    if (e.target.closest('.btn-edit-debt')) {
        const item = e.target.closest('.debt-item');
        item?.querySelector('.edit-debt-form')?.style.setProperty('display', 'block');
    }

    // ── Cancelar edición deuda ──
    if (e.target.closest('.btn-cancel-edit-debt')) {
        e.target.closest('.edit-debt-form')?.style.setProperty('display', 'none');
    }

    // ── Guardar edición deuda ──
    if (e.target.closest('.btn-update-debt')) {
        const item = e.target.closest('.debt-item');
        const id = item?.dataset.id;
        const name = item?.querySelector('.edit-debt-name')?.value.trim();
        const remaining = item?.querySelector('.edit-debt-remaining')?.value;
        const interest = item?.querySelector('.edit-debt-interest')?.value;

        const res = await apiUpdateDebt(id, {
            name,
            remaining: Number(remaining),
            interest: Number(interest)
        });
        if (res.error) return showToast(res.error);

        item?.querySelector('.edit-debt-form')?.style.setProperty('display', 'none');
        showToast('Deuda actualizada', 'success');
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
        if (res.error) return showToast(res.error);
        document.getElementById('delete-debt-modal')?.classList.add('hidden');
        pendingDeleteDebtId = null;
        showToast('Deuda eliminada', 'info');
        await loadDebts();
    }

    // ── Registrar pago deuda ──
    if (e.target.closest('.btn-pay-debt')) {
        const id = e.target.closest('[data-id]')?.dataset.id;
        const res = await apiPayDebt(id);
        if (res.error) return showToast(res.error);
        if (res.paid) {
            showToast('¡Deuda pagada completamente!', 'success');
        } else {
            showToast('Pago registrado', 'success');
        }
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

        if (!name || !percentage) return showToast('Nombre y porcentaje son obligatorios');

        const res = await apiCreateSaving(name, Number(percentage));
        if (res.error) return showToast(res.error);

        document.getElementById('saving-name').value = '';
        document.getElementById('saving-percentage').value = '';
        document.getElementById('form-create-savings').style.display = 'none';
        showToast('Ahorro creado correctamente', 'success');
        await loadSavings();
    }

    // ── Abrir edición ahorro ──
    if (e.target.closest('.btn-edit-saving')) {
        const item = e.target.closest('.history-item');
        item?.querySelector('.edit-saving-form')?.style.setProperty('display', 'block');
    }

    // ── Cancelar edición ahorro ──
    if (e.target.closest('.btn-cancel-edit-saving')) {
        e.target.closest('.edit-saving-form')?.style.setProperty('display', 'none');
    }

    // ── Guardar edición ahorro ──
    if (e.target.closest('.btn-update-saving')) {
        const item = e.target.closest('.history-item');
        const id = item?.dataset.id;
        const name = item?.querySelector('.edit-saving-name')?.value.trim();
        const percentage = item?.querySelector('.edit-saving-percentage')?.value;

        const res = await apiUpdateSaving(id, name, Number(percentage));
        if (res.error) return showToast(res.error);

        item?.querySelector('.edit-saving-form')?.style.setProperty('display', 'none');
        showToast('Ahorro actualizado', 'success');
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
        if (res.error) return showToast(res.error);
        document.getElementById('delete-savings-modal')?.classList.add('hidden');
        pendingDeleteSavingId = null;
        showToast('Ahorro eliminado', 'info');
        await loadSavings();
    }
});