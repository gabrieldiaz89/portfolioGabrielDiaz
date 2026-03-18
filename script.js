let menuVisible = false;

// Oculta o muestra el menú responsive
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// ─── IntersectionObserver: revelar secciones al hacer scroll ───────────────
const observerOptions = { threshold: 0.08 };

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tipo = entry.target.getAttribute('data-reveal') || 'fade-up';
            entry.target.classList.add('reveal-visible', `reveal-${tipo}`);
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.add('reveal-base');
    revealObserver.observe(el);
});

// ─── Contador animado para las métricas de Skills ──────────────────────────
function animateCounter(el, target, suffix = '') {
    const duration = 1400;
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            animateCounter(el, target, suffix);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ─── Chips: animación de entrada escalonada ────────────────────────────────
const chipsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chips = entry.target.querySelectorAll('.chip');
            chips.forEach((chip, i) => {
                chip.style.opacity = '0';
                chip.style.transform = 'translateY(10px)';
                chip.style.transition = `opacity .35s ease ${i * 30}ms, transform .35s ease ${i * 30}ms`;
                setTimeout(() => {
                    chip.style.opacity = '1';
                    chip.style.transform = 'translateY(0)';
                }, 60);
            });
            chipsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.chips').forEach(el => {
    chipsObserver.observe(el);
});

// ─── Enviar correo ─────────────────────────────────────────────────────────
function enviarCorreo() {
    const asunto   = document.getElementById('asuntoInput').value;
    const nombre   = document.getElementById('nombreInput').value;
    const telefono = document.getElementById('numeroTelefonoInput').value;
    const mensaje  = document.getElementById('mensajeInput').value;

    const cuerpo = `Hola, soy ${nombre} (tel: ${telefono}).\n\n${mensaje}`;

    const mailtoLink =
        'mailto:gabrielgustavodiaz89@gmail.com' +
        '?subject=' + encodeURIComponent(asunto) +
        '&body='    + encodeURIComponent(cuerpo);

    window.location.href = mailtoLink;
}

// ─── Header: agregar clase al hacer scroll ─────────────────────────────────
const header = document.querySelector('.contenedor-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.style.background = 'rgba(2,6,23,0.98)';
    } else {
        header.style.background = 'rgba(2,6,23,0.85)';
    }
}, { passive: true });


// ─── Active section tracking: nav + dots + progress bar ──────────────────
(function () {
    const sections = ['inicio','sobremi','skills','curriculum','contacto'];
    const progressBar = document.querySelector('.section-progress-bar');

    function getActive() {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (progressBar) {
            progressBar.style.width = Math.min(100, (scrollY / docH) * 100) + '%';
        }

        // Find active section
        let current = sections[0];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.getBoundingClientRect().top <= 80) current = id;
        });

        // Update nav links
        document.querySelectorAll('[data-nav]').forEach(a => {
            a.classList.toggle('nav-active', a.getAttribute('data-nav') === current);
        });

        // Update dots
        document.querySelectorAll('.section-indicator-dot').forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('data-target') === current);
        });
    }

    // Dot click → scroll to section
    document.querySelectorAll('.section-indicator-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.getElementById(dot.getAttribute('data-target'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', getActive, { passive: true });
    getActive();
})();

