// Arquivo principal de JS que faz a requisição para a API e exibe os produtos na tela

// Importando a função que faz a requisição para a API
import {serviceProducts} from '../services/product-services.js';

// Função que exibe os produtos na tela
const productContainer = document.querySelector('.container__menu__produtos');
const formulario = document.querySelector('[data-formulario]');


function createCard({name, price, image, id}) {
    const card = document.createElement('div');
    card.classList.add('card__container');
    card.innerHTML = `
    <div class="img-container">
        <img src="${image}" alt="Imagem produto">
    </div>

    <div class="card__container__info">
        <p>${name}</p>
        <div class="card__container__info--value">
            <p>R$ ${price}</p>
        </div>
    </div>

    <button class="delete-button" data-id="${id}">
           <img src="./img/deleteBtn.svg" alt="Eliminar"> 
            <h2>Remover</h2>
     </button>
    `; 
    // Adicionando o card ao container de produtos
    return card;
};


const renderProducts = async () => {
    try{
        // Chamando a função que faz a requisição para a API
        const products = await serviceProducts.productsList();
        // Iterando sobre os produtos
        products.forEach((product) => {
            // Criando um card para cada produto
            const productCard = createCard(product);
            // Adicionando o card ao container de produtos
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.log(error);
    }
};

// Adicionando evento de clique no botão de deletar
productContainer.addEventListener('click', async (event) =>{
    // Verificando se o elemento clicado é o botão de deletar
    if(event.target.classList.contains('delete-button')){
        // Pegando o id do produto
        const id = event.target.dataset.id;
        // Chamando a função que deleta o produto
        await serviceProducts.deleteProduct(id);
        // Removendo o card da tela
        event.target.parentElement.remove();
    }
});

formulario.addEventListener('submit', async (event) =>{
    // Evitando que o formulário recarregue a página
    event.preventDefault();
    // Pegando os valores dos inputs
    const nome = document.querySelector('#nome').value; // Se der errado, crie um atributo em cada um e coloque aqui
    const preco = document.querySelector('#preco').value;
    const imagem = document.querySelector('#imagem').value;

    console.log(nome, preco, imagem);

    try {
        const newProduct = await serviceProducts.createProduct(nome, preco, imagem);
        const newCard = createCard(newProduct);
        productContainer.appendChild(newCard);

    } catch (error) {
        console.log(error);
    }
    formulario.reset();
})


// Chamando a função que exibe os produtos na tela
renderProducts();

