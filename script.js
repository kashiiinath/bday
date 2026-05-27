/* ============================================
   ANOKHI'S MAGICAL BIRTHDAY — PREMIUM JAVASCRIPT
   Full cinematic overhaul
   ============================================ */

// ==========================================
// GLOBAL STATE
// ==========================================
let musicPlaying = false;
let bgMusic = null;
let candlesBlown = false;
let gameActive = false;
let gameScore = 0;
let gameTimer = 30;
let gameInterval = null;
let candyInterval = null;

// ==========================================
// LOADING SCREEN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  new Typed('#loadingText', {
    strings: ['Preparing Something Magical For Anokhi ✨'],
    typeSpeed: 40,
    showCursor: false,
    onComplete: () => {
      setTimeout(() => hideLoadingScreen(), 1500);
    }
  });
});

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  gsap.to(loadingScreen, {
    opacity: 0,
    duration: 1.2,
    ease: 'power2.inOut',
    onComplete: () => {
      loadingScreen.style.display = 'none';
      document.body.classList.add('loaded');
      initHeroAnimations();
      initParticles();
      initScrollAnimations();
      initSparkleTrail();
      initScrollProgress();
      initEmojiRain();
    }
  });
}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    bar.style.width = progress + '%';
  });
}

// ==========================================
// SPARKLE CURSOR TRAIL
// ==========================================
function initSparkleTrail() {
  const colors = ['#FFD6EC', '#CDB4FF', '#A2D2FF', '#FFDE59', '#FF69B4', '#A855F7'];
  let lastTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 40) return;
    lastTime = now;

    // Create sparkle
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (e.clientX + (Math.random() - 0.5) * 10) + 'px';
    sparkle.style.top = (e.clientY + (Math.random() - 0.5) * 10) + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 8px ${color}`;
    sparkle.style.width = (4 + Math.random() * 6) + 'px';
    sparkle.style.height = sparkle.style.width;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  });
}

// ==========================================
// EMOJI RAIN (Hero Section)
// ==========================================
function initEmojiRain() {
  const container = document.getElementById('emojiRain');
  if (!container) return;

  const emojis = ['🎈', '🎀', '🌸', '⭐', '💖', '🍭', '🧁', '✨', '🎂', '🦋', '🌟', '💫'];

  function createEmojiDrop() {
    const drop = document.createElement('span');
    drop.className = 'emoji-drop';
    drop.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDuration = (8 + Math.random() * 12) + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.style.fontSize = (0.8 + Math.random() * 1.0) + 'rem';
    drop.style.opacity = (0.15 + Math.random() * 0.25);
    container.appendChild(drop);

    setTimeout(() => drop.remove(), 22000);
  }

  // Create initial batch
  for (let i = 0; i < 15; i++) {
    setTimeout(createEmojiDrop, i * 400);
  }

  // Continue creating
  setInterval(createEmojiDrop, 1500);
}

// ==========================================
// PARTICLES (tsParticles) — Enhanced
// ==========================================
function initParticles() {
  if (typeof tsParticles === 'undefined') return;

  tsParticles.load('tsparticles', {
    particles: {
      number: { value: 40, density: { enable: true, area: 800 } },
      color: { value: ['#FFD6EC', '#CDB4FF', '#A2D2FF', '#FFDE59', '#FF69B4', '#A855F7'] },
      shape: { type: ['circle', 'star'] },
      opacity: {
        value: { min: 0.15, max: 0.5 },
        animation: { enable: true, speed: 0.8, minimumValue: 0.1 }
      },
      size: {
        value: { min: 1, max: 5 },
        animation: { enable: true, speed: 2, minimumValue: 0.5 }
      },
      move: {
        enable: true, speed: 0.6, direction: 'none',
        random: true, outModes: 'bounce'
      },
      twinkle: {
        particles: { enable: true, frequency: 0.04, color: '#ffffff' }
      },
      links: {
        enable: true, distance: 120, color: '#CDB4FF',
        opacity: 0.08, width: 1
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.2 } },
        push: { quantity: 3 }
      }
    },
    detectRetina: true,
  });
}

// ==========================================
// HERO ANIMATIONS — Enhanced
// ==========================================
function initHeroAnimations() {
  const title = document.getElementById('heroTitle');
  const titleText = 'Happiest Birthday Anokhi 🎂✨';

  title.innerHTML = '';

  // Create word groups for better layout
  [...titleText].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(40px) scale(0.5)';
    title.appendChild(span);

    gsap.to(span, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: 0.4 + i * 0.05,
      ease: 'back.out(2)',
    });
  });

  // Continuous floating animation after all letters appear
  const totalDelay = titleText.length * 0.05 + 1;
  setTimeout(() => {
    gsap.to('#heroTitle', {
      y: -5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, totalDelay * 1000);

  // Subtitle typing
  setTimeout(() => {
    new Typed('#heroSubtitle', {
      strings: ['A magical birthday world made specially for the sweetest little sister 💖'],
      typeSpeed: 28,
      showCursor: false,
    });
  }, titleText.length * 50 + 600);

  // Button entrance with bounce
  gsap.from('#unlockBtn', {
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: titleText.length * 0.05 + 2.5,
    ease: 'elastic.out(1, 0.4)',
  });

  // Character entrance
  gsap.from('.hero-character img', {
    scale: 0,
    opacity: 0,
    rotation: -20,
    duration: 1.2,
    delay: 0.2,
    ease: 'elastic.out(1, 0.4)',
  });

  // Rings entrance
  gsap.from('.hero-ring', {
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out',
  });

  // Gradient blobs subtle animation
  gsap.to('.gradient-blob', {
    scale: 1.1,
    duration: 8,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    stagger: 2,
  });
}



// ==========================================
// UNLOCK BUTTON
// ==========================================
function unlockHappiness() {
  const btn = document.getElementById('unlockBtn');
  if (!btn || btn.classList.contains('clicked')) return;
  btn.classList.add('clicked');

  playClickSound();
  createConfetti(120);
  startMusic();

  // Screen flash effect
  const glow = document.getElementById('glowOverlay');
  if (glow) {
    glow.classList.add('active');
    setTimeout(() => glow.classList.remove('active'), 1500);
  }

  // Scale down and fade out the button gracefully
  gsap.to(btn, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'back.in(1.4)',
    onComplete: () => {
      btn.style.display = 'none';
    }
  });

  // Smooth scroll to journey - Synchronous to guarantee mobile browser compatibility
  const journey = document.getElementById('journey');
  if (journey) {
    journey.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ==========================================
// CONFETTI EXPLOSION — Enhanced
// ==========================================
function createConfetti(count = 80) {
  const colors = ['#FFD6EC', '#CDB4FF', '#A2D2FF', '#FFDE59', '#FF69B4', '#A855F7', '#58D68D', '#F39C12'];
  const shapes = ['circle', 'square', 'triangle'];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = (Math.random() * 10 + 4) + 'px';
    confetti.style.height = (Math.random() * 15 + 6) + 'px';

    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'circle') confetti.style.borderRadius = '50%';
    else if (shape === 'triangle') {
      confetti.style.width = '0';
      confetti.style.height = '0';
      confetti.style.borderLeft = '6px solid transparent';
      confetti.style.borderRight = '6px solid transparent';
      confetti.style.borderBottom = '12px solid ' + confetti.style.background;
      confetti.style.background = 'transparent';
    }

    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 0.6 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// ==========================================
// BACKGROUND MUSIC
// ==========================================
function startMusic() {
  if (bgMusic) {
    if (musicPlaying) return;
    if (bgMusic.ctx && bgMusic.ctx.state === 'suspended') {
      bgMusic.ctx.resume();
    }
    bgMusic.play();
    musicPlaying = true;
    document.getElementById('musicPlayer').classList.add('playing');
    document.getElementById('musicPlayer').textContent = '🎵';
    return;
  }

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();

    function playNote(freq, startTime, duration, type = 'sine') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    }

    const melody = [
      { f: 262, t: 0, d: 0.3 }, { f: 262, t: 0.35, d: 0.15 },
      { f: 294, t: 0.55, d: 0.5 }, { f: 262, t: 1.1, d: 0.5 },
      { f: 349, t: 1.65, d: 0.5 }, { f: 330, t: 2.2, d: 0.9 },
      { f: 262, t: 3.3, d: 0.3 }, { f: 262, t: 3.65, d: 0.15 },
      { f: 294, t: 3.85, d: 0.5 }, { f: 262, t: 4.4, d: 0.5 },
      { f: 392, t: 4.95, d: 0.5 }, { f: 349, t: 5.5, d: 0.9 },
      { f: 262, t: 6.6, d: 0.3 }, { f: 262, t: 6.95, d: 0.15 },
      { f: 523, t: 7.15, d: 0.5 }, { f: 440, t: 7.7, d: 0.5 },
      { f: 349, t: 8.25, d: 0.4 }, { f: 330, t: 8.7, d: 0.4 },
      { f: 294, t: 9.15, d: 0.7 },
      { f: 466, t: 10.05, d: 0.3 }, { f: 466, t: 10.4, d: 0.15 },
      { f: 440, t: 10.6, d: 0.5 }, { f: 349, t: 11.15, d: 0.5 },
      { f: 392, t: 11.7, d: 0.5 }, { f: 349, t: 12.25, d: 1.0 },
    ];

    function playMelody() {
      const now = ctx.currentTime;
      melody.forEach(note => {
        playNote(note.f, now + note.t, note.d, 'triangle');
        playNote(note.f * 1.5, now + note.t, note.d * 0.7, 'sine');
        playNote(note.f * 0.5, now + note.t, note.d * 1.2, 'sine');
      });
    }

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        playMelody();
      });
    } else {
      playMelody();
    }

    const melodyDuration = 13500;
    bgMusic = {
      interval: setInterval(() => {
        if (ctx.state === 'suspended') {
          ctx.resume().then(() => playMelody());
        } else {
          playMelody();
        }
      }, melodyDuration),
      ctx: ctx,
      play: () => {
        if (bgMusic._stopped) {
          bgMusic._stopped = false;
          if (ctx.state === 'suspended') {
            ctx.resume().then(() => playMelody());
          } else {
            playMelody();
          }
          bgMusic.interval = setInterval(() => {
            if (ctx.state === 'suspended') {
              ctx.resume().then(() => playMelody());
            } else {
              playMelody();
            }
          }, melodyDuration);
        }
      },
      pause: () => {
        bgMusic._stopped = true;
        clearInterval(bgMusic.interval);
      },
      _stopped: false
    };

    musicPlaying = true;
    document.getElementById('musicPlayer').classList.add('playing');
    document.getElementById('musicPlayer').textContent = '🎵';
  } catch (e) {
    console.log('Audio not supported');
  }
}

// Music toggle
document.getElementById('musicPlayer').addEventListener('click', () => {
  if (!bgMusic) { startMusic(); return; }

  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    document.getElementById('musicPlayer').classList.remove('playing');
    document.getElementById('musicPlayer').textContent = '🔇';
  } else {
    if (bgMusic.ctx && bgMusic.ctx.state === 'suspended') {
      bgMusic.ctx.resume();
    }
    bgMusic.play();
    musicPlaying = true;
    document.getElementById('musicPlayer').classList.add('playing');
    document.getElementById('musicPlayer').textContent = '🎵';
  }
});

// ==========================================
// SOUND EFFECTS
// ==========================================
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}

function playCatchSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

function playWinSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.35);
    });
  } catch (e) {}
}

function playBlowSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 600;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    source.start(ctx.currentTime);
  } catch (e) {}
}

// ==========================================
// SCROLL ANIMATIONS — IntersectionObserver Reveal
// ==========================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('visible');

        // Staggered reveal for polaroid cards inside gallery-grid
        if (el.classList.contains('gallery-grid')) {
          const polaroids = el.querySelectorAll('.polaroid');
          polaroids.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.15}s`;
            card.classList.add('visible');
          });
        }

        // Staggered reveal for final section components
        if (el.classList.contains('final-section')) {
          const title = el.querySelector('.final-title');
          const message = el.querySelector('.final-message');
          const btn = el.querySelector('.replay-btn');
          if (title) title.classList.add('visible');
          if (message) {
            message.style.transitionDelay = '0.4s';
            message.classList.add('visible');
          }
          if (btn) {
            btn.style.transitionDelay = '0.8s';
            btn.classList.add('visible');
          }
        }

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe simple fade-in elements (includes journey images, journey text, journey dots, cake wrapper)
  document.querySelectorAll('.fade-in, .journey-dot, .cake-wrapper').forEach(el => {
    observer.observe(el);
  });

  // Observe complex sections/grids
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid) observer.observe(galleryGrid);

  const finalSection = document.querySelector('.final-section');
  if (finalSection) observer.observe(finalSection);
}

