'use client'
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {
    DropdownMenuTrigger,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
    DropdownMenuContent,
    DropdownMenu,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {http, Compra} from "@/app/cliente/components/compras";
import {useEffect, useState} from "react";
import {Package2Icon} from "lucide-react";

export default function Produtos() {
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState(0.0);
    const [maxPrice, setMaxPrice] = useState(0.0);
    const [produtos, setProdutos] = useState([]);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')));
    const [carrinho, setCarrinho] = useState(data ? data.carrinho : {});
    const [pedidos, setPedidos] = useState(data ? data.pedidos : []);
    const [user, setUser] = useState(data ? data.user : {});
    const [compras, setCompras] = useState(data ? data.compras : []);

    async function buscarPorCategoria(categoria) {
        if (categoria === 'tudo') {
            const response = await http.get(`produto/listar`);
            setProdutos(response.data);

        } else {
            const response = await http.get(`produto/categoria/${categoria.toUpperCase()}`);
            setProdutos(response.data);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await http.get(`produto/listar`);
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao obter os produtos:', error);
            }
        };
        fetchData();
    }, []);

    function handleMinPriceChange(valor) {
        setMinPrice(parseFloat(valor));
    }

    function handleMaxPriceChange(valor) {
        setMaxPrice(parseFloat(valor));
    }

    async function handleSortByPrice() {
        if (maxPrice < minPrice) {
            const aux = minPrice;
            setMinPrice(maxPrice);
            setMaxPrice(aux);
        }

        try {
            const response = await http.get(`produto/preco/${minPrice}/${maxPrice}`);
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao obter os produtos:', error);
        }
    }

    const handleInputChange = async (event) => {
        setSearchQuery(event.target.value);

        if (event.target.value.length >= 3) {
            try {
                const response = await http.get(`produto/listar/${event.target.value}`);
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        } else {
            const response = await http.get(`produto/listar`);
            setProdutos(response.data);
        }
    };

    async function handleProductsMari() {
        try {
            const response = await http.get(`produto/mari`);
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao obter os produtos:', error);
        }
    }

    async function handleAddToCart(produto) {
        console.log(data);
        if (carrinho === 'null') {
            const date = new Date();
            const newCarrinho = {
                'idCompra': 0,
                'dia': date.getDate(),
                'mes': date.getMonth() + 1,
                'ano': date.getFullYear(),
                'metodoPagamento': 'BERRIES',
                'valorTotal': 0,
            };

            setCarrinho(newCarrinho);
            setData({
                'carrinho': newCarrinho,
                'user': user,
                'compras': compras,
                'pedidos': [],
            });

            localStorage.setItem('data', JSON.stringify(data));
        }

        const newPedidos = [...pedidos, produto];
        setPedidos(newPedidos);

        setData({
            'carrinho': carrinho,
            'user': user,
            'compras': compras,
            'pedidos': newPedidos,
        });

        localStorage.setItem('data', JSON.stringify(data));
        console.log(data.user.cpf)
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-950 py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                <div className="flex flex-col gap-6">
                    {data && user.cpf ? (
                        <Link className="flex items-center gap-2" href="/cliente">
                            <Package2Icon className="h-6 w-6"/>
                            <span className="font-semibold">Rede Baratto</span>
                        </Link>
                    ) : (
                        <Link className="flex items-center gap-2" href="/cliente/pedidos">
                            <Package2Icon className="h-6 w-6"/>
                            <span className="font-semibold">Rede Baratto</span>
                        </Link>
                    )}

                    <Button className="w-full" variant="outline">
                        {data && data.user.cpf ? (
                            <a href={'/login'} onClick={() => {
                                setData({
                                    'carrinho': carrinho,
                                    'user': {},
                                    'compras': [],
                                    'pedidos': pedidos,
                                    'seller': seller,
                                });

                                localStorage.setItem('data', JSON.stringify(data));
                            }}>Logout</a>
                                ) : (
                                <a href={'/login'}>Login</a>
                        )}
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full" variant="outline">
                                Sort by Price
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuRadioGroup value="low">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="minPrice">Min Price:</label>
                                    <input type="number" id="minPrice" value={minPrice}
                                           onChange={(event) => handleMinPriceChange(event.target.value)}/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="maxPrice">Max Price:</label>
                                    <input type="number" id="maxPrice" value={maxPrice}
                                           onChange={(event) => handleMaxPriceChange(event.target.value)}/>
                                </div>
                                <button className="w-full" onClick={handleSortByPrice}>Apply</button>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="w-full" variant="outline" onClick={handleProductsMari}>
                        Produtos Mari
                    </Button>
                    <div className="grid gap-2">
                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('tudo')}
                        >
                            Tudo
                        </Button>
                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('computador')}
                        >
                            Computador
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('notebook')}
                        >
                            Notebook
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('monitor')}
                        >
                            Monitor
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('processador')}
                        >
                            Processador
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('memoria')}
                        >
                            Memória
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('placa de video')}
                        >
                            Placa de Vídeo
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('armazenamento')}
                        >
                            Armazenamento
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('gabinete')}
                        >
                            Gabinete
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('fonte')}
                        >
                            Fonte
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('mouse')}
                        >
                            Mouse
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('teclado')}
                        >
                            Teclado
                        </Button>

                        <Button
                            className="justify-start gap-2"
                            size="sm"
                            variant="ghost"
                            onClick={() => buscarPorCategoria('diversos')}
                        >
                            Diversos
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="mb-8 md:mb-12">
                        <form>
                            <div className="relative">
                                <SearchIcon
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400"/>
                                <Input
                                    className="w-full rounded-md border border-gray-200 bg-white px-12 py-3 text-sm shadow-sm transition-colors focus:border-gray-400 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
                                    placeholder="Search products..."
                                    type="search"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {produtos.map((produto, index) => (
                            <div key={index}
                                 className="rounded-lg bg-white shadow-sm transition-transform hover:-translate-y-1 dark:bg-gray-900">
                                <Link href="#" className="block" onClick={() => handleAddToCart(produto)}>
                                    <img
                                        alt="Product Image"
                                        className="h-40 w-full rounded-t-lg object-cover"
                                        src="data:image/jpeg;base64,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"
                                        style={{aspectRatio: "300/300", objectFit: "cover"}}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold">{produto.nome}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Preço:
                                            R${produto.preco}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Categoria: {produto.categoria}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{produto.fabricadoMari ? 'Fabricado em Mari' : 'Fabricado na China'}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Quantidade: {produto.qtdProduto}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
)
}

function ArrowUpDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21 16-4 4-4-4"/>
            <path d="M17 20V4"/>
            <path d="m3 8 4-4 4 4"/>
            <path d="M7 4v16"/>
        </svg>
    )
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
        </svg>
    )
}