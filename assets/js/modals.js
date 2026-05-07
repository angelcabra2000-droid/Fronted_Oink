const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const forgotModal = document.getElementById("forgot-modal");
const plansModal = document.getElementById("plans-modal");
const paymentModal = document.getElementById("payment-modal");

document.addEventListener("click", (e) => {

    // 🔐 ABRIR LOGIN
    if (e.target.closest("#btn-go-login")) {
        loginModal?.classList.remove("hidden");
    }

    // 🟣 ABRIR PLANES
    if (e.target.closest("#btn-go-register-from-login")) {

        loginModal?.classList.add("hidden");

        plansModal?.classList.remove("hidden");
    }

    // 🟣 ABRIR REGISTRO
    if (e.target.closest("#btn-go-register")) {
        loginModal?.classList.add("hidden");
        registerModal?.classList.remove("hidden");
    }

    // 🧾 REGISTRO → PAGO
    if (e.target.closest("#btn-open-payment")) {

        registerModal?.classList.add("hidden");

        paymentModal?.classList.remove("hidden");
    }

    // 🔙 PAGO → REGISTRO
    if (e.target.closest("#btn-back-register")) {

        paymentModal?.classList.add("hidden");

        registerModal?.classList.remove("hidden");
    }

    // 🔄 REGISTER → LOGIN
    if (e.target.closest("#btn-go-login-from-register")) {

        registerModal?.classList.add("hidden");

        loginModal?.classList.remove("hidden");
    }

    // 🔑 OLVIDÉ CONTRASEÑA
    if (e.target.closest("#btn-forgot-password")) {
        loginModal?.classList.add("hidden");
        forgotModal?.classList.remove("hidden");
    }

    // 🔙 VOLVER A LOGIN
    if (e.target.closest("#btn-back-to-login")) {
        forgotModal?.classList.add("hidden");
        loginModal?.classList.remove("hidden");
    }
    // 💳 PLANES → REGISTRO
    if (e.target.closest("#btn-open-register")) {

        plansModal?.classList.add("hidden");

        registerModal?.classList.remove("hidden");
    }

    // 💳 PAGO → LOGIN
    if (e.target.closest("#btn-finish-payment")) {

        paymentModal?.classList.add("hidden");

        loginModal?.classList.remove("hidden");
    }

    // ❌ CERRAR TODOS (overlay o X)
    if (e.target.closest(".modal-overlay") || e.target.closest(".modal-close")) {
        loginModal?.classList.add("hidden");
        registerModal?.classList.add("hidden");
        forgotModal?.classList.add("hidden");
        plansModal?.classList.add("hidden");
        document.getElementById("profile-modal")?.classList.add("hidden");
        paymentModal?.classList.add("hidden");
    }

    // 👤 PERFIL (abrir)
    if (e.target.closest(".profile-add")) {
        document.getElementById("profile-modal")?.classList.remove("hidden");
    }

    // 👤 PERFIL (cerrar)
    if (
        e.target.closest("#profile-modal .modal-overlay") ||
        e.target.closest("#profile-modal .modal-close") ||
        e.target.closest("#btn-cancel-profile")
    ) {
        document.getElementById("profile-modal")?.classList.add("hidden");
    }

    // 🚀 LOGIN → ENTRAR APP
    if (e.target.closest("#btn-start")) {
        loginModal?.classList.add("hidden");

        // 🔥 ESTA LÍNEA ES LA CLAVE
        document.body.classList.add("logged-in");

        loadPage("home");

        document.querySelectorAll('.nav-item')
            .forEach(n => n.classList.remove('active'));

        document.querySelector('[data-page="home"]')
            ?.classList.add('active');
    }


});