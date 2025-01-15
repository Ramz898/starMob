const cart = [];

// Элементы на странице
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

// Добавить событие на кнопки "Добавить в корзину"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productEl = button.parentElement;
        const productId = productEl.getAttribute('data-id');
        const productName = productEl.getAttribute('data-name');
        const productPrice = parseFloat(productEl.getAttribute('data-price'));

        addToCart({ id: productId, name: productName, price: productPrice });
    });
});

function addToCart(product) {
    // Проверяем, есть ли уже товар в корзине
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    // Очистить текущие элементы
    cartItemsEl.innerHTML = '';

    // Перебор товаров в корзине
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - ${item.price * item.quantity} ₽`;
        cartItemsEl.appendChild(li);
    });

    // Обновить общую сумму
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceEl.textContent = totalPrice.toFixed(2);
}

// Сохранение состояния корзины
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Загрузка сохранённой корзины
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        savedCart.forEach(item => cart.push(item));
        updateCartUI();
    }
}

// Загружаем корзину при загрузке страницы
loadCart();

// Сохраняем корзину при обновлении
window.addEventListener('beforeunload', saveCart);