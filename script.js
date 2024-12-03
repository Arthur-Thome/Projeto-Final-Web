// Seleciona o menu de hambúrguer e o elemento navbar
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

// Adiciona um evento de clique no menu de hambúrguer
mobileMenu.addEventListener('click', () => {
    // Alterna a classe 'active' no navbar para abrir e fechar o menu
    navbar.classList.toggle('active');
    // Alterna a classe 'active' no menu de hambúrguer para a animação de ícone
    mobileMenu.classList.toggle('active');
});

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

// Gerenciamento do carrinho

document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.querySelector('.buy-btn');

    // Produto exemplo para adicionar ao carrinho
    const product = {
        name: "PC Gamer Pichau Highflyer",
        price: 30999.96,
        quantity: 1
    };

    // Adicionar ao carrinho
    buyButton.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verificar se o produto já existe no carrinho
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1; // Incrementar quantidade
        } else {
            cart.push(product); // Adicionar novo produto
        }

        // Salvar no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirecionar ao carrinho
        window.location.href = './cart.html';
    });
});

