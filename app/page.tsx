'use client'

import React, { useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { PhotoIcon } from '@heroicons/react/24/outline'
import ScreenCapture from '@/components/ScreenCapture'
import ProductResults from '@/components/ProductResults'
import TrendingProducts from '@/components/TrendingProducts'
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations'
import FriendsActivity from '@/components/FriendsActivity'
import InstagramAuth from '@/components/InstagramAuth'
import ErrorBoundary from '@/components/ErrorBoundary'
import Loading from '@/components/Loading'
import { analyzeImage } from '@/lib/api'
import { useStore } from '@/lib/store'
import { ProductInfo } from '@/lib/types'

export default function Home() {
  const [analyzing, setAnalyzing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<ProductInfo | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setImage, setProduct } = useStore()

  const handleImageCapture = async (imageData: string) => {
    try {
      setAnalyzing(true)
      setImage(imageData)
      const result = await analyzeImage(imageData)
      setProduct(result)
      setCurrentProduct(result)
    } catch (error) {
      console.error('Error analyzing image:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setAnalyzing(true)
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result as string
        setImage(base64String)
        const result = await analyzeImage(base64String)
        setProduct(result)
        setCurrentProduct(result)
        setAnalyzing(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading file:', error)
      setAnalyzing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Third Eye</h1>
          <InstagramAuth />
        </div>

        <ErrorBoundary>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ScreenCapture onCapture={handleImageCapture} />
              
              <div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 px-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <PhotoIcon className="w-6 h-6" />
                  <span>Upload Image</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>

              {analyzing ? (
                <Loading message="Analyzing image..." size="medium" />
              ) : currentProduct ? (
                <ProductResults product={currentProduct} />
              ) : null}
            </div>

            <div className="space-y-6">
              <TrendingProducts />
              <PersonalizedRecommendations />
              <FriendsActivity />
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </main>
  )
} 