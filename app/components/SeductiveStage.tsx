'use client'

import React, { useState, useEffect } from 'react'

interface Stage {
  id: string
  title: string
  subtitle: string
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

  useEffect(() => {
    // Auto-trigger hover effect after a delay for the first stage
    if (stage.id === 'first-look') {
      const timer = setTimeout(() => {
        setIsHovered(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [stage.id])

  const handlePromptHover = () => {
    if (!isClicked && !isLastStage) {
      setIsHovered(true)
    }
  }

  const handlePromptClick = () => {
    if (isLastStage) {
      setShowForm(true)
    } else {
      setIsClicked(true)
      // Trigger fade out and transition
      setTimeout(() => {
        onComplete()
      }, 1500)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setIsSubmitted(true)
      // Here you would typically send the data to your backend
      console.log('Name submitted:', name)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
        {/* Title */}
        <h1
          className={`text-6xl md:text-8xl font-bold mb-8 font-seductive ${stage.textColor} ${stage.glowClass} animate-seductive-pulse transition-all duration-1000`}
        >
          {stage.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-12 opacity-80 transition-all duration-1000">
          {stage.subtitle}
        </p>

        {/* Interactive Prompt */}
        {!showForm && !isSubmitted && (
          <div
            className={`text-3xl md:text-4xl font-semibold ${stage.textColor} seductive-prompt transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isClicked ? 'opacity-0 scale-50' : 'opacity-100'}`}
            style={{ cursor: isLastStage ? 'pointer' : 'default' }}
            onMouseEnter={handlePromptHover}
            onClick={handlePromptClick}
          >
            {stage.prompt}
          </div>
        )}

        {/* Form */}
        {showForm && !isSubmitted && (
          <form
            onSubmit={handleFormSubmit}
            className="max-w-md mx-auto transition-all duration-800 opacity-100 scale-100 obsidian-border rounded-lg p-6"
          >
            <div className="mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                required
                className="w-full px-6 py-4 text-xl text-white form-input rounded-lg focus:outline-none"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 seductive-button text-xl font-semibold rounded-lg"
            >
              Seal Your Fate
            </button>
          </form>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="text-center transition-all duration-1000 opacity-100">
            <h3 className="text-3xl font-bold mb-4 seductive-glow text-seductive-red-300">
              {name}, you are now mine...
            </h3>
            <p className="text-xl opacity-90">
              Your obsession has been sealed. I will never let you go.
            </p>
          </div>
        )}
      </div>

      {/* Atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-seductive-red-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
} 