// ==========================================
// PHOTO MODAL
// ==========================================
function openModal(polaroid) {
  playClickSound();
  const img = polaroid.querySelector('img');
  const modal = document.getElementById('photoModal');
  document.getElementById('modalImg').src = img.src;
  modal.classList.add('active');
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('photoModal').classList.remove('active');
});

document.getElementById('photoModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('photoModal').classList.remove('active');
  }
});

// ==========================================
// MINI GAME — CATCH THE CANDIES
// ==========================================
const candyEmojis = ['🍭', '🍬', '🍫', '🍩', '🧁', '🍪', '🍰', '🎂', '🍡', '⭐', '💎', '🌟'];

function startGame() {
  playClickSound();
  gameScore = 0; gameTimer = 30; gameActive = true;
  document.getElementById('gameScore').textContent = '🍬 Score: 0';
  document.getElementById('gameTimer').textContent = '⏰ Time: 30s';
  document.getElementById('gameStartBtn').style.display = 'none';
  document.getElementById('gameOverPopup').classList.remove('active');

  document.querySelectorAll('.game-candy').forEach(c => c.remove());

  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    gameTimer--;
    document.getElementById('gameTimer').textContent = `⏰ Time: ${gameTimer}s`;
    if (gameTimer <= 0) endGame();
  }, 1000);

  clearInterval(candyInterval);
  candyInterval = setInterval(spawnCandy, 500);

  const container = document.getElementById('gameContainer');
  const basket = document.getElementById('gameBasket');

  const moveBasket = (x) => {
    const rect = container.getBoundingClientRect();
    let relX = x - rect.left;
    relX = Math.max(40, Math.min(relX, rect.width - 40));
    basket.style.left = relX + 'px';
    basket.style.transform = 'translateX(-50%)';
  };

  container.onmousemove = (e) => { if (gameActive) moveBasket(e.clientX); };
  container.ontouchmove = (e) => {
    if (!gameActive) return;
    e.preventDefault();
    moveBasket(e.touches[0].clientX);
  };
}

