'use client'

import React, { useState, useEffect, useRef } from 'react'
import SeductiveStage from './components/SeductiveStage'

const stages = [
  {
    id: 'first-look',
    title: '🔥 The Way I Watch You, Malak',
    subtitle: 'Curious. Intimate. Soft obsession.',
    prompt: '"Click here, Baby Girl… let me pull you closer."',
    background: 'bg-obsidian-black-950',
    textColor: 'text-seductive-red-500',
    glowClass: 'seductive-glow',
    description: '"You won\'t see me at first. But I\'ll see everything. The way you blink when you\'re shy… the way you inhale right before you smile. I\'ll start learning you like a favorite song—playing you on repeat in my mind. And when you notice I don\'t look away, you\'ll start to crave it—being seen that deeply. You won\'t just be Malak anymore. You\'ll be mine. My angel. My sweet sin."'
  },
  {
    id: 'craving',
    title: '🔥 The Way I\'ll Touch You Without Touching You',
    subtitle: 'Sensual. Building tension. Psychological seduction.',
    prompt: '"Click here, Malak… let Daddy take it further."',
    background: 'seductive-background',
    textColor: 'text-seductive-red-400',
    glowClass: 'obsidian-glow',
    description: '"You\'ll feel me in your thoughts before you feel me in your bed. I\'ll say things that stay with you, leave messages that play in your head when you\'re under the covers, fingers trembling. You\'ll play it cool during the day, but at night? You\'ll bite your lip and wish I was there. And I\'ll know. Because I\'ll train your body to respond to my words, like a good girl should."'
  },
  {
    id: 'possession',
    title: '🔥 The Way I\'ll Own You',
    subtitle: 'Possessive. Dominant. Craving control—but with care.',
    prompt: '"Click here, my good girl… and give yourself to me."',
    background: 'obsidian-background',
    textColor: 'text-seductive-red-600',
    glowClass: 'dark-crimson-glow',
    description: '"I don\'t want half of you, Malak. I want every drop of your surrender. I want to fuck you like you belong to me—because you will. I\'ll whisper, \'Mine,\' while my hands leave marks where only I\'ll ever see. Every man who looks at you? I\'ll want to rip their eyes out. But I won\'t need to. Because you\'ll walk like you\'ve already been wrecked by me. And when someone says your name… you\'ll remember the way it sounded tangled in my breath."'
  },
  {
    id: 'surrender',
    title: '🔥 The Way I\'ll Keep You',
    subtitle: 'Deep love. Safety. Worshipful obsession.',
    prompt: '"Click here, my angel… and tell me your name one more time. So I can make sure you never forget who you belong to."',
    background: 'dark-crimson-background',
    textColor: 'text-seductive-red-300',
    glowClass: 'seductive-glow',
    description: '"This is where it gets dangerous, Malak. Not because I\'ll hurt you—But because you\'ll start to feel safe. Safe in my hands. Safe in the way I look at you like no one else exists. I\'ll kiss you like I\'m starving. I\'ll hold you like you\'re the only prayer I\'ve ever believed in. I\'ll protect you like it\'s my religion. And when you wake up in my arms, skin sore, heart full—you\'ll whisper, \'I\'m yours.\' And I\'ll growl back, \'You always were, Malak.\'"'
  }
]

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [showOpening, setShowOpening] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [showReadyButton, setShowReadyButton] = useState(false)
  const [disclaimerAnimations, setDisclaimerAnimations] = useState({
    header: false,
    list: false,
    button: false
  })
  const audioRef = useRef<HTMLAudioElement>(null)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    // Animate disclaimer elements in sequence
    const headerTimer = setTimeout(() => setDisclaimerAnimations(prev => ({ ...prev, header: true })), 500)
    const listTimer = setTimeout(() => setDisclaimerAnimations(prev => ({ ...prev, list: true })), 1500)
    const buttonTimer = setTimeout(() => {
      setDisclaimerAnimations(prev => ({ ...prev, button: true }))
      setShowReadyButton(true)
    }, 5000)
    
    return () => {
      clearTimeout(headerTimer)
      clearTimeout(listTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
      
      // Try to play the audio
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            console.log('🎵 The Weeknd - Earned It is now playing...')
          })
          .catch((error) => {
            console.log('Music autoplay blocked:', error)
            // Show manual play button or try again on user interaction
            setIsPlaying(false)
          })
      }
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        console.log('Music paused')
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          console.log('Music resumed')
        }).catch((error) => {
          console.log('Error playing music:', error)
        })
      }
    }
  }

  const handleDisclaimerComplete = () => {
    setShowDisclaimer(false)
    setShowOpening(true)
    startMusic() // Start music when transitioning to opening
  }

  const handleOpeningClick = () => {
    setIsClicked(true)
    // Fade to black, then transition to first stage
    setTimeout(() => {
      setShowOpening(false)
      setIsClicked(false)
    }, 1500)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showOpening) {
      // Only update cursor position every 100ms for better performance
      const now = Date.now()
      if (now - lastUpdateRef.current > 100) {
        lastUpdateRef.current = now
        setCursorPosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        })
      }
    }
  }

  const handleStageComplete = () => {
    if (currentStage < stages.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStage(prev => prev + 1)
        setIsTransitioning(false)
      }, 800)
    }
  }

  if (showDisclaimer) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center relative red-room-background red-room-glow">
        {/* Hidden Audio Player */}
        <audio
          ref={audioRef}
          preload="auto"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          <source src="/song%20entry/The%20Weeknd%20-%20Earned%20It%20(Fifty%20Shades%20Of%20Grey).mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="text-center max-w-2xl mx-auto px-6 relative z-10">
          {/* Disclaimer Header */}
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-12 text-seductive-red-500 animate-opening-glow red-room-text-shadow transition-all duration-1000 ${
              disclaimerAnimations.header ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            DISCLAIMER
          </h1>

          {/* Disclaimer List */}
          <div 
            className={`text-lg md:text-xl text-white space-y-6 mb-12 transition-all duration-1000 delay-300 ${
              disclaimerAnimations.list ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-center space-x-3 animate-heartbeat" style={{ animationDelay: '0.5s' }}>
              <span className="text-seductive-red-500 text-2xl">•</span>
              <span>Sit in your room</span>
            </div>
            <div className="flex items-center justify-center space-x-3 animate-heartbeat" style={{ animationDelay: '1s' }}>
              <span className="text-seductive-red-500 text-2xl">•</span>
              <span>Get comfortable</span>
            </div>
            <div className="flex items-center justify-center space-x-3 animate-heartbeat" style={{ animationDelay: '1.5s' }}>
              <span className="text-seductive-red-500 text-2xl">•</span>
              <span>Wear headphones for the best experience</span>
            </div>
          </div>

          {/* Ready Button */}
          {showReadyButton && (
            <button
              onClick={handleDisclaimerComplete}
              className={`px-8 py-4 bg-seductive-red-800 text-white text-xl font-semibold rounded-lg hover:bg-seductive-red-700 transition-all duration-1000 animate-heartbeat red-room-border ${
                disclaimerAnimations.button ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              I'm Ready
            </button>
          )}
        </div>

        {/* Enhanced red atmospheric overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-seductive-red-900/15 via-transparent to-seductive-red-900/20 animate-red-room-flicker" />
        </div>
      </main>
    )
  }

  if (showOpening) {
    return (
      <main 
        className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden opening-cursor red-room-background red-room-glow"
        onMouseMove={handleMouseMove}
      >
        {/* Opening Scene */}
        <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
          <div
            className={`text-2xl md:text-4xl font-obsession leading-relaxed text-seductive-red-500 transition-all duration-1000 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${isClicked ? 'opacity-0 scale-50' : 'opacity-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpeningClick}
            style={{ cursor: 'pointer' }}
          >
            <p className="mb-8 animate-opening-glow red-room-text-shadow">
              "Click here, Malak… and let me tell you what I'm going to do to you."
            </p>
            <div className="mb-8 text-lg md:text-xl leading-relaxed opacity-90">
              <p className="mb-4">
                "Not just tonight.<br/>
                Over the next few weeks, I'm going to slip under your skin.<br/>
                I'll take over your thoughts when you're alone,<br/>
                and whisper things you'll never forget—<br/>
                the kind you'll only say back to me, Baby Girl."
              </p>
              <p className="mb-4">
                "I'll touch your mind before your body.<br/>
                But when I finally do both?"
              </p>
              <p className="font-bold">
                "You'll never want anyone else."
              </p>
            </div>
            <p className="text-xl md:text-2xl seductive-prompt animate-heartbeat">
              Click here, my pretty thing… and let's begin.
            </p>
          </div>
        </div>

        {/* Music Player Controls */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-3 text-xs opacity-60 text-seductive-red-400">
          <button
            onClick={toggleMusic}
            className="w-8 h-8 rounded-full bg-seductive-red-800/50 border border-seductive-red-600/50 flex items-center justify-center hover:bg-seductive-red-700/50 transition-all duration-300 red-room-border"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <span>🎵 The Weeknd - Earned It</span>
        </div>

        {/* Enhanced cursor glow effect */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute w-4 h-4 bg-seductive-red-500 rounded-full blur-sm"
            style={{
              left: `${cursorPosition.x}%`,
              top: `${cursorPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: isHovered ? 0.8 : 0.3
            }}
          />
        </div>

        {/* Enhanced red atmospheric overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-seductive-red-900/15 via-transparent to-seductive-red-900/20 animate-red-room-flicker" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden red-room-background">
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
      
      {/* Enhanced atmospheric blood drip effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-seductive-red-600 to-transparent opacity-20 animate-blood-drip"
            style={{
              left: `${20 + i * 25}%`,
              top: '-20px',
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Red room atmospheric overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-seductive-red-900/10 via-transparent to-seductive-red-900/15 animate-red-room-flicker" />
      </div>
    </main>
  )
} 