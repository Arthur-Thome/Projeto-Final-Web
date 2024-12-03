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

// Carrinho

document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const cartCountElement = document.getElementById('cart-count');

    // Função para atualizar o número de itens no carrinho
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    // Ação ao clicar no botão de compra
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };

            // Recupera o carrinho do localStorage, ou cria um novo se não existir
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Verifica se o produto já existe no carrinho e aumenta a quantidade se necessário
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            // Atualiza o carrinho no localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Atualiza a contagem de itens no carrinho
            updateCartCount();

            // Redireciona para a página do carrinho
            window.location.href = './cart.html';
        });
    });

    // Inicializa a contagem de itens ao carregar a página
    updateCartCount();
});

