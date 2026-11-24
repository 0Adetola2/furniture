/**
 * TOLEX FURNITURE — Core Application JavaScript
 * Handlers:
 * - Responsive navigation & sticky frosted glass header
 * - Product Catalogue with real-time search & category filtering
 * - Quick View Modal with technical specifications & imagery
 * - Shopping cart-style Enquiry List with localStorage sync & WhatsApp integration
 * - Testimonial slider
 * - Form validation with feedback
 * - Scroll-triggered animations & back-to-top button
 */

// Showroom Config
const TOLEX_CONFIG = {
  whatsappNumber: "1234567890", // Configurable WhatsApp phone number (no spaces or plus)
  showroomPhone: "+1 (800) 555-TOLEX",
  showroomEmail: "concierge@tolexfurniture.com",
  showroomAddress: "742 Evergreen Luxury Blvd, Suite 100, Design District"
};

// Comprehensive Furniture Catalogue
const TOLEX_CATALOGUE = [
  {
    id: "tlx-01",
    name: "Aurelia Curved Bouclé Sofa",
    category: "living",
    categoryLabel: "Living Room",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    description: "An architectural masterpiece featuring organic curved geometry, upholstered in French textured bouclé with a hidden solid kiln-dried oak frame.",
    dimensions: '98" W x 42" D x 31" H',
    materials: "Premium High-Texture Bouclé, Kiln-Dried European Oak",
    finish: "Warm Cream / Brushed Brass plinth",
    warranty: "10-Year Structural Guarantee"
  },
  {
    id: "tlx-02",
    name: "Vittorio Italian Leather Sectional",
    category: "living",
    categoryLabel: "Living Room",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    description: "Deep, welcoming modular seating crafted in full-grain Italian saddle leather with saddle-stitch detailing and feather-down cloud cushion filling.",
    dimensions: '124" W x 68" D x 32" H',
    materials: "Full-Grain Italian Aniline Leather, High-Resilience Foam",
    finish: "Vintage Cognac / Smoked Bronze feet",
    warranty: "10-Year Structural Guarantee"
  },
  {
    id: "tlx-03",
    name: "Seraphina Fluted King Platform Bed",
    category: "bedroom",
    categoryLabel: "Bedroom",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    description: "A sanctuary of restful luxury with an extended vertical fluted headboard, wrapped in stain-resistant brushed velvet with integrated floating ledges.",
    dimensions: '88" W x 92" L x 56" H',
    materials: "Engineered Hardwood, High-Density Acoustic Padding, Velvet",
    finish: "Warm Taupe & Muted Gold Trim",
    warranty: "15-Year Frame Guarantee"
  },
  {
    id: "tlx-04",
    name: "Tuscan Walnut 8-Seater Dining Suite",
    category: "dining",
    categoryLabel: "Dining Room",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    description: "Sculpted from a single sustainable American Walnut slab with beveled waterfall edges and hand-poured brass butterfly inlays.",
    dimensions: '102" L x 44" W x 30" H',
    materials: "Solid American Walnut, Solid Brass Joints",
    finish: "Satin Organic Matte Oil / Natural Grain",
    warranty: "Lifetime Wood Integrity Guarantee"
  },
  {
    id: "tlx-05",
    name: "Executive President Teakwood Desk",
    category: "office",
    categoryLabel: "Office Furniture",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    description: "Commanding workspace silhouette featuring fluted tambour storage drawers, wire-management conduits, and a top-grain leather blotter inlay.",
    dimensions: '76" W x 36" D x 30" H',
    materials: "Burmese Teak, Full-Grain Charcoal Leather, Anodized Hardware",
    finish: "Smoked Warm Amber & Charcoal Teak",
    warranty: "10-Year Commercial Grade"
  },
  {
    id: "tlx-06",
    name: "Celeste Fluted Bedside Nightstand",
    category: "bedroom",
    categoryLabel: "Bedroom",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    description: "Cylindrical modern nightstand with tactile fluted timber ribs, soft-close velvet-lined drawer, and a honed travertine stone top.",
    dimensions: '22" Diameter x 24" H',
    materials: "Solid Ash Wood, Italian Roman Travertine Stone",
    finish: "Cream Beige Ash & Brushed Champagne",
    warranty: "5-Year Guarantee"
  },
  {
    id: "tlx-07",
    name: "Milan Minimalist Travertine Coffee Table",
    category: "living",
    categoryLabel: "Living Room",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
    description: "Dual-tier architectural low table pairing unpolished porous travertine with smoked tempered glass for an airy sculptural centerpiece.",
    dimensions: '52" L x 34" W x 15" H',
    materials: "Porous Roman Travertine, 12mm Smoked Glass",
    finish: "Honed Matte Stone / Warm Charcoal Glass",
    warranty: "5-Year Guarantee"
  },
  {
    id: "tlx-08",
    name: "Elysian Velvet Sculptural Armchair",
    category: "living",
    categoryLabel: "Living Room",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1580481077195-c328a37db714?auto=format&fit=crop&w=800&q=80",
    description: "Inspired by mid-century Milanese salons, contoured for deep lumbar relaxation with custom curved arms and satin gold pedestal.",
    dimensions: '34" W x 36" D x 32" H',
    materials: "High-Pile Velvet, Ergonomic Molded Shell, Brass Plinth",
    finish: "Warm Taupe Ochre / Brushed Gold",
    warranty: "7-Year Guarantee"
  },
  {
    id: "tlx-09",
    name: "Verona Solid Oak 6-Door Wardrobe",
    category: "bedroom",
    categoryLabel: "Bedroom",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    description: "Floor-to-ceiling modular wardrobe suite with integrated warm LED edge lighting, smoked glass doors, and leather-lined organizer drawers.",
    dimensions: '110" W x 24" D x 96" H',
    materials: "Engineered White Oak, Smoked Reflective Glass, LED Ribbon",
    finish: "Deep Charcoal Oak / Muted Gold Handles",
    warranty: "15-Year Mechanical & Frame"
  },
  {
    id: "tlx-10",
    name: "Sovereign Ergonomic Executive Chair",
    category: "office",
    categoryLabel: "Office Furniture",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1580481077195-c328a37db714?auto=format&fit=crop&w=800&q=80",
    description: "Synchronous tilt mechanism with dual lumbar control, wrapped in supple top-grain leather with polished cast-aluminum base.",
    dimensions: '28" W x 28" D x 45"-49" H',
    materials: "Full Grain Leather, Cast Aluminum, Pneumatic Lift",
    finish: "Espresso Brown / Brushed Nickel",
    warranty: "10-Year Guarantee"
  },
  {
    id: "tlx-11",
    name: "Gilded Horizon Architectural TV Console",
    category: "decor",
    categoryLabel: "Consoles & Decor",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
    description: "Floating profile media console with fluted sliding panels, acoustic grille cloth inserts, and acoustic vibration-damping feet.",
    dimensions: '84" W x 18" D x 22" H',
    materials: "Solid American Walnut, Muted Gold Slats",
    finish: "Warm Walnut & Gold Accents",
    warranty: "5-Year Guarantee"
  },
  {
    id: "tlx-12",
    name: "Lumière Fluted Floor Lamp & Decor",
    category: "decor",
    categoryLabel: "Consoles & Decor",
    priceEst: "Showroom Piece",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Sculptural hand-blown opaline glass orb supported by a vertical fluted marble column, casting a soothing 2700K ambient glow.",
    dimensions: '16" Diameter x 64" H',
    materials: "Carrara Travertine, Hand-Blown Opaline Glass, Solid Brass",
    finish: "Honed Cream Travertine / Satin Brass",
    warranty: "3-Year Electrical Guarantee"
  }
];

