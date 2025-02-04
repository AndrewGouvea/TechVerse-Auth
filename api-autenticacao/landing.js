// Seleciona os elementos do avatar e do menu suspenso
const profileIcon = document.querySelector(".profile-icon");
const dropdownMenu = document.querySelector(".dropdown-menu");

// Alterna a classe 'show' ao clicar no avatar
profileIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Impede o clique de fechar o menu
    dropdownMenu.classList.toggle("show");
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show");
    }
});

// Verifica se o token está presente no localStorage
const token = localStorage.getItem("token");

// Se não houver token, redireciona para a página de login
if (!token) {
    alert("Você precisa fazer login para acessar essa página");
    window.location.href = "index.html";
}

// Seleciona o botão de logout
document.getElementById("logout").addEventListener("click", () => {
    // Remove o token do localStorage
    localStorage.removeItem("token");

    // Redireciona para a tela de login
    window.location.href = "index.html"; // Certifique-se de que o arquivo login.html está no mesmo diretório
});
