document.addEventListener('DOMContentLoaded', () => {
    const cartList = JSON.parse(localStorage.getItem('cartList')) || [];
    const orderTotalElement = document.getElementById('order-total');
    const finalTotalElement = document.getElementById('final-total');

    let orderTotal = cartList.reduce((total, item) => total + item.price, 0);
    let finalTotal = orderTotal + 499; // Добавляем стоимость доставки

    orderTotalElement.textContent = `Товары: ${orderTotal} руб.`;
    finalTotalElement.textContent = `Итоговая сумма: ${finalTotal} руб.`;

    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Заказ подтвержден!');
        localStorage.removeItem('cartList'); // Очистка корзины после подтверждения заказа
        window.location.href = 'catalog.html'; // Возвращаемся на страницу каталога
    });
});
