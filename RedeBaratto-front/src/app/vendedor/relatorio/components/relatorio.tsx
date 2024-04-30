'use client'
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table"
import {JSX, SVGProps, useEffect, useState} from "react"
import {http} from "@/app/cliente/components/compras";
import React from "react"
import {Package2Icon} from "lucide-react";

export default function Component() {
    const [cpf, setCpf] = useState('');
    const [relatorios, setRelatorios] = useState([]);
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')));
    const [carrinho, setCarrinho] = useState(data ? data.carrinho : {});
    const [pedidos, setPedidos] = useState(data ? data.pedidos : []);
    const [user, setUser] = useState(data ? data.user : {});
    const [seller, setSeller] = useState(data ? data.seller : {});
    const [compras, setCompras] = useState(data ? data.compras : []);

    useEffect(() => {
        const getVendas = async () => {
            try {
                const response = await http.get(`compra/vendedor/${user.cpfVendedor}`);
                setCompras(response.data);
            } catch (error) {
                console.error('Erro ao obter as compras:', error);
            }
        };
        getVendas();
    }, []); // Chama apenas uma vez após a montagem do componente

    const buscarComprasPorCpf = async () => {
        const fetchData = async () => {
            console.log(seller.cpfVendedor)
            try {
                let response;
                if (mes.length > 0 && mes.length < 3 && ano.length > 3 && ano.length < 5) {
                    response = await http.get(`vendedor/relatorio/${seller.cpfVendedor}/${ano}/${mes}`);
                } else {
                    response = await http.get(`vendedor/relatorios/${seller.cpfVendedor}`);
                }
                setRelatorios(response.data);
            } catch (error) {
                console.error('Erro ao obter os relatórios:', error);
            }
        };

        fetchData();
    };

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

    return (
        <div className="flex flex-col w-full min-h-screen">
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
                    <Package2Icon className="w-6 h-6"/>
                    <span>Rede Baratto</span>
                </Link>
                <nav className="flex items-center gap-5 text-sm md:ml-auto md:gap-2 lg:gap-5">
                    <Link className="text-gray-500 dark:text-gray-400" href="/vendedor">
                        Orders
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-400" href="estoque">
                        Products
                    </Link>
                    <Link className="font-bold" href="#">
                        Analytics
                    </Link>
                </nav>
                <Button className="rounded-full ml-auto md:ml-4" size="icon" variant="ghost" onClick={() => logout()}>
                    <UserIcon className="w-6 h-6"/>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </header>
            <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Analytics</h1>
                    <div className="flex items-center gap-2">
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>View Reports</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Input className="w-[200px]" placeholder="Select Month" type="text"
                                           value={mes}
                                           onChange={(event) => setMes(event.target.value)}/>
                                    <Input className="w-[200px]" placeholder="Select Year" type="text"
                                           value={ano}
                                           onChange={(event) => setAno(event.target.value)}/>
                                </div>
                                <Button size="sm" onClick={() => buscarComprasPorCpf()}>Search</Button>
                            </div>
                            <div className="mt-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Revenue</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            {relatorios.map((relatorio, index) => (
                                                <React.Fragment key={index}>
                                                    <TableCell>{`${relatorio.mes}/${relatorio.ano}`}</TableCell>
                                                    <TableCell>{relatorio.valorVendido}</TableCell>
                                                </React.Fragment>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Sales</CardTitle>
                                <div className="flex items-center gap-2">
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                            </div>
                            <div className="mt-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Costumer</TableHead>
                                            <TableHead>Sale</TableHead>
                                            <TableHead>Payment Method</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Value</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {compras.map((compra, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{compra.cpfCliente}</TableCell>
                                                <TableCell>{compra.idCompra}</TableCell>
                                                <TableCell>{compra.metodoPagamento}</TableCell>
                                                <TableCell>{`${compra.dia}/${compra.mes}/${compra.ano}`}</TableCell>
                                                <TableCell>{compra.valorTotal}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
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