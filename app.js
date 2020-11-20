let menuToggle = document.querySelector(".menu-toggle")

let showNav = (e) => {
    let menu = document.querySelector(".menu");
    menu.classList.toggle("active");
};
menuToggle.addEventListener("click", showNav);



//get buttons from dom
let itemsBtn = document.getElementsByClassName("itemsBtn");
let output = document.querySelector(".output");
let cardDeck = document.querySelector(".card-deck");
let cartArr = [];
let itemsData = [
    {
        id: "item-1",
        image: "img-1.jpg",
        name: "Y-3",
        description: "Rehito mesh trainers",
        price: 2500,
        quantity: 1
    },
    {
        id: "item-2",
        image: "img-2.jpg",
        name: "Y/PROJECT",
        description: "Bleached double-seam jeans",
        price: 200,
        quantity: 1
    },
    {
        id: "item-3",
        image: "img-3.jpg",
        name: "NEUW",
        description: "Lou slim-leg jeans",
        price: 250,
        quantity: 1
    },
    {
        id: "item-4",
        image: "img-4.jpg",
        name: "MARTINE ROSE",
        description: "Logo-embroidered checked",
        price: 250,
        quantity: 1
    },
    {
        id: "item-4",
        image: "img-5.jpg",
        name: "RAEY",
        description: "Single-breasted cotton-blend",
        price: 250,
        quantity: 1
    },
    {
        id: "item-6",
        image: "img-6.jpg",
        name: "PAUL SMITH",
        description: "Floral print cottom-poplin shirt",
        price: 250,
        quantity: 1
    },

]
let clear = document.querySelector(".clear");
let trayOfItems = document.querySelector(".trayOfItems");
document.addEventListener("DOMContentLoaded", function () {

    itemsData.forEach(item => {
        populateUI(item)
    })
    Array.from(itemsBtn).forEach((item) =>
        item.addEventListener("click", function (e) {
            if (
                cartArr.find(
                    (item) =>
                        item.id === e.target.id
                )
            ) {
                alert("added to cart");
            } else {
                addItemToCartArr(e);
            }
        })
    );
});

function populateUI(item) {
    let card = document.createElement("div")
    let cardImg = document.createElement("div")

    let img = document.createElement("img")
    let cardBody = document.createElement("div")
    let cardTitle = document.createElement("div")
    let cardDescription = document.createElement("div")
    let addBtn = document.createElement("button")
    addBtn.innerHTML = item.price
    cardTitle.innerHTML = item.name
    cardDescription.innerHTML = item.description
    cardTitle.className = "cardTitle"
    cardDescription.className = "cardDescription"
    cardBody.className = "cardBody"
    addBtn.className = "btn btn-primary itemsBtn"
    addBtn.id = item.id
    img.className = "card-img-top"
    img.setAttribute("src", item.image)
    cardImg.appendChild(img)

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardDescription)
    cardBody.appendChild(addBtn)
    card.appendChild(cardImg)
    card.appendChild(cardBody)
    cardDeck.appendChild(card)
}
function addItemToCartArr(e) {

    let selectedItem = itemsData.filter(item => item.id === e.target.id)[0]
    let clickedItem = {};
    clickedItem.id = selectedItem.id;
    clickedItem.name = selectedItem.name;
    clickedItem.price = selectedItem.price;
    clickedItem.quantity = selectedItem.quantity;
    clickedItem.image = selectedItem.image
    clickedItem.description = selectedItem.description
    clickedItem.quantityPrice = selectedItem.price;
    cartArr.push(clickedItem);
    //calculate total price
    totalPrice();
    addItemToCartUI(clickedItem);
}
function addItemToCartUI(item) {
    let wrapper = document.createElement("div");
    let imageContainer = document.createElement("div");
    let textContainer = document.createElement("div")
    let description = document.createElement("div")
    let name = document.createElement("div");
    let price = document.createElement("div");
    let buttons = document.createElement("div");
    let divButton = document.createElement("div");
    let plusButton = document.createElement("div");
    let negativeButton = document.createElement("div");

    wrapper.id = item.id;
    wrapper.className = "displayedDiv";
    imageContainer.className = "imageContainer"
    textContainer.className = "textContainer"
    buttons.className = "buttons"
    let cancel = document.createElement("button");
    cancel.className = "cancel";
    cancel.innerHTML = "X";
    divButton.className = "divButton";
    price.className = "price";
    price.className = "price";
    name.className = "name"
    name.appendChild(document.createTextNode(item.name));
    price.appendChild(document.createTextNode(item.quantityPrice));



    let plus = document.createElement("button");
    plus.innerHTML = "+";
    plus.className = "changeQuantity";
    plusButton.appendChild(plus);


    let negative = document.createElement("button");
    negative.innerHTML = "-";
    negative.className = "changeQuantity";
    description.appendChild(document.createTextNode(item.description));
    let span = document.createElement("div");
    span.className = "span";
    span.appendChild(document.createTextNode(item.quantity));
    negativeButton.appendChild(negative);

    divButton.appendChild(negativeButton);
    divButton.appendChild(span);
    divButton.appendChild(plusButton);
    buttons.appendChild(divButton)
    buttons.appendChild(cancel);
    let image = document.createElement("img")
    image.setAttribute("src", item.image)

    textContainer.appendChild(name);
    textContainer.appendChild(price);
    textContainer.appendChild(description)
    textContainer.appendChild(buttons);

    imageContainer.appendChild(image)

    wrapper.appendChild(imageContainer)
    wrapper.appendChild(textContainer)
    trayOfItems.appendChild(wrapper);
}

