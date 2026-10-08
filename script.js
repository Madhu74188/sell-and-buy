
let products = [
    {
        name: "Laptop",
        category: "Electronics",
        price: 25000
    },
    {
        name: "Bicycle",
        category: "Sports",
        price: 5000
    },
    {
        name: "Study Table",
        category: "Furniture",
        price: 3000
    }
];


function displayProducts(list) {

    let output = "";

    for (let i = 0; i < list.length; i++) {

        output += "<div class='card'>";

        output += "<h2>" + list[i].name + "</h2>";

        output += "<p>Category: "
                + list[i].category
                + "</p>";

        output += "<p class='price'>₹"
                + list[i].price
                + "</p>";

        output += "<button onclick=\"buyProduct('"
                + list[i].name
                + "')\">Buy</button>";

        output += "<button class='delete' "
                + "onclick='deleteProduct("
                + i
                + ")'>Delete</button>";

        output += "</div>";
    }

    document.getElementById("products").innerHTML = output;
}


function addProduct() {

    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let price = document.getElementById("price").value;

    if (name == "" || category == "" || price == "") {

        alert("Please enter all details");
        return;
    }

    products.push({
        name: name,
        category: category,
        price: price
    });

    displayProducts(products);

    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
}


function searchProduct() {

    let text = document.getElementById("search").value.toLowerCase();

    let result = [];

    for (let i = 0; i < products.length; i++) {

        if (products[i].name.toLowerCase().includes(text)) {

            result.push(products[i]);
        }
    }

    displayProducts(result);
}


function buyProduct(name) {

    alert("You selected " + name);
}


function deleteProduct(index) {

    products.splice(index, 1);

    displayProducts(products);
}


displayProducts(products);