function spawnCandy() {
  if (!gameActive) return;

  const container = document.getElementById('gameContainer');
  const candy = document.createElement('div');
  candy.className = 'game-candy';
  candy.textContent = candyEmojis[Math.floor(Math.random() * candyEmojis.length)];

  const containerWidth = container.offsetWidth;
  const left = Math.random() * (containerWidth - 40) + 20;
  candy.style.left = left + 'px';
  candy.style.top = '50px';
  container.appendChild(candy);

  const duration = 2200 + Math.random() * 1300;
  const containerHeight = container.offsetHeight;
  let startTime = null;
  const basket = document.getElementById('gameBasket');

  function animateCandy(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress >= 1 || !gameActive) { candy.remove(); return; }

    const currentTop = 50 + progress * (containerHeight - 80);
    candy.style.top = currentTop + 'px';
    const sway = Math.sin(progress * Math.PI * 4) * 18;
    candy.style.left = (left + sway) + 'px';

    const candyRect = candy.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (candyRect.bottom >= basketRect.top && candyRect.top <= basketRect.bottom &&
        candyRect.left < basketRect.right && candyRect.right > basketRect.left) {
      gameScore++;
      document.getElementById('gameScore').textContent = `🍬 Score: ${gameScore}`;
      playCatchSound();
      candy.style.transition = 'transform 0.2s, opacity 0.2s';
      candy.style.transform = 'scale(1.5)';
      candy.style.opacity = '0';
      setTimeout(() => candy.remove(), 200);
      return;
    }

    requestAnimationFrame(animateCandy);
  }

  requestAnimationFrame(animateCandy);

  const catchCandy = (e) => {
    if (e) e.preventDefault();
    if (!gameActive) return;
    gameScore++;
    document.getElementById('gameScore').textContent = `🍬 Score: ${gameScore}`;
    playCatchSound();
    candy.style.transition = 'transform 0.2s, opacity 0.2s';
    candy.style.transform = 'scale(1.5)';
    candy.style.opacity = '0';
    setTimeout(() => candy.remove(), 200);
  };

  candy.addEventListener('click', catchCandy);
  candy.addEventListener('touchstart', catchCandy);
}

