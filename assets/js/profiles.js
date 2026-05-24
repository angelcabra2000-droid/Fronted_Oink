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
];

const setPrimaryColor = (color) => {
    document.documentElement.style.setProperty('--color-primary', color);
};

async function loadProfiles() {
    const list = document.querySelector(".profiles-list");
    if (!list) return;

    const res = await apiGetProfiles();
    if (res.error) return;

    list.innerHTML = "";

    res.forEach(profile => {
        const firstLetter = profile.name.charAt(0).toUpperCase();
        const div = document.createElement("div");
        div.classList.add("profile-item");
        div.dataset.id = profile.id;
        div.dataset.color = profile.color;
        div.dataset.name = profile.name;
        div.style.setProperty('--profile-color', profile.color);

        div.innerHTML = `
            <div class="profile-avatar" style="background:${profile.color}">
                ${firstLetter}
            </div>
            <span class="text text-main2 text-white">${profile.name}</span>
        `;

        list.appendChild(div);
    });

    const first = list.querySelector(".profile-item");
    if (first) first.click();
}

document.addEventListener("click", async (e) => {

    // 👤 SELECCIONAR PERFIL
    if (e.target.closest(".profile-item")) {
        const profile = e.target.closest(".profile-item");
        const color = profile.dataset.color;
        const id = profile.dataset.id;
        const name = profile.querySelector("span")?.textContent || "Usuario";
        const firstLetter = name.charAt(0).toUpperCase();

        localStorage.setItem("profile_id", id);
        localStorage.setItem("profile_color", color);
        localStorage.setItem("profile_name", name);

        const currentPage = document.querySelector('.nav-item.active')?.dataset.page;
        if (currentPage === 'home') await loadHomeBalance();
        if (currentPage === 'ingresos') await loadTransactions('ingreso');
        if (currentPage === 'gastos') await loadTransactions('gasto');
        if (currentPage === 'deudas') await loadDebts();
        if (currentPage === 'ahorro') await loadSavings();
        if (currentPage === 'analisis') await initCharts();

        if (color) setPrimaryColor(color);

        document.querySelectorAll(".profile-item")
            .forEach(p => p.classList.remove("active"));
        profile.classList.add("active");

        const headerTitle = document.getElementById("header-title");
        const headerAvatar = document.getElementById("header-avatar");

        if (headerTitle) headerTitle.textContent = `Bienvenido, ${name}`;
        if (headerAvatar) {
            headerAvatar.textContent = firstLetter;
            headerAvatar.style.background = color;
        }
    }

    // ➕ CREAR PERFIL
    if (e.target.closest("#btn-create-profile")) {
        const input = document.getElementById("profile-name");
        const name = input?.value.trim();
        if (!name) return showToast('El nombre no puede estar vacío');

        const randomColor = palette[Math.floor(Math.random() * palette.length)];
        const res = await apiCreateProfile(name, randomColor);

        if (res.error) {
            showToast(res.error);
            return;
        }

        input.value = "";
        document.getElementById("profile-modal")?.classList.add("hidden");
        showToast('Perfil creado correctamente', 'success');
        await loadProfiles();
    }

    // ✏️ GUARDAR EDICIÓN DE PERFIL
    if (e.target.closest("#btn-save-profile")) {
        const id = localStorage.getItem('profile_id');
        const name = document.getElementById('edit-profile-name')?.value.trim();

        if (!name) return showToast('El nombre no puede estar vacío');

        const color = localStorage.getItem('profile_color') || palette[0];
        const res = await apiUpdateProfile(id, name, color);

        if (res.error) {
            showToast(res.error);
            return;
        }

        document.getElementById('edit-profile-name').value = '';
        document.getElementById('edit-profile-modal')?.classList.add('hidden');
        showToast('Perfil actualizado correctamente', 'success');
        await loadProfiles();
    }

    // 🗑️ CONFIRMAR ELIMINAR PERFIL
    if (e.target.closest("#btn-confirm-delete-profile")) {
        const id = localStorage.getItem('profile_id');
        if (!id) return;

        const res = await apiDeleteProfile(id);

        if (res.error) {
            showToast(res.error);
            return;
        }

        document.getElementById('delete-profile-modal')?.classList.add('hidden');
        localStorage.removeItem('profile_id');
        localStorage.removeItem('profile_color');
        localStorage.removeItem('profile_name');
        showToast('Perfil eliminado', 'info');
        await loadProfiles();
    }
});