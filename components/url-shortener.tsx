'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Copy, Link, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function UrlShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError('Por favor, insira uma URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Por favor, insira uma URL válida')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao encurtar URL')
      }

      const responseData = await response.json()
      console.log('Response data:', responseData) // Debug log

      // A API retorna os dados dentro de um objeto 'data'
      const data = responseData.data || responseData

      // A API já retorna a shortUrl completa
      const newShortUrl = data.shortUrl || data.shortId || data.url

      if (newShortUrl) {
        setShortUrl(newShortUrl)
        toast.success('URL encurtada com sucesso!')
      } else {
        console.error('Short URL not found in response:', responseData)
        throw new Error('URL encurtada não foi retornada pela API')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao encurtar URL. Tente novamente.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      toast.success('URL copiada para a área de transferência!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
      toast.error('Erro ao copiar URL')
    }
  }

  const resetForm = () => {
    setUrl('')
    setShortUrl('')
    setError('')
    setCopied(false)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Link className="h-5 w-5" />
          Encurtar URL
        </CardTitle>
        <CardDescription>
          Cole sua URL longa abaixo para gerar um link curto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!shortUrl ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="https://exemplo.com/sua-url-muito-longa"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !url.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Encurtando...
                </>
              ) : (
                'Encurtar URL'
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                URL encurtada com sucesso!
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">
                  URL Original:
                </Label>
                <p className="text-sm text-muted-foreground break-all bg-muted p-2 rounded mt-1">
                  {url}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">
                  URL Encurtada:
                </Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    value={shortUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 mt-1">
                    Copiado para a área de transferência!
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={resetForm}
              variant="outline"
              className="w-full"
            >
              Nova URL
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}