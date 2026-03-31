<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Logo -->
      <div class="header-logo">
        <router-link :to="logoLink" class="logo-link">
          <div class="logo-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#C8973A"/>
              <path d="M10 24L14 14L18 22L22 14L26 24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="18" cy="10" r="2" fill="white"/>
            </svg>
          </div>
          <span class="logo-text">OGD</span>
        </router-link>
      </div>

      <!-- Contest Name -->
      <div class="header-title">
        <h1 class="contest-name">{{ t.header.contestName }}</h1>
      </div>

      <!-- Right Actions -->
      <div class="header-actions">
        <!-- Share Button -->
        <div class="share-wrapper" ref="shareRef">
          <button class="action-btn share-btn" @click="toggleShare">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span>{{ t.header.share }}</span>
          </button>
          <!-- Share Dropdown -->
          <div v-if="showShare" class="share-dropdown">
            <p class="share-title">{{ t.share.title }}</p>
            <div class="share-platforms">
              <button class="share-item" @click="shareToFacebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button class="share-item" @click="shareToTwitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                Twitter/X
              </button>
              <button class="share-item" @click="shareToWhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
            </div>
            <hr class="share-divider"/>
            <button class="copy-link-btn" @click="copyLink">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              {{ linkCopied ? t.share.copied : t.share.copyLink }}
            </button>
          </div>
        </div>

        <!-- Language Switch -->
        <div class="lang-wrapper" ref="langRef">
          <button class="action-btn lang-btn" @click="toggleLang">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
            <span>{{ currentLang }}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div v-if="showLang" class="lang-dropdown">
            <button
              class="lang-option"
              :class="{ active: locale === 'en' }"
              @click="switchLang('en')"
            >
              🇺🇸 English
            </button>
            <button
              class="lang-option"
              :class="{ active: locale === 'zh' }"
              @click="switchLang('zh')"
            >
              🇹🇼 中文繁體
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import type { Locale, Translations } from '../i18n'

const props = defineProps<{
  locale: Locale
  t: Translations
}>()

const router = useRouter()
const showShare = ref(false)
const showLang = ref(false)
const linkCopied = ref(false)
const shareRef = ref<HTMLElement | null>(null)
const langRef = ref<HTMLElement | null>(null)

const currentLang = computed(() => props.locale === 'en' ? 'EN' : '繁中')
const logoLink = computed(() => `/${props.locale}/`)

function toggleShare() {
  showShare.value = !showShare.value
  showLang.value = false
}

function toggleLang() {
  showLang.value = !showLang.value
  showShare.value = false
}

function switchLang(lang: Locale) {
  showLang.value = false
  router.push(`/${lang}/`)
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
      showShare.value = false
    }, 1500)
  })
}

function shareToFacebook() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')
  showShare.value = false
}

function shareToTwitter() {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(props.t.header.contestName)}`, '_blank')
  showShare.value = false
}

function shareToWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(props.t.header.contestName + ' ' + window.location.href)}`, '_blank')
  showShare.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (shareRef.value && !shareRef.value.contains(e.target as Node)) showShare.value = false
  if (langRef.value && !langRef.value.contains(e.target as Node)) showLang.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #1a0533 0%, #2d1b69 35%, #1e3a8a 70%, #1a237e 100%);
  box-shadow: 0 2px 20px rgba(0,0,0,0.4);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Logo */
.header-logo {
  flex-shrink: 0;
}
.logo-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.logo-text {
  font-size: 1.4rem;
  font-weight: 800;
  color: #C8973A;
  letter-spacing: 2px;
}

/* Title */
.header-title {
  flex: 1;
  text-align: center;
  overflow: hidden;
}
.contest-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.5px;
}

/* Actions */
.header-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: transparent;
  border: 1px solid rgba(200,151,58,0.5);
  border-radius: 6px;
  color: #e0d4b8;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.action-btn:hover {
  background: rgba(200,151,58,0.15);
  border-color: #C8973A;
  color: #C8973A;
}

/* Dropdowns */
.share-wrapper, .lang-wrapper {
  position: relative;
}

.share-dropdown, .lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #16213e;
  border: 1px solid #C8973A;
  border-radius: 10px;
  padding: 16px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  z-index: 200;
}

.share-title {
  font-size: 0.85rem;
  color: #aaa;
  margin: 0 0 12px;
}

.share-platforms {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.share-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.05);
  border: none;
  border-radius: 6px;
  color: #e0d4b8;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;
}
.share-item:hover { background: rgba(200,151,58,0.15); }

.share-divider {
  border: none;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin: 12px 0;
}

.copy-link-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: #C8973A;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.copy-link-btn:hover { background: #b07d28; }

.lang-dropdown {
  min-width: 150px;
  padding: 8px;
}
.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #e0d4b8;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;
}
.lang-option:hover { background: rgba(200,151,58,0.15); }
.lang-option.active {
  color: #C8973A;
  font-weight: 600;
  background: rgba(200,151,58,0.1);
}

@media (max-width: 640px) {
  .contest-name { font-size: 0.9rem; }
  .action-btn span:not(.logo-text) { display: none; }
  .action-btn { padding: 7px 10px; }
}
</style>
