'use client';
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:8080/cliente'
});

interface FormDataValues {
    primeiroNome: string;
    ultimoNome: string;
    cpf: string;
    senha: string;
    flamengo: boolean;
    onePieceFan: boolean;
    sousense: boolean;
}

export default function EditarCliente() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(event.currentTarget);
        const data: FormDataValues = {
            primeiroNome: formData.get('firstName') as string,
            ultimoNome: formData.get('lastName') as string,
            cpf: formData.get('cpf') as string,
            senha: formData.get('password') as string,
            flamengo: formData.has('flamengoFan') as boolean,
            onePieceFan: formData.has('onePieceFan') as boolean,
            sousense: formData.has('sousaParaiba') as boolean
        };

        await http.put(`atualizar/${data.cpf}`, data);
        window.location.href = '/cliente/pedidos';
    };

    return (
        <div className="flex flex-col items-center space-y-4 h-screen justify-center">
            <form onSubmit={handleSubmit}>
                <Card className="mx-auto max-w-sm space-y-6 shadow-lg">
                    <CardHeader className="space-y-2 text-center">
                        <CardTitle className="text-3xl font-bold">Editar</CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-400">Insira suas informações para
                            atualizar a conta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">Primeiro nome</Label>
                                <Input name="firstName" id="first-name" placeholder="Arthur" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Último nome</Label>
                                <Input name="lastName" id="last-name" placeholder="Ramón" required/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input name="cpf" id="cpf" placeholder="123.456.789-00" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input name="password" id="password" required type="password"/>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="flamengo-fan" name="flamengoFan"/>
                                <Label htmlFor="flamengo-fan">Sou mengão</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="one-piece-fan" name="onePieceFan"/>
                                <Label htmlFor="one-piece-fan">Sou fã de One Piece</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="sousa-paraiba" name="sousaParaiba"/>
                                <Label htmlFor="sousa-paraiba">Sou sousense</Label>
                            </div>
                        </div>
                        <Button className="w-full" type="submit">Editar</Button>
                        <Button className="w-full" onClick={() => window.location.href = "/cliente/pedidos"}>Voltar</Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}