'use client'

import React from 'react'

interface LoadingProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

export default function Loading({ message = 'Loading...', size = 'medium' }: LoadingProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  const containerClasses = {
    small: 'min-h-[100px]',
    medium: 'min-h-[200px]',
    large: 'min-h-[300px]'
  }

  return (
    <div className={`flex items-center justify-center ${containerClasses[size]}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-purple-500 ${sizeClasses[size]} mx-auto`} />
        {message && (
          <p className="mt-4 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  )
} 