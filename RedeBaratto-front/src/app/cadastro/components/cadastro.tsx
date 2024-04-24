'use client'
import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormDataValues {
    firstName: string;
    lastName: string;
    cpf: string;
    password: string;
    flamengoFan: boolean;
    onePieceFan: boolean;
    sousaParaiba: boolean;
}

const initialFormData: FormDataValues = {
    firstName: '',
    lastName: '',
    cpf: '',
    password: '',
    flamengoFan: false,
    onePieceFan: false,
    sousaParaiba: false
};

export default function Cadastro() {
    const [formData, setFormData] = useState<FormDataValues>(initialFormData);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: FormDataValues = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            cpf: formData.get('cpf') as string,
            password: formData.get('password') as string,
            flamengoFan: formData.has('flamengoFan') as boolean,
            onePieceFan: formData.has('onePieceFan') as boolean,
            sousaParaiba: formData.has('sousaParaiba') as boolean
        };

        console.log(data);

        // Reset form fields to initial state after submission
        setFormData(initialFormData);
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
                                <Input name="firstName" id="first-name" placeholder="Arthur" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Último nome</Label>
                                <Input name="lastName" id="last-name" placeholder="Ramón" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input name="cpf" id="cpf" placeholder="123.456.789-00" required value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input name="password" id="password" required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="flamengo-fan" name="flamengoFan" />
                                <Label htmlFor="flamengo-fan">Sou mengão</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="one-piece-fan" name="onePieceFan" checked={formData.onePieceFan} onChange={(e) => setFormData({...formData, onePieceFan: (e.target as HTMLInputElement).checked})} />
                                <Label htmlFor="one-piece-fan">Sou fã de One Piece</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="sousa-paraiba" name="sousaParaiba" checked={formData.sousaParaiba} onChange={(e) => setFormData({...formData, sousaParaiba: (e.target as HTMLInputElement).checked})} />
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
