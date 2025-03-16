'use client'

import React from 'react'
import { ShoppingCartIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { ProductInfo } from '@/lib/types'

interface ProductResultsProps {
  product: ProductInfo
}

type Platform = keyof ProductInfo['price']

export default function ProductResults({ product }: ProductResultsProps) {
  const bestPrice = Math.min(
    ...[
      product.price.amazon || Infinity,
      product.price.meesho || Infinity,
      product.price.myntra || Infinity
    ]
  )

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <span className="text-sm text-gray-500">
          {(product.confidence * 100).toFixed(1)}% match
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(product.price).map(([platform, price]) => {
          if (!price) return null
          const isBestPrice = price === bestPrice

          return (
            <div
              key={platform}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isBestPrice ? 'bg-green-50 border border-green-100' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCartIcon className={`w-5 h-5 ${isBestPrice ? 'text-green-500' : 'text-gray-400'}`} />
                <div>
                  <div className="font-medium capitalize">{platform}</div>
                  {isBestPrice && (
                    <div className="text-xs text-green-600">Best Price</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold">₹{price.toLocaleString()}</span>
                <a
                  href={product.links[platform as Platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 