// Inicializar los iconos de Lucide
if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
}

// efecto de escribir de la terminal
console.log("Terminal Portfolio Loaded...");

// 1. Reloj en tiempo real para el footer
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
    const clock = document.getElementById('clock');
    if (clock) {
        clock.textContent = timeString;
    }
}
updateClock();
setInterval(updateClock, 1000);

// 2. Lógica de Navegación de "Terminal"
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.style.display = 'none');

    // Mostrar la sección seleccionada
    const target = document.getElementById(sectionId);
    if (!target) {
        console.warn(`No se encontró la sección: ${sectionId}`);
        return;
    }
    target.style.display = 'block';

    // Actualizar estado visual del nav
    const navLinks = document.querySelectorAll('.terminal-nav a[data-section]');
    navLinks.forEach(link => {
        const isActive = link.dataset.section === sectionId;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    if (window.location.hash !== `#${sectionId}`) {
        history.replaceState(null, '', `#${sectionId}`);
    }

    // Opcional: Efecto Typewriter simple en el encabezado de la sección
    const animatedHeaders = target.querySelectorAll('.card h3, h2, h3');
    animatedHeaders.forEach((header, index) => {
        const originalText = header.dataset.originalText || header.textContent.trim();
        header.dataset.originalText = originalText;
        header.textContent = '';

        const startDelay = index * 180;
        let i = 0;
        const type = () => {
            if (i < originalText.length) {
                header.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 45);
            }
        };

        setTimeout(type, startDelay);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.terminal-nav a[data-section]');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            showSection(link.dataset.section);
        });
    });

    const initialSection = window.location.hash.replace('#', '') || 'home';
    showSection(initialSection);
});