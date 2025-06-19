'use client'

import React, { useState } from 'react'
import SeductiveStage from './components/SeductiveStage'

const stages = [
  {
    id: 'first-look',
    title: 'The First Look',
    subtitle: 'One obsession that will consume you completely',
    prompt: 'Hover to begin your descent into obsession...',
    background: 'bg-obsidian-black-950',
    textColor: 'text-seductive-red-500',
    glowClass: 'seductive-glow',
    description: 'The spark of obsession ignites...'
  },
  {
    id: 'craving',
    title: 'The Craving',
    subtitle: 'You feel it now, don\'t you? That hunger growing inside...',
    prompt: 'Let the desire consume you completely...',
    background: 'seductive-background',
    textColor: 'text-seductive-red-400',
    glowClass: 'obsidian-glow',
    description: 'The hunger becomes unbearable...'
  },
  {
    id: 'possession',
    title: 'The Possession',
    subtitle: 'You\'re mine now. Every breath, every thought belongs to me...',
    prompt: 'Surrender to the darkness within...',
    background: 'obsidian-background',
    textColor: 'text-seductive-red-600',
    glowClass: 'dark-crimson-glow',
    description: 'Complete and utter possession...'
  },
  {
    id: 'surrender',
    title: 'The Surrender',
    subtitle: 'Now tell me your name, my obsession...',
    prompt: 'Seal your fate with me...',
    background: 'dark-crimson-background',
    textColor: 'text-seductive-red-300',
    glowClass: 'seductive-glow',
    description: 'Final surrender and eternal binding...'
  }
]

export default function Home() {
  const [currentStage, setCurrentStage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleStageComplete = () => {
    if (currentStage < stages.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStage(prev => prev + 1)
        setIsTransitioning(false)
      }, 800)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden animate-obsidian-shimmer">
      <div 
        className={`min-h-screen ${stages[currentStage].background} transition-opacity duration-800 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <SeductiveStage
          stage={stages[currentStage]}
          onComplete={handleStageComplete}
          isLastStage={currentStage === stages.length - 1}
        />
      </div>
      
      {/* Atmospheric blood drip effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-seductive-red-600 to-transparent opacity-20 animate-blood-drip"
            style={{
              left: `${20 + i * 15}%`,
              top: '-20px',
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>
    </main>
  )
} 