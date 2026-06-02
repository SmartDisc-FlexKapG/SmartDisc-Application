<script setup>
import { ref } from 'vue'
import { Bell, Trophy, BarChart3, Zap, UserPlus, Star, Smartphone, Mail } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import { SdToggle } from '@/components/ui'

const personalBests = ref(true)
const weeklyRecap   = ref(true)
const lowBattery    = ref(true)
const newPerson     = ref(true)
const throwFaved    = ref(false)
const pushEnabled   = ref(true)
const emailEnabled  = ref(false)
</script>

<template>
  <AppLayout :tabs="false">
    <SdAppBar back title="Notifications" />

    <div class="notif-scroll">
      <!-- Banner -->
      <div class="info-banner">
        <Bell :size="16" style="flex: none;" />
        <div>
          Notifications are <b>on</b>. Daily quiet hours: 22:00 – 07:00.
        </div>
      </div>

      <!-- Throws -->
      <p class="section-label">Throws</p>
      <div class="list">
        <div class="pref-row">
          <Trophy :size="18" style="color: var(--sd-gold-500); flex: none;" />
          <div class="pref-copy">
            <div class="pref-title">Personal bests</div>
            <div class="pref-sub">When a throw beats your record.</div>
          </div>
          <SdToggle v-model="personalBests" />
        </div>
        <div class="pref-row">
          <BarChart3 :size="18" style="color: var(--sd-azure); flex: none;" />
          <div class="pref-copy">
            <div class="pref-title">Weekly recap</div>
            <div class="pref-sub">Sundays · summary of throws &amp; trends.</div>
          </div>
          <SdToggle v-model="weeklyRecap" />
        </div>
        <div class="pref-row">
          <Zap :size="18" style="color: var(--sd-ink); flex: none;" />
          <div class="pref-copy">
            <div class="pref-title">Low battery</div>
            <div class="pref-sub">When a disc drops below 15%.</div>
          </div>
          <SdToggle v-model="lowBattery" />
        </div>
      </div>

      <!-- Sharing -->
      <p class="section-label">Sharing</p>
      <div class="list">
        <div class="pref-row">
          <UserPlus :size="18" style="color: var(--sd-azure); flex: none;" />
          <div class="pref-copy">
            <div class="pref-title">New person joins</div>
            <div class="pref-sub">When an invitee accepts.</div>
          </div>
          <SdToggle v-model="newPerson" />
        </div>
        <div class="pref-row">
          <Star :size="18" style="color: var(--sd-gold-500); flex: none;" />
          <div class="pref-copy">
            <div class="pref-title">Throws favorited by others</div>
            <div class="pref-sub">When someone stars your throw.</div>
          </div>
          <SdToggle v-model="throwFaved" />
        </div>
      </div>

      <!-- Delivery -->
      <p class="section-label">Delivery</p>
      <div class="list">
        <div class="pref-row">
          <Smartphone :size="18" style="color: var(--sd-ink); flex: none;" />
          <div class="pref-copy"><div class="pref-title">Push</div></div>
          <SdToggle v-model="pushEnabled" />
        </div>
        <div class="pref-row">
          <Mail :size="18" style="color: var(--sd-ink); flex: none;" />
          <div class="pref-copy"><div class="pref-title">Email</div></div>
          <SdToggle v-model="emailEnabled" />
        </div>
      </div>

      <div style="height: 40px;" />
    </div>
  </AppLayout>
</template>

<style scoped>
.notif-scroll { display: flex; flex-direction: column; gap: 14px; }

.info-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--sd-r-md);
  background: rgba(111, 147, 181, .16);
  color: var(--sd-ink-700);
  font-family: var(--sd-font-display);
  font-size: 13px;
  font-weight: 500;
}

.section-label {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sd-azure);
  margin: 6px 0 0;
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

.pref-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
}
.pref-row + .pref-row { border-top: 1px solid rgba(16, 42, 87, .07); }

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
</style>
