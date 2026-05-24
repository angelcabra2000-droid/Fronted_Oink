const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const forgotModal = document.getElementById("forgot-modal");
const plansModal = document.getElementById("plans-modal");
const paymentModal = document.getElementById("payment-modal");
const editProfileModal = document.getElementById("edit-profile-modal");
const deleteProfileModal = document.getElementById("delete-profile-modal");
const deleteIncomeModal = document.getElementById("delete-income-modal");
const deleteExpenseModal = document.getElementById("delete-expense-modal");
const deleteDebtModal = document.getElementById("delete-debt-modal");
const deleteSavingsModal = document.getElementById("delete-savings-modal");

const getColorModal = (varName) =>
    getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

const paletteModal = [
    getColorModal('--color-1'),
    getColorModal('--color-2'),
    getColorModal('--color-3'),
    getColorModal('--color-4'),
    getColorModal('--color-5'),
    getColorModal('--color-6'),
];

document.addEventListener("click", async (e) => {

    if (e.target.closest("#btn-go-login")) {
        loginModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-go-register-from-login")) {
        loginModal?.classList.add("hidden");
        plansModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-go-register")) {
        loginModal?.classList.add("hidden");
        registerModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-open-payment")) {
        const name = document.getElementById("register-name")?.value.trim();
        const lastName = document.getElementById("register-lastname")?.value.trim();
        const username = document.getElementById("register-username")?.value.trim();
        const email = document.getElementById("register-email")?.value.trim();
        const password = document.getElementById("register-password")?.value.trim();
        const passwordConfirm = document.getElementById("register-password-confirm")?.value.trim();

        if (!name || !lastName || !username || !email || !password) {
            showToast("Por favor completa todos los campos");
            return;
        }

        if (password !== passwordConfirm) {
            showToast("Las contraseñas no coinciden");
            return;
        }

        const randomColor = paletteModal[Math.floor(Math.random() * paletteModal.length)];
        const res = await apiRegister(name, lastName, username, email, password, randomColor);

        if (res.error) {
            showToast(res.error);
            return;
        }

        registerModal?.classList.add("hidden");
        paymentModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-back-register")) {
        paymentModal?.classList.add("hidden");
        registerModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-go-login-from-register")) {
        registerModal?.classList.add("hidden");
        loginModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-forgot-password")) {
        loginModal?.classList.add("hidden");
        forgotModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-back-to-login")) {
        forgotModal?.classList.add("hidden");
        loginModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-open-register")) {
        plansModal?.classList.add("hidden");
        registerModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-finish-payment")) {
        paymentModal?.classList.add("hidden");
        loginModal?.classList.remove("hidden");
    }

    if (e.target.closest(".modal-overlay") || e.target.closest(".modal-close")) {
        loginModal?.classList.add("hidden");
        registerModal?.classList.add("hidden");
        forgotModal?.classList.add("hidden");
        plansModal?.classList.add("hidden");
        document.getElementById("profile-modal")?.classList.add("hidden");
        paymentModal?.classList.add("hidden");
        editProfileModal?.classList.add("hidden");
        deleteProfileModal?.classList.add("hidden");
        deleteIncomeModal?.classList.add("hidden");
        deleteExpenseModal?.classList.add("hidden");
        deleteDebtModal?.classList.add("hidden");
        deleteSavingsModal?.classList.add("hidden");
    }

    if (e.target.closest(".profile-add")) {
        document.getElementById("profile-modal")?.classList.remove("hidden");
    }

    if (
        e.target.closest("#profile-modal .modal-overlay") ||
        e.target.closest("#profile-modal .modal-close") ||
        e.target.closest("#btn-cancel-profile")
    ) {
        document.getElementById("profile-modal")?.classList.add("hidden");
    }

    if (e.target.closest("#btn-edit-profile")) {
        editProfileModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-delete-profile")) {
        deleteProfileModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-delete-expense")) {
        deleteExpenseModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-cancel-edit-profile")) {
        editProfileModal?.classList.add("hidden");
    }

    if (e.target.closest("#btn-cancel-delete-profile")) {
        deleteProfileModal?.classList.add("hidden");
    }

    if (e.target.closest("#btn-cancel-delete-expense")) {
        deleteExpenseModal?.classList.add("hidden");
    }

    // 🚀 LOGIN
    if (e.target.closest("#btn-start")) {
        const email = document.getElementById("login-email")?.value.trim();
        const password = document.getElementById("login-password")?.value.trim();

        if (!email || !password) {
            showToast("Por favor ingresa tu correo y contraseña");
            return;
        }

        const res = await apiLogin(email, password);

        if (res.error) {
            showToast(res.error);
            return;
        }

        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);

        loginModal?.classList.add("hidden");
        document.body.classList.add("logged-in");

        loadPage("home");
        loadProfiles();

        document.querySelectorAll('.nav-item')
            .forEach(n => n.classList.remove('active'));
        document.querySelector('[data-page="home"]')
            ?.classList.add('active');
    }

    if (e.target.closest("#btn-delete-income")) {
        deleteIncomeModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-cancel-delete-income")) {
        deleteIncomeModal?.classList.add("hidden");
    }

    if (e.target.closest(".btn-delete-debt")) {
        deleteDebtModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-cancel-delete-debt")) {
        deleteDebtModal?.classList.add("hidden");
    }

    if (e.target.closest(".btn-delete-savings")) {
        deleteSavingsModal?.classList.remove("hidden");
    }

    if (e.target.closest("#btn-cancel-delete-savings")) {
        deleteSavingsModal?.classList.add("hidden");
    }
});

// ─── TOAST NOTIFICATIONS ────────────────────────────
function showToast(message, type = 'error') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);

    const icons = {
        error: 'assets/icons/trash.svg',
        success: 'assets/icons/check.svg',
        info: 'assets/icons/money.svg',
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <img src="${icons[type]}" class="icon icon-sm">
        </div>
        <span class="text text-main2">${message}</span>
        <button class="toast-close icon-btn">
            <img src="assets/icons/close.svg" class="icon icon-sm">
        </button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}