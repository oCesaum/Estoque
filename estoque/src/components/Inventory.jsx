import { useState } from 'react'
import '../App.css'

const estoqueInicial = [
  {
    categoria: "Bebidas",
    produtos: [
      {nome: "Cerveja", valor: 7.00},
      {nome: "Refrigerante", valor: 4.50},
    ]
  },
  {
    categoria: "Limpeza",
    produtos: [
      {nome: "Sabão", valor: 2.45},
    ]
  },
  {
    categoria: "Alimentos",
    produtos: [
      {nome: "Arroz", valor: 8.00},
      {nome: "Feijão", valor: 6.00},
    ]
  },
]

export default function Inventory() {
  const [estoque, setEstoque] = useState(estoqueInicial)

  function adicionarProduto(item) {
    var produtoNome =  prompt(`Digite um novo produto para ${item.categoria}:`)
    var produtoValor = parseFloat(prompt(`Digite um valor para ${produtoNome}:`))

    const novoEstoque =  [...estoque] ; 
    const x = novoEstoque.indexOf(item)
    const produtoNomes = []

    for (const produto of novoEstoque[x].produtos) {
      produtoNomes.push(produto.nome)
    }
    if (produtoNome && produtoValor && !produtoNomes.includes(produtoNome)) {
      novoEstoque[x].produtos.push({nome: produtoNome, valor: produtoValor}) 
    }
    setEstoque(novoEstoque)
  }

  function adicionarCategoria() {
    var categoriaNome =  prompt(`Digite uma nova categoria:`)

    const novoEstoque =  [...estoque] ; 
    const x = novoEstoque.length
    const categoriaNomes = []

    for (const item of novoEstoque) {
        categoriaNomes.push(item.categoria)
    }
    if (categoriaNome && !categoriaNomes.includes(categoriaNome)) {
      novoEstoque.push(
        {
          categoria: categoriaNome,
          produtos: []
        },
      ) 
    }
    setEstoque(novoEstoque)
  }

  return (
    <div>
      <p 
        className='btn' 
        title='Adicionar categoria' 
        onClick={adicionarCategoria}
      >
        Adicionar categoria
      </p>

      {estoque.map(item => 
        <div key={item.categoria}>
          <div className='Inventory-category-container'>
            <h2 className='Inventory-category'>
              {item.categoria}
            </h2>
            <p className='btn' title='Adicionar produto' onClick={() => adicionarProduto(item)}>+</p>
          </div>

          <div className='Inventory-products'>
            {item.produtos.map(produto => 
            <p key={produto.nome} className='Inventory-product'>
              {produto.nome} R${produto.valor}
            </p>)}
          </div>
        </div>
      )}
    </div>
  )
}