function endGame() {
  gameActive = false;
  clearInterval(gameInterval);
  clearInterval(candyInterval);
  document.querySelectorAll('.game-candy').forEach(c => c.remove());

  const popup = document.getElementById('gameOverPopup');
  const title = document.getElementById('gameOverTitle');
  const score = document.getElementById('gameOverScore');

  if (gameScore >= 20) title.textContent = 'Yayyy Anokhi Wins! 🎉✨';
  else if (gameScore >= 10) title.textContent = 'Amazing Job Anokhi! 🌟';
  else title.textContent = 'Great Try Anokhi! 💖';

  score.textContent = `You caught ${gameScore} candies! 🍬`;
  popup.classList.add('active');
  playWinSound();
  createConfetti(50);

  document.getElementById('gameStartBtn').style.display = 'inline-block';
  document.getElementById('gameStartBtn').textContent = 'Play Again 🎮';
}

// ==========================================
// BLOW CANDLES
// ==========================================
function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;
  playBlowSound();
  playClickSound();

  const flames = document.querySelectorAll('.flame');
  flames.forEach((flame, i) => {
    setTimeout(() => flame.classList.add('blown'), i * 200);
  });

  document.getElementById('blowBtn').disabled = true;
  document.getElementById('blowBtn').textContent = '✨ Candles Blown! ✨';

  setTimeout(() => {
    createFireworks();
    createConfetti(120);

    const glow = document.getElementById('glowOverlay');
    glow.classList.add('active');
    setTimeout(() => glow.classList.remove('active'), 3000);

    document.getElementById('wishText').classList.add('visible');

    setTimeout(() => createFireworks(), 800);
    setTimeout(() => createFireworks(), 1600);
    setTimeout(() => createFireworks(), 2400);
  }, flames.length * 200 + 400);
}

