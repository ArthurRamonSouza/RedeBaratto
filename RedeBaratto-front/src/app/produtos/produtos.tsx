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
import {http} from "@/app/cliente/components/compras";
import {useEffect, useState} from "react";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);

    async function buscarPorCategoria(categoria) {
        if (categoria === 'tudo'){
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

    const [minPrice, setMinPrice] = useState(0.0);
    const [maxPrice, setMaxPrice] = useState(0.0);

    function handleMinPriceChange(valor) {
        setMinPrice(parseFloat(valor));
    }

    function handleMaxPriceChange(valor) {
        setMaxPrice(parseFloat(valor));
    }

    async function handleSortByPrice() {
        if(maxPrice < minPrice){
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

    const [searchQuery, setSearchQuery] = useState('');

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

    return (
        <div className="bg-gray-100 dark:bg-gray-950 py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                <div className="flex flex-col gap-6">
                    <Link className="flex items-center gap-2" href="#">
                        <span className="font-semibold">Rede Baratto</span>
                    </Link>
                    <Button className="w-full" variant="outline">
                        {localStorage.getItem('data') ?
                            <a href={'/login'} onClick={() => localStorage.clear()}>Logout</a> :
                            <a href={'/login'}>Login</a>}
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
                                    <input type="number" id="minPrice" value={minPrice} onChange={(event) => handleMinPriceChange(event.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="maxPrice">Max Price:</label>
                                    <input type="number" id="maxPrice" value={maxPrice} onChange={(event) => handleMaxPriceChange(event.target.value)} />
                                </div>
                                <button className="w-full" onClick={handleSortByPrice}>Apply</button>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                                <Link href="#" className="block">
                                    <img
                                        alt="Product Image"
                                        className="h-40 w-full rounded-t-lg object-cover"
                                        src="/placeholder.svg"
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