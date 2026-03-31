// i18n configuration
export type Locale = 'en' | 'zh'

export interface Translations {
  nav: {
    home: string
    about: string
    rules: string
    prizes: string
    judges: string
    faq: string
  }
  header: {
    contestName: string
    share: string
    language: string
  }
  carousel: {
    slide1: { title: string; subtitle: string }
    slide2: { title: string; subtitle: string }
    slide3: { title: string; subtitle: string }
  }
  content: {
    overview: string
    overviewText: string
    theme: string
    themeText: string
    requirements: string
    requirementsList: string[]
    timeline: string
    timelineItems: { date: string; event: string }[]
    prizes: string
    prizesItems: { rank: string; award: string }[]
    judges: string
    judgesText: string
    faq: string
    faqItems: { q: string; a: string }[]
  }
  sidebar: {
    menuTitle: string
    submitBtn: string
  }
  dialog: {
    title: string
    email: string
    copyBtn: string
    copiedMsg: string
    closeBtn: string
  }
  footer: {
    about: string
    aboutText: string
    links: string
    contact: string
    copyright: string
    terms: string
    privacy: string
    organizer: string
  }
  share: {
    title: string
    copyLink: string
    copied: string
  }
}

const en: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    rules: 'Rules',
    prizes: 'Prizes',
    judges: 'Judges',
    faq: 'FAQ'
  },
  header: {
    contestName: 'OCSIIDA 2026 Oriental Creative Star International Innovation Design Award',
    share: 'Share',
    language: 'Language'
  },
  carousel: {
    slide1: {
      title: 'OCSIIDA 2026',
      subtitle: 'Oriental Creative Star International Innovation Design Award'
    },
    slide2: {
      title: 'Open to All Designers & Creators Worldwide',
      subtitle: 'Multiple Categories · Professional Jury · Generous Prizes'
    },
    slide3: {
      title: 'Submission Deadline: August 31, 2026',
      subtitle: 'Submit Your Masterpiece Today'
    }
  },
  content: {
    overview: 'Contest Overview',
    overviewText:
      'The OCSIIDA 2026 Oriental Creative Star International Innovation Design Award is an open call for designers and creators worldwide to showcase their creativity and innovation. We welcome submissions across product design, visual design, digital art, architecture, and more. This prestigious competition brings together talents from over 50 countries, offering a platform to gain international recognition and connect with global design communities.',
    theme: 'Theme',
    themeText:
      '"Harmony & Innovation" — We invite artists to explore the intersection of tradition and modernity, nature and technology, individual and community. Your interpretation can be literal or abstract, personal or universal.',
    requirements: 'Submission Requirements',
    requirementsList: [
      'Original works created within the last 2 years',
      'Maximum 3 submissions per artist',
      'Digital files: minimum 3000px on the longest side, 300 DPI',
      'File formats: JPEG, PNG, TIFF',
      'Works must not have won prizes in other competitions',
      'Artists of all ages and nationalities are welcome'
    ],
    timeline: 'Important Dates',
    timelineItems: [
      { date: 'May 1, 2025', event: 'Submission Opens' },
      { date: 'August 31, 2025', event: 'Submission Deadline' },
      { date: 'September 15, 2025', event: 'Jury Selection' },
      { date: 'October 1, 2025', event: 'Finalists Announced' },
      { date: 'November 15, 2025', event: 'Winners Announced' },
      { date: 'December 1, 2025', event: 'Awards Ceremony' }
    ],
    prizes: 'Prizes & Awards',
    prizesItems: [
      { rank: 'Grand Prize', award: 'USD $10,000 + Trophy + Certificate' },
      { rank: '1st Place', award: 'USD $5,000 + Gold Medal + Certificate' },
      { rank: '2nd Place', award: 'USD $3,000 + Silver Medal + Certificate' },
      { rank: '3rd Place', award: 'USD $1,000 + Bronze Medal + Certificate' },
      { rank: 'Merit Award (×10)', award: 'Certificate + Exhibition Feature' }
    ],
    judges: 'Jury Panel',
    judgesText:
      'Our distinguished jury panel consists of internationally renowned artists, curators, and art critics from around the world. Each entry will be carefully evaluated based on originality, technical skill, artistic vision, and thematic relevance.',
    faq: 'Frequently Asked Questions',
    faqItems: [
      {
        q: 'Who can participate?',
        a: 'The competition is open to artists of all ages and nationalities. Both amateur and professional artists are welcome.'
      },
      {
        q: 'Is there an entry fee?',
        a: 'No, participation is completely free of charge.'
      },
      {
        q: 'Can I submit work that has been previously exhibited?',
        a: 'Yes, previously exhibited works are accepted as long as they have not won prizes in other competitions.'
      },
      {
        q: 'How will I be notified if I win?',
        a: 'Winners will be notified by email and announced on our official website and social media channels.'
      }
    ]
  },
  sidebar: {
    menuTitle: 'Quick Navigation',
    submitBtn: 'Submit Your Work'
  },
  dialog: {
    title: 'Submit Your Artwork',
    email: 'Send your submission to:',
    copyBtn: 'Copy Email & Close',
    copiedMsg: 'Email copied!',
    closeBtn: 'Close'
  },
  footer: {
    about: 'About Us',
    aboutText:
      'We are dedicated to promoting art and culture globally, connecting artists with opportunities and audiences worldwide.',
    links: 'Quick Links',
    contact: 'Contact',
    copyright: '© 2026 OCSIIDA. All rights reserved.',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    organizer: 'Organized by OGD Cultural Foundation'
  },
  share: {
    title: 'Share this page',
    copyLink: 'Copy Link',
    copied: 'Link Copied!'
  }
}

