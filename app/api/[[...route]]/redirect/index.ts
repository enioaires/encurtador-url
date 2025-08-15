import { UrlService } from '@/lib/services/urlService'
import { Hono } from 'hono'

const app = new Hono().get('/:shortId', async (c) => {
  try {
    const shortId = c.req.param('shortId')

    if (!shortId) {
      return c.json({ error: 'shortId é obrigatório' }, 400)
    }

    const originalUrl = await UrlService.getOriginalUrl(shortId)

    if (!originalUrl) {
      return c.json({ error: 'URL não encontrada' }, 404)
    }

    // Retornar a URL para redirecionamento no frontend
    return c.json({
      success: true,
      data: {
        originalUrl,
        redirect: true
      }
    })

  } catch (error) {
    console.error('Erro ao buscar URL:', error)
    return c.json({ 
      error: 'Erro interno do servidor' 
    }, 500)
  }
})

export default app