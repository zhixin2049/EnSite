<template>
  <div class="home-view">
    <SiteHeader :locale="locale" :t="t" />
    <CarouselBanner :t="t" />

    <!-- Main Content -->
    <div class="main-container">
      <div class="content-layout">
        <!-- Article -->
        <main class="article-area">
          <section id="overview" class="content-section">
            <h2 class="section-title">{{ t.content.overview }}</h2>
            <p class="section-text">{{ t.content.overviewText }}</p>
          </section>

          <section id="theme" class="content-section">
            <h2 class="section-title">{{ t.content.theme }}</h2>
            <div class="theme-card">
              <div class="theme-quote">"</div>
              <p class="section-text">{{ t.content.themeText }}</p>
            </div>
          </section>

          <section id="requirements" class="content-section">
            <h2 class="section-title">{{ t.content.requirements }}</h2>
            <ul class="req-list">
              <li v-for="(item, i) in t.content.requirementsList" :key="i" class="req-item">
                <span class="req-icon">✓</span>
                {{ item }}
              </li>
            </ul>
          </section>

          <section id="timeline" class="content-section">
            <h2 class="section-title">{{ t.content.timeline }}</h2>
            <div class="timeline">
              <div
                v-for="(item, i) in t.content.timelineItems"
                :key="i"
                class="timeline-item"
              >
                <div class="timeline-dot"></div>
                <div class="timeline-line" v-if="i < t.content.timelineItems.length - 1"></div>
                <div class="timeline-content">
                  <span class="timeline-date">{{ item.date }}</span>
                  <span class="timeline-event">{{ item.event }}</span>
                </div>
              </div>
            </div>
          </section>

          <section id="prizes" class="content-section">
            <h2 class="section-title">{{ t.content.prizes }}</h2>
            <div class="prizes-grid">
              <div
                v-for="(prize, i) in t.content.prizesItems"
                :key="i"
                class="prize-card"
                :class="{ featured: i === 0 }"
              >
                <div class="prize-medal">{{ ['🏆','🥇','🥈','🥉','🎖️'][i] }}</div>
                <div class="prize-rank">{{ prize.rank }}</div>
                <div class="prize-award">{{ prize.award }}</div>
              </div>
            </div>
          </section>




          <section id="faq" class="content-section">
            <h2 class="section-title">{{ t.content.faq }}</h2>
            <div class="faq-list">
              <div
                v-for="(item, i) in t.content.faqItems"
                :key="i"
                class="faq-item"
                :class="{ open: openFaq === i }"
              >
                <button class="faq-question" @click="toggleFaq(i)">
                  <span>{{ item.q }}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    :style="{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <Transition name="faq-body">
                  <div v-if="openFaq === i" class="faq-answer">{{ item.a }}</div>
                </Transition>
              </div>
            </div>
          </section>
        </main>

        <!-- Sidebar -->
        <aside class="sidebar-area">
          <SidebarNav :locale="locale" :t="t" @open-submit="showDialog = true" />
        </aside>
      </div>
    </div>

    <!-- Submit Dialog -->
    <SubmitDialog v-model="showDialog" :locale="locale" :t="t" />

    <SiteFooter :t="t" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import CarouselBanner from '../components/CarouselBanner.vue'
import SidebarNav from '../components/SidebarNav.vue'
import SubmitDialog from '../components/SubmitDialog.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { messages } from '../i18n'
import type { Locale } from '../i18n'

const route = useRoute()
const showDialog = ref(false)
const openFaq = ref<number | null>(null)

const locale = computed<Locale>(() => {
  const path = route.path
  if (path.startsWith('/zh')) return 'zh'
  return 'en'
})

const t = computed(() => messages[locale.value])

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

// Update SEO meta on locale change
watch(locale, (lang) => {
  updateSEO(lang)
}, { immediate: true })

function updateSEO(lang: Locale) {
  const seoT = messages[lang]
  const contestName = seoT.header.contestName
  const description = seoT.content.overviewText.substring(0, 155)
  const url = `${window.location.origin}/${lang}/`
  const altUrl = `${window.location.origin}/${lang === 'en' ? 'zh' : 'en'}/`

  // title
  document.title = `${contestName} | OGD`

  // meta description
  setMeta('name', 'description', description)

  // Open Graph
  setMeta('property', 'og:title', contestName)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:image', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80')
  setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'zh_TW')

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', contestName)
  setMeta('name', 'twitter:description', description)

  // Canonical
  setLink('canonical', url)

  // hreflang
  setHreflang(lang, url, lang === 'en' ? 'zh' : 'en', altUrl)

  // JSON-LD
  setJsonLd(lang, contestName, description, url)
}

