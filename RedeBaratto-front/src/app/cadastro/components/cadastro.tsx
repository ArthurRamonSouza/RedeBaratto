'use client';
import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormDataValues {
    prim_nome: string;
    ult_nome: string;
    cpf_cliente: string;
    senha: string;
    is_flamengo: boolean;
    one_piece_fan: boolean;
    sousense: boolean;
}

const initialFormData: FormDataValues = {
    prim_nome: '',
    ult_nome: '',
    cpf_cliente: '',
    senha: '',
    is_flamengo: false,
    one_piece_fan: false,
    sousense: false
};

export default function Cadastro() {
	const [formData, setFormData] = useState<FormDataValues>(initialFormData);
	
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evita o comportamento padrão de envio de formulário

        const formData = new FormData(event.currentTarget);
        const data: FormDataValues = {
            prim_nome: formData.get('firstName') as string,
            ult_nome: formData.get('lastName') as string,
            cpf_cliente: formData.get('cpf') as string,
            senha: formData.get('password') as string,
            is_flamengo: formData.has('flamengoFan') as boolean,
            one_piece_fan: formData.has('onePieceFan') as boolean,
            sousense: formData.has('sousaParaiba') as boolean
        };

        console.log(JSON.stringify(data, null, 2));

		
    };

    return (
        <div className="flex flex-col items-center space-y-4 h-screen justify-center">
            <form onSubmit={handleSubmit}>
                <Card className="mx-auto max-w-sm space-y-6 shadow-lg">
                    <CardHeader className="space-y-2 text-center">
                        <CardTitle className="text-3xl font-bold">Cadastrar</CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-400">Insira suas informações para criar a conta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">Primeiro nome</Label>
                                <Input name="firstName" id="first-name" placeholder="Arthur" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Último nome</Label>
                                <Input name="lastName" id="last-name" placeholder="Ramón" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input name="cpf" id="cpf" placeholder="123.456.789-00" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input name="password" id="password" required type="password" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="flamengo-fan" name="flamengoFan" />
                                <Label htmlFor="flamengo-fan">Sou mengão</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="one-piece-fan" name="onePieceFan" />
                                <Label htmlFor="one-piece-fan">Sou fã de One Piece</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="sousa-paraiba" name="sousaParaiba" />
                                <Label htmlFor="sousa-paraiba">Sou sousense</Label>
                            </div>
                        </div>
                        <Button className="w-full" type="submit">
                            Cadastrar
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}