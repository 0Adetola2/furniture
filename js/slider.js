/**
 * TOLEX FURNITURE — Premium Hero Slider Revolution Engine
 * Features:
 * - Cinematic Ken Burns zoom & crossfade transitions
 * - Line-by-line staggered headline reveals
 * - Smooth subtitle & CTA slide-in
 * - Dynamic animated progress bars per slide
 * - Autoplay with pause on mouse hover
 * - Touch & keyboard navigation support
 * - Zero layout shift or screen flashing
 */

class TolexHeroSlider {
  constructor(options = {}) {
    this.container = document.querySelector(options.containerSelector || '.hero-slider-section');
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.hero-slide');
    if (!this.slides.length) return;

    this.prevBtn = this.container.querySelector('.slider-arrow-prev');
    this.nextBtn = this.container.querySelector('.slider-arrow-next');
    this.indicators = this.container.querySelectorAll('.indicator-item');

    this.slideDuration = options.duration || 7000; // 7 seconds per slide
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.isTransitioning = false;
    this.isPaused = false;
    this.timer = null;
    this.progressTimer = null;
    this.progressStart = 0;
    this.progressElapsed = 0;

    this.init();
  }

  init() {
    this.setActiveSlide(0, false);
    this.bindEvents();
    this.startAutoplay();
  }

  bindEvents() {
    // Arrow buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.restartAutoplay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.restartAutoplay();
      });
    }

    // Indicator items
    this.indicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', () => {
        if (this.currentIndex === idx || this.isTransitioning) return;
        this.goToSlide(idx);
        this.restartAutoplay();
      });
    });

    // Hover pause & resume
    this.container.addEventListener('mouseenter', () => {
      this.isPaused = true;
      this.pauseProgress();
    });

    this.container.addEventListener('mouseleave', () => {
      this.isPaused = false;
      this.resumeProgress();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!this.isInViewport()) return;
      if (e.key === 'ArrowRight') {
        this.next();
        this.restartAutoplay();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
        this.restartAutoplay();
      }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }

  handleSwipe(startX, endX) {
    const threshold = 40;
    if (endX < startX - threshold) {
      this.next();
      this.restartAutoplay();
    } else if (endX > startX + threshold) {
      this.prev();
      this.restartAutoplay();
    }
  }

  isInViewport() {
    const rect = this.container.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  setActiveSlide(index, animate = true) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Reset old slide
    this.slides.forEach((slide, i) => {
      if (i !== index) {
        slide.classList.remove('active');
      }
    });

    // Reset all indicator bars
    this.indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === index);
      const fill = ind.querySelector('.indicator-fill');
      if (fill) {
        fill.style.width = i === index ? '0%' : '0%';
      }
    });

    // Activate new slide
    const targetSlide = this.slides[index];
    targetSlide.classList.add('active');
    this.currentIndex = index;

    // Reset and start indicator progress
    this.resetProgressBar();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 1200); // Transition lock matches CSS animation
  }

  next() {
    if (this.isTransitioning) return;
    const nextIdx = (this.currentIndex + 1) % this.totalSlides;
    this.setActiveSlide(nextIdx);
  }

  prev() {
    if (this.isTransitioning) return;
    const prevIdx = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.setActiveSlide(prevIdx);
  }

  goToSlide(idx) {
    if (this.isTransitioning || idx === this.currentIndex) return;
    this.setActiveSlide(idx);
  }

  startAutoplay() {
    this.stopAutoplay();
    this.progressStart = Date.now() - this.progressElapsed;
    this.runProgressBar();

    this.timer = setTimeout(() => {
      this.next();
      this.progressElapsed = 0;
      this.startAutoplay();
    }, this.slideDuration - this.progressElapsed);
  }

  stopAutoplay() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.progressTimer) {
      cancelAnimationFrame(this.progressTimer);
      this.progressTimer = null;
    }
  }

  pauseProgress() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.progressTimer) {
      cancelAnimationFrame(this.progressTimer);
      this.progressTimer = null;
    }
    this.progressElapsed = Date.now() - this.progressStart;
  }

  resumeProgress() {
    if (this.isPaused) return;
    this.startAutoplay();
  }

  restartAutoplay() {
    this.progressElapsed = 0;
    this.stopAutoplay();
    this.startAutoplay();
  }

  resetProgressBar() {
    const activeIndicator = this.indicators[this.currentIndex];
    if (activeIndicator) {
      const fill = activeIndicator.querySelector('.indicator-fill');
      if (fill) fill.style.width = '0%';
    }
    this.progressElapsed = 0;
    this.progressStart = Date.now();
  }

  runProgressBar() {
    const update = () => {
      if (this.isPaused) return;

      const currentElapsed = Date.now() - this.progressStart;
      const percentage = Math.min((currentElapsed / this.slideDuration) * 100, 100);

      const activeIndicator = this.indicators[this.currentIndex];
      if (activeIndicator) {
        const fill = activeIndicator.querySelector('.indicator-fill');
        if (fill) {
          fill.style.width = `${percentage}%`;
        }
      }

      if (percentage < 100) {
        this.progressTimer = requestAnimationFrame(update);
      }
    };

    this.progressTimer = requestAnimationFrame(update);
  }
}

// Automatically mount when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const sliderElem = document.querySelector('.hero-slider-section');
  if (sliderElem) {
    window.tolexSlider = new TolexHeroSlider({
      containerSelector: '.hero-slider-section',
      duration: 6800
    });
  }
});
