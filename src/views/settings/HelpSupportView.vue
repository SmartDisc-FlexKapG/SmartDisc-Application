<script setup>
import { LifeBuoy, MessageCircle, QrCode, BatteryLow, Users, Shield, FileText, Lock, Info, ChevronRight, ExternalLink } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import { SdBtn } from '@/components/ui'
</script>

<template>
  <AppLayout :tabs="false">
    <SdAppBar back title="Help &amp; support" />

    <div class="help-scroll">
      <!-- Live support card -->
      <div class="support-card">
        <div class="support-header">
          <div class="list-icon list-icon--gold">
            <LifeBuoy :size="18" :stroke-width="1.75" />
          </div>
          <div>
            <div class="support-title">Live support</div>
            <div class="support-meta">Average reply 8 min · 09:00 – 19:00 CET</div>
          </div>
        </div>
        <SdBtn variant="primary" size="md" block>
          <template #icon-left><MessageCircle :size="16" /></template>
          Chat with us
        </SdBtn>
      </div>

      <!-- FAQ -->
      <p class="section-label">Top questions</p>
      <div class="list">
        <div class="faq-row">
          <div class="list-icon"><QrCode :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">QR code won't scan</div>
            <div class="pref-sub">Troubleshoot the pairing flow.</div>
          </div>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="faq-row">
          <div class="list-icon"><BatteryLow :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">How long does the disc battery last?</div>
            <div class="pref-sub">~60 hours of throws · USB-C charging.</div>
          </div>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="faq-row">
          <div class="list-icon"><Users :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">Can I revoke an invite?</div>
            <div class="pref-sub">Yes — anytime, from the People tab.</div>
          </div>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="faq-row">
          <div class="list-icon"><Shield :size="16" :stroke-width="1.75" /></div>
          <div class="pref-copy">
            <div class="pref-title">Where is my data stored?</div>
            <div class="pref-sub">Frankfurt · EU. End-to-end encrypted.</div>
          </div>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
      </div>

      <!-- About -->
      <p class="section-label">About</p>
      <div class="list">
        <div class="faq-row">
          <FileText :size="18" style="color: var(--sd-ink); flex: none;" />
          <div class="pref-copy"><div class="pref-title">Terms of service</div></div>
          <ExternalLink :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="faq-row">
          <Lock :size="18" style="color: var(--sd-ink); flex: none;" />
          <div class="pref-copy"><div class="pref-title">Privacy policy</div></div>
          <ExternalLink :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="faq-row">
          <Info :size="18" style="color: var(--sd-ink); flex: none;" />
          <div class="pref-copy">
            <div class="pref-title">App version</div>
            <div class="pref-sub">SmartDisc 2.4.1 (build 481)</div>
          </div>
        </div>
      </div>

      <div style="height: 40px;" />
    </div>
  </AppLayout>
</template>

<style scoped>
.help-scroll { display: flex; flex-direction: column; gap: 14px; }

.section-label {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sd-azure);
  margin: 6px 0 0;
}

.support-card {
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  border-radius: var(--sd-r-lg);
  box-shadow: var(--sd-shadow-glass);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.support-header {
  display: flex;
  gap: 12px;
  align-items: center;
}
.support-title {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--sd-fg1);
}
.support-meta {
  font-family: var(--sd-font-display);
  font-size: 11px;
  color: var(--sd-fg3);
  letter-spacing: 0.02em;
  margin-top: 2px;
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

.faq-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
}
.faq-row + .faq-row { border-top: 1px solid rgba(16, 42, 87, .07); }

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
  width: 38px;
  height: 38px;
  background: var(--sd-gold-grad);
  color: #5a4416;
}

.pref-copy { flex: 1; min-width: 0; }
.pref-title {
  font-family: var(--sd-font-body);
  font-weight: 600;
  font-size: 14px;
  color: var(--sd-fg1);
}
.pref-sub {
  font-family: var(--sd-font-body);
  font-size: 12px;
  color: var(--sd-fg3);
  margin-top: 3px;
}
</style>
