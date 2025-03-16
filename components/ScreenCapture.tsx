'use client'

import React, { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import { CameraIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

interface ScreenCaptureProps {
  onCapture: (image: string) => void
}

export default function ScreenCapture({ onCapture }: ScreenCaptureProps) {
  const [isSelecting, setIsSelecting] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
  const selectionRef = useRef<HTMLDivElement>(null)

  const handleStartSelection = useCallback((e: React.MouseEvent) => {
    setIsSelecting(true)
    setStartPos({ x: e.clientX, y: e.clientY })
    setCurrentPos({ x: e.clientX, y: e.clientY })
  }, [])

  const handleSelectionMove = useCallback((e: React.MouseEvent) => {
    if (isSelecting) {
      setCurrentPos({ x: e.clientX, y: e.clientY })
    }
  }, [isSelecting])

  const handleSelectionEnd = useCallback(async () => {
    if (!isSelecting) return

    setIsSelecting(false)
    
    try {
      if (selectionRef.current) {
        const canvas = await html2canvas(selectionRef.current)
        const image = canvas.toDataURL('image/png')
        onCapture(image)
        toast.success('Area captured successfully!')
      }
    } catch (error) {
      console.error('Screen capture failed:', error)
      toast.error('Failed to capture screen area')
    }
  }, [isSelecting, onCapture])

  const getSelectionStyle = () => {
    const left = Math.min(startPos.x, currentPos.x)
    const top = Math.min(startPos.y, currentPos.y)
    const width = Math.abs(currentPos.x - startPos.x)
    const height = Math.abs(currentPos.y - startPos.y)

    return {
      left,
      top,
      width,
      height,
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsSelecting(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <CameraIcon className="w-5 h-5" />
        Capture Screen Area
      </button>

      {isSelecting && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 cursor-crosshair"
          onMouseDown={handleStartSelection}
          onMouseMove={handleSelectionMove}
          onMouseUp={handleSelectionEnd}
        >
          <div
            ref={selectionRef}
            className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20"
            style={getSelectionStyle()}
          />
        </div>
      )}
    </div>
  )
} 