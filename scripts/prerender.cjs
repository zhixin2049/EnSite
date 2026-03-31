/**
 * Prerender script for SEO
 * Generates static HTML files for /en/ and /zh/ routes
 * Injects title, meta description, og tags, and JSON-LD into HTML
 */

const fs = require('fs')
const path = require('path')

const DIST_DIR = path.join(__dirname, '..', 'dist')

const pages = [
  {
    route: 'en',
    lang: 'en',
    title: 'International Art Competition 2025 | OGD',
    description: 'Join the International Art Competition 2025. Open to artists worldwide across painting, digital art, photography, and mixed media. Win up to $10,000.',
    ogLocale: 'en_US',
    jsonLdName: 'International Art Competition 2025',
    contestName: 'International Art Competition 2025'
  },
  {
    route: 'zh',
    lang: 'zh-Hant',
    title: '國際藝術大賽 2025 | OGD',
    description: '參加國際藝術大賽2025。面向全球藝術家開放，接受繪畫、數字藝術、攝影及綜合媒材等類別投稿。最高獎金10,000美元。',
    ogLocale: 'zh_TW',
    jsonLdName: '國際藝術大賽 2025',
    contestName: '國際藝術大賽 2025'
  }
]

const BASE_URL = process.env.SITE_URL || 'https://yourusername.github.io/contest-site'
const OG_IMAGE = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80'

function buildHead(page) {
  const url = `${BASE_URL}/${page.route}/`
  const altLang = page.route === 'en' ? 'zh' : 'en'
  const altUrl = `${BASE_URL}/${altLang}/`
  const defaultUrl = `${BASE_URL}/en/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: page.jsonLdName,
    description: page.description,
    url,
    inLanguage: page.lang,
    organizer: {
      '@type': 'Organization',
      name: 'OGD Cultural Foundation',
      url: 'https://www.ogdcn.com'
    },
    startDate: '2025-05-01',
    endDate: '2025-12-01',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: { '@type': 'VirtualLocation', url },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-05-01'
    }
  }

  return `
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="${page.route}" href="${url}" />
    <link rel="alternate" hreflang="${altLang}" href="${altUrl}" />
    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${page.ogLocale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`
}

function prerenderPage(page) {
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8')
  const injectedHead = buildHead(page)

  // Replace the existing title and inject SEO tags before </head>
  let output = indexHtml
    .replace(/<title>.*?<\/title>/, '')
    .replace('</head>', `${injectedHead}\n  </head>`)

  const dir = path.join(DIST_DIR, page.route)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), output, 'utf-8')
  console.log(`✓ Generated /${page.route}/index.html`)
}

// Also create root redirect
function createRootRedirect() {
  const html = `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=/en/" />
  <link rel="canonical" href="${BASE_URL}/en/" />
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="/en/">/en/</a>...</p>
</body>
</html>`
  // Only write if doesn't need to coexist with index.html
  // On GitHub Pages we keep the existing index.html as entry
  console.log('✓ Root redirect handled by Vue Router')
}

// Run
pages.forEach(prerenderPage)
createRootRedirect()
console.log('Prerender complete!')