// ==========================================
// FIREWORKS — Enhanced
// ==========================================
function createFireworks() {
  const colors = ['#FF69B4', '#FFD6EC', '#CDB4FF', '#A2D2FF', '#FFDE59', '#A855F7', '#FF6BA6', '#58D68D'];

  for (let f = 0; f < 4; f++) {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.5;
      firework.style.left = x + 'px';
      firework.style.top = y + 'px';

      for (let i = 0; i < 28; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 8px ${color}`;

        const angle = (i / 28) * Math.PI * 2;
        const distance = 60 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        firework.appendChild(particle);

        requestAnimationFrame(() => {
          particle.style.transition = `transform ${1.2 + Math.random() * 0.8}s ease-out, opacity ${1.2 + Math.random() * 0.8}s ease-out`;
          particle.style.transform = `translate(${tx}px, ${ty}px)`;
          particle.style.opacity = '0';
        });
      }

      document.body.appendChild(firework);
      setTimeout(() => firework.remove(), 2500);
    }, f * 400);
  }

  // Firework sound
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / bufferSize, 2.5);
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass'; filter.frequency.value = 1200;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        source.start(ctx.currentTime);
      }, i * 400);
    }
  } catch (e) {}
}

// ==========================================
// REPLAY MAGIC
// ==========================================
function replayMagic() {
  playClickSound();
  candlesBlown = false;
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown'));
  document.getElementById('blowBtn').disabled = false;
  document.getElementById('blowBtn').textContent = 'Blow The Candles 🕯️';
  document.getElementById('wishText').classList.remove('visible');

  // Reset visibility classes except for loaded body state
  document.querySelectorAll('.visible, .polaroid.visible, .cake-wrapper.visible').forEach(el => {
    el.classList.remove('visible');
    el.style.transitionDelay = '';
  });

  // Restore the unlock button
  const unlockBtn = document.getElementById('unlockBtn');
  if (unlockBtn) {
    unlockBtn.classList.remove('clicked');
    unlockBtn.style.display = 'inline-block';
    gsap.set(unlockBtn, { scale: 1, opacity: 1 });
  }

  // Re-observe everything
  initScrollAnimations();

  createConfetti(80);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// VANILLA TILT INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 8, speed: 400, glare: true, 'max-glare': 0.15,
    });
  }
});

// ==========================================
// KEYBOARD GAME CONTROLS
// ==========================================
document.addEventListener('keydown', (e) => {
  if (!gameActive) return;
  const basket = document.getElementById('gameBasket');
  const container = document.getElementById('gameContainer');
  const currentLeft = parseInt(basket.style.left) || container.offsetWidth / 2;
  const step = 28;

  if (e.key === 'ArrowLeft' || e.key === 'a') {
    basket.style.left = Math.max(40, currentLeft - step) + 'px';
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    basket.style.left = Math.min(container.offsetWidth - 40, currentLeft + step) + 'px';
  }
});

// ==========================================
// TAB VISIBILITY
// ==========================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden && musicPlaying && bgMusic) bgMusic.pause();
  else if (!document.hidden && musicPlaying && bgMusic) bgMusic.play();
});
