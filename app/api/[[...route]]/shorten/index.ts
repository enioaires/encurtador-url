import { UrlService } from '@/lib/services/urlService'
import { Hono } from 'hono'

const app = new Hono().post('/', async (c) => {
  try {
    const body = await c.req.json()
    const { url } = body

    if (!url) {
      return c.json({ error: 'URL é obrigatória' }, 400)
    }

    // Pegar IP do cliente
    const clientIp = c.req.header('x-forwarded-for') || 
                     c.req.header('x-real-ip') || 
                     'unknown'

    const result = await UrlService.createShortUrl(url, clientIp)

    if (!result) {
      return c.json({ error: 'Erro ao criar URL curta' }, 500)
    }

    return c.json({
      success: true,
      data: {
        originalUrl: url,
        shortId: result.shortId,
        shortUrl: result.shortUrl
      }
    })

  } catch (error) {
    console.error('Erro ao encurtar URL:', error)
    return c.json({ 
      error: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }, 500)
  }
})

export default app