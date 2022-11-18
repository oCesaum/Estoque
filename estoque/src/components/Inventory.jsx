import { useEffect } from 'react'
import { useState } from 'react'
import '../App.css'

const estoqueInicial = [
  {
    categoria: "Bebidas",
    produtos: [
      {nome: "Cerveja", valor: 7.00},
      {nome: "Refrigerante", valor: 4.50},
      {nome: "Cachaça", valor: 0.50},
      {nome: "Energético", valor: 1.50},
      {nome: "Gin", valor: 5.50},
      {nome: "Licor", valor: 4.50},
      {nome: "Rum", valor: 5},
      {nome: "Saquê", valor: 3},
      {nome: "Tequila", valor: 7},
      {nome: "Vinho", valor: 15},
    ]
  },
  {
    categoria: "Limpeza",
    produtos: [
      {nome: "Sabão", valor: 2.45},
      {nome: "Álcool", valor: 3},
      {nome: "Detergente", valor: 4},
      {nome: "Limpa-vidros", valor: 8},
      {nome: "Desinfetante", valor: 7},
      {nome: "Limpa pisos de madeira", valor: 6},
      {nome: "Luvas de borracha", valor: 9},
    ]
  },
  {
    categoria: "Alimentos",
    produtos: [
      {nome: "Arroz", valor: 8.00},
      {nome: "Feijão", valor: 6.00},
      {nome: "Maçã", valor: 3.00},
      {nome: "Abacate", valor: 4.00},
      {nome: "Banana", valor: 2.00},
      {nome: "Mirtilo", valor: 6.00},
      {nome: "Laranja", valor: 3.00},
      {nome: "Morango", valor: 6.00},
      {nome: "Ovos", valor: 12.00},
    ]
  },
]

export default function Inventory() {
  const [estoque, setEstoque] = useState(estoqueInicial)
  const [categoriasQuantidade, setCategoriasQuantidade] = useState(0)
  const [produtosQuantidade, setProdutosQuantidade] = useState(0)
  const [ativo, setAtivo ] = useState(false)
  const [categoriaNome, setCategoriaNome ] = useState("")

  let produtos = []
  let categorias = []

  // function verificarAtivo() {
  //   setAtivo(!ativo)
  //   if (ativo === false) {
  //     return "hiden"
  //   }
  // }

  useEffect(() => {
    for (const item of estoque) {
      categorias.push(item.categoria)
      for (const produto of item.produtos) {
        produtos.push(produto.nome)
      }
    }
    setProdutosQuantidade(produtos.length)
    setCategoriasQuantidade(categorias.length)
  }, [categorias, produtos, estoque])

  function adicionarProduto(item) {
    var produtoNome =  prompt(`Digite um novo produto para ${item.categoria}:`)
    var produtoValor = parseFloat(prompt(`Digite um valor para ${produtoNome}:`))

    const novoEstoque =  [...estoque] ; 
    const x = novoEstoque.indexOf(item)

    if (produtoNome && produtoValor && !produtos.includes(produtoNome)) {
      novoEstoque[x].produtos.push({nome: produtoNome, valor: produtoValor}) 
    }
    setEstoque(novoEstoque)
  }

  function mudarCategoriaNome(e) {
    setCategoriaNome(e.target.value)
  }

  function limparValor() {
    setCategoriaNome("")
  }

  function verificarTecla(e) {
    if (e.keyCode === 13) {
      adicionarCategoria()
    }
    if (e.keyCode === 27) {
      setAtivo(false)
      limparValor()
    }
  }

  function adicionarCategoria() {
    const novoEstoque =  [...estoque] ; 

    if (categoriaNome && !categorias.includes(categoriaNome)) {
      novoEstoque.push(
        {
          categoria: categoriaNome,
          produtos: []
        },
      ) 
    }
    setEstoque(novoEstoque)
    setAtivo(false)
    limparValor()
  }

  return (
    <div>
      <p className='Inventory-counter-text'>Atualmente contamos com <span>{categoriasQuantidade}</span> categorias e <span>{produtosQuantidade}</span> produtos</p>
      <div className='Invetory-header'>
        <p 
          className='btn-category' 
          title='Adicionar categoria' 
          onClick={() => setAtivo(true)}
        >
          Adicionar categoria
        </p>

        <div className={ativo === true ? ("") : ("hiden")}>
          <div className='Inventory-category-creator'>
            <input 
              onChange={mudarCategoriaNome} 
              onKeyDown={verificarTecla}
              value={categoriaNome} 
              type="text" 
              className='Input-text' 
              placeholder='Digite uma nova categoria:'
              title="Digite uma nova categoria"
            />
            <input 
              onClick={adicionarCategoria} 
              type="submit" 
              className='Input-submit' 
              disabled={!categoriaNome}
              title="Adicionar categoria"
            />
          </div>
        </div>
      </div>

      {estoque.map(item => 
        <div key={item.categoria}>
          <div className='Inventory-category-container'>
            <h2 className='Inventory-category'>
              {item.categoria}
            </h2>
            <p className='btn-product' title='Adicionar produto' onClick={() => adicionarProduto(item)}>+</p>
          </div>

          <div className='Inventory-products'>
            {item.produtos.map(produto => 
            <div key={produto.nome} className='Inventory-products-product' title='Por enquanto também não faz nada :)'>
              <p>{produto.nome}</p>
              <p>R${produto.valor}</p>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}