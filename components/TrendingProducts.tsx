'use client'

import React from 'react'
import { FireIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { useStore } from '@/lib/store'
import { ProductInfo } from '@/lib/types'

interface TrendingProduct extends ProductInfo {
  searchCount: number
}

export default function TrendingProducts() {
  const { recentScans } = useStore()

  const getTrendingProducts = (scans: ProductInfo[]): TrendingProduct[] => {
    if (scans.length === 0) return []

    // Group similar products and count occurrences
    const productCounts = new Map<string, { count: number; product: ProductInfo }>()
    
    scans.forEach(product => {
      const key = product.name.toLowerCase()
      const existing = productCounts.get(key)
      
      if (existing) {
        existing.count++
      } else {
        productCounts.set(key, { count: 1, product })
      }
    })

    // Sort by count and get top 5
    return Array.from(productCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(({ product, count }) => ({
        ...product,
        searchCount: count
      }))
  }

  const trendingProducts = getTrendingProducts(recentScans)

  if (trendingProducts.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <FireIcon className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-semibold">Trending Products</h2>
      </div>

      <div className="space-y-4">
        {trendingProducts.map((product, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <ChartBarIcon className="w-4 h-4" />
                  <span>{product.searchCount} searches</span>
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