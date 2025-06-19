// Enhanced Red Room Animation System
class RedRoomAnimations {
  constructor() {
    this.isActive = false
    this.particles = []
    this.bloodDrips = []
    this.flickerIntensity = 0
    this.cursorGlow = null
    this.audioContext = null
    this.analyser = null
    this.dataArray = null
    this.redOverlay = null
    this.pulseElements = []
  }

  // Initialize all red room effects
  init() {
    try {
      console.log('RedRoomAnimations: Initializing...')
      this.isActive = true
      this.createParticles()
      this.createBloodDrips()
      this.createFlickerEffect()
      this.createCursorGlow()
      this.createRedOverlay()
      this.createPulseEffects()
      this.startAudioVisualization()
      console.log('RedRoomAnimations: Initialized successfully')
    } catch (error) {
      console.error('RedRoomAnimations: Error during initialization:', error)
    }
  }

  // Create enhanced atmospheric particles
  createParticles() {
    const container = document.createElement('div')
    container.id = 'red-room-particles'
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 15;
    `
    document.body.appendChild(container)

    // Create 25 enhanced particles with different sizes and speeds
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div')
      const size = 1 + Math.random() * 3
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #dc2626, #991b1b);
        border-radius: 50%;
        opacity: 0.7;
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px #dc2626;
      `
      
      this.particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: 0.4 + Math.random() * 0.6,
        pulse: Math.random() * Math.PI * 2
      })
      
      container.appendChild(particle)
    }

    this.animateParticles()
  }

  // Enhanced particle animation with pulsing
  animateParticles() {
    if (!this.isActive) return

    this.particles.forEach((particle, index) => {
      particle.x += particle.speedX
      particle.y += particle.speedY
      particle.pulse += 0.05

      // Wrap around screen
      if (particle.x < 0) particle.x = window.innerWidth
      if (particle.x > window.innerWidth) particle.x = 0
      if (particle.y < 0) particle.y = window.innerHeight
      if (particle.y > window.innerHeight) particle.y = 0

      // Pulsing opacity effect
      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2

      particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`
      particle.element.style.opacity = Math.max(0.1, pulseOpacity)
    })

    requestAnimationFrame(() => this.animateParticles())
  }

  // Create enhanced blood drip effects
  createBloodDrips() {
    const container = document.createElement('div')
    container.id = 'blood-drips'
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 8;
    `
    document.body.appendChild(container)

    // Create 8 enhanced blood drips with varying sizes
    for (let i = 0; i < 8; i++) {
      const drip = document.createElement('div')
      const width = 1 + Math.random() * 2
      const height = 80 + Math.random() * 40
      drip.style.cssText = `
        position: absolute;
        width: ${width}px;
        height: ${height}px;
        background: linear-gradient(to bottom, #dc2626, #991b1b, transparent);
        opacity: 0.4;
        left: ${15 + i * 10}%;
        top: -${height}px;
        animation: enhancedBloodDrip 12s infinite;
        animation-delay: ${i * 1.2}s;
        box-shadow: 0 0 10px #dc2626;
      `
      container.appendChild(drip)
    }
  }

  // Create enhanced flickering red room effect
  createFlickerEffect() {
    const overlay = document.createElement('div')
    overlay.id = 'red-room-overlay'
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, rgba(220, 38, 38, 0.15), transparent 70%);
      pointer-events: none;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.5s ease;
    `
    document.body.appendChild(overlay)

    // Enhanced flicker animation with varying intensity
    setInterval(() => {
      if (!this.isActive) return
      const intensity = 0.08 + Math.random() * 0.15
      overlay.style.opacity = intensity
    }, 1500)
  }

  // Create additional red overlay for atmosphere
  createRedOverlay() {
    this.redOverlay = document.createElement('div')
    this.redOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(220, 38, 38, 0.05), transparent, rgba(220, 38, 38, 0.08));
      pointer-events: none;
      z-index: 1;
      opacity: 0.6;
    `
    document.body.appendChild(this.redOverlay)
  }

  // Create pulsing effects around text
  createPulseEffects() {
    const container = document.createElement('div')
    container.id = 'pulse-effects'
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
    `
    document.body.appendChild(container)

    // Create pulsing circles at screen edges
    for (let i = 0; i < 6; i++) {
      const pulse = document.createElement('div')
      pulse.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        border: 2px solid rgba(220, 38, 38, 0.3);
        border-radius: 50%;
        animation: pulseExpand 4s infinite;
        animation-delay: ${i * 0.7}s;
      `
      
      // Position around screen edges
      if (i < 2) {
        pulse.style.left = `${i * 80}%`
        pulse.style.top = '10%'
      } else if (i < 4) {
        pulse.style.left = `${(i - 2) * 80}%`
        pulse.style.bottom = '10%'
      } else {
        pulse.style.left = '10%'
        pulse.style.top = `${(i - 4) * 80}%`
      }
      
      container.appendChild(pulse)
      this.pulseElements.push(pulse)
    }
  }

  // Enhanced cursor glow effect
  createCursorGlow() {
    this.cursorGlow = document.createElement('div')
    this.cursorGlow.style.cssText = `
      position: fixed;
      width: 30px;
      height: 30px;
      background: radial-gradient(circle, rgba(220, 38, 38, 0.9), rgba(220, 38, 38, 0.4), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.3s ease;
      filter: blur(1px);
    `
    document.body.appendChild(this.cursorGlow)

    // Track mouse movement with enhanced tracking
    document.addEventListener('mousemove', (e) => {
      if (!this.isActive) return
      this.cursorGlow.style.left = e.clientX - 15 + 'px'
      this.cursorGlow.style.top = e.clientY - 15 + 'px'
    })

    // Show/hide on hover with enhanced visibility
    document.addEventListener('mouseenter', () => {
      if (this.isActive) this.cursorGlow.style.opacity = '0.8'
    })
    document.addEventListener('mouseleave', () => {
      this.cursorGlow.style.opacity = '0'
    })
  }

  // Audio visualization for enhanced atmosphere
  startAudioVisualization() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 256
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    } catch (e) {
      console.log('Audio visualization not supported')
    }
  }

  // Update flicker based on audio with enhanced response
  updateFlickerFromAudio(audioElement) {
    if (!this.analyser || !audioElement) return

    try {
      const source = this.audioContext.createMediaElementSource(audioElement)
      source.connect(this.analyser)
      source.connect(this.audioContext.destination)

      const updateFlicker = () => {
        if (!this.isActive) return
        this.analyser.getByteFrequencyData(this.dataArray)
        const average = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length
        const intensity = (average / 255) * 0.3
        
        // Update red overlay intensity based on audio
        if (this.redOverlay) {
          this.redOverlay.style.opacity = 0.4 + intensity
        }
        
        this.flickerIntensity = intensity
        requestAnimationFrame(updateFlicker)
      }
      updateFlicker()
    } catch (e) {
      console.log('Audio analysis failed')
    }
  }

  // Pause all animations
  pause() {
    this.isActive = false
  }

  // Resume all animations
  resume() {
    this.isActive = true
  }

  // Clean up all effects
  destroy() {
    try {
      console.log('RedRoomAnimations: Destroying...')
      this.isActive = false
      
      // Remove all created elements
      const elements = [
        'red-room-particles',
        'blood-drips', 
        'red-room-overlay',
        'pulse-effects'
      ]
      
      elements.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          element.remove()
          console.log('Removed element:', id)
        }
      })

      // Clear arrays
      this.particles = []
      this.bloodDrips = []
      this.pulseElements = []
      
      // Close audio context
      if (this.audioContext) {
        this.audioContext.close()
      }
      
      console.log('RedRoomAnimations: Destroyed successfully')
    } catch (error) {
      console.error('RedRoomAnimations: Error during destruction:', error)
    }
  }
}

// Enhanced CSS animations
const style = document.createElement('style')
style.textContent = `
  @keyframes enhancedBloodDrip {
    0% {
      transform: translateY(-80px);
      opacity: 0;
    }
    10% {
      opacity: 0.4;
    }
    90% {
      opacity: 0.4;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }

  @keyframes seductivePulse {
    0%, 100% {
      text-shadow: 0 0 15px #dc2626, 0 0 25px #dc2626, 0 0 35px #dc2626;
    }
    50% {
      text-shadow: 0 0 25px #dc2626, 0 0 35px #dc2626, 0 0 45px #dc2626;
    }
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.08);
    }
  }

  @keyframes pulseExpand {
    0% {
      transform: scale(0.5);
      opacity: 0.8;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes stageTransition {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .seductive-glow {
    animation: seductivePulse 3s ease-in-out infinite;
  }

  .heartbeat {
    animation: heartbeat 2s ease-in-out infinite;
  }

  .stage-transition {
    animation: stageTransition 1.5s ease-in-out;
  }

  .enhanced-red-room {
    background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%);
  }
`
document.head.appendChild(style)

// Export for use in React
window.RedRoomAnimations = RedRoomAnimations 