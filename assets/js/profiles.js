// 🎨 HELPERS DE COLORES
const getColor = (varName) =>
    getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

const palette = [
    getColor('--color-1'),
    getColor('--color-2'),
    getColor('--color-3'),
    getColor('--color-4'),
    getColor('--color-5'),
    getColor('--color-6'),
    getColor('--color-7'),
    getColor('--color-8'),
    getColor('--color-9'),
    getColor('--color-10'),
];

// 🎨 CAMBIAR COLOR GLOBAL
const setPrimaryColor = (color) => {
    document.documentElement.style.setProperty('--color-primary', color);
};

document.addEventListener("click", (e) => {

    // ➕ CREAR PERFIL
    if (e.target.closest("#btn-create-profile")) {

        const input = document.getElementById("profile-name");
        const name = input.value.trim();

        if (!name) return;

        const list = document.querySelector(".profiles-list");
        if (!list) return;

        const firstLetter = name.charAt(0).toUpperCase();

        const randomColor = palette[Math.floor(Math.random() * palette.length)];

        const newProfile = document.createElement("div");
        newProfile.classList.add("profile-item");

        newProfile.style.setProperty('--profile-color', randomColor);
        newProfile.dataset.color = randomColor;

        newProfile.innerHTML = `
            <div class="profile-avatar" style="background:${randomColor}">
                ${firstLetter}
            </div>
            <span class="text text-main2 text-white">${name}</span>
        `;

        list.appendChild(newProfile);

        input.value = "";

        document.getElementById("profile-modal")?.classList.add("hidden");
    }

    // 👤 SELECCIONAR PERFIL
    if (e.target.closest(".profile-item")) {

        const profile = e.target.closest(".profile-item");
        const color = profile.dataset.color;

        const name = profile.querySelector("span")?.textContent || "Usuario";
        const firstLetter = name.charAt(0).toUpperCase();

        if (color) {
            setPrimaryColor(color);
        }

        document.querySelectorAll(".profile-item")
            .forEach(p => p.classList.remove("active"));

        profile.classList.add("active");

        const headerTitle = document.getElementById("header-title");
        const headerAvatar = document.getElementById("header-avatar");

        if (headerTitle) {
            headerTitle.textContent = `Bienvenido, ${name}`;
        }

        if (headerAvatar) {
            headerAvatar.textContent = firstLetter;
            headerAvatar.style.background = color;
        }
    }
});