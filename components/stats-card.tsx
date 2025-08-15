'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Link, Clock, Shield } from 'lucide-react'

interface StatsCardProps {
  totalUrls?: number
  totalClicks?: number
}

export function StatsCard({ totalUrls = 0, totalClicks = 0 }: StatsCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Estatísticas
        </CardTitle>
        <CardDescription>
          Resumo da atividade do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">{totalUrls}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">URLs Criadas</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">{totalClicks}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total de Clicks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function FeaturesCard() {
  const features = [
    {
      icon: <Link className="h-4 w-4" />,
      title: "Encurtamento Rápido",
      description: "URLs encurtadas em segundos"
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Seguro",
      description: "Validação de URLs maliciosas"
    },
    {
      icon: <Clock className="h-4 w-4" />,
      title: "Sem Expiração",
      description: "Links funcionam indefinidamente"
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Estatísticas",
      description: "Acompanhe o desempenho"
    }
  ]

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Recursos</CardTitle>
        <CardDescription>
          O que nosso encurtador oferece
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded">
                {feature.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {feature.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}