document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Комплит Baker', description: 'Дека - Baker 8, подвески - Record 149, колеса - Formula speed 56mm 102A', price: 12599 },
        { id: 2, name: 'Колеса Bones 54mm 103A', description: 'Самые жесткие колеса в мире, с ними вы сможете сделать Powerslide даже на самом убогом асфальте!', price: 6500 },
        { id: 3, name: 'Шлем', description: 'Защитный шлем для скейтбординга. Поберегите голову!', price: 4999 },
        { id: 4, name: 'Защита для колен', description: 'Защитите свои колени. Они вам еще нужны)', price: 2599 },
        { id: 5, name: 'Перчатки', description: 'Защитные перчатки для скейтбординга.', price: 1999 },
        { id: 6, name: 'Колеса Юнион 52мм', description: 'Жесткость 102А', price: 1299},
        { id: 7, name: 'Шкурка Grizzly', description: 'Фирменная шкурка Grizzly', price: 1499},
        { id: 8, name: 'Шкурка Grizzly', description: 'Фирменная шкурка Grizzly', price: 1499},
        { id: 9, name: 'Шкурка Grizzly', description: 'Фирменная шкурка Grizzly', price: 1499},
        { id: 10, name: 'Подшипники Independment', description: 'Apec-9', price: 2499},
        { id: 11, name: 'Т-Тул Юнион', description: 'Никогда не было такого, что подвески надо подкрутить прямо во время катки? У нас было, именно поэтому мы с командой Юнион сделали фирменный т-тул!', price: 999},
        { id: 12, name: 'Nike SB Janovski', description: 'Лучшая модель Nike SB, материал: замша, вулканическая подошва, размерный ряд: полный', price: 7999},
    ];


    const productGrid = document.getElementById('product-grid');
    const productModal = document.getElementById('product-modal');
    const closeButton = document.getElementById('close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalImage = document.getElementById('modal-image');
    const addToCartButton = document.getElementById('add-to-cart');
    const removeFromCartButton = document.getElementById('remove-from-cart');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');

    let currentProduct = null;
    let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
	

    function openModal(product) {
        currentProduct = product;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = product.price;
        modalImage.src = `images/${product.name.toLowerCase().replace(/ /g, '-')}.png`;
        productModal.style.display = 'block';
        removeFromCartButton.style.display = cartList.find(item => item.id === product.id) ? 'block' : 'none';
    }

    function closeModal() {
        productModal.style.display = 'none';
    }

    function addToCart() {
        if (!cartList.find(item => item.id === currentProduct.id)) {
            cartList.push(currentProduct);
            localStorage.setItem('cartList', JSON.stringify(cartList));
            updateCart();
            closeModal();
        }
    }

    function removeFromCart() {
        cartList = cartList.filter(item => item.id !== currentProduct.id);
        localStorage.setItem('cartList', JSON.stringify(cartList));
        updateCart();
        closeModal();
    }

    function updateCart() {
        if (cartItems) {
            cartItems.innerHTML = '';
            let total = 0;
            cartList.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price} руб.`;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Убрать';
                removeButton.classList.add('remove');
                removeButton.onclick = () => {
                    cartList = cartList.filter(i => i.id !== item.id);
                    localStorage.setItem('cartList', JSON.stringify(cartList));
                    updateCart();
                };
                li.appendChild(removeButton);
                cartItems.appendChild(li);
                total += item.price;
            });
            totalPrice.textContent = total;
        }
        if (cartItemsList) {
            cartItemsList.innerHTML = '';
            let total = 0;
            cartList.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price} руб.`;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Убрать';
                removeButton.classList.add('remove');
                removeButton.onclick = () => {
                    cartList = cartList.filter(i => i.id !== item.id);
                    localStorage.setItem('cartList', JSON.stringify(cartList));
                    updateCart();
                };
                li.appendChild(removeButton);
                cartItemsList.appendChild(li);
                total += item.price;
            });
            cartTotalPrice.textContent = total;
        }
    }
	// проверяем на null
	if (closeButton) {
		closeButton.addEventListener('click', closeModal);
	}
    window.addEventListener('click', event => {
        if (event.target == productModal) {
            closeModal();
        }
    });
	// проверяем на null
	if (addToCartButton) {
    addToCartButton.addEventListener('click', addToCart);
	}
	// проверяем на null
	if (removeFromCartButton) {
    removeFromCartButton.addEventListener('click', removeFromCart);
	}
	// проверяем на null
	// штука которая рисует товары как список
	if (productGrid) {
		products.forEach(product => {
			var productDiv = document.createElement("div");
			productDiv.classList.add('product');
			productDiv.innerHTML = `
				<h3>${product.name}</h3>
				<img src="images/${product.name.toLowerCase().replace(/ /g, '-')}.png" alt="${product.name}">
				<p>${product.price} руб.</p>
				<button onclick="openModal(${product.id})">Подробнее</button>
			`;
			productGrid.appendChild(productDiv);
		});
	}

    window.openModal = function(productId) {
        const product = products.find(p => p.id === productId);
        openModal(product);
    };

    updateCart();
	
});
