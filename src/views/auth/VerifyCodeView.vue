<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldCheck } from 'lucide-vue-next'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthBackBtn from '@/components/auth/AuthBackBtn.vue'
import { SdBtn } from '@/components/ui'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { pendingVerification, verify, resendCode, isLoading, error: authError, clearError } = useAuth()

// ── OTP state ──────────────────────────────────────────────────────────────
const digits  = ref(['', '', '', '', '', ''])
const inputs  = ref([])
const shaking = ref(false)
const code    = computed(() => digits.value.join(''))

function focusFirst() { inputs.value[0]?.focus() }

function onInput(i, e) {
  const val = e.target.value.replace(/\D/g, '')
  e.target.value = ''           // reset so Vue controls the value
  if (!val) return
  digits.value[i] = val[val.length - 1]
  if (i < 5) inputs.value[i + 1]?.focus()
  if (code.value.length === 6) handleVerify()
}

function onKeydown(i, e) {
  if (e.key === 'Backspace') {
    if (digits.value[i]) {
      digits.value[i] = ''
    } else if (i > 0) {
      digits.value[i - 1] = ''
      inputs.value[i - 1]?.focus()
    }
    e.preventDefault()
  } else if (e.key === 'ArrowLeft' && i > 0) {
    inputs.value[i - 1]?.focus()
  } else if (e.key === 'ArrowRight' && i < 5) {
    inputs.value[i + 1]?.focus()
  }
}

function onPaste(e) {
  const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  if (!text) return
  e.preventDefault()
  digits.value = [...text.padEnd(6, '').split('').slice(0, 6)]
  const next = Math.min(text.length, 5)
  inputs.value[next]?.focus()
  if (text.length === 6) handleVerify()
}

function shake() {
  shaking.value = true
  setTimeout(() => { shaking.value = false }, 500)
}

function resetDigits() {
  digits.value = ['', '', '', '', '', '']
  focusFirst()
}

async function handleVerify() {
  if (code.value.length < 6 || isLoading.value) return
  clearError()
  try {
    const redirectTo = await verify(code.value)
    router.push(redirectTo)
  } catch {
    shake()
    resetDigits()
  }
}

// ── Resend countdown ───────────────────────────────────────────────────────
const COOLDOWN  = 60
const countdown = ref(COOLDOWN)
const canResend = ref(false)
let timer = null

function startCountdown() {
  countdown.value = COOLDOWN
  canResend.value = false
  clearInterval(timer)
  timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) { canResend.value = true; clearInterval(timer) }
  }, 1000)
}

async function handleResend() {
  if (!canResend.value) return
  await resendCode()
  resetDigits()
  startCountdown()
}

const countdownLabel = computed(() => {
  const m = Math.floor(countdown.value / 60)
  const s = countdown.value % 60
  return `${m}:${String(s).padStart(2, '0')}`
})

onMounted(() => { focusFirst(); startCountdown() })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <AuthLayout>
    <nav class="auth-nav">
      <AuthBackBtn />
    </nav>

    <!-- Header -->
    <div class="verify-hero">
      <div class="verify-icon">
        <ShieldCheck :size="40" :stroke-width="1.5" />
      </div>
      <p class="auth-eyebrow">Verification</p>
      <h1 class="auth-h1">Check your inbox.</h1>
      <p class="auth-sub">
        We sent a 6-digit code to<br />
        <strong class="verify-email">{{ pendingVerification?.email }}</strong>
      </p>
    </div>

    <!-- OTP boxes -->
    <div :class="['otp-wrap', { 'otp-wrap--shake': shaking }]" @paste="onPaste">
      <input
        v-for="(digit, i) in digits"
        :key="i"
        :ref="el => inputs[i] = el"
        :value="digit"
        class="otp-box"
        :class="{ 'otp-box--filled': digit, 'otp-box--error': authError }"
        type="text"
        inputmode="numeric"
        maxlength="1"
        autocomplete="one-time-code"
        @input="onInput(i, $event)"
        @keydown="onKeydown(i, $event)"
      />
    </div>

    <p v-if="authError" class="verify-error" role="alert">{{ authError }}</p>

    <div class="auth-spacer" />

    <!-- Actions -->
    <div class="verify-footer">
      <SdBtn
        variant="primary"
        size="lg"
        block
        :disabled="code.length < 6 || isLoading"
        @click="handleVerify"
      >
        {{ isLoading ? 'Verifying…' : 'Verify' }}
      </SdBtn>

      <p class="resend-text">
        Didn't get it?
        <button
          class="resend-btn"
          :disabled="!canResend"
          @click="handleResend"
        >
          {{ canResend ? 'Resend code' : `Resend in ${countdownLabel}` }}
        </button>
      </p>
    </div>
  </AuthLayout>
</template>

<style scoped>
.verify-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 6px 0;
  flex: none;
}

.verify-icon {
  width: 96px;
  height: 96px;
  border-radius: 28px;
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  box-shadow: var(--sd-shadow-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sd-gold-500);
  margin-bottom: 20px;
  flex: none;
}

.auth-eyebrow { margin: 0; }
.auth-h1      { margin: 6px 0 0; }
.auth-sub     { margin: 10px 0 0; }

.verify-email {
  color: var(--sd-ink);
  font-style: normal;
}

/* OTP row */
.otp-wrap {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 32px;
  flex: none;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-6px); }
  30%       { transform: translateX(6px); }
  45%       { transform: translateX(-5px); }
  60%       { transform: translateX(5px); }
  75%       { transform: translateX(-3px); }
  90%       { transform: translateX(3px); }
}
.otp-wrap--shake { animation: shake 0.48s var(--sd-ease-out); }

.otp-box {
  width: 48px;
  height: 58px;
  border-radius: var(--sd-r-md);
  background: rgba(255, 255, 255, .72);
  border: 1.5px solid rgba(16, 42, 87, .12);
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 24px;
  color: var(--sd-fg1);
  text-align: center;
  outline: none;
  caret-color: transparent;
  transition: border-color var(--sd-dur-fast) var(--sd-ease-out),
              box-shadow var(--sd-dur-fast) var(--sd-ease-out),
              background var(--sd-dur-fast) var(--sd-ease-out);
}
.otp-box:focus {
  background: #fff;
  border-color: var(--sd-azure);
  box-shadow: 0 0 0 4px rgba(111, 147, 181, .22);
}
.otp-box--filled {
  background: #fff;
  border-color: var(--sd-ink);
}
.otp-box--error {
  border-color: var(--sd-danger);
  box-shadow: 0 0 0 4px rgba(192, 88, 78, .15);
}

.verify-error {
  font-family: var(--sd-font-display);
  font-size: 13px;
  color: var(--sd-danger);
  text-align: center;
  margin: 12px 0 0;
}

/* Footer */
.verify-footer {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 40px;
  flex: none;
}

.resend-text {
  font-family: var(--sd-font-body);
  font-size: 13px;
  color: var(--sd-fg2);
  text-align: center;
  margin: 0;
}
.resend-btn {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--sd-ink);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.resend-btn:disabled {
  color: var(--sd-fg3);
  cursor: default;
}
</style>
