import { ProductInfo } from './types'

export async function analyzeImage(imageData: string): Promise<ProductInfo> {
  try {
    // Validate image size
    const base64Data = imageData.split(',')[1]
    const sizeInBytes = Buffer.from(base64Data, 'base64').length
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (sizeInBytes > maxSize) {
      throw new Error('Image size exceeds 5MB limit')
    }

    const apiKey = process.env.NEXT_PUBLIC_NYCKEL_API_KEY
    if (!apiKey) {
      throw new Error('Nyckel API key is not configured')
    }

    const response = await fetch('https://www.nyckel.com/v1/functions/clf_QXNzaWdubWVudDo3MDg5NTc/invoke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        data: base64Data
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(`API Error: ${errorData?.message || response.statusText}`)
    }

    const result = await response.json()
    
    // Mock prices and links since we don't have real e-commerce API integration yet
    return {
      name: result.labelName || 'Unknown Product',
      confidence: result.confidence || 0,
      price: {
        amazon: Math.floor(Math.random() * 3000) + 2000,
        meesho: Math.floor(Math.random() * 2500) + 1800,
        myntra: Math.floor(Math.random() * 2800) + 1900
      },
      links: {
        amazon: `https://amazon.in/s?k=${encodeURIComponent(result.labelName || '')}`,
        meesho: `https://meesho.com/search?q=${encodeURIComponent(result.labelName || '')}`,
        myntra: `https://myntra.com/${encodeURIComponent(result.labelName || '')}`
      }
    }
  } catch (error) {
    console.error('Error in analyzeImage:', error)
    throw error
  }
} 