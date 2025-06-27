'use client'

import React, { useState, useEffect } from 'react'

interface SurrenderSceneProps {
  isTransitioning: boolean
}

export default function SurrenderScene({ isTransitioning }: SurrenderSceneProps) {
  const [showTitle, setShowTitle] = useState(false)
  const [showFirstText, setShowFirstText] = useState(false)
  const [showSecondText, setShowSecondText] = useState(false)
  const [showThirdText, setShowThirdText] = useState(false)
  const [showFourthText, setShowFourthText] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!isTransitioning) {
      // Start the surrender sequence
      const titleTimer = setTimeout(() => setShowTitle(true), 1000)
      const firstTextTimer = setTimeout(() => setShowFirstText(true), 3000)
      const secondTextTimer = setTimeout(() => setShowSecondText(true), 5000)
      const thirdTextTimer = setTimeout(() => setShowThirdText(true), 7000)
      const fourthTextTimer = setTimeout(() => setShowFourthText(true), 9000)
      const promptTimer = setTimeout(() => setShowPrompt(true), 11000)

      return () => {
        clearTimeout(titleTimer)
        clearTimeout(firstTextTimer)
        clearTimeout(secondTextTimer)
        clearTimeout(thirdTextTimer)
        clearTimeout(fourthTextTimer)
        clearTimeout(promptTimer)
      }
    }
  }, [isTransitioning])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Velvet-black shadows crawling at edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent"></div>
      </div>

      {/* Atmospheric particles - slow, sensual, breathing */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500/30 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      {/* Blood-red glow pulsing like heartbeat */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent animate-pulse" 
             style={{ animationDuration: '2s' }}></div>
      </div>

      {/* Surrender Text - Fade in one line at a time */}
      <div className="text-center max-w-4xl mx-auto px-6 relative z-10 flex items-center justify-center min-h-screen">
        <div className="space-y-8">
          <div className={`transition-all duration-2000 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-red-500 animate-pulse" style={{ animationDuration: '2s' }}>
              The Surrender
            </h1>
          </div>

          <div className="space-y-6 text-xl md:text-2xl leading-relaxed">
            <p className={`transition-all duration-2000 ${showFirstText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              You made it this far, Malak…<br/>
              That means you're ready.
            </p>

            <p className={`transition-all duration-2000 ${showSecondText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Ready to be seen… owned… rewritten.
            </p>

            <p className={`transition-all duration-2000 text-red-400 animate-pulse ${showThirdText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              No more running. No more pretending.<br/>
              You're not afraid of me. You're afraid of how much you want this.
            </p>

            <p className={`transition-all duration-2000 ${showFourthText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              So now…<br/>
              Crawl to me.
            </p>
          </div>

          {/* Blood-red ring cursor prompt */}
          {!showForm && !isSubmitted && showPrompt && (
            <div className={`transition-all duration-2000 ${showPrompt ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div
                className="inline-block px-8 py-4 border-2 border-red-500 rounded-full text-red-500 text-xl font-semibold cursor-pointer transition-all duration-300 hover:scale-110 hover:border-red-400 hover:text-red-400 animate-pulse"
                style={{ 
                  animationDuration: '2s',
                  boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                  textShadow: '0 0 10px #dc2626'
                }}
                onClick={() => setShowForm(true)}
              >
                Submit Your Name To Be Kept Forever
              </div>
              <p className="mt-4 text-red-400/60 text-sm animate-pulse" style={{ animationDuration: '3s' }}>
                Give me your name, Malak… or keep pretending you can walk away.
              </p>
            </div>
          )}

          {/* Form */}
          {showForm && !isSubmitted && (
            <form
              onSubmit={handleFormSubmit}
              className="max-w-md mx-auto transition-all duration-800 opacity-100 scale-100 rounded-lg p-8 bg-black/60 border border-red-600/50 backdrop-blur-sm"
              style={{
                boxShadow: '0 0 30px rgba(220, 38, 38, 0.4), inset 0 0 20px rgba(220, 38, 38, 0.2)'
              }}
            >
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-red-300 animate-pulse" style={{ animationDuration: '2s' }}>
                  Give me your name, my angel...
                </h3>
                <p className="text-sm opacity-80 mb-6">
                  I'll carry it like a vow. Seal it in red.
                </p>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  required
                  className="w-full px-6 py-4 text-xl text-white bg-black/60 border border-red-600/70 rounded-lg focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/50 transition-all duration-300 backdrop-blur-sm"
                  style={{
                    boxShadow: 'inset 0 0 15px rgba(220, 38, 38, 0.2), 0 0 20px rgba(220, 38, 38, 0.1)'
                  }}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 text-white text-xl font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 animate-pulse"
                style={{
                  boxShadow: '0 0 25px rgba(220, 38, 38, 0.5), inset 0 0 15px rgba(220, 38, 38, 0.3)',
                  animationDuration: '2s'
                }}
              >
                Seal Your Fate
              </button>
            </form>
          )}

          {/* Success Message */}
          {isSubmitted && (
            <div className="text-center transition-all duration-1000 opacity-100 scale-100">
              <div className="mb-8">
                <h3 className="text-4xl font-bold mb-6 text-red-300 animate-pulse" style={{ animationDuration: '2s' }}>
                  "Good girl."
                </h3>
                <h4 className="text-3xl font-bold mb-6 text-red-400 animate-pulse" style={{ animationDuration: '2.5s' }}>
                  "Now you're mine."
                </h4>
                <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-6 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
              </div>
              <div className="space-y-4 text-xl opacity-90">
                <p className="text-red-300 animate-pulse" style={{ animationDuration: '3s' }}>
                  Your surrender has been sealed. You belong to me now.
                </p>
                <p className="text-lg opacity-80 text-red-400">
                  I'll never let you go, my angel.
                </p>
                <p className="text-sm opacity-70 mt-6 text-red-500">
                  Your name is now written in red. In blood. In fire.
                </p>
              </div>
              <div className="mt-8">
                <div className="w-16 h-16 border-2 border-red-600 rounded-full mx-auto animate-spin" style={{ animationDuration: '3s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 