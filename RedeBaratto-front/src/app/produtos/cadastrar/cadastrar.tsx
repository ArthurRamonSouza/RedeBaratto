'use client'
import {Button} from "@/components/ui/button";
import React, {useEffect} from "react";
import {http} from "@/app/login/components/login";

export default function Component() {
    useEffect(() => {
        console.log('Componente montado');
    }, []);

    async function cadastrarProduto(event) {
        event.preventDefault();
        const produto = {
            'nome': document.getElementById('name').value,
            'preco': document.getElementById('price').value,
            'categoria': document.getElementById('category').value,
            'fab_Mari': document.getElementById('origin').value,
            'qtd_produto': document.getElementById('quantity').value,
        }
        await http.post(`/produto/cadastrar`, produto);
        window.location.href = "/vendedor/estoque";
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add New Product</h1>
                <form className="space-y-4" onSubmit={cadastrarProduto}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                            Product Name
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            id="name"
                            placeholder="Enter product name"
                            type="text" required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="price">
                            Price
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            id="price"
                            placeholder="Enter product price"
                            type="number" required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                               htmlFor="category">
                            Category
                        </label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            id="category" required
                        >
                            <option value="">Select category</option>
                            <option value="COMPUTADOR">Computador</option>
                            <option value="NOTEBOOK">Notebook</option>
                            <option value="MONITOR">Monitor</option>
                            <option value="PROCESSADOR">Processador</option>
                            <option value="MEMÓRIA">Memória</option>
                            <option value="PLACA DE VÍDEO">Placa de Vídeo</option>
                            <option value="ARMAZENAMENTO">Armazenamento</option>
                            <option value="GABINETE">Gabinete</option>
                            <option value="FONTE">Fonte</option>
                            <option value="MOUSE">Mouse</option>
                            <option value="TECLADO">Teclado</option>
                            <option value="DIVERSOS">Diversos</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="origin">
                            Made in
                        </label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            id="origin" required
                        >
                            <option value="">Select country</option>
                            <option value="true">Mari</option>
                            <option value="false">China</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                               htmlFor="quantity" required>
                            Quantity
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            id="quantity"
                            placeholder="Enter product quantity"
                            type="number"
                            required
                        />
                    </div>
                    <div>
                        <Button className="w-full mt-2" size="sm" type="submit">Save Product</Button>
                    </div>
                </form>
                <Button className="w-full mt-2" size="sm"
                        onClick={() => window.location.href = "/vendedor/estoque"}>Back</Button>
            </div>
        </div>
    )
}