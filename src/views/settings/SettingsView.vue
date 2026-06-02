<script setup>
import { useRouter } from 'vue-router'
import { User, Bell, Palette, HelpCircle, LogOut, ChevronRight } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import SdAvatar from '@/components/ui/SdAvatar.vue'
import { SdChip } from '@/components/ui'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, signOut } = useAuth()

async function handleSignOut() {
  await signOut()
  router.push('/welcome')
}
</script>

<template>
  <AppLayout>
    <SdAppBar title="" />

    <div class="settings-head">
      <p class="eyebrow">Your profile</p>
      <h1 class="page-h1">Settings</h1>
    </div>

    <!-- Profile card -->
    <div class="profile-card">
      <SdAvatar :name="user?.name ?? 'User'" :size="52" :hue="210" />
      <div class="profile-info">
        <div class="profile-name">{{ user?.name ?? 'Alex Rivera' }}</div>
        <div class="profile-email">{{ user?.email ?? 'alex@smartdisc.io' }}</div>
      </div>
      <SdChip tone="gold">
        Pro
      </SdChip>
    </div>

    <div class="settings-groups">
      <!-- Account group -->
      <div>
        <p class="group-label">Account</p>
        <div class="list">
          <RouterLink to="/settings/account" class="list-row">
            <div class="list-icon"><User :size="16" :stroke-width="1.75" /></div>
            <span class="list-row__label">Account &amp; security</span>
            <SdChip tone="gold">2FA</SdChip>
            <ChevronRight :size="16" style="color: var(--sd-fg3);" />
          </RouterLink>
          <RouterLink to="/settings/notifications" class="list-row">
            <div class="list-icon"><Bell :size="16" :stroke-width="1.75" /></div>
            <span class="list-row__label">Notifications</span>
            <span class="list-row__hint">On</span>
            <ChevronRight :size="16" style="color: var(--sd-fg3);" />
          </RouterLink>
        </div>
      </div>

      <!-- App group -->
      <div>
        <p class="group-label">App</p>
        <div class="list">
          <RouterLink to="/settings/appearance" class="list-row">
            <div class="list-icon"><Palette :size="16" :stroke-width="1.75" /></div>
            <span class="list-row__label">Appearance &amp; units</span>
            <span class="list-row__hint">Light · m, km/h</span>
            <ChevronRight :size="16" style="color: var(--sd-fg3);" />
          </RouterLink>
          <RouterLink to="/settings/help" class="list-row">
            <div class="list-icon"><HelpCircle :size="16" :stroke-width="1.75" /></div>
            <span class="list-row__label">Help &amp; support</span>
            <ChevronRight :size="16" style="color: var(--sd-fg3);" />
          </RouterLink>
          <button class="list-row list-row--danger" @click="handleSignOut">
            <div class="list-icon list-icon--danger"><LogOut :size="16" :stroke-width="1.75" /></div>
            <span class="list-row__label">Sign out</span>
          </button>
        </div>
      </div>
    </div>

    <div style="height: 100px;" />
  </AppLayout>
</template>

<style scoped>
.settings-head { margin-bottom: 14px; }

.eyebrow {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sd-azure);
  margin: 0;
}
.page-h1 {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 32px;
  letter-spacing: -0.02em;
  line-height: 1.02;
  color: var(--sd-fg1);
  margin: 4px 0 0;
}

.profile-card {
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  border-radius: var(--sd-r-lg);
  box-shadow: var(--sd-shadow-glass);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.profile-info { flex: 1; min-width: 0; }
.profile-name {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--sd-fg1);
}
.profile-email {
  font-family: var(--sd-font-display);
  font-size: 11px;
  color: var(--sd-fg3);
  letter-spacing: 0.02em;
  margin-top: 3px;
}

.settings-groups { display: flex; flex-direction: column; gap: 14px; }

.group-label {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sd-azure);
  margin: 0 0 8px;
}

.list {
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur-thin);
          backdrop-filter: var(--sd-glass-blur-thin);
  border-radius: var(--sd-r-md);
  box-shadow: var(--sd-shadow-glass);
  overflow: hidden;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  font-family: var(--sd-font-body);
  font-size: 15px;
  color: var(--sd-fg1);
  text-decoration: none;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  text-align: left;
}
.list-row + .list-row { border-top: 1px solid rgba(16, 42, 87, .07); }

.list-row--danger { color: var(--sd-danger); }

.list-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(140deg, #1d3d72, #0a1c3d);
  color: #fff;
  flex: none;
}
.list-icon--danger {
  background: rgba(192, 88, 78, .14);
  color: var(--sd-danger);
}

.list-row__label { flex: 1; }

.list-row__hint {
  font-family: var(--sd-font-display);
  font-size: 12px;
  color: var(--sd-fg3);
}
</style>
