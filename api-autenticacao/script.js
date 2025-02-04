const API_URL = "http://localhost:3000/api"; // Utilize isso para o sua URL do back-end

// DOM Elements
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const toggleFormLinks = document.querySelectorAll(".toggle-form");
const card = document.querySelector(".card");

// Função para exibir mensagens de toast
function showToast(message, type = "success") {
    // Cria o container se ele não existir
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }

    // Cria o elemento de toast
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Adiciona o toast ao container
    toastContainer.appendChild(toast);

    // Remove o toast após 4 segundos
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Função para validar e-mail e senha
function validateInput(email, password) {
    if (!email || !password) {
        showToast("Todos os campos devem ser preenchidos.", "error");
        return false;
    }
    return true;
}

// Alternar entre formulários de login e registro
toggleFormLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Adiciona a classe "active" no card para iniciar a animação de flip
        card.classList.toggle("active");

        // Reseta os campos de entrada ao alternar
        setTimeout(() => {
            loginForm.reset();
            registerForm.reset();
        }, 600); // Aguarda a duração da animação
    });
});

// Função responsável pelo registro
document.getElementById("register-btn").addEventListener("click", async () => {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!validateInput(email, password)) return;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // Caso o servidor retorne um erro
            const errorData = await response.json();
            showToast(errorData.error || "Falha no cadastro.", "error");
            return;
        }

        const data = await response.json();
        showToast("Cadastro realizado com sucesso! Faça login.", "success");
        registerForm.classList.remove("active");
        loginForm.classList.add("active");
        registerForm.reset(); // Limpa os campos após o registro
    } catch (error) {
        console.error("Erro ao registrar:", error); // Exibe erro detalhado no console
        showToast("Erro ao conectar ao servidor.", "error");
    }
});

// Função responsável pelo login
document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!validateInput(email, password)) return;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Salvar token no localStorage
            localStorage.setItem("token", data.token);

            // Redirecionar para a landing page
            window.location.href = "landing.html";
        } else {
            // Exibe mensagem de erro caso o servidor retorne erro
            showToast(data.error || "Login falhou.", "error");
        }
    } catch (error) {
        // Apenas mostra mensagem de erro no console
        console.error("Erro ao fazer login:", error);
        showToast("Erro ao conectar ao servidor.", "error");
    }
});