function changeData(id, value) {
    Array.from(cartArr).forEach((item) => {
        if (item.id === id) {
            value === "+1" ? item.quantity++ : item.quantity--;
            let newPrice;

            newPrice = parseInt(item.price) * parseInt(item.quantity);
            item.quantityPrice = newPrice;
            cartArr = updateItemArr(item);
            changeUI(id, item);
            totalPrice();
        }
    });
}
function changeUI(id, itemData) {
    let items = document.querySelectorAll(".trayOfItems> div");
    Array.from(items).forEach((item) => {
        if (item.id === id) {
            let itemLayer = item.childNodes;
            let currentPriceText = itemLayer[1].childNodes[1];
            let newPrice;
            let quantityText = itemLayer[1].childNodes[3].childNodes[0].childNodes[1];
            quantityText.innerHTML = itemData.quantity;
            newPrice = parseInt(itemData.price) * parseInt(itemData.quantity);
            currentPriceText.innerHTML = itemData.quantityPrice;
        }
    });
}
function updateItemArr(data) {
    cartArr.map((item) => {
        if (data.id === item.id) {
            item = data;
        }
    });
    return cartArr;
}

//listen to clcks on increase or decreace of product
trayOfItems.addEventListener("click", function (e) {
    if (e.target.classList.contains("cancel")) {
        let parentElement = e.target.parentElement.parentElement.parentElement;
        console.log(parentElement)
        let id = parentElement.id;

        trayOfItems.removeChild(parentElement);
        cartArr = cartArr.filter((item) => {
            return item.id !== id;
        });
        totalPrice();
    } else if (e.target.classList.contains("changeQuantity")) {
        if (e.target.innerHTML == "+") {
            changeData(
                e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id,
                "+1"
            );
        } else if (e.target.innerHTML == "-") {

            let clicked = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            cartArr.forEach((item) => {
                if (item.id === clicked) {
                    if (item.quantity == 1) {
                        alert("error");
                    } else {
                        changeData(
                            clicked,
                            "-1"
                        );
                    }
                }
            });
        }
    }
});
function totalPrice(items = cartArr) {
    let total = document.querySelector(".output");
    let totalPrice = items.reduce(
        (acc, item) => acc + parseInt(item.quantityPrice),
        0
    );

    total.innerHTML = totalPrice;
}

//clear everything clicked
clear.addEventListener("click", function (e) {
    second.innerHTML = "";
    cartArr = [];
    output.innerHTML = "0";
    e.preventDefault();
});