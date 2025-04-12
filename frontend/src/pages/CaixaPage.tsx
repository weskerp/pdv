import { useState, useEffect, useRef, useCallback } from 'react';

export default function CaixaPage() {
  type Produto = {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
  };

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const ultimaPaginaCarregada = useRef<number>(0);

  const carregarProdutos = useCallback(() => {
    if (loading || !hasMore || filtro.trim() != '' || page === ultimaPaginaCarregada.current) return;

    setLoading(true);
    ultimaPaginaCarregada.current = page;
    fetch(`http://localhost:3001/api/produtos?page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        setProdutos(prev => [...prev, ...data.produtos]);
        setHasMore(data.hasMore);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hasMore, loading, filtro, page]);

  useEffect(() => {
    if (filtro.length === 0) {
      carregarProdutos();
    }
  }, [page, carregarProdutos]);

  useEffect(() => {
    if (filtro.length > 0){

    setLoading(true);
    fetch(`http://localhost:3001/api/produtos?search=${filtro}`)
      .then(res => res.json())
      .then(data => {
        setProdutos(data.produtos);
        setHasMore(false);
        setLoading(false);
      });
    } else {
          setProdutos([]);
          setPage(1);
          setHasMore(true);
        }
  }, [filtro]);

  const lastProdutoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || filtro.trim() !== '') return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prev => {
              const novaPagina = prev + 1;
              return novaPagina;
            });
          }
        },
        {
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);

    },
    [loading, hasMore, filtro]
  );

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => [...prev, produto]);
  };

  const finalizarVenda = () => {
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    fetch('http://localhost:3001/api/vendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itens: carrinho, total })
    }).then(() => {
      alert('Venda finalizada!');
      setCarrinho([]);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Caixa</h1>
      <div className="grid grid-cols-[70vw_25vw] gap-4">
        <div>
          <h2 className="font-semibold mb-2">Produtos</h2>
          <input
            type="text"
            placeholder="Buscar produto..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-4"
          />
          <div className="max-h-[55vh] overflow-y-scroll">
            {produtos.map((p, i) => {
              const isLast = i === produtos.length - 1;
              return (
                <div
                  key={p.id}
                  ref={isLast && !filtro ? lastProdutoRef : null}
                  className="border p-2 mb-2"
                >
                  <p>{p.id} - {p.nome} - R${p.preco.toFixed(2)}</p>
                  <button className="bg-green-500 text-white px-2" onClick={() => adicionarAoCarrinho(p)}>
                    Adicionar
                  </button>
                </div>
              );
            })}
            {loading && <p className="text-gray-500 text-sm mt-2">Carregando...</p>}
            {!hasMore && !filtro && (
              <p className="text-center text-sm text-gray-500">Todos os produtos carregados.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Carrinho</h2>
          {carrinho.map((item, index) => (
            <p key={index}>{item.nome} - R${item.preco.toFixed(2)}</p>
          ))}
          <p className="mt-2 font-bold">Total: R${carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2)}</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2" onClick={finalizarVenda}>
            Finalizar Venda
          </button>
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-blue-600 h-[10vh] fixed bottom-0 left-0 shadow-md border-t">
        <h2 className="text-center text-white pt-4">FOOTER</h2>
      </div>
    </div>
  );
}
