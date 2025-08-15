"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-destructive">
              Página não encontrada
            </CardTitle>
            <CardDescription>
              A página que você está procurando não existe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <h1 className="text-6xl font-bold text-muted-foreground/50">404</h1>
              <p className="text-sm text-muted-foreground">
                Verifique se o endereço foi digitado corretamente
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
              <Button
                onClick={() => window.history.back()}
                variant="outline"
              >
                Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}