// ─── Tech Globe ───────────────────────────────────────────────────────────
(function () {
    const canvas = document.getElementById('tech-globe');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const TECHS = [
        'Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Git',
        'REST API', 'OAuth2', 'JUnit', 'MySQL', 'MongoDB',
        'CI/CD', 'Hibernate', 'Maven', 'Go', 'Microservices',
        'Linux', 'GitLab', 'Spring MVC', 'JPA', 'BPM'
    ];

    const TEAL   = '#1CB698';
    const BLUE   = '#0ea5e9';
    const BLUE2  = '#38bdf8';
    const DIM    = 'rgba(148,163,184,0.5)';

    const LAT_LINES = 9;   // horizontal rings
    const LON_LINES = 12;  // vertical rings
    const SEGMENTS  = 80;  // smoothness per ring

    // Spread tech labels evenly on sphere (Fibonacci)
    function fibonacciSphere(n, r) {
        const pts = [];
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < n; i++) {
            const y = 1 - (i / (n - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = golden * i;
            pts.push({
                x: Math.cos(theta) * radius * r,
                y: y * r,
                z: Math.sin(theta) * radius * r,
                label: TECHS[i % TECHS.length]
            });
        }
        return pts;
    }

    let W, H, cx, cy, R;
    let points = [];
    let angleX = 0, angleY = 0;
    let raf;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        cx = W / 2 + W * 0.09;
        cy = H / 2 + H * 0.165;
        R  = Math.min(W, H) * 0.20;
        points = fibonacciSphere(TECHS.length, R);
    }

    function rotateY(x, y, z, a) {
        const cos = Math.cos(a), sin = Math.sin(a);
        return { x: x * cos - z * sin, y, z: x * sin + z * cos };
    }

    function rotateX(x, y, z, a) {
        const cos = Math.cos(a), sin = Math.sin(a);
        return { x, y: y * cos - z * sin, z: y * sin + z * cos };
    }

    function project(x, y, z) {
        const fov = W * 1.1;
        const scale = fov / (fov + z + R);
        return { sx: cx + x * scale, sy: cy + y * scale, scale, z };
    }

    function transform(x, y, z) {
        let p = rotateY(x, y, z, angleY);
        p = rotateX(p.x, p.y, p.z, angleX);
        return project(p.x, p.y, p.z);
    }

    function drawGlobeLines() {
        // ── Latitude rings (horizontal) ──
        for (let i = 1; i < LAT_LINES; i++) {
            const phi = (i / LAT_LINES) * Math.PI; // 0..PI
            const ry  = Math.cos(phi) * R;
            const rr  = Math.sin(phi) * R;

            const pts = [];
            for (let s = 0; s <= SEGMENTS; s++) {
                const theta = (s / SEGMENTS) * Math.PI * 2;
                const x = Math.cos(theta) * rr;
                const z = Math.sin(theta) * rr;
                pts.push(transform(x, ry, z));
            }

            // Split into front/back halves for depth-based alpha
            ctx.beginPath();
            pts.forEach((p, idx) => {
                const depth = (p.z + R) / (2 * R);
                const alpha = 0.08 + depth * 0.32;
                if (idx === 0) {
                    ctx.moveTo(p.sx, p.sy);
                } else {
                    ctx.lineTo(p.sx, p.sy);
                }
            });
            ctx.strokeStyle = `rgba(14,165,233,0.28)`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
        }

        // ── Longitude rings (vertical) ──
        for (let i = 0; i < LON_LINES; i++) {
            const theta0 = (i / LON_LINES) * Math.PI * 2;

            const pts = [];
            for (let s = 0; s <= SEGMENTS; s++) {
                const phi = (s / SEGMENTS) * Math.PI * 2;
                const x = Math.cos(phi) * Math.cos(theta0) * R;
                const y = Math.sin(phi) * R;
                const z = Math.cos(phi) * Math.sin(theta0) * R;
                pts.push(transform(x, y, z));
            }

            ctx.beginPath();
            pts.forEach((p, idx) => {
                if (idx === 0) ctx.moveTo(p.sx, p.sy);
                else ctx.lineTo(p.sx, p.sy);
            });
            ctx.strokeStyle = `rgba(14,165,233,0.22)`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        // ── Equator highlight ──
        const eqPts = [];
        for (let s = 0; s <= SEGMENTS * 2; s++) {
            const theta = (s / (SEGMENTS * 2)) * Math.PI * 2;
            eqPts.push(transform(Math.cos(theta) * R, 0, Math.sin(theta) * R));
        }
        ctx.beginPath();
        eqPts.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.sx, p.sy);
            else ctx.lineTo(p.sx, p.sy);
        });
        ctx.strokeStyle = `rgba(56,189,248,0.45)`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        angleY += 0.007;
        angleX += 0.003;

        drawGlobeLines();

        // Project labels
        const projected = points.map(pt => {
            let p = rotateY(pt.x, pt.y, pt.z, angleY);
            p = rotateX(p.x, p.y, p.z, angleX);
            const pr = project(p.x, p.y, p.z);
            return { ...pr, label: pt.label };
        }).sort((a, b) => a.z - b.z);

        // Draw tech labels
        projected.forEach(p => {
            const depth = (p.z + R) / (2 * R);
            const alpha  = 0.15 + depth * 0.85;
            const fontSize = Math.round(9 + p.scale * 7);
            const isCore = ['Java','Spring Boot','Docker','Kubernetes','Microservices'].includes(p.label);

            ctx.save();
            ctx.globalAlpha = alpha;

            // Dot
            ctx.beginPath();
            ctx.arc(p.sx, p.sy - fontSize * 0.9, isCore ? 3 : 1.5, 0, Math.PI * 2);
            ctx.fillStyle = isCore ? TEAL : BLUE2;
            ctx.fill();

            // Label
            ctx.font = `${isCore ? 600 : 400} ${fontSize}px 'DM Sans', sans-serif`;
            ctx.fillStyle = isCore ? TEAL : (depth > 0.5 ? BLUE2 : DIM);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.label, p.sx, p.sy);
            ctx.restore();
        });

        raf = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

// Pause when section not visible
    const section = document.getElementById('inicio');
    if (section && 'IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { if (!raf) draw(); }
                else { cancelAnimationFrame(raf); raf = null; }
            });
        }, { threshold: 0.1 }).observe(section);
    }
})();

// ─── Scroll hint: mostrar solo en sección inicio ──────────────────────────
(function () {
    const hint   = document.querySelector('.scroll-hint');
    const inicio = document.getElementById('inicio');
    if (!hint || !inicio) return;

    function update() {
        const rect = inicio.getBoundingClientRect();
        // Visible solo mientras inicio ocupa la pantalla
        if (rect.bottom > window.innerHeight * 0.6) {
            hint.classList.add('visible');
        } else {
            hint.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
})();