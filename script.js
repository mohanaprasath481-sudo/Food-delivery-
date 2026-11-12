
let cart = [];

function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

// Display cart items
function displayCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        let div = document.createElement("div");
        div.className = "cart-item";

        let name = document.createElement("span");
        name.textContent =
            `${item.name} - ₹${item.price} × ${item.quantity}`;

        let controls = document.createElement("div");

        let minus = document.createElement("button");
        minus.textContent = "-";
        minus.onclick = () => changeQuantity(index, -1);

        let plus = document.createElement("button");
        plus.textContent = "+";
        plus.onclick = () => changeQuantity(index, 1);

        controls.append(minus, plus);
        div.append(name, controls);

        cartItems.appendChild(div);
    });

    document.getElementById("total").textContent =
        "Total: ₹" + total;
}

// Change quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// Place order
function placeOrder() {

    if (cart.length === 0) {
        alert("Please add food items to your cart!");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Your order has been placed successfully!\n" +
        "Total Amount: ₹" + total
    );

    cart = [];
    displayCart();
}
