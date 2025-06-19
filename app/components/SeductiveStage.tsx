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
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Reset state when stage changes
    setIsHovered(false)
    setIsClicked(false)
    setShowForm(false)
    setShowPrompt(false)
    
    console.log('Stage changed to:', stage.id)
    
    // Show prompt after a delay for dramatic effect
    const timer = setTimeout(() => {
      setShowPrompt(true)
      console.log('Prompt shown for stage:', stage.id)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [stage.id])

  const handlePromptHover = () => {
    console.log('Prompt hovered, isLastStage:', isLastStage, 'isClicked:', isClicked)
    if (!isClicked && !isLastStage) {
      setIsHovered(true)
    }
  }

  const handlePromptClick = () => {
    console.log('Prompt clicked, isLastStage:', isLastStage)
    if (isLastStage) {
      setShowForm(true)
    } else {
      setIsClicked(true)
      console.log('Starting transition to next stage...')
      setTimeout(() => {
        console.log('Calling onComplete for stage:', stage.id)
        onComplete()
      }, 1000)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setIsSubmitted(true)
      console.log('Name submitted:', name)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center enhanced-red-room">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Title with enhanced glow */}
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 font-seductive ${stage.textColor} ${stage.glowClass} transition-all duration-1000 animate-seductive-pulse`}>
          {stage.title}
        </h1>

        {/* Description with enhanced styling */}
        <div className="mb-12 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl transition-all duration-1000 opacity-90 leading-relaxed">
            {stage.description}
          </p>
        </div>

        {/* Interactive Prompt with enhanced animations */}
        {!showForm && !isSubmitted && showPrompt && (
          <div
            className={`text-2xl md:text-3xl font-semibold ${stage.textColor} transition-all duration-700 heartbeat ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isClicked ? 'opacity-0 scale-50' : 'opacity-100'} ${stage.glowClass}`}
            style={{ 
              cursor: isLastStage ? 'pointer' : 'default',
              textShadow: isHovered ? '0 0 20px #dc2626, 0 0 30px #dc2626' : '0 0 10px #dc2626'
            }}
            onMouseEnter={handlePromptHover}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlePromptClick}
          >
            {stage.prompt}
          </div>
        )}

        {/* Form with enhanced styling */}
        {showForm && !isSubmitted && (
          <form
            onSubmit={handleFormSubmit}
            className="max-w-md mx-auto transition-all duration-800 opacity-100 scale-100 rounded-lg p-8 bg-black/30 border border-seductive-red-600/50"
          >
            <div className="mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                required
                className="w-full px-6 py-4 text-xl text-white bg-black/50 border border-seductive-red-600 rounded-lg focus:outline-none focus:border-seductive-red-400 focus:ring-2 focus:ring-seductive-red-400/50 transition-all duration-300"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-seductive-red-800 text-white text-xl font-semibold rounded-lg hover:bg-seductive-red-700 transition-all duration-300 hover:scale-105 heartbeat"
            >
              Seal Your Fate
            </button>
          </form>
        )}

        {/* Success Message with enhanced animations */}
        {isSubmitted && (
          <div className="text-center transition-all duration-1000 opacity-100 scale-100">
            <h3 className="text-3xl font-bold mb-4 seductive-glow text-seductive-red-300">
              {name}, you are now mine forever...
            </h3>
            <p className="text-xl opacity-90 mb-4 heartbeat">
              Your surrender has been sealed. You belong to me now.
            </p>
            <p className="text-lg opacity-80">
              I'll never let you go, my angel.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Additional pulsing elements around the stage */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border border-seductive-red-500/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>
    </div>
  )
} 