/* ================= FOLDERS ================= */
const folders = document.querySelectorAll('.home-folders a.folder');
const container = document.querySelector('.home-folders');

const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navbar.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navbar.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });
}

if (container) folders.forEach(folder => {
    let isDragging = false;
    let moved = false;
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;

    folder.addEventListener('mousedown', (e) => {
        const startX = e.clientX;
        const startY = e.clientY;

        e.preventDefault();

        const containerRect = container.getBoundingClientRect();
        const folderRect = folder.getBoundingClientRect();

        mouseOffsetX = e.clientX - folderRect.left;
        mouseOffsetY = e.clientY - folderRect.top;

        folder.style.position = 'absolute';
        folder.style.zIndex = 1000;

        const mouseMoveHandler = (e) => {
            // Check movement distance
            if (Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3) {
                moved = true;
            }

            if (moved) {
                isDragging = true;
                const left = e.clientX - containerRect.left - mouseOffsetX;
                const top = e.clientY - containerRect.top - mouseOffsetY;

                folder.style.left = `${left}px`;
                folder.style.top = `${top}px`;
            }
        };

        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);

            // Reset drag state
            setTimeout(() => {
                moved = false;
                isDragging = false;
            }, 0);
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    folder.addEventListener('click', (e) => {
        if (moved) {
            e.preventDefault(); // Block click only if it was dragged
        }
    });
});

/* ============= DIALOG BOX ============= */
const dragImg = document.querySelector(".home-right img");

if (dragImg) dragImg.addEventListener("mousedown", (e) => {
    dragImg.style.cursor = "pointer";

    let offsetX = e.clientX - dragImg.offsetLeft;
    let offsetY = e.clientY - dragImg.offsetTop;

    function moveAt(e) {
        dragImg.style.left = (e.clientX - offsetX) + "px";
        dragImg.style.top = (e.clientY - offsetY) + "px";
    }

    document.addEventListener("mousemove", moveAt);

    document.addEventListener("mouseup", () => {
        dragImg.style.cursor = "pointer";
        document.removeEventListener("mousemove", moveAt);
    }, { once: true });
});

if (dragImg) dragImg.ondragstart = () => false;

/* ================= ID ================= */
const idImg = document.querySelector('.home-left img');
const centerContainer = document.getElementById('center-image-container');
const blurOverlay = document.getElementById('blur-overlay');

if (idImg && centerContainer && blurOverlay) idImg.addEventListener('click', () => {
    centerContainer.style.display = 'block';
    blurOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // prevent scrolling
});

if (blurOverlay && centerContainer) blurOverlay.addEventListener('click', () => {
    centerContainer.style.display = 'none';
    blurOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';   // restore scrolling
});

if (centerContainer && blurOverlay) centerContainer.addEventListener('click', () => {
    centerContainer.style.display = 'none';
    blurOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});
