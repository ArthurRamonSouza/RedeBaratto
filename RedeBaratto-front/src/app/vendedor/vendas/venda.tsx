'use client'
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card"
import React, {JSX, SVGProps, useState} from "react"
import {http} from "@/app/cliente/components/compras";
import {Input} from "@/components/ui/input";

export default function Component() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')));
    const [carrinho, setCarrinho] = useState(data ? data.carrinho : {});
    const [pedidos, setPedidos] = useState(data ? data.pedidos : []);
    const [user, setUser] = useState(data ? data.user : {});
    const [seller, setSeller] = useState(data ? data.seller : {});
    const [compras, setCompras] = useState(data ? data.compras : []);
    const [metodoPagamento, setMetodoPagamento] = useState('BERRIES');

    let valorTotal = 0;
    let valorDescontado = 0;

    for (let i = 0; i < pedidos.length; i++) {
        valorTotal += pedidos[i].preco;
    }

    if (user.flamengo) {
        valorDescontado += valorTotal * 0.1; // Desconto de 10% para flamengo
    }

    if (user.onePieceFan) {
        valorDescontado += valorTotal * 0.1; // Desconto de 10% para onePieceFan
    }

    if (user.sousense) {
        valorDescontado += valorTotal * 0.1; // Desconto de 10% para sousense
    }

    function logout() {
        setData({
            'carrinho': {},
            'user': {},
            'seller': {},
            'compras': [],
            'pedidos': [],
        });

        localStorage.setItem('data', JSON.stringify(data));
        window.location.href = "/login";
    }

    async function finalizarCompra() {
        const date = new Date();
        let produtosUnicos = {};

        const compraNova = {
            "cpfCliente": user.cpf,
            "cpfVendedor": seller.cpfVendedor,
            'dia': date.getDate(),
            'mes': date.getMonth() + 1,
            'ano': date.getFullYear(),
            "metodoPagamento": metodoPagamento,
            "status": true,
            "valorTotal": valorTotal - valorDescontado,
        };
        await http.post(`compra/cadastrar`, compraNova);

        const r = await http.get(`compra/listar/${user.cpf}`);
        const compras = r.data;
        const compra = compras[compras.length -1].idCompra;
        console.log(compra);

        pedidos.forEach(pedido => {
            const { idProduto, nome, preco, categoria, fabricadoMari } = pedido;
            if (produtosUnicos[idProduto]) {
                produtosUnicos[idProduto].qtd++;
            } else {
                produtosUnicos[idProduto] = { idProduto, nome, preco, categoria, fabricadoMari, qtd: 1 };
            }
        });

        for (const idProduto in produtosUnicos) {
            const qtdP = produtosUnicos[idProduto].qtd;
            const pedido = {compra, idProduto, qtdP};
            console.log(pedido);

            try {
                await http.post(`carrinho/cadastrar`, pedido);
            } catch (error) {
                console.error(`Erro ao cadastrar o pedido ${pedido}:`, error);
            }
        }

        setData({
            'carrinho': carrinho,
            'user': user,
            'seller': seller,
            'compras': compras,
            'pedidos': [],
        });
        localStorage.setItem('data', JSON.stringify(data));
        console.log(data);
    }

    return (
        <div className="flex flex-col w-full min-h-screen">
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
                    <Package2Icon className="w-6 h-6"/>
                    <span>Rede Baratto</span>
                </Link>
                <nav className="flex items-center gap-5 text-sm md:ml-auto md:gap-2 lg:gap-5">
                    <Link className="font-bold" href="#">
                        Orders
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-400" href="vendedor/estoque">
                        Products
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-400" href="vendedor/relatorio">
                        Analytics
                    </Link>
                </nav>
                <Button className="rounded-full ml-auto md:ml-4" size="icon" variant="ghost" onClick={() => logout()}>
                    <UserIcon className="w-6 h-6"/>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </header>
            <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-10">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-lg font-semibold">Approve Sales</CardTitle>
                    </CardHeader>
                    {pedidos.length > 0 ?
                        <CardContent>
                            <div className="grid-cols-2 gap-4">
                                <div className="flex flex-row items-start justify-start gap-2 mb-5">
                                    <div className="flex flex-row items-start justify-start gap-2 ml-4">
                                        <div className="flex flex-col items-start justify-center">
                                            <span className="font-semibold">Costumer: {user.cpf}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-center">
                                        <span className="font-semibold">Value: ${valorTotal}</span>
                                        <span className="text-xs">{pedidos.length} items</span>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <span className="font-semibold">Discount: ${valorDescontado}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input className="w-[200px]" placeholder="Type the payment method" type="text"
                                               value={metodoPagamento}
                                               onChange={(event) => setMetodoPagamento(event.target.value)}/>
                                    </div>
                                    <div className="flex flex-col items-end justify-center">
                                        <Button size={"sm"} onClick={finalizarCompra}>Approve</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent> :
                        <CardContent>
                        </CardContent>
                    }
                </Card>
            </main>
        </div>
    )
}

function Package2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
            <path d="M12 3v6"/>
        </svg>
    )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}