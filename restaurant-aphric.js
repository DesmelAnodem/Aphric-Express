// ========================================
// SAVEURS DU CAMEROUN - APHRIC EXPRESS
// Matching Aphric Express JavaScript
// ========================================

// Menu Data
const menuItems = [
    {
        id: 1,
        name: 'Ndolé Traditionnel',
        category: 'plats',
        price: 3500,
        rating: 4.9,
        description: 'Feuilles de ndolé cuites avec arachides, crevettes et bœuf. Notre spécialité!',
        badge: 'Populaire',
        image: './images/1758968362388.jpg'
    },
    {
        id: 2,
        name: 'Poulet DG',
        category: 'plats',
        price: 4000,
        rating: 4.8,
        description: 'Poulet sauté avec légumes frais, plantain mûr et aromates',
        badge: 'Chef\'s Pick',
        image: './images/Poulet-Directeur-Général.jpg'
    },
    {
        id: 3,
        name: 'Koki Corn',
        category: 'plats',
        price: 2000,
        rating: 4.7,
        description: 'Gâteau de maïs traditionnel cuit à la vapeur avec huile de palme',
        image: './images/Gateau mais.jpg'
    },
    {
        id: 4,
        name: 'Eru Sauce',
        category: 'special',
        price: 3800,
        rating: 4.9,
        description: 'Feuilles d\'eru mijotées avec poisson fumé, crevettes et coco',
        badge: 'Spécial',
        image: './images/Le_Eru,_un_plat_camerounais.jpg'
    },
    {
        id: 5,
        name: 'Poisson Braisé',
        category: 'grillades',
        price: 4500,
        rating: 4.8,
        description: 'Poisson frais du jour grillé avec marinade spéciale et piment',
        badge: 'Frais',
        image: './images/poisson braise.jpg'
    },
    {
        id: 6,
        name: 'Soya Complet',
        category: 'grillades',
        price: 1500,
        rating: 4.6,
        description: 'Brochettes de bœuf marinées avec oignons et tomates',
        image: './images/brochettes.webp'
    },
    {
        id: 7,
        name: 'Jus de Bissap',
        category: 'boissons',
        price: 500,
        rating: 4.7,
        description: 'Boisson rafraîchissante aux fleurs d\'hibiscus',
        image: './images/jus de bissap.jpg'
    },
    {
        id: 8,
        name: 'Jus de Gingembre',
        category: 'boissons',
        price: 600,
        rating: 4.5,
        description: 'Jus de gingembre frais avec citron et miel',
        image: './images/Jus-de-gingembre-un-allie-sante-au-quotidien-.png.webp'
    },
    {
        id: 9,
        name: 'Beignets Haricot',
        category: 'desserts',
        price: 800,
        rating: 4.7,
        description: 'Beignets croustillants aux haricots frits (Accara/Koki frit)',
        image: './images/beignet haricot.png'
    },
    {
        id: 10,
        name: 'Puff Puff',
        category: 'desserts',
        price: 500,
        rating: 4.8,
        description: 'Beignets sucrés moelleux et dorés',
        badge: 'Populaire',
        image: './images/Puff-puffs-in-a-white-bowl.jpg'
    },
    {
        id: 11,
        name: 'Sauce Arachide',
        category: 'special',
        price: 3200,
        rating: 4.8,
        description: 'Sauce onctueuse aux arachides avec viande et légumes',
        image: './images/sauce d-arachide.jpeg'
    },
    {
        id: 12,
        name: 'Mbongo Tchobi',
        category: 'special',
        price: 4200,
        rating: 4.9,
        description: 'Poisson ou viande dans une sauce noire épicée unique',
        badge: 'Spécial',
        image: './images/mbongo-tchobi.jpg'
    }
];

// State
let cart = [];
let currentCategory = 'all';

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderMenu();
    updateCartUI();
    initScrollAnimations();
    updateCategoryCounts();
});

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

// ========================================
// MENU
// ========================================

