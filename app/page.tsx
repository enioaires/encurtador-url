'use client'

import { Link } from 'lucide-react'
import { UrlShortener } from '@/components/url-shortener'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-600 rounded-full">
              <Link className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Encurtador de URL
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Transforme URLs longas em links curtos e fáceis de compartilhar
          </p>
        </div>

        {/* Main Form */}
        <UrlShortener />
      </div>
    </div>
  )
}
