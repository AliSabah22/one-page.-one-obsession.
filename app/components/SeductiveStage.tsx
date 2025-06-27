'use client'

import React, { useState, useEffect } from 'react'

interface Stage {
  id: string
  title: string
  prompt: string
  background: string
  textColor: string
  glowClass: string
  description: string
}

interface SeductiveStageProps {
  stage: Stage
  onComplete: () => void
  isLastStage: boolean
}

export default function SeductiveStage({ stage, onComplete, isLastStage }: SeductiveStageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    // Reset state when stage changes
    setIsHovered(false)
    setIsClicked(false)
    setShowPrompt(false)
    setShowTitle(false)
    setShowDescription(false)
    
    console.log('Stage changed to:', stage.id)
    
    if (isLastStage) {
      // Special timing for last stage
      const titleTimer = setTimeout(() => {
        setShowTitle(true)
      }, 1000)
      
      const descTimer = setTimeout(() => {
        setShowDescription(true)
      }, 3000)
      
      const promptTimer = setTimeout(() => {
        setShowPrompt(true)
        console.log('Last stage prompt shown')
      }, 6000)
      
      return () => {
        clearTimeout(titleTimer)
        clearTimeout(descTimer)
        clearTimeout(promptTimer)
      }
    } else {
      // Normal timing for other stages
      const titleTimer = setTimeout(() => {
        setShowTitle(true)
      }, 500)
      
      const descTimer = setTimeout(() => {
        setShowDescription(true)
      }, 1500)
      
      const promptTimer = setTimeout(() => {
        setShowPrompt(true)
        console.log('Prompt shown for stage:', stage.id)
      }, 3000)
      
      return () => {
        clearTimeout(titleTimer)
        clearTimeout(descTimer)
        clearTimeout(promptTimer)
      }
    }
  }, [stage.id, isLastStage])

  const handlePromptHover = () => {
    console.log('Prompt hovered, isLastStage:', isLastStage, 'isClicked:', isClicked)
    if (!isClicked) {
      setIsHovered(true)
    }
  }

  const handlePromptClick = () => {
    console.log('Prompt clicked, isLastStage:', isLastStage)
    setIsClicked(true)
    console.log('Starting transition...')
    setTimeout(() => {
      console.log('Calling onComplete for stage:', stage.id)
      onComplete()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center enhanced-red-room">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Title with enhanced tension animations */}
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 font-seductive ${stage.textColor} ${stage.glowClass} transition-all duration-1000 ${
          showTitle ? 'animate-seductive-reveal' : 'opacity-0 translate-y-8'
        }`}>
          {stage.title}
        </h1>

        {/* Description with enhanced tension and pull effects */}
        <div className="mb-12 max-w-3xl mx-auto">
          <p className={`text-lg md:text-xl transition-all duration-1000 leading-relaxed ${
            showDescription ? 'animate-tension-pull opacity-90' : 'opacity-0 translate-y-8'
          }`}>
            {stage.description}
          </p>
        </div>

        {/* Interactive Prompt with enhanced tension animations */}
        {!isLastStage && showPrompt && (
          <div
            className={`text-2xl md:text-3xl font-semibold ${stage.textColor} transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isClicked ? 'opacity-0 scale-50' : 'opacity-100'} ${stage.glowClass}`}
            style={{ 
              cursor: 'pointer',
              textShadow: isHovered ? '0 0 30px #dc2626, 0 0 50px #dc2626' : '0 0 15px #dc2626'
            }}
            onMouseEnter={handlePromptHover}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlePromptClick}
          >
            {stage.prompt}
          </div>
        )}

        {/* Last stage prompt - different styling */}
        {isLastStage && showPrompt && (
          <div
            className={`text-2xl md:text-3xl font-semibold ${stage.textColor} transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isClicked ? 'opacity-0 scale-50' : 'opacity-100'} ${stage.glowClass}`}
            style={{ 
              cursor: 'pointer',
              textShadow: isHovered ? '0 0 30px #dc2626, 0 0 50px #dc2626' : '0 0 15px #dc2626'
            }}
            onMouseEnter={handlePromptHover}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlePromptClick}
          >
            {stage.prompt}
          </div>
        )}
      </div>

      {/* Enhanced atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Reduced pulsing elements for better performance */}
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border border-seductive-red-500/20 rounded-full animate-pulse"
            style={{
              left: `${30 + i * 40}%`,
              top: `${40 + (i % 2) * 20}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  )
} 