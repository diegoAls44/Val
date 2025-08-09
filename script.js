// Variables globales
let heartId = 0
let showingSong = false
let particleId = 0

// Detectar si es dispositivo móvil
const isMobile = window.innerWidth <= 768

// Función para crear partículas de fondo (optimizada para móvil)
function createParticle() {
  const particlesContainer = document.getElementById("particles-container")
  const particle = document.createElement("div")
  particle.className = "particle"
  particle.style.left = Math.random() * 100 + "%"
  particle.style.animationDuration = Math.random() * 15 + 10 + "s"
  particle.style.animationDelay = Math.random() * 5 + "s"
  particle.id = "particle-" + particleId

  particlesContainer.appendChild(particle)

  // Remover partícula después de la animación
  setTimeout(() => {
    const particleToRemove = document.getElementById("particle-" + particleId)
    if (particleToRemove) {
      particleToRemove.remove()
    }
  }, 25000)

  particleId++
}

// Crear partículas con menor frecuencia en móvil
const particleInterval = isMobile ? 1000 : 500
setInterval(createParticle, particleInterval)

// Función optimizada para crear corazones
function createHeart(x, y) {
  const heartsContainer = document.getElementById("hearts-container")
  const heart = document.createElement("div")
  heart.className = "heart"

  // Variedad de corazones
  const heartTypes = ["❤️", "💖", "💕", "💗", "💓", "💝"]
  heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)]

  // Posición aleatoria alrededor del cursor/toque
  const offsetX = (Math.random() - 0.5) * (isMobile ? 30 : 40)
  const offsetY = (Math.random() - 0.5) * (isMobile ? 30 : 40)

  heart.style.left = x + offsetX - 12 + "px"
  heart.style.top = y + offsetY - 12 + "px"
  heart.style.fontSize = Math.random() * 8 + (isMobile ? 12 : 15) + "px"
  heart.id = "heart-" + heartId

  heartsContainer.appendChild(heart)

  // Remover el corazón después de la animación
  setTimeout(() => {
    const heartToRemove = document.getElementById("heart-" + heartId)
    if (heartToRemove) {
      heartToRemove.remove()
    }
  }, 3000)

  heartId++
}

// Event listeners optimizados para móvil y desktop
let lastHeartTime = 0
const heartThrottle = isMobile ? 200 : 100

if (isMobile) {
  // Para dispositivos táctiles
  document.addEventListener("touchstart", (e) => {
    const currentTime = Date.now()
    if (currentTime - lastHeartTime > heartThrottle && Math.random() > 0.8) {
      const touch = e.touches[0]
      createHeart(touch.clientX, touch.clientY)
      lastHeartTime = currentTime
    }
  })

  document.addEventListener("touchmove", (e) => {
    const currentTime = Date.now()
    if (currentTime - lastHeartTime > heartThrottle && Math.random() > 0.9) {
      const touch = e.touches[0]
      createHeart(touch.clientX, touch.clientY)
      lastHeartTime = currentTime
    }
  })
} else {
  // Para dispositivos con mouse
  document.addEventListener("mousemove", (e) => {
    const currentTime = Date.now()
    if (currentTime - lastHeartTime > heartThrottle && Math.random() > 0.7) {
      createHeart(e.clientX, e.clientY)
      lastHeartTime = currentTime
    }
  })
}

