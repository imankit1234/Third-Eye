import { ProductInfo } from './types'

export async function analyzeImage(imageData: string): Promise<ProductInfo> {
  const base64Data = imageData.split(',')[1]
  
  const response = await fetch('https://www.nyckel.com/v1/functions/clf_QXNzaWdubWVudDo3MDg5NTc/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NYCKEL_API_KEY}`
    },
    body: JSON.stringify({
      data: base64Data
    })
  })

  if (!response.ok) {
    throw new Error('Failed to analyze image')
  }

  const result = await response.json()
  
  // Mock prices and links since we don't have real e-commerce API integration yet
  return {
    name: result.labelName,
    confidence: result.confidence,
    price: {
      amazon: Math.floor(Math.random() * 3000) + 2000,
      meesho: Math.floor(Math.random() * 2500) + 1800,
      myntra: Math.floor(Math.random() * 2800) + 1900
    },
    links: {
      amazon: `https://amazon.in/s?k=${encodeURIComponent(result.labelName)}`,
      meesho: `https://meesho.com/search?q=${encodeURIComponent(result.labelName)}`,
      myntra: `https://myntra.com/${encodeURIComponent(result.labelName)}`
    }
  }
} 