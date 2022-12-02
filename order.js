
// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)') {
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})


// close cart modal
const closeBtn = document.querySelector('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')) {
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})


// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;

  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart(price, imageSrc);
  updateCartPrice()
}

function addItemToCart(price, imageSrc) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');

  for (var i = 0; i < cartImage.length; i++) {
    if (cartImage[i].src == imageSrc) {
      alert('This item has already been added to the cart')
      return;
    }
  }

  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()
}


// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem(event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (var i = 0; i < quantityInput; i++) {
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartPrice()
}

// update total price
function updateCartPrice() {
  var total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity)
    validate();
  }
  document.getElementsByClassName('total-price')[0].innerText = 'Rs' + total
  document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}


//coupen validation

function validate(coupon) {
  var myRe = "jana35";
  const myRe1 = "MAHESH50";
  const coupon1 = myRe1.trim();
  var coupon = myRe.trim();
  var input = document.getElementById('in').value;
  if (input.toUpperCase() == coupon.toUpperCase()) {
    document.getElementById('message').innerHTML = `Coupon Code ${myRe}, Applied Successfully`;
    document.getElementById('err').innerHTML = "" ;
    return true;
  } else if(input.toUpperCase() == coupon1.toUpperCase()){
    document.getElementById('message').innerHTML = `Coupon Code ${myRe1}, Applied Successfully`;
    document.getElementById('err').innerHTML = "";
    return true;
  } else {
    document.getElementById('err').innerHTML = "Invalid coupon";
    document.getElementById('message').innerHTML = "";
    return false; 
  }
}




// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked() {
  window.location.href = "payment.html"

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)

  }
  updateCartPrice()
}
