// document.addEventListener('DOMContentLoaded', () => {
//     const loginBtn = document.getElementById('loginBtn');
//     const registerBtn = document.getElementById('registerBtn');
//     const logoutBtn = document.getElementById('logoutBtn');
//     const loginForm = document.getElementById('loginForm');
//     const registerForm = document.getElementById('registerForm');
//     const resetPasswordForm = document.getElementById('resetPasswordForm');
//     const contactForm = document.getElementById('contactForm');
//     const mobileMenu = document.getElementById("mobile-menu");
//     const navbar = document.getElementById("navbar");

//     mobileMenu.addEventListener("click", () => {
//         navbar.classList.toggle("active");
//     });

//     // Mostrar/ocultar formulários
//     loginBtn.addEventListener('click', () => {
//         loginForm.style.display = 'block';
//         registerForm.style.display = 'none';
//         resetPasswordForm.style.display = 'none';
//     });

//     registerBtn.addEventListener('click', () => {
//         registerForm.style.display = 'block';
//         loginForm.style.display = 'none';
//         resetPasswordForm.style.display = 'none';
//     });

//     // Enviar formulário de login
//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const formData = new FormData(loginForm);
//         const response = await fetch('/login', {
//             method: 'POST',
//             body: formData,
//         });
//         const result = await response.json();
//         if (result.success) {
//             alert('Login bem-sucedido!');
//             window.location.reload(); // Recarregar para atualizar o estado do menu
//         } else {
//             alert('Erro no login: ' + result.message);
//         }
//     });

//     // Enviar formulário de cadastro
//     registerForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const formData = new FormData(registerForm);
//         const response = await fetch('/register', {
//             method: 'POST',
//             body: formData,
//         });
//         const result = await response.json();
//         if (result.success) {
//             alert('Cadastro bem-sucedido!');
//             window.location.reload(); // Recarregar para atualizar o estado do menu
//         } else {
//             alert('Erro no cadastro: ' + result.message);
//         }
//     });

//     // Enviar formulário de redefinição de senha
//     resetPasswordForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const formData = new FormData(resetPasswordForm);
//         const response = await fetch('/reset-password', {
//             method: 'POST',
//             body: formData,
//         });
//         const result = await response.json();
//         alert(result.message);
//     });

//     // Enviar formulário de contato
//     contactForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const formData = new FormData(contactForm);
//         const response = await fetch('/contact', {
//             method: 'POST',
//             body: formData,
//         });
//         const result = await response.json();
//         alert(result.message);
//     });

//     // Logout
//     logoutBtn.addEventListener('click', async () => {
//         const response = await fetch('/logout', {
//             method: 'POST',
//         });
//         const result = await response.json();
//         if (result.success) {
//             alert('Logout realizado com sucesso!');
//             window.location.reload(); // Recarregar para atualizar o estado do menu
//         } else {
//             alert('Erro ao deslogar: ' + result.message);
//         }
//     });
// });


// Popup
// Captura o clique nas imagens da galeria
document.querySelectorAll('.gallery-item img').forEach(item => {
    item.addEventListener('click', function () {
        const imgSrc = this.src;
        const infoHtml = this.nextElementSibling.innerHTML;

        // Define a imagem e o conteúdo no popup
        document.getElementById('popup-image').src = imgSrc;
        document.getElementById('popup-info').innerHTML = infoHtml;

        // Mostra o popup
        document.getElementById('popup').style.display = 'flex';
    });
});

// Fecha o popup ao clicar no "X"
document.getElementById('close-popup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none';
});

// Impede que o popup feche ao clicar dentro dele
document.getElementById('popup').addEventListener('click', function (event) {
    if (event.target.id === 'popup') {
        document.getElementById('popup').style.display = 'none';
    }
});

// Carrossel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function showItem(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });
});

let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex += direction;

    // Loop para o próximo item após o último e volta ao primeiro
    if (currentIndex >= items.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = items.length - 1;
    }

    const offset = -currentIndex * 100; // Calcula a posição baseada na largura do item
    items.forEach(item => {
        item.style.transform = `translateX(${offset}%)`;
    });
}


// Alterna a exibição do menu de navegação em dispositivos móveis
// function toggleMenu() {
//     const navbar = document.getElementById('navbar');
//     navbar.classList.toggle('show');
// }

// Adiciona o evento de clique ao ícone de hambúrguer
