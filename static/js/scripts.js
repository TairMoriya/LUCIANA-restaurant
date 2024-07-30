// static/js/scripts.js

let cart = [];

function addToCart(itenName,itemPrice) {
    const item = { name: itenName, price: parseFloat(itemPrice)};
    cart.push(item);
    updateCart();
    
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        console.log(`HERE 2 ${item.price} ${typeof item.price}`);
        const itemDetails = document.createElement('div');
        itemDetails.className = 'details';
        itemDetails.innerHTML = `<h3>${item.name}</h3><p>₪${item.price.toFixed(2)}</p>`;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-item';
        removeButton.innerText = 'הסר';
        removeButton.onclick = () => removeFromCart(index);

        cartItem.appendChild(itemDetails);
        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);

        total += item.price;
    });

    cartTotal.innerText = `₪${total.toFixed(2)}`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Your code here
    document.getElementById('add-menu-item-button').addEventListener('click', function() {
        var form = document.getElementById('add-menu-item-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('perform-action-button').addEventListener('click', function() {
        var form = document.getElementById('perform-action-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
});

function checkoutWithOrderIDAndSale() {
    // Calculate the total price
    const totalsal = cart.reduce((total, item) => total + item.price, 0);

    // Create the data object
    const data = {
        TotalPrice: totalsal.toFixed(2)
    };

    // Convert the data object to JSON
    const dataJson = JSON.stringify(data);

    // Send the data to the /menu endpoint
    fetch('/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
    }).then(response => {
        if (response.ok) {
            // Get the checkout button
            const button = document.getElementById('checkout');
            // Create a new paragraph element
            const message = document.createElement('p');
            // Set the text of the paragraph
            message.textContent = 'Checkout successful!';
            // Replace the button with the message
            button.parentNode.insertBefore(message, button.nextSibling);
    
        if (response.error) { 
            throw new Error('Checkout failed');
        }}
    }).catch(error => {
        console.error('Error:', error);
    });

}
function checkout() {
    // Attach the new function to the checkout-button
    document.getElementById('checkout').addEventListener('click', checkoutWithOrderIDAndSale);
}


document.getElementById('delete-menu-item-button').onclick = function() {
    document.getElementById('delete-menu-item-form').style.display = 'block';
}

checkout()


