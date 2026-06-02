<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Camera, User, Mail, KeyRound, Smartphone, ShieldCheck, Monitor, AlertTriangle, LogOut, ChevronRight, X } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import SdAvatar from '@/components/ui/SdAvatar.vue'
import { SdBtn, SdField, SdChip, SdToggle } from '@/components/ui'
import { useAuth } from '@/composables/useAuth'
import { sanitizeName, sanitizeEmail } from '@/utils/sanitize'

const router = useRouter()
const { user } = useAuth()

const name  = ref(user?.value?.name  ?? 'Alex Rivera')
const email = ref(user?.value?.email ?? 'alex@smartdisc.io')
const faceId = ref(true)
</script>

<template>
  <AppLayout :tabs="false">
    <SdAppBar back title="Account &amp; security"></SdAppBar>

    <div class="account-scroll">
      <!-- Avatar -->
      <div class="avatar-wrap">
        <div class="avatar-pos">
          <SdAvatar name="Alex Rivera" :size="72" :hue="210" />
          <div class="avatar-edit">
            <Camera :size="13" style="color: #fff;" />
          </div>
        </div>
        <span class="avatar-label">Change photo</span>
      </div>

      <!-- Profile fields -->
      <p class="section-label">Profile</p>
      <div class="form-stack">
        <SdField v-model="name" label="Full name" :sanitize="sanitizeName" :maxlength="100">
          <template #icon><User :size="18" :stroke-width="1.75" /></template>
        </SdField>
        <SdField v-model="email" label="Email" type="email" :sanitize="sanitizeEmail" :maxlength="254">
          <template #icon><Mail :size="18" :stroke-width="1.75" /></template>
        </SdField>
      </div>

      <!-- Password -->
      <p class="section-label">Password</p>
      <div class="list">
        <div class="pref-row">
          <div class="list-icon"><KeyRound :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">Change password</div>
            <div class="pref-sub">Last changed 3 months ago</div>
          </div>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="pref-row">
          <div class="list-icon"><Smartphone :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">Sign in with Face ID</div>
            <div class="pref-sub">Unlock SmartDisc with biometrics</div>
          </div>
          <SdToggle v-model="faceId" />
        </div>
      </div>

      <!-- Sessions -->
      <p class="section-label">Active sessions</p>
      <div class="list">
        <div class="pref-row">
          <div class="list-icon"><Smartphone :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">iPhone 15 · this device</div>
            <div class="pref-sub">Berlin · active now</div>
          </div>
          <SdChip tone="gold">Current</SdChip>
        </div>
        <div class="pref-row">
          <div class="list-icon"><Monitor :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">MacBook Pro · Safari</div>
            <div class="pref-sub">Berlin · 2 days ago</div>
          </div>
          <button class="icon-x"><X :size="16" style="color: var(--sd-fg3);" /></button>
        </div>
      </div>

      <SdBtn variant="ghost" size="md" block style="margin-top: 4px;">
        <template #icon-left><LogOut :size="16" /></template>
        Sign out everywhere else
      </SdBtn>

      <!-- Delete account -->
      <div class="danger-row">
        <AlertTriangle :size="18" style="color: var(--sd-danger); flex: none;" />
        <span class="danger-label">Delete account</span>
        <ChevronRight :size="16" style="color: var(--sd-danger);" />
      </div>

      <div style="height: 40px;" />
    </div>
  </AppLayout>
</template>

<style scoped>
.save-btn {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--sd-ink);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 8px;
}

.account-scroll {
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}

.avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0 8px;
  gap: 8px;
}
.avatar-pos { position: relative; }
.avatar-edit {
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: var(--sd-ink);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--sd-shadow-sm);
}
.avatar-label {
  font-family: var(--sd-font-display);
  font-size: 11px;
  color: var(--sd-azure);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-label {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sd-azure);
  margin: 4px 0 0;
}

.form-stack { display: flex; flex-direction: column; gap: 12px; }

.list {
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur-thin);
          backdrop-filter: var(--sd-glass-blur-thin);
  border-radius: var(--sd-r-md);
  box-shadow: var(--sd-shadow-glass);
  overflow: hidden;
}

.pref-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
}
.pref-row + .pref-row { border-top: 1px solid rgba(16, 42, 87, .07); }

.list-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(140deg, #1d3d72, #0a1c3d);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.list-icon--gold {
  background: var(--sd-gold-grad);
  color: #5a4416;
}

.pref-copy { flex: 1; min-width: 0; }
.pref-title {
  font-family: var(--sd-font-body);
  font-weight: 600;
  font-size: 14px;
  color: var(--sd-fg1);
  line-height: 1.2;
}
.pref-sub {
  font-family: var(--sd-font-body);
  font-size: 12px;
  color: var(--sd-fg3);
  margin-top: 3px;
  line-height: 1.3;
}

.twofa-card {
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  border-radius: var(--sd-r-lg);
  box-shadow: var(--sd-shadow-glass);
  padding: 14px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.icon-x {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.danger-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(192, 88, 78, .08);
  border: 1px solid rgba(192, 88, 78, .20);
  border-radius: var(--sd-r-md);
  padding: 14px;
  margin-top: 4px;
}
.danger-label {
  flex: 1;
  font-family: var(--sd-font-body);
  font-size: 13px;
  color: var(--sd-danger);
}
</style>
