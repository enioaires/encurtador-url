'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ExternalLink, AlertCircle, Home } from 'lucide-react'

export default function RedirectPage() {
    const params = useParams()
    const shortId = params.shortId as string
    const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
    const [originalUrl, setOriginalUrl] = useState<string>('')

    useEffect(() => {
        async function redirect() {
            try {
                const response = await fetch(`/api/redirect/${shortId}`)
                const data = await response.json()

                if (data.success && data.data.originalUrl) {
                    setOriginalUrl(data.data.originalUrl)
                    setStatus('redirecting')
                    // Redirecionar após um breve delay
                    setTimeout(() => {
                        window.location.href = data.data.originalUrl
                    }, 2000)
                } else {
                    setStatus('error')
                }
            } catch (error) {
                console.error('Erro ao redirecionar:', error)
                setStatus('error')
            }
        }

        if (shortId) {
            redirect()
        }
    }, [shortId])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {status === 'loading' && (
                    <Card className="shadow-lg">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                                <div>
                                    <h2 className="text-lg font-semibold">Verificando URL</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Aguarde um momento...
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {status === 'redirecting' && (
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit">
                                <ExternalLink className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <CardTitle className="text-green-600 dark:text-green-400">
                                Redirecionando...
                            </CardTitle>
                            <CardDescription>
                                Você será redirecionado em instantes
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <ExternalLink className="h-4 w-4" />
                                <AlertDescription>
                                    <span className="font-medium">Destino:</span>
                                    <br />
                                    <span className="text-sm break-all">{originalUrl}</span>
                                </AlertDescription>
                            </Alert>
                            
                            <div className="flex space-x-2">
                                <Button 
                                    onClick={() => window.location.href = originalUrl}
                                    className="flex-1"
                                    size="sm"
                                >
                                    Ir Agora
                                </Button>
                                <Button 
                                    onClick={() => window.location.href = '/'}
                                    variant="outline"
                                    size="sm"
                                >
                                    <Home className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {status === 'error' && (
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
                                <AlertCircle className="h-6 w-6 text-destructive" />
                            </div>
                            <CardTitle className="text-destructive">
                                URL não encontrada
                            </CardTitle>
                            <CardDescription>
                                O link que você está tentando acessar não existe ou expirou
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    <strong>Erro 404:</strong> A URL curta "{shortId}" não foi encontrada em nosso sistema.
                                </AlertDescription>
                            </Alert>
                            
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Possíveis causas:
                                </p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                    <li>Link digitado incorretamente</li>
                                    <li>Link expirado ou removido</li>
                                    <li>Erro temporário do sistema</li>
                                </ul>
                            </div>
                            
                            <Button 
                                onClick={() => window.location.href = '/'}
                                className="w-full"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Voltar ao Início
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}