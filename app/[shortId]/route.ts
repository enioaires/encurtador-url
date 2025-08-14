import { NextRequest, NextResponse } from 'next/server'
import { UrlService } from '../../lib/services/urlService'

export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } }
) {
  try {
    const { shortId } = params

    if (!shortId) {
      return NextResponse.redirect(new URL('/404', request.url))
    }

    const originalUrl = await UrlService.getOriginalUrl(shortId)

    if (!originalUrl) {
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Redirect 301 (permanente) para a URL original
    return NextResponse.redirect(originalUrl, { status: 301 })

  } catch (error) {
    console.error('Erro ao redirecionar:', error)
    return NextResponse.redirect(new URL('/500', request.url))
  }
}