// Função para controlar o carrossel de imagens
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const totalImages = images.length;

function changeImage() {
    // Move as imagens para a esquerda
    currentIndex = (currentIndex + 1) % totalImages;
    document.querySelector('.carousel-images').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Configura a troca automática de imagens no carrossel
setInterval(changeImage, 3000); // Troca a cada 3 segundos

// Função para adicionar produto ao carrinho (simulado)
document.getElementById('add-to-cart')?.addEventListener('click', function() {
    alert("Produto adicionado ao carrinho!");
});

// Limpa o formulário de cadastro quando o botão de envio for clicado
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio real do formulário
    alert("Cadastro realizado com sucesso!");
    
    // Limpa os campos do formulário
    document.getElementById('signup-form').reset();
});


// Adicionar ao carrinho
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Página de produtos
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const productData = {
        id: product.dataset.id,
        name: product.dataset.name,
        price: parseFloat(product.dataset.price),
        quantity: 1
      };

      const existingProduct = cart.find(item => item.id === productData.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(productData);
      }

      alert(`${productData.name} adicionado ao carrinho!`);
      updateCart();
    });
  });

  // Página do carrinho
  if (document.querySelector(".cart-items")) {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalPriceElement = document.getElementById("total-price");

    function renderCart() {
      cartItemsContainer.innerHTML = "";
      let total = 0;

      cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <h3>${item.name}</h3>
          <p>Preço: R$ ${item.price}</p>
          <p>Quantidade: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      totalPriceElement.textContent = total.toFixed(2);
    }

    renderCart();

    document.getElementById("finalize-order").addEventListener("click", () => {
      alert("Pedido finalizado!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
  }
});
