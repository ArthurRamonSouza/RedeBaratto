'use client';
import Link from "next/link"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu
} from "@/components/ui/dropdown-menu"
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table"
import {JSX, SVGProps, useEffect, useState} from "react"
import {http} from "@/app/cliente/components/compras";

const pedidosData = JSON.parse(localStorage.getItem('data'));

async function removerProduto(idCompra, idProduto) {
    const response = await http.delete(`carrinho/deletar/${idCompra}/${idProduto}`);
}

export default function Component() {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(`carrinho/listar/${pedidosData['carrinho'].idCompra}`);
                setItens(response.data);
            } catch (error) {
                console.error('Erro ao obter as compras:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link className="flex items-center gap-2 font-semibold" href="#">
                            <Package2Icon className="h-6 w-6"/>
                            <span className="">Rede Baratto</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="/cliente"
                            >
                                <UserIcon className="h-4 w-4"/>
                                Profile
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                href="#"
                            >
                                <PackageIcon className="h-4 w-4"/>
                                Orders
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header
                    className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link className="lg:hidden" href="#">
                        <Package2Icon className="h-6 w-6"/>
                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg">Carrinho</h1>
                    </div>
                    <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <form className="ml-auto flex-1 sm:flex-initial">
                            <div className="relative">
                                <SearchIcon
                                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                <Input
                                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                                    placeholder="Search orders..."
                                    type="search"
                                />
                            </div>
                        </form>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full" size="icon" variant="ghost">
                                    <img
                                        alt="Avatar"
                                        className="rounded-full"
                                        height="32"
                                        src="/placeholder.svg"
                                        style={{
                                            aspectRatio: "32/32",
                                            objectFit: "cover",
                                        }}
                                        width="32"
                                    />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem><a href={'/login'}
                                                     onClick={() => {localStorage.clear();}}>Logout
                                </a></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="border shadow-sm rounded-lg p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="hidden sm:table-cell">Situação</TableHead>
                                    <TableHead className="hidden sm:table-cell">Remover</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {itens.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.idProduto}</TableCell>
                                        <TableCell className="text-right">{pedidosData['carrinho'].dia + '/' + pedidosData['carrinho'].mes + '/' + pedidosData['carrinho'].ano}</TableCell>
                                        <TableCell className="text-right">{item.quantidade}</TableCell>
                                        <TableCell className="hidden md:table-cell">{pedidosData['carrinho'].status? 'pago' : 'não pago'}</TableCell>
                                        <Button size="sm" variant="outline" className="mt-[10px]" onClick={() => removerProduto(item.idCompra, item.idProduto)}>
                                            Remover
                                        </Button>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
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


function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="m7.5 4.27 9 5.15"/>
            <path
                d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
            <path d="m3.3 7 8.7 5 8.7-5"/>
            <path d="M12 22V12"/>
        </svg>
    )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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