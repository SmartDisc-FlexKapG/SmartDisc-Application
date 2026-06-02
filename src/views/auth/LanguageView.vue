<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthBackBtn from '@/components/auth/AuthBackBtn.vue'
import { SdBtn } from '@/components/ui'
import { usePreferences } from '@/composables/usePreferences'

const router = useRouter()
const { language: savedLang, saveLanguage } = usePreferences()

const selected = ref(savedLang.value ?? 'en')

const options = [
  { code: 'en', flag: '🇬🇧', name: 'English', native: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch', native: 'Deutsch' },
]

function next() {
  saveLanguage(selected.value)
  router.push('/design')
}
</script>

<template>
  <AuthLayout>
    <nav class="auth-nav">
      <AuthBackBtn to="/welcome" />
      <div class="step-indicator">1 / 2</div>
    </nav>

    <header class="auth-header">
      <p class="auth-eyebrow">Setup · step 1</p>
      <h1 class="auth-h1">Language.</h1>
      <p class="auth-sub">Which language do you prefer?</p>
    </header>

    <div class="lang-list">
      <button
        v-for="opt in options"
        :key="opt.code"
        :class="['lang-card', { 'lang-card--on': selected === opt.code }]"
        @click="selected = opt.code"
      >
        <span class="lang-flag">{{ opt.flag }}</span>
        <div class="lang-copy">
          <span class="lang-name">{{ opt.name }}</span>
          <span v-if="opt.name !== opt.native" class="lang-native">{{ opt.native }}</span>
        </div>
        <span :class="['lang-dot', { 'lang-dot--on': selected === opt.code }]" />
      </button>
    </div>

    <div class="auth-spacer" />

    <div class="setup-footer">
      <SdBtn variant="primary" size="lg" block @click="next">
        Next
        <template #icon-right><ArrowRight :size="18" :stroke-width="2" /></template>
      </SdBtn>
    </div>
  </AuthLayout>
</template>

<style scoped>
.step-indicator {
  margin-left: auto;
  font-family: var(--sd-font-display);
  font-size: 13px;
  font-weight: 500;
  color: var(--sd-fg3);
}

.lang-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: none;
}

.lang-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-radius: var(--sd-r-lg);
  background: var(--sd-glass-light-bg);
  border: 1.5px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  box-shadow: var(--sd-shadow-glass);
  cursor: pointer;
  text-align: left;
  transition: border-color var(--sd-dur-fast) var(--sd-ease-out),
              box-shadow var(--sd-dur-fast) var(--sd-ease-out),
              transform var(--sd-dur-fast) var(--sd-ease-out);
}
.lang-card:active { transform: scale(0.985); }
.lang-card--on {
  border-color: var(--sd-ink);
  box-shadow: var(--sd-shadow-glass), 0 0 0 1px var(--sd-ink);
}

.lang-flag { font-size: 32px; line-height: 1; flex: none; }

.lang-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lang-name {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--sd-fg1);
}
.lang-native {
  font-family: var(--sd-font-body);
  font-size: 13px;
  color: var(--sd-fg3);
}

.lang-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--sd-mist);
  flex: none;
  transition: border-color var(--sd-dur-fast) var(--sd-ease-out),
              background var(--sd-dur-fast) var(--sd-ease-out);
}
.lang-dot--on {
  background: var(--sd-ink);
  border-color: var(--sd-ink);
  box-shadow: inset 0 0 0 4px #fff;
}

.setup-footer {
  padding-bottom: 40px;
  flex: none;
}
</style>
