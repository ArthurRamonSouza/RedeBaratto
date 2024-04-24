import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function Login() {
    return (
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
                    <Input id="cpf" placeholder="123.456.789-00" required type="text" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" placeholder="Digite sua senha" required type="password" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="client" />
                    <Label htmlFor="client">Sou cliente</Label>
                    <Checkbox id="seller" />
                    <Label htmlFor="seller">Sou vendedor</Label>
                </div>
                <div className="flex gap-2">
                    <Button className="w-full">Entrar</Button>
                    <Button className="w-full" variant="outline">
                    Cadastrar
                    </Button>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
        
      )
}