// App State Manager
class TolexApp {
  constructor() {
    this.enquiryList = this.loadEnquiries();
    this.currentCategory = 'all';
    this.searchQuery = '';
    
    this.init();
  }

  init() {
    this.bindHeader();
    this.bindEnquiryDrawer();
    this.bindProductCatalogue();
    this.bindQuickViewModal();
    this.bindTestimonials();
    this.bindContactForm();
    this.bindScrollEffects();
    this.updateEnquiryBadge();
    this.renderEnquiryItems();
  }

  /* --- Navigation & Header --- */
  bindHeader() {
    const header = document.querySelector('.site-header');
    const hamburger = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');

    // Sticky Scroll
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile Hamburger
    if (hamburger && mobileDrawer && mobileBackdrop) {
      const toggleMobileNav = () => {
        const isOpen = mobileDrawer.classList.contains('open');
        hamburger.classList.toggle('active', !isOpen);
        mobileDrawer.classList.toggle('open', !isOpen);
        mobileBackdrop.classList.toggle('open', !isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : '';
      };

      hamburger.addEventListener('click', toggleMobileNav);
      mobileBackdrop.addEventListener('click', toggleMobileNav);

      const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (mobileDrawer.classList.contains('open')) {
            toggleMobileNav();
          }
        });
      });
    }

    // Set Active Link Based on URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* --- Enquiry List / Shopping Cart --- */
  loadEnquiries() {
    try {
      const saved = localStorage.getItem('tolex_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveEnquiries() {
    try {
      localStorage.setItem('tolex_enquiries', JSON.stringify(this.enquiryList));
    } catch (e) {
      console.warn("Storage not available");
    }
    this.updateEnquiryBadge();
    this.renderEnquiryItems();
  }

  addToEnquiry(productId) {
    const product = TOLEX_CATALOGUE.find(p => p.id === productId);
    if (!product) return;

    const exists = this.enquiryList.some(item => item.id === productId);
    if (exists) {
      this.showToast(`"${product.name}" is already in your Enquiry List`);
      this.openEnquiryDrawer();
      return;
    }

    this.enquiryList.push({
      id: product.id,
      name: product.name,
      categoryLabel: product.categoryLabel,
      image: product.image,
      dimensions: product.dimensions
    });

    this.saveEnquiries();
    this.showToast(`Added "${product.name}" to your Enquiry List`);
    this.openEnquiryDrawer();
  }

  removeFromEnquiry(productId) {
    const item = this.enquiryList.find(i => i.id === productId);
    this.enquiryList = this.enquiryList.filter(i => i.id !== productId);
    this.saveEnquiries();
    if (item) {
      this.showToast(`Removed "${item.name}" from your Enquiry List`);
    }
  }

  clearAllEnquiries() {
    if (!this.enquiryList.length) return;
    this.enquiryList = [];
    this.saveEnquiries();
    this.showToast("Enquiry List cleared");
  }

  updateEnquiryBadge() {
    const badges = document.querySelectorAll('.enquiry-badge');
    const count = this.enquiryList.length;
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    // Update buttons in catalog
    const enquiryButtons = document.querySelectorAll('.product-enquiry-btn');
    enquiryButtons.forEach(btn => {
      const pid = btn.getAttribute('data-id');
      const inCart = this.enquiryList.some(item => item.id === pid);
      if (inCart) {
        btn.classList.add('in-cart');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> In Enquiry`;
      } else {
        btn.classList.remove('in-cart');
        btn.innerHTML = `+ Enquiry`;
      }
    });
  }

  bindEnquiryDrawer() {
    const triggers = document.querySelectorAll('.enquiry-trigger-btn');
    const drawer = document.querySelector('.enquiry-drawer');
    const backdrop = document.querySelector('.enquiry-drawer-backdrop');
    const closeBtn = document.querySelector('.drawer-close-btn');
    const clearBtn = document.querySelector('.btn-clear-enquiries');
    const whatsappSubmitBtn = document.querySelector('.btn-whatsapp-enquiry');

    if (!drawer || !backdrop) return;

    triggers.forEach(trig => {
      trig.addEventListener('click', () => this.openEnquiryDrawer());
    });

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeEnquiryDrawer());
    backdrop.addEventListener('click', () => this.closeEnquiryDrawer());

    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearAllEnquiries());
    }

    if (whatsappSubmitBtn) {
      whatsappSubmitBtn.addEventListener('click', () => this.sendEnquiryViaWhatsApp());
    }
  }

  openEnquiryDrawer() {
    const drawer = document.querySelector('.enquiry-drawer');
    const backdrop = document.querySelector('.enquiry-drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryDrawer() {
    const drawer = document.querySelector('.enquiry-drawer');
    const backdrop = document.querySelector('.enquiry-drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  renderEnquiryItems() {
    const listWrap = document.querySelector('.enquiry-items-list');
    const emptyNotice = document.querySelector('.enquiry-empty-notice');
    const countSummary = document.querySelector('.enquiry-count-summary');
    const footerActions = document.querySelector('.enquiry-actions');

    if (!listWrap) return;

    if (this.enquiryList.length === 0) {
      listWrap.innerHTML = '';
      if (emptyNotice) emptyNotice.style.display = 'block';
      if (countSummary) countSummary.style.display = 'none';
      if (footerActions) footerActions.style.display = 'none';
      return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';
    if (countSummary) {
      countSummary.style.display = 'flex';
      countSummary.innerHTML = `<span>Total Collected Pieces:</span> <strong>${this.enquiryList.length} item${this.enquiryList.length > 1 ? 's' : ''}</strong>`;
    }
    if (footerActions) footerActions.style.display = 'flex';

    listWrap.innerHTML = this.enquiryList.map(item => `
      <div class="enquiry-item-card">
        <img src="${item.image}" alt="${item.name}" class="enquiry-item-thumb" loading="lazy">
        <div class="enquiry-item-details">
          <span class="enquiry-item-category">${item.categoryLabel}</span>
          <h4 class="enquiry-item-name">${item.name}</h4>
          <span class="enquiry-item-sku">Dim: ${item.dimensions}</span>
        </div>
        <button type="button" class="enquiry-remove-btn" title="Remove Item" data-remove-id="${item.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `).join('');

    // Bind remove buttons
    listWrap.querySelectorAll('.enquiry-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-remove-id');
        this.removeFromEnquiry(id);
      });
    });
  }

  sendEnquiryViaWhatsApp() {
    if (this.enquiryList.length === 0) {
      this.showToast("Your enquiry list is currently empty.");
      return;
    }

    let message = `*TOLEX FURNITURE — Showroom Enquiry*\n\n`;
    message += `Hello TOLEX Furniture Concierge! I have collected the following ${this.enquiryList.length} piece(s) from your showroom catalogue and would like pricing, material customizations, and availability details:\n\n`;

    this.enquiryList.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.categoryLabel}) — Dimensions: ${item.dimensions}\n`;
    });

    message += `\nPlease let me know the next steps for a showroom consultation or white-glove ordering. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${TOLEX_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  }

  /* --- Product Catalogue & Filtering --- */
  bindProductCatalogue() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return; // Not on page with catalogue

    const filterPills = document.querySelectorAll('.filter-pill');
    const searchInput = document.querySelector('.search-input');

    const render = () => {
      const filtered = TOLEX_CATALOGUE.filter(prod => {
        const matchesCategory = this.currentCategory === 'all' || prod.category === this.currentCategory;
        const query = this.searchQuery.toLowerCase();
        const matchesSearch = prod.name.toLowerCase().includes(query) ||
                              prod.description.toLowerCase().includes(query) ||
                              prod.categoryLabel.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        productsGrid.innerHTML = `
          <div class="catalog-empty-state">
            <h3>No Furniture Pieces Found</h3>
            <p>We could not find any showroom items matching your search or filter criteria. Try resetting filters.</p>
            <button class="btn btn-outline-dark btn-sm mt-3" id="reset-catalog-btn">Reset All Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-catalog-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            this.currentCategory = 'all';
            this.searchQuery = '';
            if (searchInput) searchInput.value = '';
            filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
            render();
          });
        }
        return;
      }

      productsGrid.innerHTML = filtered.map(item => {
        const inCart = this.enquiryList.some(cartItem => cartItem.id === item.id);
        return `
          <div class="product-card reveal-on-scroll" data-id="${item.id}">
            <div class="product-thumb-wrap">
              <img src="${item.image}" alt="${item.name}" class="product-thumb" loading="lazy">
              <span class="product-tag-badge">${item.categoryLabel}</span>
              <div class="product-quick-actions">
                <button type="button" class="btn-card-quickview" data-quickview-id="${item.id}">
                  Quick View
                </button>
              </div>
            </div>
            <div class="product-info">
              <span class="product-category-lbl">${item.categoryLabel}</span>
              <h3 class="product-title">${item.name}</h3>
              <p class="product-desc">${item.description}</p>
              <div class="product-card-footer">
                <span class="product-price-est">${item.priceEst}</span>
                <button type="button" class="product-enquiry-btn ${inCart ? 'in-cart' : ''}" data-id="${item.id}">
                  ${inCart ? 
                    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> In Enquiry` : 
                    `+ Enquiry`}
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Bind buttons
      productsGrid.querySelectorAll('.product-enquiry-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          this.addToEnquiry(id);
        });
      });

      productsGrid.querySelectorAll('.btn-card-quickview').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-quickview-id');
          this.openQuickView(id);
        });
      });

      // Animate newly rendered items
      this.initRevealObserver();
    };

    // Filter pills
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.getAttribute('data-filter');
        render();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        render();
      });
    }

    render();
  }

  /* --- Quick View Modal --- */
  bindQuickViewModal() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const closeBtn = document.querySelector('.modal-close-btn');

    if (!modalBackdrop) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeQuickView());
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        this.closeQuickView();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        this.closeQuickView();
      }
    });
  }

  openQuickView(productId) {
    const product = TOLEX_CATALOGUE.find(p => p.id === productId);
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (!product || !modalBackdrop) return;

    const inCart = this.enquiryList.some(item => item.id === product.id);

    const dialog = modalBackdrop.querySelector('.product-modal-dialog');
    if (dialog) {
      dialog.innerHTML = `
        <button type="button" class="modal-close-btn" aria-label="Close Modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="modal-img-col">
          <img src="${product.image}" alt="${product.name}" class="modal-img">
        </div>
        <div class="modal-details-col">
          <span class="modal-category-lbl">${product.categoryLabel}</span>
          <h2 class="modal-title">${product.name}</h2>
          <p class="modal-desc">${product.description}</p>
          
          <div class="modal-specs-list">
            <div class="spec-line">
              <span>Dimensions:</span>
              <span>${product.dimensions}</span>
            </div>
            <div class="spec-line">
              <span>Materials:</span>
              <span>${product.materials}</span>
            </div>
            <div class="spec-line">
              <span>Finish:</span>
              <span>${product.finish}</span>
            </div>
            <div class="spec-line">
              <span>Warranty:</span>
              <span>${product.warranty}</span>
            </div>
          </div>

          <div class="modal-action-row">
            <button type="button" class="btn btn-primary" id="modal-add-enquiry-btn">
              ${inCart ? 'View in Enquiry List' : '+ Add to Enquiry List'}
            </button>
            <button type="button" class="btn btn-whatsapp" id="modal-whatsapp-enquiry-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.449.741.964 1.2 1.056.941 1.396.969 1.62.81l.303-.433c.101-.144.202-.12.332-.072.13.048.824.39 1.055.505.231.116.385.173.442.271.058.098.058.566-.086.971z"/></svg>
              Quick Showroom WhatsApp
            </button>
          </div>
        </div>
      `;

      dialog.querySelector('.modal-close-btn').addEventListener('click', () => this.closeQuickView());

      const addBtn = dialog.querySelector('#modal-add-enquiry-btn');
      addBtn.addEventListener('click', () => {
        if (!inCart) {
          this.addToEnquiry(product.id);
          addBtn.textContent = 'View in Enquiry List';
        } else {
          this.openEnquiryDrawer();
        }
      });

      const waBtn = dialog.querySelector('#modal-whatsapp-enquiry-btn');
      waBtn.addEventListener('click', () => {
        const msg = encodeURIComponent(`Hello TOLEX FURNITURE! I am inquiring about the "${product.name}" (${product.categoryLabel}). Is this piece currently on display in your showroom?`);
        window.open(`https://wa.me/${TOLEX_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
      });
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeQuickView() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* --- Testimonials Slider --- */
  bindTestimonials() {
    const container = document.querySelector('.testimonials-section');
    if (!container) return;

    const slides = container.querySelectorAll('.testimonial-slide');
    const dots = container.querySelectorAll('.testimonial-dot');
    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;

    const showSlide = (idx) => {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
      currentIndex = idx;
    };

    const nextSlide = () => {
      const nextIdx = (currentIndex + 1) % slides.length;
      showSlide(nextIdx);
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        resetTimer();
      });
    });

    const resetTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, 5500);
    };

    resetTimer();
  }

  /* --- Contact Form Validation --- */
  bindContactForm() {
    const form = document.querySelector('#tolex-contact-form');
    if (!form) return;

    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const phoneInput = form.querySelector('#contact-phone');
    const messageInput = form.querySelector('#contact-message');
    const feedbackToast = form.querySelector('.form-feedback-toast');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
      return phone.trim().length >= 7;
    };

    const showError = (input, msg) => {
      input.classList.add('error');
      const errElem = input.parentElement.querySelector('.form-error-msg');
      if (errElem) {
        errElem.textContent = msg;
        errElem.classList.add('visible');
      }
    };

    const clearError = (input) => {
      input.classList.remove('error');
      const errElem = input.parentElement.querySelector('.form-error-msg');
      if (errElem) {
        errElem.classList.remove('visible');
      }
    };

    [nameInput, emailInput, phoneInput, messageInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => clearError(inp));
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, "Please provide your full name");
        isValid = false;
      }

      if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address");
        isValid = false;
      }

      if (!validatePhone(phoneInput.value.trim())) {
        showError(phoneInput, "Please enter a valid phone number");
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, "Please include details regarding your enquiry (min 10 characters)");
        isValid = false;
      }

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `Sending Enquiry...`;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();

          if (feedbackToast) {
            feedbackToast.classList.add('success');
            feedbackToast.innerHTML = `
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Thank you! Your enquiry has been received. A TOLEX showroom concierge will contact you shortly.</span>
            `;
            setTimeout(() => {
              feedbackToast.classList.remove('success');
            }, 7000);
          }
          this.showToast("Showroom enquiry sent successfully!");
        }, 1200);
      }
    });
  }

  /* --- Scroll Effects & Intersection Observer --- */
  bindScrollEffects() {
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    this.initRevealObserver();
  }

  initRevealObserver() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  /* --- Toast Notifications --- */
  showToast(message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.tolexApp = new TolexApp();
});
