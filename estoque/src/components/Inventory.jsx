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
  const [ativoCategoria, setAtivoCategoria ] = useState(false)
  const [ativoProduto, setAtivoProduto ] = useState(false)
  const [categoriaNome, setCategoriaNome ] = useState("")
  const [produtoNome, setProdutoNome ] = useState("")
  const [produtoValor, setProdutoValor ] = useState("")
  const [produtoIndex, setProdutoIndex ] = useState()

  let produtos = []
  let categorias = []

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

  function mudarCategoriaNome(e) {
    setCategoriaNome(e.target.value)
  }

  function mudarProdutoNome(e) {
    setProdutoNome(e.target.value)
  }

  function mudarProdutoValor(e) {
    setProdutoValor(parseFloat(e.target.value))
  }

  function fecharJanela() {
    setAtivoCategoria(false)
    setAtivoProduto(false)
    limparValor()
  }

  function limparValor() {
    setCategoriaNome("")
    setProdutoNome("")
    setProdutoValor("")
  }

  function verificarTecla(e) {
    if (e.keyCode === 13) {
      if (categoriaNome) {
        adicionarCategoria()
      }
      if (produtoNome && produtoValor) {
        adicionarProduto()
      }
    }
    if (e.keyCode === 27) {
      fecharJanela()
    }
  }

  function abrirModal(item) {
    fecharJanela()
    setAtivoProduto(true)
    setProdutoIndex(estoque.indexOf(item))
  }

  function adicionarProduto() {
    const novoEstoque =  [...estoque] ;

    if (produtoNome && produtoValor && !produtos.includes(produtoNome)) {
      novoEstoque[produtoIndex].produtos.push({nome: produtoNome, valor: produtoValor}) 
    }
    setEstoque(novoEstoque)
    fecharJanela()
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
    fecharJanela()
  }

  return (
    <div>
      <p className='Inventory-counter-text'>Atualmente contamos com <span>{categoriasQuantidade}</span> categorias e <span>{produtosQuantidade}</span> produtos</p>
      <div className='Invetory-header'>
        <button 
          className='btn-category' 
          title='Adicionar categoria' 
          onClick={() => setAtivoCategoria(true)}
          disabled={ativoProduto === true}
        >
          Adicionar categoria
        </button>

        <div className={ativoCategoria === true ? ("") : ("hiden")}>
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
              className='Input-submit-category' 
              disabled={!categoriaNome}
              title="Adicionar categoria"
            />
            <button onClick={fecharJanela} className='btn-close'>X</button>
          </div>
        </div>
      </div>

      {estoque.map(item => 
          <div key={item.categoria}>
          <div className='Inventory-category-container'>
            <h2 className='Inventory-category'>
              {item.categoria}
            </h2>
            <button 
              className='btn-product' 
              title='Adicionar produto' 
              onClick={() => abrirModal(item)}
              disabled={ativoCategoria === true}
            >
              +
            </button>
            <div className={ativoProduto === true ? ("") : ("hiden")}>
              <div className='Inventory-product-creator'>
                <div className='Inventory-product-creator-input'>
                  <input 
                    onChange={mudarProdutoNome} 
                    onKeyDown={verificarTecla}
                    value={produtoNome} 
                    type="text" 
                    className='Input-text' 
                    placeholder='Digite um novo produto:'
                    title="Digite um novo produto"
                  />
                  <input 
                    onChange={mudarProdutoValor} 
                    onKeyDown={verificarTecla}
                    value={produtoValor} 
                    type="number" 
                    className='Input-text' 
                    placeholder='Digite um valor para o produto:'
                    title="Digite um valor para o produto"
                  />
                </div>
                <input 
                  onClick={adicionarProduto} 
                  type="submit" 
                  className='Input-submit-product' 
                  disabled={!produtoValor}
                  title="Adicionar produto"
                />
                <button onClick={fecharJanela} className='btn-close'>X</button>
              </div>
            </div>
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