const zh: Translations = {
  nav: {
    home: '首頁',
    about: '關於',
    rules: '規則',
    prizes: '獎項',
    judges: '評委',
    faq: '常見問題'
  },
  header: {
    contestName: 'OCSIIA2026東方創意之星國際創新設計大賽',
    share: '分享',
    language: '語言'
  },
  carousel: {
    slide1: {
      title: 'OCSIIA2026東方創意之星',
      subtitle: '國際創新設計大賽'
    },
    slide2: {
      title: '面向全球設計師及創作者開放',
      subtitle: '多個類別 · 專業評審 · 豐厚獎項'
    },
    slide3: {
      title: '截止日期：2026年8月31日',
      subtitle: '立即提交您的作品'
    }
  },
  content: {
    overview: '賽事概覽',
    overviewText:
      'OCSIIA2026東方創意之星國際創新設計大賽面向全球設計師及創作者開放，誠邀各界精英展示創意與創新實力。我們接受產品設計、視覺設計、數字藝術、建築設計等多種類別的作品投稿。這項享有盛譽的賽事匯聚來自50多個國家的設計精英，為他們提供獲得國際認可、與全球設計社群接軌的重要平台。',
    theme: '主題',
    themeText:
      '「和諧與創新」——我們邀請藝術家探索傳統與現代、自然與技術、個體與社群之間的交匯點。您的詮釋可以是具象或抽象的，個人或普世的。',
    requirements: '投稿要求',
    requirementsList: [
      '近兩年內創作的原創作品',
      '每位藝術家最多提交3件作品',
      '數字文件：最長邊不低於3000像素，解析度300 DPI',
      '文件格式：JPEG、PNG、TIFF',
      '作品不得已在其他比賽中獲獎',
      '歡迎各年齡段及國籍的藝術家參賽'
    ],
    timeline: '重要日期',
    timelineItems: [
      { date: '2025年5月1日', event: '投稿開始' },
      { date: '2025年8月31日', event: '投稿截止' },
      { date: '2025年9月15日', event: '評審選拔' },
      { date: '2025年10月1日', event: '公布決賽入圍名單' },
      { date: '2025年11月15日', event: '公布獲獎名單' },
      { date: '2025年12月1日', event: '頒獎典禮' }
    ],
    prizes: '獎項設置',
    prizesItems: [
      { rank: '大獎', award: '美金 $10,000 + 獎盃 + 證書' },
      { rank: '一等獎', award: '美金 $5,000 + 金牌 + 證書' },
      { rank: '二等獎', award: '美金 $3,000 + 銀牌 + 證書' },
      { rank: '三等獎', award: '美金 $1,000 + 銅牌 + 證書' },
      { rank: '優秀獎（×10）', award: '證書 + 展覽展示' }
    ],
    judges: '評審委員會',
    judgesText:
      '我們的評審委員會由來自世界各地的國際知名藝術家、策展人及藝術評論家組成。每件參賽作品將依據原創性、技術水準、藝術視野及主題相關性進行嚴格評審。',
    faq: '常見問題',
    faqItems: [
      {
        q: '誰可以參賽？',
        a: '本比賽面向所有年齡段和國籍的藝術家開放，業餘及專業藝術家均可參賽。'
      },
      {
        q: '是否需要繳納報名費？',
        a: '不需要，參賽完全免費。'
      },
      {
        q: '可以提交曾經展出過的作品嗎？',
        a: '可以，已展出作品可以投稿，但不得已在其他比賽中獲獎。'
      },
      {
        q: '如何通知獲獎者？',
        a: '獲獎者將通過電子郵件收到通知，結果同時在官方網站及社交媒體上公佈。'
      }
    ]
  },
  sidebar: {
    menuTitle: '快速導覽',
    submitBtn: '提交作品'
  },
  dialog: {
    title: '提交您的作品',
    email: '請將投稿發送至：',
    copyBtn: '複製郵箱並關閉',
    copiedMsg: '郵箱已複製！',
    closeBtn: '關閉'
  },
  footer: {
    about: '關於我們',
    aboutText: '我們致力於在全球推廣藝術與文化，為藝術家連接機會與全球觀眾。',
    links: '快速連結',
    contact: '聯繫我們',
    copyright: '© 2026 OCSIIA東方創意之星國際創新設計大賽。保留所有權利。',
    terms: '服務條款',
    privacy: '隱私政策',
    organizer: '主辦：OGD文化基金會'
  },
  share: {
    title: '分享此頁面',
    copyLink: '複製連結',
    copied: '連結已複製！'
  }
}

export const messages: Record<Locale, Translations> = { en, zh }

export function useI18n(locale: Locale) {
  return messages[locale]
}
