'use client';
import React, {useState} from 'react';
import {CardTitle, CardDescription, CardHeader, CardContent, Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:8080/cliente'
});

interface FormDataValues {
    cpf: string;
    senha: string;
    cliente: boolean;
    vendedor: boolean;
}

export default function Login() {
    const [permissao, setPermissao] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(event.currentTarget);
        const data: FormDataValues = {
            cpf: formData.get('cpf') as string,
            senha: formData.get('password') as string,
            cliente: formData.has('client') as boolean,
            vendedor: formData.has('seller') as boolean,
        };

        try {
            //Check if password matches
            let response;
            let userData;

            switch (permissao) {
                case 'cliente':
                    response = await http.get(`${data.cpf}`);
                    userData = response.data;

                    if (userData && userData.senha === data.senha) {
                        console.log('Login successful!');
                        window.location.href = '/pedidos';
                    } else {
                        console.log('Incorrect password!');
                    }
                    break;
                case 'vendedor':
                    response = await axios.get(`http://localhost:8080/vendedor/${data.cpf}`);
                    userData = response.data;

                    if (userData && userData.senha === data.senha) {
                        console.log('Login successful!');
                        window.location.href = '/relatorios';
                    } else {
                        console.log('Incorrect password!');
                    }
                    break;
                default:
                    console.log('Invalid permission!');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center space-y-4 h-screen justify-center">
                <Card className="p-6 w-full max-w-sm mx-auto shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Login</CardTitle>
                        <CardDescription>Digite seu CPF e senha para entrar na sua conta</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cpf">CPF</Label>
                                <Input name='cpf' id="cpf" placeholder="123.456.789-00" required type="text"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input name='password' id="password" placeholder="Digite sua senha" required
                                       type="password"/>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox name='client' id="client" onClick={() => setPermissao('cliente')}/>
                                <Label htmlFor="client">Sou cliente</Label>
                                <Checkbox name='seller' id="seller" onClick={() => setPermissao('vendedor')}/>
                                <Label htmlFor="seller">Sou vendedor</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button className="w-full">Entrar</Button>
                                <Button className="w-full" variant="outline"
                                        onClick={() => window.location.href = "/cadastro"}>Cadastrar</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
