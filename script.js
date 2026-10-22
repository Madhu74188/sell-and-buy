
const $ = id => document.getElementById(id);

const products = [
    {
        id: 1,
        name: "Smartphone",
        category: "Mobiles",
        price: 14999,
        description: "A stylish smartphone for daily use, communication and entertainment.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1999,
        description: "Enjoy your favourite music with comfortable wireless headphones.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1299,
        description: "Comfortable everyday shoes for walking and running.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Wrist Watch",
        category: "Fashion",
        price: 999,
        description: "A modern watch to complement your everyday style.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Laptop",
        category: "Electronics",
        price: 45999,
        description: "A laptop for studying, working and everyday productivity.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Travel Backpack",
        category: "Fashion",
        price: 899,
        description: "A practical backpack for college, travel and daily use.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Table Lamp",
        category: "Home",
        price: 699,
        description: "A modern lamp for your bedroom or study table.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Books Collection",
        category: "Books",
        price: 399,
        description: "A collection of books for reading and learning.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];
let selectedCategory = "All";
let searchText = "";
let checkoutItems = [];

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function showPanel(panelId) {
    ["cartSection", "detailsSection", "checkoutSection",
     "confirmation"].forEach(id => {
        $(id).hidden = id !== panelId;
    });

    if (panelId) {
        $(panelId).scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
}

function renderProducts() {
    const container = $("products");
    container.replaceChildren();

    const filtered = products.filter(product => {
        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const text = (
            product.name + " " +
            product.category + " " +
            product.description
        ).toLowerCase();

        return categoryMatch && text.includes(searchText);
    });

    if (filtered.length === 0) {
        container.appendChild(
            createElement("p", "empty-message", "No products found.")
        );
        return;
    }

    filtered.forEach(product => {
        const card = createElement("article", "product-card");

        const image = createElement("img", "product-image");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            image.onerror = null;
            image.alt = "Product picture unavailable";
        };

        image.addEventListener("click", () => showDetails(product));

        const name = createElement("h3", "", product.name);
        const category = createElement("p", "", product.category);
        const description = createElement("p", "", product.description);
        const price = createElement(
            "p", "price", formatPrice(product.price)
        );

        const detailsButton = createElement(
            "button", "secondary", "View Details"
        );
        detailsButton.addEventListener("click", () => showDetails(product));

        const buyButton = createElement(
            "button", "buy-button", "Buy Now"
        );
        buyButton.addEventListener("click", () => {
            checkoutItems = [{ ...product, quantity: 1 }];
            openCheckout();
        });

        const addButton = createElement(
            "button", "cart-button", "Add to Cart"
        );
        addButton.addEventListener("click", () => addToCart(product));

        card.append(
            image, name, category, description, price,
            detailsButton, buyButton, addButton
        );

        container.appendChild(card);
    });
}

function showDetails(product) {
    showPanel("detailsSection");

    const container = $("productDetails");
    container.replaceChildren();

    const image = createElement("img", "detail-image");
    image.src = product.image;
    image.alt = product.name;

    const title = createElement("h2", "", product.name);
    const category = createElement("p", "", "Category: " + product.category);
    const description = createElement("p", "", product.description);
    const price = createElement(
        "p", "detail-price", formatPrice(product.price)
    );

    const addButton = createElement(
        "button", "cart-button", "Add to Cart"
    );
    addButton.addEventListener("click", () => {
        addToCart(product);
        showPanel("cartSection");
    });

    const buyButton = createElement(
        "button", "buy-button", "Buy Now"
    );
    buyButton.addEventListener("click", () => {
        checkoutItems = [{ ...product, quantity: 1 }];
        openCheckout();
    });

    container.append(
        image, title, category, description, price,
        addButton, buyButton
    );
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    alert(product.name + " added to your cart!");
}

function renderCart() {
    $("cartCount").textContent = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const container = $("cartItems");
    container.replaceChildren();

    if (cart.length === 0) {
        container.appendChild(
            createElement("p", "", "Your shopping cart is empty.")
        );
    }

    cart.forEach(item => {
        const row = createElement("div", "cart-row");
        const info = createElement("div");

        info.append(
            createElement("strong", "", item.name),
            createElement(
                "p", "",
                formatPrice(item.price) + " × " + item.quantity
            )
        );

        const remove = createElement(
            "button", "remove-button", "Remove"
        );

        remove.addEventListener("click", () => {
            cart = cart.filter(product => product.id !== item.id);
            renderCart();
        });

        row.append(info, remove);
        container.appendChild(row);
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    $("cartTotal").textContent = "Total: " + formatPrice(total);
    $("cartCheckout").disabled = cart.length === 0;
}

function openCheckout() {
    if (checkoutItems.length === 0) {
        alert("Please select a product first.");
        return;
    }

    const summary = $("checkoutSummary");
    summary.replaceChildren();

    checkoutItems.forEach(item => {
        summary.appendChild(
            createElement(
                "p", "",
                item.name + " × " + item.quantity +
                " — " + formatPrice(item.price * item.quantity)
            )
        );
    });

    const total = checkoutItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    summary.appendChild(
        createElement("h3", "", "Total: " + formatPrice(total))
    );

    showPanel("checkoutSection");
}

$("search").addEventListener("input", event => {
    searchText = event.target.value.trim().toLowerCase();
    renderProducts();
});

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category").forEach(item => {
            item.classList.toggle("active", item === button);
        });

        renderProducts();
    });
});

$("openCart").addEventListener("click", () => showPanel("cartSection"));
$("closeCart").addEventListener("click", () => showPanel(""));
$("closeDetails").addEventListener("click", () => showPanel(""));
$("closeCheckout").addEventListener("click", () => showPanel(""));

$("cartCheckout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    checkoutItems = cart.map(item => ({ ...item }));
    openCheckout();
});

$("checkoutForm").addEventListener("submit", event => {
    event.preventDefault();

    if (checkoutItems.length === 0) {
        alert("Please select a product.");
        return;
    }

    const name = $("customerName").value.trim();
    const phone = $("phone").value.trim();
    const address = $("address").value.trim();
    const city = $("city").value.trim();
    const pincode = $("pincode").value.trim();
    const payment = $("payment").value;

    if (!name || !address || !city ||
        !/^[0-9]{10}$/.test(phone) ||
        !/^[0-9]{6}$/.test(pincode)) {
        alert("Please enter valid delivery details.");
        return;
    }

    const orderId = "SE" + Date.now().toString().slice(-8);
    const total = checkoutItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    $("orderMessage").textContent =
        "Order ID: " + orderId +
        " | Total: " + formatPrice(total) +
        " | Payment: " + payment +
        ". Delivery to " + city + " - " + pincode +
        ". Thank you, " + name + "! This is a demo order only.";

    const purchasedIds = checkoutItems.map(item => item.id);

    // Clear only purchased quantities from the cart.
    checkoutItems.forEach(purchased => {
        const existing = cart.find(item => item.id === purchased.id);

        if (existing) {
            existing.quantity -= purchased.quantity;
        }
    });

    cart = cart.filter(item => item.quantity > 0);

    checkoutItems = [];
    $("checkoutForm").reset();

    renderCart();
    showPanel("confirmation");
});

$("continueShopping").addEventListener("click", () => {
    showPanel("");
    $("shop").scrollIntoView({ behavior: "smooth" });
});

renderProducts();
renderCart();
