<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-backdrop" @click.self="close">
        <div class="modal-box" role="dialog" aria-modal="true">
          <div class="modal-header">
            <div class="modal-icon">✉️</div>
            <h3 class="modal-title">{{ t.dialog.title }}</h3>
            <button class="modal-close" @click="close" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <p class="modal-label">{{ t.dialog.email }}</p>
            <div class="email-display">
              <span class="email-text">{{ SUBMIT_EMAIL }}</span>
            </div>
            <p class="modal-hint">
              {{ locale === 'en'
                ? 'Please include your name, artwork title, and a brief description in the email.'
                : '請在郵件中包含您的姓名、作品標題及簡短說明。' }}
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn-copy" @click="copyAndClose" :class="{ copied: copied }">
              <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ copied ? t.dialog.copiedMsg : t.dialog.copyBtn }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Locale, Translations } from '../i18n'

const SUBMIT_EMAIL = 'ogdcns@gmail.com'

defineProps<{
  modelValue: boolean
  locale: Locale
  t: Translations
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const copied = ref(false)

function close() {
  emit('update:modelValue', false)
}

function copyAndClose() {
  navigator.clipboard.writeText(SUBMIT_EMAIL).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
      close()
    }, 1200)
  })
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10,10,20,0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-box {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f0e8d5;
  position: relative;
}

.modal-icon { font-size: 1.8rem; }

.modal-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  flex: 1;
}

.modal-close {
  position: absolute;
  right: 16px;
  top: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.2s;
}
.modal-close:hover {
  background: #ffe8e8;
  color: #e53e3e;
}

.modal-body {
  padding: 20px 24px;
}

.modal-label {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 10px;
}

.email-display {
  background: #f8f4ec;
  border: 2px dashed #C8973A;
  border-radius: 8px;
  padding: 14px 16px;
  text-align: center;
  margin-bottom: 14px;
}

.email-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: #C8973A;
  letter-spacing: 0.5px;
}

.modal-hint {
  font-size: 0.82rem;
  color: #888;
  line-height: 1.6;
  margin: 0;
}

.modal-footer {
  padding: 16px 24px 24px;
}

.btn-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #C8973A, #e0b060);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(200,151,58,0.35);
}
.btn-copy:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(200,151,58,0.5);
}
.btn-copy.copied {
  background: linear-gradient(135deg, #38a169, #48bb78);
  box-shadow: 0 4px 15px rgba(56,161,105,0.35);
}

/* Transition */
.modal-enter-active, .modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-box {
  transform: scale(0.9) translateY(20px);
}
.modal-leave-to .modal-box {
  transform: scale(0.95) translateY(10px);
}
</style>
