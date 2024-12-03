const base_url = 'http://localhost:3001/products';

const productsList = async () =>{
    try {
        // Tentando fazer a requisição para a API
        const response = await fetch(base_url);
        // Caso a requisição seja bem sucedida, retornar os dados em JSON
        const data = await response.json();
        // Retornar os dados
        return data;

    } catch (error) {
        // Caso ocorra um erro, exibir mensagem no console
        console.log('Não foi possível carregar a lista de produtos:', error);
    }

}

const createProduct = async (name,price,image) =>{
    try {
        const response = await fetch(base_url,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
            },
            // Enviando os dados do produto para a API em formato JSON
            body: JSON.stringify({name,price,image}),
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(`Não foi possível criar o novo produto: ${error}`)
    }
};

const deleteProduct = async (id) =>{
    try {
        const response = await fetch(`${base_url}/${id}`,{
            method: 'DELETE',
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(`Não foi possível deletar o produto: ${error}`)
    }
};

// Exportando a função para ser utilizada em outros arquivos
export const serviceProducts = { productsList, createProduct, deleteProduct};