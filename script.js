/**
 * AYISHA // CYBERPUNK & RETRO PIXEL-ART JAVASCRIPT ENGINE
 * Features: Web Audio API Synthesizer, 3D Parallax, Canvas Matrix/Starfield,
 * Interactive IoT Fire Alarm Simulator, Physics Skills Inspector, Custom Cursor.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. WEB AUDIO API SYNTHESIZER (8-BIT RETRO FX ENGINE)
       ========================================================================== */
    let audioCtx = null;
    let soundEnabled = false;

    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function play8BitTone(freq, type = 'square', duration = 0.08, gainVal = 0.05) {
        if (!soundEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context error fallback
        }
    }

    function playBootBeep() {
        play8BitTone(587.33, 'square', 0.06, 0.04);
        setTimeout(() => play8BitTone(880, 'square', 0.1, 0.05), 80);
    }

    function playHoverBlip() {
        play8BitTone(620, 'sine', 0.04, 0.02);
    }

    function playClickLaser() {
        if (!soundEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
        } catch (e) {}
    }

    function playAlarmSiren() {
        if (!soundEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(900, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(450, audioCtx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } catch (e) {}
    }

    // Audio HUD Toggle
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const soundStatus = document.getElementById('sound-status');
    const soundIcon = document.getElementById('sound-icon');

    soundToggleBtn?.addEventListener('click', () => {
        initAudio();
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundStatus.textContent = 'ONLINE';
            soundStatus.classList.add('neon-green');
            soundIcon.textContent = '🔊';
            play8BitTone(523.25, 'triangle', 0.1, 0.06);
            setTimeout(() => play8BitTone(783.99, 'triangle', 0.15, 0.06), 100);
        } else {
            soundStatus.textContent = 'MUTED';
            soundStatus.classList.remove('neon-green');
            soundIcon.textContent = '🔈';
        }
    });

    /* ==========================================================================
       2. CINEMATIC PRELOADER / SYSTEM BOOT SEQUENCE
       ========================================================================== */
    const bootScreen = document.getElementById('boot-screen');
    const progressBar = document.getElementById('boot-progress-bar');
    const enterBtn = document.getElementById('enter-world-btn');
    let progress = 0;

    const bootInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress > 100) progress = 100;
        if (progressBar) progressBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(bootInterval);
            if (enterBtn) {
                enterBtn.removeAttribute('disabled');
                enterBtn.querySelector('.btn-text').textContent = "ENTER AYISHA'S DIGITAL WORLD";
                const glitchEl = enterBtn.querySelector('.btn-glitch');
                if (glitchEl) glitchEl.textContent = "ENTER AYISHA'S DIGITAL WORLD";
            }
        }
    }, 120);

    function startExperience() {
        initAudio();
        playBootBeep();
        if (bootScreen) {
            bootScreen.classList.add('hidden');
        }
        document.body.classList.remove('loading');
        triggerHeroReveal();
    }

    enterBtn?.addEventListener('click', startExperience);

    // Auto-timeout fallback if user does not click after 5s
    setTimeout(() => {
        if (!bootScreen?.classList.contains('hidden')) {
            if (enterBtn) {
                enterBtn.removeAttribute('disabled');
                enterBtn.querySelector('.btn-text').textContent = "ENTER AYISHA'S DIGITAL WORLD";
            }
        }
    }, 2500);

    /* ==========================================================================
       3. BACKGROUND CANVAS (CIRCUIT STARS & NEURAL PARTICLES)
       ========================================================================== */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const numParticles = Math.min(width > 768 ? 65 : 30, 80);

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.4 ? '#00ffcc' : '#ff007f',
                alpha: Math.random() * 0.6 + 0.2
            });
        }

        let mouseX = width / 2;
        let mouseY = height / 2;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            // Draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fillRect(p.x, p.y, p.size, p.size);

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.strokeStyle = '#00ffcc';
                        ctx.globalAlpha = (1 - dist / 110) * 0.15;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1.0;
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    /* ==========================================================================
       4. CUSTOM CURSOR & MAGNETIC BUTTON INTERACTIONS
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    let mouseClientX = -100;
    let mouseClientY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseClientX = e.clientX;
        mouseClientY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseClientX}px`;
            cursorDot.style.top = `${mouseClientY}px`;
        }
    });

    function renderCursorRing() {
        ringX += (mouseClientX - ringX) * 0.2;
        ringY += (mouseClientY - ringY) * 0.2;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }
        requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Hover state on links & buttons
    const interactiveElements = document.querySelectorAll('a, button, [data-magnetic], .floating-skill-node');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursorRing?.classList.add('active-hover');
            playHoverBlip();
        });
        el.addEventListener('mouseleave', () => {
            cursorRing?.classList.remove('active-hover');
        });
        el.addEventListener('click', () => {
            playClickLaser();
        });
    });

    // Magnetic buttons movement
    const magneticItems = document.querySelectorAll('[data-magnetic]');
    magneticItems.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    /* ==========================================================================
       5. HEROINE ENTRY & 3D MOUSE PARALLAX
       ========================================================================== */
    const heroineStage = document.getElementById('heroine-stage');
    const heroineChar = document.getElementById('heroine-char');
    const ring1 = document.getElementById('orbit-ring-1');
    const ring2 = document.getElementById('orbit-ring-2');

    window.addEventListener('mousemove', (e) => {
        if (!heroineStage) return;
        const rect = heroineStage.getBoundingClientRect();
        const stageCenterX = rect.left + rect.width / 2;
        const stageCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - stageCenterX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - stageCenterY) / (window.innerHeight / 2);

        if (heroineChar) {
            heroineChar.style.transform = `rotateY(${deltaX * 18}deg) rotateX(${-deltaY * 18}deg) translateZ(30px)`;
        }
        if (ring1) {
            ring1.style.transform = `rotateX(${65 + deltaY * 20}deg) rotateY(${deltaX * 25}deg)`;
        }
        if (ring2) {
            ring2.style.transform = `rotateX(${75 - deltaY * 20}deg) rotateY(${-deltaX * 25}deg)`;
        }
    });

    function triggerHeroReveal() {
        const heroContent = document.getElementById('hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }

    // Dynamic Typing subtitle in hero
    const typeTarget = document.getElementById('hero-role-typing');
    const roles = [
        "COMPUTER SCIENCE ENGINEERING STUDENT",
        "EMBEDDED IOT & ROBOTICS EXPLORER",
        "DATA STRUCTURES & ALGORITHM BUILDER",
        "CREATIVE TECHNOLOGIST & AI ENTHUSIAST"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeRoleEffect() {
        if (!typeTarget) return;
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 30 : 65;

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 2200; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeRoleEffect, speed);
    }
    setTimeout(typeRoleEffect, 1000);

    /* ==========================================================================
       6. INTERACTIVE SKILLS INSPECTOR HUD
       ========================================================================== */
    const skillNodes = document.querySelectorAll('.floating-skill-node');
    const inspectName = document.getElementById('inspect-skill-name');
    const inspectDesc = document.getElementById('inspect-skill-desc');

    skillNodes.forEach((node) => {
        node.addEventListener('mouseenter', () => {
            const skill = node.getAttribute('data-skill');
            const cat = node.getAttribute('data-cat');
            const desc = node.getAttribute('data-desc');
            const mastery = node.getAttribute('data-mastery');

            if (inspectName && inspectDesc) {
                inspectName.textContent = `[${skill}] // CATEGORY: ${cat} • FOCUS: ${mastery}`;
                inspectDesc.textContent = desc;
            }

            skillNodes.forEach((n) => n.classList.remove('active-inspect'));
            node.classList.add('active-inspect');
        });

        node.addEventListener('click', () => {
            play8BitTone(700, 'triangle', 0.12, 0.05);
            node.classList.toggle('pulse');
        });
    });

    /* ==========================================================================
       7. IOT SMART FIRE ALARM INTERACTIVE SIMULATOR
       ========================================================================== */
    const triggerFlameBtn = document.getElementById('trigger-flame-sim-btn');
    const resetFlameBtn = document.getElementById('reset-flame-sim-btn');
    const flameSensorLed = document.getElementById('sensor-flame-led');
    const buzzerUnit = document.getElementById('alarm-buzzer-unit');
    const buzzerStateText = document.getElementById('buzzer-state-text');
    const flameParticles = document.getElementById('flame-particles');
    const telemetryFlameVal = document.getElementById('telemetry-flame-val');
    const telemetryCloudVal = document.getElementById('telemetry-cloud-val');
    const telemetryAlarmVal = document.getElementById('telemetry-alarm-val');
    const simStatus = document.querySelector('.sim-status');
    const simStatusTxt = document.getElementById('sim-status-txt');
    const flameBtnText = document.getElementById('flame-btn-text');

    let isAlarmActive = false;
    let alarmToneInterval = null;

    function triggerFireAlarmSimulation() {
        isAlarmActive = true;
        
        // Sensor & MCU state
        flameSensorLed?.classList.add('active');
        buzzerUnit?.classList.add('active');
        if (buzzerStateText) buzzerStateText.textContent = "ALARM: 4.5kHz ACTIVE";
        flameParticles?.classList.add('active');

        // Telemetry values
        if (telemetryFlameVal) {
            telemetryFlameVal.textContent = "120 (FIRE DETECTED!)";
            telemetryFlameVal.className = "r-val neon-magenta";
        }
        if (telemetryCloudVal) {
            telemetryCloudVal.textContent = "DISPATCHING ALERT PUSH...";
            telemetryCloudVal.className = "r-val neon-amber";
        }
        if (telemetryAlarmVal) {
            telemetryAlarmVal.textContent = "SIREN ENGAGED";
            telemetryAlarmVal.className = "r-val neon-magenta";
        }

        // Header status
        simStatus?.classList.add('sim-alert');
        if (simStatusTxt) simStatusTxt.textContent = "CRITICAL HAZARD DETECTED // ESP32 ACTIVATED";
        if (flameBtnText) flameBtnText.textContent = "FLAME HAZARD ACTIVE";

        // Sound Siren Loop
        playAlarmSiren();
        if (alarmToneInterval) clearInterval(alarmToneInterval);
        alarmToneInterval = setInterval(() => {
            if (isAlarmActive) playAlarmSiren();
        }, 350);
    }

    function resetFireAlarmSimulation() {
        isAlarmActive = false;
        if (alarmToneInterval) clearInterval(alarmToneInterval);

        flameSensorLed?.classList.remove('active');
        buzzerUnit?.classList.remove('active');
        if (buzzerStateText) buzzerStateText.textContent = "STANDBY";
        flameParticles?.classList.remove('active');

        if (telemetryFlameVal) {
            telemetryFlameVal.textContent = "4095 (NO FLAME)";
            telemetryFlameVal.className = "r-val";
        }
        if (telemetryCloudVal) {
            telemetryCloudVal.textContent = "ONLINE (ALL NORMAL)";
            telemetryCloudVal.className = "r-val neon-green";
        }
        if (telemetryAlarmVal) {
            telemetryAlarmVal.textContent = "ALL CLEAR";
            telemetryAlarmVal.className = "r-val";
        }

        simStatus?.classList.remove('sim-alert');
        if (simStatusTxt) simStatusTxt.textContent = "ESP32 TELEMETRY: NORMAL";
        if (flameBtnText) flameBtnText.textContent = "SIMULATE FLAME EVENT";

        play8BitTone(440, 'sine', 0.1, 0.04);
    }

    triggerFlameBtn?.addEventListener('click', () => {
        if (!isAlarmActive) {
            triggerFireAlarmSimulation();
        } else {
            resetFireAlarmSimulation();
        }
    });

    resetFlameBtn?.addEventListener('click', resetFireAlarmSimulation);

    /* ==========================================================================
       8. 3D TILT EFFECT ON CARDS
       ========================================================================== */
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    /* ==========================================================================
       9. SCROLL REVEAL OBSERVER
       ========================================================================== */
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => revealObserver.observe(el));

    /* ==========================================================================
       10. CONTACT FORM ENCRYPTED DISPATCH SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const feedbackNote = document.getElementById('form-feedback-note');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        play8BitTone(660, 'square', 0.1, 0.06);
        setTimeout(() => play8BitTone(990, 'square', 0.2, 0.08), 120);

        if (feedbackNote) {
            feedbackNote.innerHTML = '<span class="neon-green">✔ TRANSMISSION DISPATCHED TO AYISHA // STATUS: RECEIVED!</span>';
        }

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');

        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (messageInput) messageInput.value = '';
    });

    /* ==========================================================================
       11. ART-INTEGRATED NAVIGATION HUD CONTROLLER & SCROLL SPY
       ========================================================================== */
    const navItems = document.querySelectorAll('.nav-art-item');
    const navLinks = document.querySelectorAll('.nav-art-link');
    const circuitBeacon = document.getElementById('nav-circuit-beacon');
    const activeSectionText = document.getElementById('nav-active-section-name');
    const scrollProgressLine = document.getElementById('scroll-progress-line');
    const scrollProgressVal = document.getElementById('scroll-progress-val');
    const mobileHudToggle = document.getElementById('mobile-hud-toggle');
    const cyberNavHud = document.getElementById('cyber-nav-hud');

    // Section IDs mapping
    const sectionIds = ['hero', 'about', 'skills', 'timeline', 'projects', 'contact'];
    const sectionElements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    // Scroll Progress Tracker & Scroll Spy
    function onWindowScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100) : 0;

        if (scrollProgressLine) {
            scrollProgressLine.style.height = `${scrollPercent}%`;
        }
        if (scrollProgressVal) {
            const formatted = Math.round(scrollPercent).toString().padStart(2, '0');
            scrollProgressVal.textContent = `${formatted}%`;
        }

        // Detect Active Section
        let currentSectionId = 'hero';
        const scrollOffset = window.innerHeight * 0.35;

        for (let i = 0; i < sectionElements.length; i++) {
            const sec = sectionElements[i];
            const top = sec.offsetTop - scrollOffset;
            const height = sec.offsetHeight;
            if (scrollTop >= top && scrollTop < top + height) {
                currentSectionId = sec.id;
                break;
            }
        }

        // Update Active Nav Item & Circuit Beacon Position
        navItems.forEach((item, index) => {
            const secAttr = item.getAttribute('data-section');
            if (secAttr === currentSectionId) {
                if (!item.classList.contains('active')) {
                    navItems.forEach(n => n.classList.remove('active'));
                    item.classList.add('active');

                    // Animate Circuit Beacon
                    if (circuitBeacon) {
                        const targetY = 18 + index * 32;
                        circuitBeacon.setAttribute('cy', targetY);
                    }

                    // Update HUD Telemetry
                    if (activeSectionText) {
                        activeSectionText.textContent = `LOC: [${currentSectionId.toUpperCase()}]`;
                    }
                }
            }
        });
    }

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    onWindowScroll(); // Initial run

    // Smooth Scroll on Click
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    playClickLaser();
                    
                    // Close mobile HUD if open
                    if (cyberNavHud?.classList.contains('mobile-open')) {
                        cyberNavHud.classList.remove('mobile-open');
                        mobileHudToggle?.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Mobile Navigation HUD Toggle
    mobileHudToggle?.addEventListener('click', () => {
        const isOpen = cyberNavHud?.classList.toggle('mobile-open');
        mobileHudToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        play8BitTone(isOpen ? 660 : 440, 'triangle', 0.08, 0.05);
    });

    /* ==========================================================================
       12. THEME & NEON GLOW TOGGLE
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'light' ? '☀️' : '⚡';
        }
        play8BitTone(550, 'sine', 0.08, 0.05);
    });

    // Console Easter Egg for Engineers
    console.log(
        "%cAYISHA.DEV %c// COMPUTER SCIENCE ENGINEERING",
        "color: #00ffcc; font-size: 16px; font-weight: bold; background: #05060b; padding: 4px 8px; border: 1px solid #00ffcc;",
        "color: #ff007f; font-size: 14px; font-weight: bold;"
    );
    console.log(
        "%c“I don’t just learn how technology works. I like discovering what I can build with it.”",
        "color: #a0b3d6; font-style: italic;"
    );

});

