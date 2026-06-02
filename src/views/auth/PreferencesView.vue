<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, ArrowRight } from 'lucide-vue-next'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { SdBtn } from '@/components/ui'
import { usePreferences } from '@/composables/usePreferences'

const router = useRouter()
const { savePreferences } = usePreferences()

const language = ref('en')
const theme    = ref('light')

function finish() {
  savePreferences(language.value, theme.value)
  router.push('/discs')
}
</script>

<template>
  <AuthLayout>
    <div class="pref-spacer-top" />

    <header class="pref-header">
      <p class="auth-eyebrow">One-time setup</p>
      <h1 class="auth-h1">Your preferences.</h1>
      <p class="auth-sub">
        Pick your language and look — you can always change this later in Settings.
      </p>
    </header>

    <!-- Language -->
    <section class="pref-section">
      <p class="pref-label">Language</p>
      <div class="pref-row">
        <button
          :class="['lang-card', { 'lang-card--on': language === 'en' }]"
          @click="language = 'en'"
        >
          <span class="lang-flag">🇬🇧</span>
          <span class="lang-name">English</span>
          <CheckCircle2 v-if="language === 'en'" :size="16" class="lang-check" />
        </button>
        <button
          :class="['lang-card', { 'lang-card--on': language === 'de' }]"
          @click="language = 'de'"
        >
          <span class="lang-flag">🇩🇪</span>
          <span class="lang-name">Deutsch</span>
          <CheckCircle2 v-if="language === 'de'" :size="16" class="lang-check" />
        </button>
      </div>
    </section>

    <!-- Theme -->
    <section class="pref-section">
      <p class="pref-label">Design</p>
      <div class="pref-row">
        <button
          :class="['theme-card', { 'theme-card--on': theme === 'light' }]"
          @click="theme = 'light'"
        >
          <div class="theme-preview theme-preview--light" />
          <span class="theme-name">Light</span>
          <CheckCircle2 v-if="theme === 'light'" :size="14" class="theme-check" />
        </button>
        <button
          :class="['theme-card', { 'theme-card--on': theme === 'dark' }]"
          @click="theme = 'dark'"
        >
          <div class="theme-preview theme-preview--dark" />
          <span class="theme-name">Dark</span>
          <CheckCircle2 v-if="theme === 'dark'" :size="14" class="theme-check" />
        </button>
        <button
          :class="['theme-card', { 'theme-card--on': theme === 'system' }]"
          @click="theme = 'system'"
        >
          <div class="theme-preview theme-preview--system" />
          <span class="theme-name">System</span>
          <CheckCircle2 v-if="theme === 'system'" :size="14" class="theme-check" />
        </button>
      </div>
    </section>

    <div class="auth-spacer" />

    <div class="pref-footer">
      <SdBtn variant="primary" size="lg" block @click="finish">
        Let's go
        <template #icon-right>
          <ArrowRight :size="18" :stroke-width="2" />
        </template>
      </SdBtn>
    </div>
  </AuthLayout>
</template>

<style scoped>
.pref-spacer-top { flex: none; height: 28px; }

.pref-header { margin-bottom: 28px; flex: none; }

.pref-section { margin-bottom: 24px; flex: none; }

.pref-label {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sd-azure);
  margin: 0 0 10px;
}

.pref-row {
  display: flex;
  gap: 10px;
}

/* Language cards */
.lang-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--sd-r-md);
  background: var(--sd-glass-light-bg);
  border: 1.5px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  box-shadow: var(--sd-shadow-glass);
  cursor: pointer;
  transition: border-color var(--sd-dur-fast) var(--sd-ease-out),
              box-shadow var(--sd-dur-fast) var(--sd-ease-out);
}
.lang-card--on {
  border-color: var(--sd-ink);
  box-shadow: var(--sd-shadow-glass), 0 0 0 1px var(--sd-ink);
}

.lang-flag { font-size: 22px; line-height: 1; flex: none; }

.lang-name {
  flex: 1;
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--sd-fg1);
  text-align: left;
}

.lang-check { color: var(--sd-ink); flex: none; }

/* Theme cards */
.theme-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  border-radius: var(--sd-r-md);
  background: var(--sd-glass-light-bg);
  border: 1.5px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  box-shadow: var(--sd-shadow-glass);
  cursor: pointer;
  transition: border-color var(--sd-dur-fast) var(--sd-ease-out),
              box-shadow var(--sd-dur-fast) var(--sd-ease-out);
}
.theme-card--on {
  border-color: var(--sd-ink);
  box-shadow: var(--sd-shadow-glass), 0 0 0 1px var(--sd-ink);
}

.theme-preview {
  width: 100%;
  height: 52px;
  border-radius: 10px;
}
.theme-preview--light  { background: linear-gradient(140deg, #f2eae2, #dec38c); border: 1px solid rgba(0,0,0,.06); }
.theme-preview--dark   { background: linear-gradient(140deg, #0a1c3d, #1d3d72); }
.theme-preview--system { background: linear-gradient(140deg, #f2eae2 50%, #0a1c3d 50%); }

.theme-name {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--sd-fg1);
}
.theme-check { color: var(--sd-ink); }

.pref-footer {
  padding-bottom: 40px;
  flex: none;
}
</style>
