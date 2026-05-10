// --- AUTHENTICATION & ACCESS CONTROL ---

const accounts = [
    { username: "admin@chewiwi.com", password: "admin123", role: "admin" },
    { username: "user@chewiwi.com", password: "user123", role: "user" }
];

// 1. Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    const pass = document.getElementById('passInput').value;

    const user = accounts.find(a => a.username === email && a.password === pass);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        // Redirect based on role
        window.location.href = (user.role === "admin") ? "admin.html" : "index.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// 2. Function to logout
function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// 3. Function to update Navbar based on login status
function updateNavbar() {
    const navRight = document.querySelector('.navbar .d-flex');
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user && navRight) {
        navRight.innerHTML = `
            <span class="me-3 small fw-bold text-muted">Mode: ${user.role.toUpperCase()}</span>
            ${user.role === 'admin' ? '<a href="admin.html" class="btn btn-sm btn-outline-dark me-2">Admin Panel</a>' : ''}
            <a href="cart.html" class="btn btn-sm btn-chewiwi me-2">Cart</a>
            <button class="btn btn-sm btn-link text-danger text-decoration-none" onclick="logoutUser()">Logout</button>
        `;
    }
}

// Run navbar update on every page load
document.addEventListener('DOMContentLoaded', updateNavbar);