// Función mejorada para toggle de la canción
function toggleSong() {
  const songCard = document.getElementById("song-card")
  const songButton = document.getElementById("song-button")
  const buttonText = songButton.querySelector(".button-text")

  if (showingSong) {
    songCard.classList.add("hidden")
    buttonText.textContent = "Una pequeña muestra de lo tanto que te quiero, princesa"
    showingSong = false

    // Efecto de ripple
    createRipple(songButton)
  } else {
    songCard.classList.remove("hidden")
    buttonText.textContent = "Ocultar Canción"
    showingSong = true

    // Efecto de ripple
    createRipple(songButton)

    // Scroll suave hacia la tarjeta de canción
    setTimeout(() => {
      songCard.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 100)
  }
}

// Función para crear efecto ripple
function createRipple(button) {
  const ripple = document.createElement("div")
  ripple.className = "ripple-effect"
  ripple.style.position = "absolute"
  ripple.style.borderRadius = "50%"
  ripple.style.background = "rgba(255, 255, 255, 0.6)"
  ripple.style.transform = "scale(0)"
  ripple.style.animation = "ripple 0.6s linear"
  ripple.style.left = "50%"
  ripple.style.top = "50%"
  ripple.style.width = "20px"
  ripple.style.height = "20px"
  ripple.style.marginLeft = "-10px"
  ripple.style.marginTop = "-10px"

  button.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Agregar CSS para el efecto ripple
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`

const style = document.createElement("style")
style.textContent = rippleCSS
document.head.appendChild(style)

// Event listener para el botón de canción
document.getElementById("song-button").addEventListener("click", toggleSong)

// Función para animar elementos cuando entran en viewport (optimizada)
function animateOnScroll() {
  const cards = document.querySelectorAll(".card")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
}

// Función para efectos de texto dinámico (solo en desktop)
function addTextEffects() {
  if (!isMobile) {
    const titleWords = document.querySelectorAll(".title-word")

    titleWords.forEach((word, index) => {
      word.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1) rotateY(8deg)"
        this.style.textShadow = "0 0 25px rgba(255, 255, 255, 0.8)"
      })

      word.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1) rotateY(0deg)"
        this.style.textShadow = "0 0 15px rgba(255, 255, 255, 0.5)"
      })
    })
  }
}

// Función para optimizar rendimiento
function optimizePerformance() {
  // Limpiar elementos antiguos periódicamente
  setInterval(
    () => {
      const hearts = document.querySelectorAll(".heart")
      const particles = document.querySelectorAll(".particle")

      // Límites más bajos para móvil
      const maxHearts = isMobile ? 30 : 50
      const maxParticles = isMobile ? 20 : 30

      if (hearts.length > maxHearts) {
        for (let i = 0; i < (isMobile ? 5 : 10); i++) {
          if (hearts[i]) hearts[i].remove()
        }
      }

      if (particles.length > maxParticles) {
        for (let i = 0; i < (isMobile ? 3 : 5); i++) {
          if (particles[i]) particles[i].remove()
        }
      }
    },
    isMobile ? 3000 : 5000,
  )
}

// Función para manejar la orientación en móvil
function handleOrientationChange() {
  if (isMobile) {
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        // Recalcular dimensiones después del cambio de orientación
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
      }, 100)
    })

    // Establecer altura inicial
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }
}

// Función para reducir animaciones si el usuario prefiere menos movimiento
function respectMotionPreferences() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Reducir o eliminar animaciones
    const style = document.createElement("style")
    style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `
    document.head.appendChild(style)
  }
}

// Inicialización cuando la página carga
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar funciones optimizadas
  setTimeout(() => {
    animateOnScroll()
    addTextEffects()
    handleOrientationChange()
    respectMotionPreferences()
  }, 500)

  // Efecto de entrada para el título (optimizado)
  const titleWords = document.querySelectorAll(".title-word")
  titleWords.forEach((word, index) => {
    word.style.opacity = "0"
    word.style.transform = "translateY(30px)"
    setTimeout(() => {
      word.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      word.style.opacity = "1"
      word.style.transform = "translateY(0)"
    }, index * 150)
  })

  // Crear partículas iniciales (menos en móvil)
  const initialParticles = isMobile ? 5 : 10
  for (let i = 0; i < initialParticles; i++) {
    setTimeout(createParticle, i * 200)
  }
})

// Inicializar optimización de rendimiento
optimizePerformance()

// Función para manejar el scroll suave en móvil
function smoothScrollPolyfill() {
  if (isMobile && !("scrollBehavior" in document.documentElement.style)) {
    // Polyfill para scroll suave en navegadores que no lo soportan
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Llamar al polyfill
smoothScrollPolyfill()

// Función para manejar el rendimiento de las animaciones
function throttleAnimations() {
  let ticking = false

  function updateAnimations() {
    // Actualizar animaciones aquí si es necesario
    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateAnimations)
      ticking = true
    }
  }

  // Throttle scroll events
  window.addEventListener("scroll", requestTick)
}

// Inicializar throttling de animaciones
throttleAnimations()

// Función para pausar animaciones cuando la pestaña no está visible
function handleVisibilityChange() {
  document.addEventListener("visibilitychange", () => {
    const particles = document.querySelectorAll(".particle")
    const flowers = document.querySelectorAll(".flower")
    const bubbles = document.querySelectorAll(".bubble")

    if (document.hidden) {
      // Pausar animaciones cuando la pestaña no está visible
      particles.forEach((p) => (p.style.animationPlayState = "paused"))
      flowers.forEach((f) => (f.style.animationPlayState = "paused"))
      bubbles.forEach((b) => (b.style.animationPlayState = "paused"))
    } else {
      // Reanudar animaciones cuando la pestaña vuelve a estar visible
      particles.forEach((p) => (p.style.animationPlayState = "running"))
      flowers.forEach((f) => (f.style.animationPlayState = "running"))
      bubbles.forEach((b) => (b.style.animationPlayState = "running"))
    }
  })
}

// Inicializar manejo de visibilidad
handleVisibilityChange()

// Función para mejorar la accesibilidad
function improveAccessibility() {
  // Agregar soporte para navegación por teclado
  const interactiveElements = document.querySelectorAll("button, .card")

  interactiveElements.forEach((element) => {
    element.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })
  })

  // Mejorar el contraste para usuarios con problemas de visión
  if (window.matchMedia("(prefers-contrast: high)").matches) {
    document.body.style.filter = "contrast(1.2)"
  }
}

// Inicializar mejoras de accesibilidad
improveAccessibility()

console.log("🌸 Página cargada con optimizaciones para móvil 💙💚")
