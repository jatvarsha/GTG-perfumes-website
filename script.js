// ================= HAMBURGER MENU =================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ================= PRODUCT GALLERY =================
const images = [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500&h=600&fit=crop'
];

let currentIndex = 0;

const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const thumbs = document.querySelectorAll('.thumb');

function updateGallery(index) {
    currentIndex = index;
    mainImage.src = images[index];

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    thumbs.forEach(thumb => {
        thumb.classList.toggle(
            'active',
            parseInt(thumb.dataset.index) === index
        );
    });
}

prevBtn.addEventListener('click', () => {
    updateGallery((currentIndex - 1 + images.length) % images.length);
});

nextBtn.addEventListener('click', () => {
    updateGallery((currentIndex + 1) % images.length);
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        updateGallery(parseInt(dot.dataset.index));
    });
});

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        updateGallery(parseInt(thumb.dataset.index));
    });
});

// ================= ADD TO CART =================
const fragranceInputs = document.querySelectorAll('input[name="fragrance"]');
const subscriptionInputs = document.querySelectorAll('input[name="subscription"]');
const addToCartBtn = document.getElementById('addToCart');

function updateCartLink() {
    const fragrance = document.querySelector('input[name="fragrance"]:checked').value;
    const subscription = document.querySelector('input[name="subscription"]:checked').value;

    const url = `https://example.com/cart?fragrance=${fragrance}&subscription=${subscription}`;
    addToCartBtn.onclick = () => window.location.href = url;
}

fragranceInputs.forEach(i => i.addEventListener('change', updateCartLink));
subscriptionInputs.forEach(i => i.addEventListener('change', updateCartLink));

updateCartLink();

// ================= COLLECTION ACCORDION =================
const collectionItems = document.querySelectorAll('.collection-item');

collectionItems.forEach(item => {
    item.addEventListener('click', () => {
        const isExpanded = item.classList.contains('expanded');

        collectionItems.forEach(i => {
            i.classList.remove('expanded');
            i.querySelector('.collection-item-icon').textContent = '+';
        });

        if (!isExpanded) {
            item.classList.add('expanded');
            item.querySelector('.collection-item-icon').textContent = '−';
        }
    });
});

// ================= STATS COUNTER =================
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    let current = 0;

    function update() {
        current++;
        element.textContent = current + '%';
        if (current < target) requestAnimationFrame(update);
    }

    update();
}

const statsSection = document.getElementById('statsSection');
let statsAnimated = false;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            document
                .querySelectorAll('.stat-percentage')
                .forEach(el => animateCounter(el));
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);
