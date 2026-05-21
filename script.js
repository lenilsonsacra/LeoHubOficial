const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const searchInput =
  document.getElementById("searchInput");

const cards =
  document.querySelectorAll(".card");

const subscribeButtons =
  document.querySelectorAll(".subscribe-btn");

let cart = [];

function showToast(message) {

  const toast = document.createElement("div");

  toast.classList.add("toast");
  toast.innerText = message;

  document.body.appendChild(toast);

  // animação de entrada
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // remove depois de 3s
  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// PEGAR DADOS DOS CARDS
subscribeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const card = button.closest(".card");

      // 🔴 BLOQUEIO SE ESGOTADO
  if (card.classList.contains("esgotado")) {
    showToast("❌ Este login está esgotado!");
    return;
  }

    const name =
      card.querySelector("h3").innerText;

    const priceText =
      card.querySelector("span").innerText;

    const price = parseFloat(
      priceText
      .replace("R$", "")
      .replace("/mês", "")
      .replace(",", ".")
      .trim()
    );

    const itemExists =
      cart.find(item => item.name === name);

    if(itemExists){
      itemExists.quantity++;
    } else {

      cart.push({
        name,
        price,
        quantity: 1
      });
    }

    updateCart();

    button.innerText = "Adicionado ✓";
    button.style.background = "#16a34a";

    setTimeout(() => {
      button.innerText = "Adicionar";
      button.style.background = "#2b61ff";
    }, 1000);

  });

});

// ATUALIZA CARRINHO
function updateCart(){

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let totalCount = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;
    totalCount += item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">

        <div class="item-info">
          <h4>${item.name}</h4>

          <p>
            R$ ${item.price.toFixed(2)}
            x ${item.quantity}
          </p>
        </div>

        <button
          class="remove-btn"
          onclick="removeItem(${index})"
        >
          Remover
        </button>

      </div>
    `;
  });

  cartCount.innerText = totalCount;

  cartTotal.innerText =
    `R$ ${total.toFixed(2).replace(".", ",")}`;
}

// REMOVER ITEM
function removeItem(index){

  if(cart[index].quantity > 1){
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

// ABRIR MODAL
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

// FECHAR MODAL
closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// FECHAR CLICANDO FORA
cartModal.addEventListener("click", (e) => {

  if(e.target === cartModal){
    cartModal.style.display = "none";
  }

});

// PESQUISA
searchInput.addEventListener("input", () => {

  const value =
    searchInput.value.toLowerCase();

  cards.forEach(card => {

    const name =
      card.dataset.name.toLowerCase();

    card.style.display =
      name.includes(value)
      ? "block"
      : "none";
  });

});

// FINALIZAR COMPRA
const finishOrder =
  document.getElementById("finishOrder");

finishOrder.addEventListener("click", () => {

  if(cart.length === 0){
    alert("Seu carrinho está vazio!");
    return;
  }

  const phone = "5571981820438";

  let message =
    "🛒 *NOVO PEDIDO*%0A%0A";

  message += "📦 *ITENS:*%0A%0A";

  let total = 0;

  cart.forEach((item) => {

    const subtotal =
      item.price * item.quantity;

    total += subtotal;

    message +=
      `• *${item.name}*%0A`;

    message +=
      `Qtd: ${item.quantity}%0A`;

    message +=
      `Preço: R$ ${item.price
        .toFixed(2)
        .replace(".", ",")}%0A`;

    message +=
      `Subtotal: R$ ${subtotal
        .toFixed(2)
        .replace(".", ",")}%0A%0A`;

  });

  message +=
    `💰 *TOTAL:* R$ ${total
      .toFixed(2)
      .replace(".", ",")}%0A%0A`;

  message +=
    "Olá, quero finalizar meu pedido.";

  const url =
    `https://wa.me/${phone}?text=${message}`;

  // abre whatsapp
  window.open(url, "_blank");

  // LIMPA CARRINHO
  cart = [];

  // atualiza tela
  updateCart();

  // fecha modal
  cartModal.style.display = "none";

  // feedback
  alert("Pedido enviado! Carrinho limpo.");

});
// ABAS MENU
const homeBtn =
  document.getElementById("homeBtn");

const installBtn =
  document.getElementById("installBtn");

const supportBtn =
  document.getElementById("supportBtn");

const menuLinks =
  document.querySelectorAll(".menu a");

const homeSection =
  document.getElementById("homeSection");

const installSection =
  document.getElementById("installSection");

const supportSection =
  document.getElementById("supportSection");


// REMOVE ACTIVE DE TODOS
function removeActive() {
  menuLinks.forEach(link => {
    link.classList.remove("active");
  });
}


// HOME
homeBtn.addEventListener("click", () => {

  homeSection.style.display = "block";
  installSection.style.display = "none";
  supportSection.style.display = "none";

  removeActive();
  homeBtn.classList.add("active");

});


// COMO INSTALAR
installBtn.addEventListener("click", () => {

  homeSection.style.display = "none";
  installSection.style.display = "block";
  supportSection.style.display = "none";

  removeActive();
  installBtn.classList.add("active");

});


// SUPORTE
supportBtn.addEventListener("click", () => {

  homeSection.style.display = "none";
  installSection.style.display = "none";
  supportSection.style.display = "block";

  removeActive();
  supportBtn.classList.add("active");

});