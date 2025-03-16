'use client'

import React from 'react'
import { SparklesIcon, TagIcon } from '@heroicons/react/24/outline'
import { useStore } from '@/lib/store'
import { ProductInfo } from '@/lib/types'

export default function PersonalizedRecommendations() {
  const { recentScans } = useStore()

  // Function to extract categories and preferences from user's search history
  const analyzeUserPreferences = (scans: ProductInfo[]) => {
    const categories = new Map<string, number>()
    const priceRanges = new Map<string, number>()

    scans.forEach(product => {
      // Increment category count
      categories.set(product.name.split(' ')[0], 
        (categories.get(product.name.split(' ')[0]) || 0) + 1)

      // Analyze price preferences
      const avgPrice = Object.values(product.price).reduce((a, b) => (a || 0) + (b || 0), 0) / 
        Object.values(product.price).filter(p => p).length
      
      const range = avgPrice < 1000 ? 'budget' : 
        avgPrice < 5000 ? 'mid-range' : 'premium'
      priceRanges.set(range, (priceRanges.get(range) || 0) + 1)
    })

    return {
      topCategories: Array.from(categories.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([category]) => category),
      preferredPriceRange: Array.from(priceRanges.entries())
        .sort((a, b) => b[1] - a[1])[0]?.[0]
    }
  }

  const getRecommendations = (scans: ProductInfo[]) => {
    if (scans.length === 0) return []

    const { topCategories, preferredPriceRange } = analyzeUserPreferences(scans)
    
    // Mock recommendations based on user preferences
    // In a real app, this would call an API with the preferences
    return topCategories.map(category => ({
      name: `${category} Premium`,
      confidence: 0.95,
      price: {
        amazon: Math.floor(Math.random() * 3000) + 2000,
        meesho: Math.floor(Math.random() * 2500) + 1800,
        myntra: Math.floor(Math.random() * 2800) + 1900
      },
      links: {
        amazon: `https://amazon.in/s?k=${category}`,
        meesho: `https://meesho.com/search?q=${category}`,
        myntra: `https://myntra.com/${category}`
      }
    }))
  }

  const recommendations = getRecommendations(recentScans)

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <SparklesIcon className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-semibold">Recommended for You</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {recommendations.map((product, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <TagIcon className="w-4 h-4" />
                  <span>Best Match</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Best Price</div>
                <div className="text-green-600 font-semibold">
                  ₹{Math.min(
                    ...[
                      product.price.amazon || Infinity,
                      product.price.meesho || Infinity,
                      product.price.myntra || Infinity
                    ]
                  ).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              {Object.entries(product.links).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 