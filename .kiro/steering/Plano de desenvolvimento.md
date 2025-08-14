# Plano de Projeto - Encurtador de URL

## 📋 Visão Geral

**Objetivo**: Criar um encurtador de URL simples para aprendizado, com funcionalidades básicas de encurtamento e redirecionamento.

**Conceito**:

- Input: URL longa → Output: URL curta (`encurtador.com/abc123`)
- Redirecionamento: URL curta → URL original
- Armazenamento: Banco NoSQL (MongoDB)

## 🎯 Funcionalidades Core

### MVP - Versão 1.0

- [ ] **Encurtamento de URL**
    
    - Input de URL longa
    - Geração de ID único aleatório (6-8 caracteres)
    - Validação básica de URL
    - Retorno da URL encurtada
- [ ] **Redirecionamento**
    
    - Busca por ID no banco
    - Redirect 301 para URL original
    - Tratamento de URLs não encontradas (404)
- [ ] **Proteções Básicas**
    
    - Rate limiting (ex: 10 URLs/minuto por IP)
    - Captcha simples
    - Validação de URL maliciosa básica

## 🛠 Stack Tecnológica

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI**: Componentes simples + shadcn/ui
- **Deploy**: Vercel

### Backend

- **API**: Hono.js (integrada no Next.js)
- **Banco**: MongoDB Atlas (free tier)
- **Validação**: Zod 4
- **Rate Limiting**: upstash-ratelimit ou memory-based

### Infrastructure

- **Deploy**: Vercel (Serverless Functions)
- **Domínio**: Personalizado ou subdomínio Vercel
- **Monitoramento**: Vercel Analytics

## 📊 Estrutura do Banco de Dados

### Collection: `urls`

```javascript
{
  _id: ObjectId,
  shortId: "abc123",        // ID único gerado
  originalUrl: "https://...", // URL original
  createdAt: Date,
  clicks: 0,               // contador simples
  createdBy: "ip_address"  // tracking básico
}
```

### Índices

- `shortId`: único + index para busca rápida
- `createdAt`: para limpeza/analytics futuras

## 🏗 Arquitetura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes     │    │    MongoDB      │
│   (Next.js)     │◄──►│   (Hono.js)      │◄──►│    Atlas        │
│                 │    │                  │    │                 │
│ - Form Input    │    │ - POST /shorten  │    │ - urls collection│
│ - URL Display   │    │ - GET /[id]      │    │ - Indexes       │
│ - Rate Limit UI │    │ - Validation     │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📝 Roadmap de Desenvolvimento

### Fase 1: Setup & Core (Semana 1)

- [x] Setup projeto Next.js + Hono
- [ ] Configurar MongoDB Atlas
- [ ] Criar schema e conexão DB
- [ ] Implementar geração de ID único
- [ ] API básica de encurtamento
- [ ] Teste manual das APIs

### Fase 2: Frontend & UX (Semana 2)

- [ ] Interface simples de encurtamento
- [ ] Página de redirecionamento
- [ ] Validação frontend
- [ ] Loading states e feedback
- [ ] Design responsivo básico

### Fase 3: Proteções (Semana 3)

- [ ] Rate limiting por IP
- [ ] Captcha básico
- [ ] Validação anti-spam
- [ ] Página 404 customizada
- [ ] Error handling robusto

### Fase 4: Deploy & Refinamentos (Semana 4)

- [ ] Deploy na Vercel
- [ ] Configurar domínio personalizado
- [ ] Testes em produção
- [ ] Documentação básica
- [ ] Analytics simples (opcional)

## 🔧 Algoritmo de Geração de ID

### Estratégia Escolhida: Base62 + Random

```javascript
function generateShortId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

### Tratamento de Colisões

- Tentar novamente até 5 vezes se ID já existir
- Fallback: incrementar length para 7-8 caracteres

## 📊 Métricas de Sucesso

### Técnicas

- [ ] Tempo de resposta < 200ms para redirect
- [ ] Uptime > 99%
- [ ] Zero collisions de ID em 1000 URLs

### Funcionais

- [ ] URL encurta corretamente
- [ ] Redirecionamento funciona
- [ ] Rate limiting efetivo
- [ ] Interface intuitiva

## 🚀 Melhorias Futuras (V2+)

### Analytics

- [ ] Contador de clicks
- [ ] Gráficos de acesso
- [ ] Geolocalização básica

### Features

- [ ] URLs customizadas
- [ ] Expiração de links
- [ ] QR Code generation
- [ ] API pública

### Performance

- [ ] Cache Redis
- [ ] CDN para assets
- [ ] Compressão de responses

## 📚 Aprendizados Esperados

- **NoSQL**: Modelagem simples, operações CRUD
- **Rate Limiting**: Estratégias de proteção
- **Serverless**: Deploy e limitações
- **Performance**: Otimização de queries simples
- **UX**: Feedback e estados de carregamento
- **Validação**: Sanitização e segurança básica

## ⚠️ Limitações Assumidas

- Não é production-ready para escala
- Sem autenticação/contas de usuário
- Analytics muito básicas
- Sem backup strategy elaborada
- Rate limiting simples (não distribuído)

---

**Status**: 📋 Planejamento **Início Previsto**: [Data] **MVP Target**: [Data + 4 semanas]

# References
[[Codando um encurtador de URL na prática]]