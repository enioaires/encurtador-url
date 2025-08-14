import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { UrlService } from '../../../../lib/services/urlService'

const app = new Hono().basePath('/api')

app.get('/stats/:shortId', async (c) => {
  try {
    const shortId = c.req.param('shortId')

    if (!shortId) {
      return c.json({ error: 'shortId é obrigatório' }, 400)
    }

    const stats = await UrlService.getUrlStats(shortId)

    if (!stats) {
      return c.json({ error: 'URL não encontrada' }, 404)
    }

    return c.json({
      success: true,
      data: {
        shortId: stats.shortId,
        originalUrl: stats.originalUrl,
        clicks: stats.clicks,
        createdAt: stats.createdAt,
        createdBy: stats.createdBy
      }
    })

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return c.json({ 
      error: 'Erro interno do servidor' 
    }, 500)
  }
})

export const GET = handle(app)