function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = currentCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" style="animation: fadeInUp 0.5s ease-out;">
            <div class="menu-item-image" style="background-image: url('${item.image}');">
                ${item.badge ? `<div class="menu-item-badge">${item.badge}</div>` : ''}
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <div class="menu-item-price">${item.price.toLocaleString()}</div>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <div class="menu-item-rating">
                        <span>⭐</span>
                        <span>${item.rating}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCategoryCounts() {
    const categories = ['all', 'plats', 'grillades', 'special', 'boissons', 'desserts'];
    categories.forEach(cat => {
        const count = cat === 'all' ? menuItems.length : menuItems.filter(i => i.category === cat).length;
        const element = document.getElementById(`count-${cat}`);
        if (element) {
            element.textContent = count;
        }
    });
}

function filterMenu(category) {
    currentCategory = category;
    
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === category) {
            card.classList.add('active');
        }
    });
    
    renderMenu();
    showToast(`Catégorie: ${getCategoryName(category)}`, 'info');
}

function getCategoryName(category) {
    const names = {
        all: 'Tous les plats',
        plats: 'Plats traditionnels',
        grillades: 'Grillades',
        boissons: 'Boissons',
        desserts: 'Desserts',
        special: 'Spécialités'
    };
    return names[category] || category;
}

// ========================================
// CART
// ========================================

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
    showToast(`${item.name} ajouté au panier`, 'success');
    
    const cartBtn = document.querySelector('.btn-secondary');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    showToast('Produit retiré', 'info');
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const navCartCount = document.getElementById('navCartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const deliveryFee = document.getElementById('deliveryFee');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = 500;
    const total = subtotal + delivery;
    
    if (navCartCount) {
        navCartCount.textContent = totalItems;
        navCartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span class="empty-icon">🛒</span>
                <p>Votre panier est vide</p>
                <button class="browse-btn" onclick="closeCart(); scrollToMenu();">Parcourir le menu</button>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background-image: url('${item.image}');"></div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} FCFA</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        cartFooter.style.display = 'block';
        if (cartSubtotal) cartSubtotal.textContent = `${subtotal.toLocaleString()} FCFA`;
        if (deliveryFee) deliveryFee.textContent = `${delivery.toLocaleString()} FCFA`;
        if (cartTotal) cartTotal.textContent = `${total.toLocaleString()} FCFA`;
    }
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function checkout() {
    if (cart.length === 0) {
        showToast('Votre panier est vide', 'error');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 500;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showToast(`Commande de ${totalItems} articles (${total.toLocaleString()} FCFA) en cours via Aphric Express...`, 'success');
    
    setTimeout(() => {
        showToast('✅ Commande confirmée! Livreur assigné. Livraison en 30 minutes.', 'success');
        cart = [];
        updateCartUI();
        closeCart();
    }, 2000);
}

// ========================================
// UTILITIES
// ========================================

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showInfo() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================

let toastContainer;

function initToasts() {
    toastContainer = document.createElement('div');
    toastContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    document.body.appendChild(toastContainer);
}

function showToast(message, type = 'info') {
    if (!toastContainer) initToasts();
    
    const toast = document.createElement('div');
    
    const colors = {
        success: '#00A550',
        error: '#CE1126',
        warning: '#FCD116',
        info: '#6A6A6A'
    };
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    toast.style.cssText = `
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid ${colors[type]};
        border-radius: 12px;
        padding: 16px 20px;
        color: white;
        font-family: 'Outfit', sans-serif;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    
    toast.innerHTML = `
        <div style="
            width: 24px;
            height: 24px;
            background: ${colors[type]};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 700;
            flex-shrink: 0;
        ">${icons[type]}</div>
        <div style="flex: 1;">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 3500);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ========================================
// EXPOSE FUNCTIONS
// ========================================

window.filterMenu = filterMenu;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.scrollToMenu = scrollToMenu;
window.showInfo = showInfo;

console.log('🇨🇲 Saveurs du Cameroun - Aphric Express Marketplace chargé!');
console.log('🚚 Restaurant intégré au système Aphric Express');
