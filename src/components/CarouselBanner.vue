<template>
  <section class="carousel-section">
    <div class="carousel-track" :style="{ transform: `translateX(-${current * 100}%)` }">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="carousel-slide"
        :style="{ backgroundImage: `url(${slide.bg})` }"
      >
        <div class="slide-overlay">
          <div class="slide-content">
            <div class="slide-badge">{{ badgeText }}</div>
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Prev / Next -->
    <button class="carousel-btn prev" @click="prev" aria-label="Previous">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <button class="carousel-btn next" @click="next" aria-label="Next">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <!-- Dots -->
    <div class="carousel-dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="current = i"
        :aria-label="`Slide ${i + 1}`"
      />
    </div>

    <!-- Progress bar -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${((current + 1) / slides.length) * 100}%` }"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { Translations } from '../i18n'

const props = defineProps<{ t: Translations }>()

const current = ref(0)
let timer: number

const badgeText = computed(() => props.t.nav.home === 'Home' ? '🏆 Open for Registration' : '🏆 報名開放中')

const slides = computed(() => [
  {
    title: props.t.carousel.slide1.title,
    subtitle: props.t.carousel.slide1.subtitle,
    bg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=80'
  },
  {
    title: props.t.carousel.slide2.title,
    subtitle: props.t.carousel.slide2.subtitle,
    bg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80'
  },
  {
    title: props.t.carousel.slide3.title,
    subtitle: props.t.carousel.slide3.subtitle,
    bg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&q=80'
  }
])

function next() {
  current.value = (current.value + 1) % slides.value.length
  resetTimer()
}

function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
  resetTimer()
}

function resetTimer() {
  clearInterval(timer)
  timer = setInterval(next, 5000)
}

onMounted(() => { timer = setInterval(next, 5000) })
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.carousel-section {
  position: relative;
  width: 100%;
  height: 520px;
  overflow: hidden;
  background: #0f0f1a;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.77, 0, 0.175, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.slide-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(15, 15, 26, 0.3) 0%,
    rgba(15, 15, 26, 0.6) 50%,
    rgba(15, 15, 26, 0.85) 100%
  );
  display: flex;
  align-items: flex-end;
  padding-bottom: 80px;
}

.slide-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: left;
}

.slide-badge {
  display: inline-block;
  background: #2d1b69;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.slide-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 12px;
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
}

.slide-subtitle {
  font-size: 1.15rem;
  color: rgba(255,255,255,0.85);
  margin: 0;
  text-shadow: 0 1px 8px rgba(0,0,0,0.4);
}

/* Nav buttons */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}
.carousel-btn:hover {
  background: rgba(45,27,105,0.7);
  border-color: #2d1b69;
}
.carousel-btn.prev { left: 20px; }
.carousel-btn.next { right: 20px; }

/* Dots */
.carousel-dots {
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: flex;
  gap: 8px;
  z-index: 10;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}
.dot.active {
  background: #2d1b69;
  transform: scale(1.3);
}

/* Progress bar */
.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.15);
}
.progress-fill {
  height: 100%;
  background: #2d1b69;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .carousel-section { height: 340px; }
  .slide-title { font-size: 1.7rem; }
  .slide-subtitle { font-size: 0.9rem; }
  .slide-content { padding: 0 20px; }
  .slide-overlay { padding-bottom: 60px; }
  .carousel-btn { width: 38px; height: 38px; }
}
</style>
