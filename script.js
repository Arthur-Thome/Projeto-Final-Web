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

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado');
    
    const buyButton = document.querySelector('.buy-btn');
    
    if (!buyButton) {
        console.log('Botão não encontrado');
        return;  // Interrompe o script caso o botão não seja encontrado
    }

    console.log('Botão encontrado:', buyButton);  // Se o botão for encontrado, este log aparece

    const productId = buyButton.dataset.productId;
    const productName = buyButton.dataset.productName;
    const productPrice = parseFloat(buyButton.dataset.productPrice);

    buyButton.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verifica se o produto já está no carrinho
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Redireciona para o carrinho
        window.location.href = './cart.html';
    });
});





