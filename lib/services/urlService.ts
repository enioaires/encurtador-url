import clientPromise from '../mongodb'
import { UrlDocument, generateShortId, isValidUrl } from '../models/url'

const DB_NAME = 'encurtador-url'
const COLLECTION_NAME = 'urls'

export class UrlService {
  static async createShortUrl(originalUrl: string, clientIp: string): Promise<{ shortId: string; shortUrl: string } | null> {
    if (!isValidUrl(originalUrl)) {
      throw new Error('URL inválida')
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection<UrlDocument>(COLLECTION_NAME)

    // Tentar gerar ID único (máximo 5 tentativas)
    let shortId: string
    let attempts = 0
    const maxAttempts = 5

    do {
      shortId = generateShortId()
      const existing = await collection.findOne({ shortId })
      
      if (!existing) {
        break
      }
      
      attempts++
      if (attempts >= maxAttempts) {
        // Fallback: usar ID mais longo
        shortId = generateShortId() + generateShortId().substring(0, 2)
        break
      }
    } while (attempts < maxAttempts)

    const urlDoc: UrlDocument = {
      shortId,
      originalUrl,
      createdAt: new Date(),
      clicks: 0,
      createdBy: clientIp
    }

    await collection.insertOne(urlDoc)

    return {
      shortId,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${shortId}`
    }
  }

  static async getOriginalUrl(shortId: string): Promise<string | null> {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection<UrlDocument>(COLLECTION_NAME)

    const urlDoc = await collection.findOne({ shortId })
    
    if (!urlDoc) {
      return null
    }

    // Incrementar contador de clicks
    await collection.updateOne(
      { shortId },
      { $inc: { clicks: 1 } }
    )

    return urlDoc.originalUrl
  }

  static async getUrlStats(shortId: string): Promise<UrlDocument | null> {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection<UrlDocument>(COLLECTION_NAME)

    return await collection.findOne({ shortId })
  }
}