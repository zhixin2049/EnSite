<template>
  <div class="sidebar">
    <h3 class="sidebar-title">{{ t.sidebar.menuTitle }}</h3>
    <nav class="sidebar-nav">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        class="sidebar-link"
        :class="{ active: activeSection === item.id }"
        @click.prevent="scrollTo(item.id)"
      >
        <span class="link-dot"></span>
        {{ item.label }}
      </a>

      <!-- External link example -->
      <a
        href="https://www.ogdcn.com"
        target="_blank"
        rel="noopener"
        class="sidebar-link external"
      >
        <span class="link-dot"></span>
        {{ locale === 'en' ? 'OGD Official Site' : 'OGD 官方網站' }}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:4px">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </nav>

    <!-- Submit Button -->
    <button class="submit-btn" @click="$emit('openSubmit')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
      {{ t.sidebar.submitBtn }}
    </button>

    <!-- Deadline card -->
    <div class="deadline-card">
      <div class="deadline-icon">⏰</div>
      <div>
        <div class="deadline-label">{{ locale === 'en' ? 'Submission Deadline' : '投稿截止日期' }}</div>
        <div class="deadline-date">{{ locale === 'en' ? 'August 31, 2025' : '2025年8月31日' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { Locale, Translations } from '../i18n'

const props = defineProps<{
  locale: Locale
  t: Translations
}>()

defineEmits<{ openSubmit: [] }>()

const activeSection = ref('overview')

const navItems = computed(() => [
  { id: 'overview', label: props.locale === 'en' ? 'Overview' : '賽事概覽' },
  { id: 'theme', label: props.locale === 'en' ? 'Theme' : '主題' },
  { id: 'requirements', label: props.locale === 'en' ? 'Requirements' : '投稿要求' },
  { id: 'timeline', label: props.locale === 'en' ? 'Timeline' : '重要日期' },
  { id: 'prizes', label: props.locale === 'en' ? 'Prizes' : '獎項設置' },


  { id: 'faq', label: props.locale === 'en' ? 'FAQ' : '常見問題' }
])

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function onScroll() {
  const sections = navItems.value.map(i => document.getElementById(i.id))
  let current = navItems.value[0].id
  for (const section of sections) {
    if (!section) continue
    if (section.getBoundingClientRect().top <= 100) {
      current = section.id
    }
  }
  activeSection.value = current
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #888;
  margin: 0 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  text-decoration: none;
  color: #555;
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}
.sidebar-link:hover {
  background: #eeebf5;
  color: #2d1b69;
}
.sidebar-link.active {
  background: #e8e4f5;
  color: #2d1b69;
  font-weight: 600;
}
.sidebar-link.active .link-dot {
  background: #2d1b69;
  transform: scale(1.3);
}

.link-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ccc;
  flex-shrink: 0;
  transition: all 0.2s;
}

.sidebar-link.external {
  color: #888;
  font-size: 0.82rem;
}

/* Submit button */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #1a0533, #2d1b69, #1e3a8a);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(45,27,105,0.35);
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(45,27,105,0.5);
}

/* Deadline card */
.deadline-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding: 14px;
  background: linear-gradient(135deg, #f0edf8, #f8f7fd);
  border: 1px solid #c5bce0;
  border-radius: 8px;
}
.deadline-icon { font-size: 1.5rem; }
.deadline-label {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 2px;
}
.deadline-date {
  font-size: 0.9rem;
  font-weight: 700;
  color: #2d1b69;
}
</style>