function setMeta(attrName: string, attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function setHreflang(currentLang: string, currentUrl: string, altLang: string, altUrl: string) {
  // Remove old hreflang links
  document.querySelectorAll('link[hreflang]').forEach(el => el.remove())

  const langs = [
    { lang: currentLang, url: currentUrl },
    { lang: altLang, url: altUrl },
    { lang: 'x-default', url: `${window.location.origin}/en/` }
  ]
  for (const { lang, url } of langs) {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = lang
    link.href = url
    document.head.appendChild(link)
  }
}

function setJsonLd(lang: Locale, name: string, description: string, url: string) {
  let el = document.getElementById('json-ld-schema') as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = 'json-ld-schema'
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    url,
    inLanguage: lang === 'en' ? 'en' : 'zh-Hant',
    organizer: {
      '@type': 'Organization',
      name: 'OGD Cultural Foundation',
      url: 'https://www.ogdcn.com'
    },
    startDate: '2025-05-01',
    endDate: '2025-12-01',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-05-01'
    }
  }
  el.textContent = JSON.stringify(schema)
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: #f9f7f4;
  color: #333;
}

/* Layout */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 0;
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 40px;
  align-items: start;
}

/* Article */
.article-area {
  min-width: 0;
}

.content-section {
  margin-bottom: 56px;
  scroll-margin-top: 90px;
}

.section-title {
  font-size: 1.7rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(135deg, #1a0533, #2d1b69, #1e3a8a) 1;
  display: inline-block;
}

.section-text {
  font-size: 1rem;
  line-height: 1.85;
  color: #444;
  margin: 0;
}

/* Theme card */
.theme-card {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 12px;
  padding: 28px 32px;
  position: relative;
  overflow: hidden;
}
.theme-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1a0533, #2d1b69, #1e3a8a);
}
.theme-quote {
  font-size: 5rem;
  color: #7c6fa0;
  opacity: 0.4;
  line-height: 0.5;
  margin-bottom: 16px;
  font-family: Georgia, serif;
}
.theme-card .section-text { color: #e0d4b8; }

/* Requirements */
.req-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.req-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  font-size: 0.95rem;
  color: #444;
  border-left: 3px solid #2d1b69;
}
.req-icon {
  color: #2d1b69;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: 20px;
}
.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  padding-bottom: 24px;
}
.timeline-item:last-child { padding-bottom: 0; }
.timeline-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #2d1b69;
  flex-shrink: 0;
  margin-top: 3px;
  box-shadow: 0 0 0 4px rgba(45,27,105,0.2);
  position: relative;
  z-index: 1;
}
.timeline-line {
  position: absolute;
  left: 6px;
  top: 18px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #2d1b69, rgba(45,27,105,0.2));
}
.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.timeline-date {
  font-size: 0.82rem;
  color: #2d1b69;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.timeline-event {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

/* Prizes */
.prizes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
.prize-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 2px solid transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}
.prize-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.prize-card.featured {
  border-color: #2d1b69;
  background: linear-gradient(135deg, #f0edf8, #fff);
}
.prize-medal { font-size: 2rem; margin-bottom: 8px; }
.prize-rank {
  font-size: 0.88rem;
  font-weight: 700;
  color: #2d1b69;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.prize-award {
  font-size: 0.82rem;
  color: #666;
  line-height: 1.4;
}

/* Judges */
.judges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
.judge-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.judge-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin: 0 auto 12px;
}
.judge-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}
.judge-role {
  font-size: 0.78rem;
  color: #888;
}

/* FAQ */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.faq-item {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}
.faq-item.open { border-color: #2d1b69; }
.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  text-align: left;
  transition: color 0.2s;
}
.faq-item.open .faq-question { color: #2d1b69; }
.faq-answer {
  padding: 0 20px 18px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #555;
}

/* FAQ transition */
.faq-body-enter-active, .faq-body-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.faq-body-enter-from, .faq-body-leave-to {
  max-height: 0;
  opacity: 0;
}
.faq-body-enter-to, .faq-body-leave-from {
  max-height: 200px;
  opacity: 1;
}

/* Sidebar */
.sidebar-area {
  min-width: 0;
}

@media (max-width: 900px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
  .sidebar-area {
    order: -1;
  }
  .sidebar-area :deep(.sidebar) {
    position: static;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}

@media (max-width: 600px) {
  .prizes-grid { grid-template-columns: 1fr 1fr; }
  .judges-grid { grid-template-columns: 1fr 1fr; }
}
</style>
