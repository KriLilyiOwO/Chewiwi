Crt.js
function renderCart() {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const container = document.getElementById('cart-items-list');

  let subtotal = 0;

  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {

    container.innerHTML = `
      <p class="text-center py-5 text-muted">
        Your cart is empty.
      </p>
    `;

    updateTotals(0);

    return;
  }

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    subtotal += itemTotal;

    container.innerHTML += `

      <div class="row align-items-center mb-4 cart-item">

        <div class="col-5 d-flex align-items-center">

          <img
            src="${item.image}"
            class="cart-product-img me-3"
          >

          <div>

            <h6 class="mb-0 fw-bold product-name">
              ${item.name}
            </h6>

            <small class="text-muted">
              ₱${item.price.toLocaleString()}
            </small>

          </div>

        </div>

        <div class="col-2 text-center fw-bold">
          ₱${item.price.toLocaleString()}
        </div>

        <div class="col-3 d-flex justify-content-center">

          <div class="qty-control d-flex align-items-center">

            <button
              class="btn btn-sm btn-qty"
              onclick="changeQty(${index}, 1)"
            >
              +
            </button>

            <input
              type="text"
              value="${item.quantity}"
              class="form-control form-control-sm text-center qty-input"
              readonly
            >

            <button
              class="btn btn-sm btn-qty"
              onclick="changeQty(${index}, -1)"
            >
              -
            </button>

          </div>

        </div>

        <div class="col-2 text-end d-flex align-items-center justify-content-end">

          <span class="text-success fw-bold me-3">
            ₱${itemTotal.toLocaleString()}
          </span>

          <button
            class="btn btn-link btn-remove p-0"
            onclick="removeItem(${index})"
          >
            <i class="bi bi-trash3-fill h5"></i>
          </button>

        </div>

      </div>
    `;
  });

  updateTotals(subtotal);
}

function changeQty(index, delta) {

  let cart = JSON.parse(localStorage.getItem('cart'));

  cart[index].quantity += delta;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  renderCart();
}

function removeItem(index) {

  let cart = JSON.parse(localStorage.getItem('cart'));

  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));

  renderCart();
}

function updateTotals(subtotal) {

  const shipping = subtotal > 0 ? 100 : 0;

  document.getElementById('cart-subtotal').textContent =
    `₱${subtotal.toLocaleString()}`;

  document.getElementById('cart-shipping').textContent =
    `₱${shipping.toLocaleString()}`;

  document.getElementById('cart-total').textContent =
    `₱${(subtotal + shipping).toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', renderCart);

