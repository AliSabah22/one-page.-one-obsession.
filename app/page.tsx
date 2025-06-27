'use client'

import React, { useState, useEffect, useRef } from 'react'
import SeductiveStage from './components/SeductiveStage'
import SurrenderScene from './components/SurrenderScene'

// TypeScript declaration for the RedRoomAnimations class
declare global {
  interface Window {
    RedRoomAnimations: any
  }
}

const stages = [
  {
    id: 'first-look',
    title: '🔥 The Way I Watch You, Malak',
    prompt: 'Click here… if you\'re ready for me to step closer.',
    background: 'bg-obsidian-black-950',
    textColor: 'text-seductive-red-500',
    glowClass: 'seductive-glow',
    description: 'You don\'t see me. But I study everything—The way your eyes move. The way your thoughts shift behind them. I already know what touches will ruin you. Before I speak… I observe. I learn you. The tension in your shoulders. The kindness in your voice. The way you pour into others while leaving pieces of yourself behind. I don\'t want to interrupt your world—I want to study it like scripture.'
  },
  {
    id: 'craving',
    title: '🔥 The Way I\'ll Touch You Without Touching You',
    prompt: 'Click here… if you\'re starting to feel it too.',
    background: 'seductive-background',
    textColor: 'text-seductive-red-400',
    glowClass: 'obsidian-glow',
    description: 'I won\'t need to lay a hand on you. You\'ll feel me in every breath. Every word will trail across your skin like heat. You\'ll crave contact—but surrender to command. This isn\'t about taking space. It\'s about becoming the pause between your thoughts—the stillness after chaos. I\'ll show up in subtle ways. A message that finds you at the exact moment you need it.'
  },
  {
    id: 'possession',
    title: '🔥 The Way I\'ll Own You',
    prompt: 'Click here… and let me wrap you in something real.',
    background: 'obsidian-background',
    textColor: 'text-seductive-red-600',
    glowClass: 'dark-crimson-glow',
    description: 'This isn\'t love. It\'s submission. You don\'t give yourself—you\'re taken. Your name, your breath, your edges—I claim them. Let\'s get one thing clear—I won\'t chase. I attract. And if you choose to move closer… I will claim you completely. Not out of need, but because the way you move, think, and exist feels like it was meant to intertwine with mine.'
  },
  {
    id: 'surrender',
    title: '🔥 The Way I\'ll Keep You',
    prompt: 'Click here… and give me your name. I\'ll carry it like a vow.',
    background: 'dark-crimson-background',
    textColor: 'text-seductive-red-300',
    glowClass: 'seductive-glow',
    description: 'Now you don\'t run. You don\'t even want to. You belong here—your name sealed in red. This isn\'t temporary. It\'s forever. If you give me your trust, Malak, I\'ll guard it like it\'s more valuable than my own name. I\'ll protect your peace like it\'s mine. Show up when you need me, even when you don\'t say it out loud.'
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
  const [showSurrender, setShowSurrender] = useState(false)
  const [isSurrenderTransitioning, setIsSurrenderTransitioning] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize animations when component mounts
    if (typeof window !== 'undefined' && window.RedRoomAnimations) {
      const redRoom = new window.RedRoomAnimations()
      setAnimations(redRoom)
    }

    // Preload and prepare audio for immediate playback
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
      
      // Force audio to start loading
      audioRef.current.load()
      
      console.log('Audio preloading started...')
      
      // Auto-play with user interaction fallback
      const playMusic = () => {
        if (audioRef.current && audioRef.current.readyState >= 2) {
          audioRef.current.play().then(() => {
            setIsPlaying(true)
            console.log('🎵 Music started automatically!')
          }).catch((error) => {
            console.log('Auto-play failed, waiting for user interaction:', error)
          })
        }
      }
      
      // Try to play immediately if ready
      if (audioRef.current.readyState >= 2) {
        playMusic()
      }
      
      // Also try on first user interaction
      const handleFirstInteraction = () => {
        playMusic()
        document.removeEventListener('click', handleFirstInteraction)
        document.removeEventListener('keydown', handleFirstInteraction)
        document.removeEventListener('mousedown', handleFirstInteraction)
        document.removeEventListener('touchstart', handleFirstInteraction)
      }
      
      document.addEventListener('click', handleFirstInteraction)
      document.addEventListener('keydown', handleFirstInteraction)
      document.addEventListener('mousedown', handleFirstInteraction)
      document.addEventListener('touchstart', handleFirstInteraction)
    }

    // Simple timeout for ready button
    const timer = setTimeout(() => setShowReadyButton(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Custom cursor functionality - persistent across all stages
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, []) // Empty dependency array ensures this runs only once and persists

  // Audio auto-play for disclaimer page
  useEffect(() => {
    if (showDisclaimer && audioRef.current) {
      const startAudioOnInteraction = () => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play().then(() => {
            setIsPlaying(true)
            console.log('🎵 Music started on disclaimer interaction!')
          }).catch(e => console.log('Disclaimer interaction play failed:', e))
        }
      }

      // Add listeners for any interaction on disclaimer page
      document.addEventListener('click', startAudioOnInteraction, { once: true })
      document.addEventListener('mousedown', startAudioOnInteraction, { once: true })
      document.addEventListener('touchstart', startAudioOnInteraction, { once: true })
      document.addEventListener('keydown', startAudioOnInteraction, { once: true })

      return () => {
        document.removeEventListener('click', startAudioOnInteraction)
        document.removeEventListener('mousedown', startAudioOnInteraction)
        document.removeEventListener('touchstart', startAudioOnInteraction)
        document.removeEventListener('keydown', startAudioOnInteraction)
      }
    }
  }, [showDisclaimer, isPlaying])

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
    console.log('Disclaimer button clicked - starting music...')
    
    // Start music immediately when user clicks "I'm Ready"
    if (audioRef.current) {
      console.log('Audio element found, attempting to play...')
      console.log('Audio readyState:', audioRef.current.readyState)
      console.log('Audio src:', audioRef.current.src)
      console.log('Audio paused:', audioRef.current.paused)
      
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
      audioRef.current.muted = false
      
      // Force audio to be ready
      audioRef.current.load()
      
      // Try multiple approaches to start the music
      const startMusic = async () => {
        try {
          // Approach 1: Direct play
          if (audioRef.current) {
            await audioRef.current.play()
            setIsPlaying(true)
            console.log('🎵 Music started successfully!')
            return true
          }
        } catch (error) {
          console.log('Direct play failed:', error)
          
          try {
            // Approach 2: Wait a bit and try again
            await new Promise(resolve => setTimeout(resolve, 100))
            if (audioRef.current) {
              await audioRef.current.play()
              setIsPlaying(true)
              console.log('🎵 Music started on retry!')
              return true
            }
          } catch (retryError) {
            console.log('Retry also failed:', retryError)
            
            try {
              // Approach 3: Set currentTime and try again
              if (audioRef.current) {
                audioRef.current.currentTime = 0
                await audioRef.current.play()
                setIsPlaying(true)
                console.log('🎵 Music started after reset!')
                return true
              }
            } catch (finalError) {
              console.log('All attempts failed:', finalError)
              return false
            }
          }
        }
        return false
      }
      
      // Start the music
      startMusic()
      
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
      console.log('This is the last stage, transitioning to surrender scene')
      setIsTransitioning(true)
      
      // Transition to surrender scene
      setTimeout(() => {
        setShowSurrender(true)
        setIsTransitioning(false)
        setIsSurrenderTransitioning(true)
        
        // Start surrender scene animations after a brief delay
        setTimeout(() => {
          setIsSurrenderTransitioning(false)
        }, 1000)
      }, 800)
    }
  }

  return (
    <>
      {/* Persistent Custom Cursor - always visible */}
      <div
        ref={cursorRef}
        className="custom-cursor"
      />

      {/* Persistent Audio Element - always present */}
      <audio 
        ref={audioRef} 
        preload="auto"
        onLoadStart={() => console.log('Audio loading started')}
        onCanPlay={() => console.log('Audio can play')}
        onPlay={() => console.log('Audio play event fired')}
        onError={(e) => console.log('Audio error:', e)}
        onLoadedData={() => console.log('Audio data loaded')}
        onLoadedMetadata={() => console.log('Audio metadata loaded')}
      >
        <source src="/song/The%20Weeknd%20-%20Earned%20It%20%28Fifty%20Shades%20Of%20Grey%29.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {showDisclaimer ? (
        <main className="min-h-screen bg-black flex items-center justify-center enhanced-red-room">
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
                onMouseDown={() => {
                  // Try to start audio on mouse down for better user interaction detection
                  if (audioRef.current) {
                    audioRef.current.play().then(() => {
                      setIsPlaying(true)
                      console.log('🎵 Music started on mouse down!')
                    }).catch(e => console.log('Mouse down play failed:', e))
                  }
                }}
                className="px-8 py-4 bg-seductive-red-800 text-white text-xl font-semibold rounded-lg hover:bg-seductive-red-700 transition-all duration-500 hover:scale-105 heartbeat"
              >
                I'm Ready
              </button>
            )}
          </div>
        </main>
      ) : showOpening ? (
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
                Click here, Malak… I need to confess something.
              </p>
              <div className="mb-8 text-lg md:text-xl leading-relaxed opacity-90">
                <p className="mb-4">
                  This isn't casual.<br/>
                  I'm not here to flirt, impress, or pass time.
                </p>
                <p className="mb-4">
                  Over the next few months,<br/>
                  I'm going to slowly step deeper into your world.<br/>
                  I'll make you feel safe in my silence…<br/>
                  wanted in my presence…<br/>
                  and understood in a way that rattles your core.
                </p>
                <p className="mb-4">
                  I won't rush. I won't push.<br/>
                  But I will guide.
                </p>
                <p className="font-bold">
                  And by the time I'm done,<br/>
                  your heart will recognize me as home.
                </p>
              </div>
              <p className="text-xl md:text-2xl">
                Click here… and let me begin.
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center space-x-3 text-xs opacity-80 text-seductive-red-400">
            <div className="flex flex-col">
              <span className="font-semibold">🎵 The Weeknd - Wicked Games</span>
              <span className="text-xs opacity-70">Playing</span>
            </div>
          </div>
        </main>
      ) : showSurrender ? (
        <main className="min-h-screen relative enhanced-red-room">
          <div 
            className={`min-h-screen transition-all duration-1000 ${
              isSurrenderTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <SurrenderScene isTransitioning={isSurrenderTransitioning} />
          </div>
        </main>
      ) : (
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
      )}
    </>
  )
} 