<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthBackBtn from '@/components/auth/AuthBackBtn.vue'
import { SdBtn } from '@/components/ui'
import { usePreferences } from '@/composables/usePreferences'

const router = useRouter()
const { theme: savedTheme, saveTheme } = usePreferences()

const selected = ref(savedTheme.value ?? 'light')

const themes = [
  {
    key: 'light',
    label: 'Light',
    preview: 'linear-gradient(140deg, #f2eae2, #dec38c)',
    border: '1px solid rgba(0,0,0,.06)',
  },
  {
    key: 'dark',
    label: 'Dark',
    preview: 'linear-gradient(140deg, #0a1c3d, #1d3d72)',
  },
  {
    key: 'system',
    label: 'System',
    preview: 'linear-gradient(140deg, #f2eae2 50%, #0a1c3d 50%)',
  },
]

function goSignUp() {
  saveTheme(selected.value)
  router.push('/sign-up')
}

function goSignIn() {
  saveTheme(selected.value)
  router.push('/sign-in')
}
</script>

<template>
  <AuthLayout>
    <nav class="auth-nav">
      <AuthBackBtn to="/language" />
      <div class="step-indicator">2 / 2</div>
    </nav>

    <header class="auth-header">
      <p class="auth-eyebrow">Setup · step 2</p>
      <h1 class="auth-h1">Design.</h1>
      <p class="auth-sub">How should SmartDisc look?</p>
    </header>

    <div class="theme-grid">
      <button
        v-for="t in themes"
        :key="t.key"
        :class="['theme-card', { 'theme-card--on': selected === t.key }]"
        @click="selected = t.key"
      >
        <div
          class="theme-preview"
          :style="{ background: t.preview, border: t.border ?? 'none' }"
        />
        <span class="theme-label">{{ t.label }}</span>
        <span :class="['theme-dot', { 'theme-dot--on': selected === t.key }]" />
      </button>
    </div>

    <div class="auth-spacer" />

    <div class="setup-footer">
      <p class="footer-eyebrow">Ready? Choose how to continue.</p>
      <div class="footer-btns">
        <SdBtn variant="primary" size="lg" block @click="goSignUp">
          Create account
        </SdBtn>
        <SdBtn variant="ghost" size="lg" block @click="goSignIn">
          Sign in
        </SdBtn>
      </div>
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

.theme-grid {
  display: flex;
  gap: 10px;
  flex: none;
}

.theme-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: var(--sd-r-lg);
  background: var(--sd-glass-light-bg);
  border: 1.5px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  box-shadow: var(--sd-shadow-glass);
  cursor: pointer;
  transition: border-color var(--sd-dur-fast) var(--sd-ease-out),
              box-shadow var(--sd-dur-fast) var(--sd-ease-out),
              transform var(--sd-dur-fast) var(--sd-ease-out);
}
.theme-card:active { transform: scale(0.97); }
.theme-card--on {
  border-color: var(--sd-ink);
  box-shadow: var(--sd-shadow-glass), 0 0 0 1px var(--sd-ink);
}

.theme-preview {
  width: 100%;
  height: 72px;
  border-radius: 10px;
  flex: none;
}

.theme-label {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--sd-fg1);
}

.theme-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--sd-mist);
  flex: none;
  transition: border-color var(--sd-dur-fast) var(--sd-ease-out),
              background var(--sd-dur-fast) var(--sd-ease-out);
}
.theme-dot--on {
  background: var(--sd-ink);
  border-color: var(--sd-ink);
  box-shadow: inset 0 0 0 3px #fff;
}

.setup-footer {
  padding-bottom: 40px;
  flex: none;
}

.footer-eyebrow {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sd-azure);
  text-align: center;
  margin: 0 0 12px;
}

.footer-btns {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
