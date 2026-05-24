const API_URL = "https://backendoink-production.up.railway.app/api";

// ─── HELPERS ───────────────────────────────────────
const getToken = () => localStorage.getItem("token");
const getProfileId = () => localStorage.getItem("profile_id");

const authHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
});

// ─── AUTH ───────────────────────────────────────────
async function apiRegister(name, lastName, username, email, password, color) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, last_name: lastName, username, email, password, color })
    });
    return res.json();
}

async function apiLogin(email, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return res.json();
}

// ─── PERFILES ───────────────────────────────────────
async function apiGetProfiles() {
    const res = await fetch(`${API_URL}/profiles`, {
        headers: authHeaders()
    });
    return res.json();
}

async function apiCreateProfile(name, color) {
    const res = await fetch(`${API_URL}/profiles`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name, color })
    });
    return res.json();
}

async function apiUpdateProfile(id, name, color) {
    const res = await fetch(`${API_URL}/profiles/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ name, color })
    });
    return res.json();
}

async function apiDeleteProfile(id) {
    const res = await fetch(`${API_URL}/profiles/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return res.json();
}

// ─── TRANSACCIONES ──────────────────────────────────
async function apiGetTransactions() {
    const res = await fetch(`${API_URL}/transactions?profile_id=${getProfileId()}`, {
        headers: authHeaders()
    });
    return res.json();
}

async function apiCreateTransaction(type, name, amount) {
    const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ profile_id: Number(getProfileId()), type, name, amount: Number(amount) })
    });
    return res.json();
}

async function apiUpdateTransaction(id, data) {
    const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return res.json();
}

async function apiDeleteTransaction(id) {
    const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return res.json();
}

// ─── DEUDAS ─────────────────────────────────────────
async function apiGetDebts() {
    const res = await fetch(`${API_URL}/debts?profile_id=${getProfileId()}`, {
        headers: authHeaders()
    });
    return res.json();
}

async function apiCreateDebt(data) {
    const res = await fetch(`${API_URL}/debts`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ...data, profile_id: Number(getProfileId()) })
    });
    return res.json();
}

async function apiUpdateDebt(id, data) {
    const res = await fetch(`${API_URL}/debts/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return res.json();
}

async function apiPayDebt(id) {
    const res = await fetch(`${API_URL}/debts/${id}/pay`, {
        method: "POST",
        headers: authHeaders()
    });
    return res.json();
}

async function apiDeleteDebt(id) {
    const res = await fetch(`${API_URL}/debts/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return res.json();
}

// ─── AHORROS ────────────────────────────────────────
async function apiGetSavings() {
    const res = await fetch(`${API_URL}/savings?profile_id=${getProfileId()}`, {
        headers: authHeaders()
    });
    return res.json();
}

async function apiCreateSaving(name, percentage) {
    const res = await fetch(`${API_URL}/savings`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ profile_id: Number(getProfileId()), name, percentage: Number(percentage) })
    });
    return res.json();
}

async function apiUpdateSaving(id, name, percentage) {
    const res = await fetch(`${API_URL}/savings/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ name, percentage: Number(percentage) })
    });
    return res.json();
}

async function apiDeleteSaving(id) {
    const res = await fetch(`${API_URL}/savings/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return res.json();
}

// ─── BALANCE ────────────────────────────────────────
async function apiGetBalance() {
    const res = await fetch(`${API_URL}/balance?profile_id=${getProfileId()}`, {
        headers: authHeaders()
    });
    return res.json();
}