'use client'
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {SelectValue, SelectTrigger, SelectItem, SelectContent, Select} from "@/components/ui/select"
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table"
import {JSX, SVGProps, useEffect, useState} from "react"
import {http} from "@/app/cliente/components/compras";
import React from "react"

export default function Component() {
    const [cpf, setCpf] = useState('');
    const [relatorios, setRelatorios] = useState([]);
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');

    const handleMonthChange = (value) => {
        setMes(value);
    };

    const handleYearChange = (value) => {
        setAno(value);
    };

    const buscarComprasPorCpf = async () => {
        console.log('CPF digitado:', cpf);
        console.log('Mês selecionado:', mes);
        console.log('Ano selecionado:', ano);

        const fetchData = async () => {
            try {
                let response;
                if (mes.length > 0 && mes.length < 3 && ano.length > 3 && ano.length < 5) {
                    response = await http.get(`vendedor/relatorio/${cpf}/${ano}/${mes}`);
                } else {
                    response = await http.get(`vendedor/relatorios/${cpf}`);
                }
                setRelatorios(response.data);
            } catch (error) {
                console.error('Erro ao obter os relatórios:', error);
            }
        };

        fetchData();
    };


    return (
        <div className="flex flex-col w-full min-h-screen">
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
                    <span>Rede Baratto</span>
                </Link>
                <nav className="flex items-center gap-5 text-sm md:ml-auto md:gap-2 lg:gap-5">
                    <Link className="text-gray-500 dark:text-gray-400" href="#">
                        Orders
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-400" href="#">
                        Products
                    </Link>
                    <Link className="font-bold" href="#">
                        Analytics
                    </Link>
                </nav>
                <Button className="rounded-full ml-auto md:ml-4" size="icon" variant="ghost">
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
                                <CardTitle>View Sales</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Input className="w-[200px]" placeholder="Enter Costumer CPF" type="text"
                                           value={cpf}
                                           onChange={(event) => setCpf(event.target.value)}/>
                                </div>
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