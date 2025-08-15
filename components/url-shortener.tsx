'use client'

import { useState } from 'react'
import { toast } from 'sonner'
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-2">
          <Link className="h-5 w-5" />
          Encurtar URL
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Cole sua URL longa abaixo para gerar um link curto
        </p>
      </div>

      {!shortUrl ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="url"
              placeholder="https://exemplo.com/sua-url-muito-longa"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Encurtando...
              </>
            ) : (
              'Encurtar URL'
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-600 dark:text-green-400">
              URL encurtada com sucesso!
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                URL Original:
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 break-all bg-gray-50 dark:bg-gray-800 p-2 rounded mt-1">
                {url}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                URL Encurtada:
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-1">
                  Copiado para a área de transferência!
                </p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={resetForm}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Nova URL
            </button>
            <button 
              onClick={() => window.open(shortUrl, '_blank')}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              Testar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}