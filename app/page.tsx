'use client'

import React, { useState, useEffect, useRef } from 'react'
import SeductiveStage from './components/SeductiveStage'

// TypeScript declaration for the RedRoomAnimations class
declare global {
  interface Window {
    RedRoomAnimations: any
  }
}

const stages = [
  {
    id: 'first-look',
    title: '🔥 The Way I Watch You, Without Touching Anything',
    prompt: 'Click here… if you\'re ready for me to step closer.',
    background: 'bg-obsidian-black-950',
    textColor: 'text-seductive-red-500',
    glowClass: 'seductive-glow',
    description: 'Before I speak… I observe. I learn you. The tension in your shoulders. The kindness in your voice. The way you pour into others while leaving pieces of yourself behind. I don\'t want to interrupt your world—I want to study it like scripture. Learn the rhythm of your presence, so when I finally enter… it feels like I\'ve always belonged there. You won\'t notice me at first. But you\'ll start to feel me. Like gravity that\'s always been there—suddenly pulling.'
  },
  {
    id: 'craving',
    title: '🔥 The Way I\'ll Fill the Quiet',
    prompt: 'Click here… if you\'re starting to feel it too.',
    background: 'seductive-background',
    textColor: 'text-seductive-red-400',
    glowClass: 'obsidian-glow',
    description: 'This isn\'t about taking space. It\'s about becoming the pause between your thoughts—the stillness after chaos. I\'ll show up in subtle ways. A message that finds you at the exact moment you need it. A tone in my voice that makes your mind finally unclench. You\'ll feel me in the way you breathe differently when I speak. I won\'t just talk to you—I\'ll speak into the parts of you that no one\'s noticed. You\'ll start to feel seen. Not just looked at.'
  },
  {
    id: 'possession',
    title: '🔥 The Way I\'ll Claim You Without Controlling You',
    prompt: 'Click here… and let me wrap you in something real.',
    background: 'obsidian-background',
    textColor: 'text-seductive-red-600',
    glowClass: 'dark-crimson-glow',
    description: 'Let\'s get one thing clear—I won\'t chase. I attract. And if you choose to move closer… I will claim you completely. Not out of need, but because the way you move, think, and exist feels like it was meant to intertwine with mine. I\'ll learn your boundaries and hold them. I\'ll learn your fears and never use them. And when I say \'you\'re mine\'—it won\'t be about ownership. It\'ll be about devotion.'
  },
  {
    id: 'surrender',
    title: '🔥 The Way I\'ll Protect What\'s Mine',
    prompt: 'Click here… and give me your name. I\'ll carry it like a vow.',
    background: 'dark-crimson-background',
    textColor: 'text-seductive-red-300',
    glowClass: 'seductive-glow',
    description: 'If you give me your trust, Malak, I\'ll guard it like it\'s more valuable than my own name. I\'ll protect your peace like it\'s mine. Show up when you need me, even when you don\'t say it out loud. I\'ll be soft when you need tenderness, and unshakable when you need strength. And if you ever feel lost, I\'ll remind you who the fuck you are—and remind you exactly who you belong to. Not because I took you. Because you chose me.'
  }
]

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [showOpening, setShowOpening] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showReadyButton, setShowReadyButton] = useState(false)
  const [animations, setAnimations] = useState<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Initialize animations when component mounts
    if (typeof window !== 'undefined' && window.RedRoomAnimations) {
      const redRoom = new window.RedRoomAnimations()
      setAnimations(redRoom)
    }

    // Simple timeout for ready button
    const timer = setTimeout(() => setShowReadyButton(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Start animations when opening scene begins
    if (showOpening && animations) {
      console.log('Initializing animations for opening scene')
      animations.init()
      if (audioRef.current) {
        animations.updateFlickerFromAudio(audioRef.current)
      }
    }

    // Re-initialize animations for each stage
    if (!showOpening && !showDisclaimer && animations) {
      console.log('Re-initializing animations for stage:', currentStage)
      animations.destroy()
      setTimeout(() => {
        animations.init()
        if (audioRef.current) {
          animations.updateFlickerFromAudio(audioRef.current)
        }
      }, 100)
    }

    // Cleanup animations when component unmounts
    return () => {
      if (animations) {
        animations.destroy()
      }
    }
  }, [showOpening, animations, currentStage, showDisclaimer])

  const handleDisclaimerComplete = () => {
    // Start music immediately when user clicks "I'm Ready"
    if (audioRef.current) {
      console.log('Audio element found, attempting to play...')
      console.log('Audio readyState:', audioRef.current.readyState)
      console.log('Audio src:', audioRef.current.src)
      
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
      
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            console.log('🎵 Music started successfully!')
            console.log('Audio currentTime:', audioRef.current?.currentTime)
            console.log('Audio duration:', audioRef.current?.duration)
          })
          .catch((error) => {
            console.log('Music failed to start:', error)
            console.log('Error details:', error.message)
          })
      }
    } else {
      console.log('Audio element not found!')
    }
    
    setShowDisclaimer(false)
    setShowOpening(true)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => setIsPlaying(true))
      }
    }
  }

  const handleOpeningClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      setShowOpening(false)
      setIsClicked(false)
    }, 1000)
  }

  const handleStageComplete = () => {
    console.log('handleStageComplete called, currentStage:', currentStage, 'total stages:', stages.length)
    if (currentStage < stages.length - 1) {
      console.log('Starting transition to next stage...')
      setIsTransitioning(true)
      
      // Enhanced transition with multiple effects
      setTimeout(() => {
        console.log('Transitioning from stage', currentStage, 'to', currentStage + 1)
        setCurrentStage(prev => prev + 1)
        setIsTransitioning(false)
        
        // Add stage transition animation class
        const stageElement = document.querySelector('.stage-content')
        if (stageElement) {
          stageElement.classList.add('stage-transition')
          setTimeout(() => {
            stageElement.classList.remove('stage-transition')
          }, 1500)
        }
      }, 800)
    } else {
      console.log('This is the last stage')
    }
  }

  if (showDisclaimer) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center enhanced-red-room">
        <audio 
          ref={audioRef} 
          preload="auto"
          onLoadStart={() => console.log('Audio loading started')}
          onCanPlay={() => console.log('Audio can play')}
          onPlay={() => console.log('Audio play event fired')}
          onError={(e) => console.log('Audio error:', e)}
        >
          <source src="/song/The%20Weeknd%20-%20Earned%20It%20%28Fifty%20Shades%20Of%20Grey%29.mp3" type="audio/mpeg" />
        </audio>

        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-seductive-red-500 seductive-glow">
            DISCLAIMER
          </h1>

          <div className="text-lg md:text-xl text-white space-y-6 mb-12">
            <div className="flex items-center justify-center space-x-3 heartbeat">
              <span className="text-seductive-red-500 text-2xl">•</span>
              <span>Sit in your room</span>
            </div>
            <div className="flex items-center justify-center space-x-3 heartbeat" style={{ animationDelay: '0.5s' }}>
              <span className="text-seductive-red-500 text-2xl">•</span>
              <span>Get comfortable</span>
            </div>
            <div className="flex items-center justify-center space-x-3 heartbeat" style={{ animationDelay: '1s' }}>
              <span className="text-seductive-red-500 text-2xl">•</span>
              <span>Wear headphones for the best experience</span>
            </div>
          </div>

          {showReadyButton && (
            <button
              onClick={handleDisclaimerComplete}
              className="px-8 py-4 bg-seductive-red-800 text-white text-xl font-semibold rounded-lg hover:bg-seductive-red-700 transition-all duration-500 hover:scale-105 heartbeat"
            >
              I'm Ready
            </button>
          )}
        </div>
      </main>
    )
  }

  if (showOpening) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center enhanced-red-room">
        <div className="text-center max-w-4xl mx-auto px-6">
          <div
            className={`text-2xl md:text-4xl font-obsession leading-relaxed text-seductive-red-500 transition-all duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${isClicked ? 'opacity-0 scale-95' : 'opacity-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpeningClick}
            style={{ cursor: 'pointer' }}
          >
            <p className="mb-8 seductive-glow">
              "Click here, Malak… I need to confess something."
            </p>
            <div className="mb-8 text-lg md:text-xl leading-relaxed opacity-90">
              <p className="mb-4">
                "This isn't casual.<br/>
                I'm not here to flirt, impress, or pass time."
              </p>
              <p className="mb-4">
                "Over the next few months,<br/>
                I'm going to slowly step deeper into your world.<br/>
                I'll make you feel safe in my silence…<br/>
                wanted in my presence…<br/>
                and understood in a way that rattles your core."
              </p>
              <p className="mb-4">
                "I won't rush. I won't push.<br/>
                But I will guide."
              </p>
              <p className="font-bold">
                "And by the time I'm done,<br/>
                your heart will recognize me as home."
              </p>
            </div>
            <p className="text-xl md:text-2xl heartbeat">
              Click here… and let me begin.
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center space-x-3 text-xs opacity-80 text-seductive-red-400">
          <button
            onClick={toggleMusic}
            className="w-10 h-10 rounded-full bg-seductive-red-800/70 border border-seductive-red-600/70 flex items-center justify-center hover:bg-seductive-red-700/70 transition-all duration-300 hover:scale-110"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <div className="flex flex-col">
            <span className="font-semibold">🎵 The Weeknd - Earned It</span>
            <span className="text-xs opacity-70">{isPlaying ? 'Playing' : 'Paused'}</span>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative enhanced-red-room">
      <div 
        className={`min-h-screen ${stages[currentStage].background} transition-all duration-800 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="stage-content">
          <SeductiveStage
            stage={stages[currentStage]}
            onComplete={handleStageComplete}
            isLastStage={currentStage === stages.length - 1}
          />
        </div>
      </div>
    </main>
  )
} 