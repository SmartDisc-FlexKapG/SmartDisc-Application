<script setup>
import { ref } from 'vue'
import { Ruler, Gauge, Languages, Sparkles, Wand2, CheckCircle2, ChevronRight } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import { SdToggle } from '@/components/ui'

const glassEffects  = ref(true)
const reduceMotion  = ref(false)
</script>

<template>
  <AppLayout :tabs="false">
    <SdAppBar back title="Appearance" />

    <div class="appearance-scroll">
      <!-- Theme -->
      <p class="section-label">Theme</p>
      <div class="theme-row">
        <div class="theme-card theme-card--selected">
          <div class="theme-preview theme-preview--light" />
          <div class="theme-name">Light</div>
          <CheckCircle2 :size="14" style="color: var(--sd-ink); margin-top: 4px;" />
        </div>
        <div class="theme-card">
          <div class="theme-preview theme-preview--dark" />
          <div class="theme-name">Dark</div>
        </div>
        <div class="theme-card">
          <div class="theme-preview theme-preview--system" />
          <div class="theme-name">System</div>
        </div>
      </div>

      <!-- Units -->
      <p class="section-label">Units</p>
      <div class="list">
        <div class="pref-row">
          <Ruler :size="18" style="color: var(--sd-ink);" />
          <div class="pref-copy">
            <div class="pref-title">Distance &amp; height</div>
            <div class="pref-sub">Currently meters · imperial available</div>
          </div>
          <span class="pref-value">m</span>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="pref-row">
          <Gauge :size="18" style="color: var(--sd-ink);" />
          <div class="pref-copy">
            <div class="pref-title">Speed</div>
            <div class="pref-sub">km/h · mph</div>
          </div>
          <span class="pref-value">km/h</span>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
        <div class="pref-row">
          <Languages :size="18" style="color: var(--sd-ink);" />
          <div class="pref-copy">
            <div class="pref-title">Language</div>
            <div class="pref-sub">English · Deutsch</div>
          </div>
          <span class="pref-value">EN</span>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </div>
      </div>

      <!-- Motion -->
      <p class="section-label">Motion</p>
      <div class="list">
        <div class="pref-row">
          <Sparkles :size="18" style="color: var(--sd-gold-500);" />
          <div class="pref-copy">
            <div class="pref-title">Liquid Glass effects</div>
            <div class="pref-sub">Translucent panels &amp; subtle blur.</div>
          </div>
          <SdToggle v-model="glassEffects" />
        </div>
        <div class="pref-row">
          <Wand2 :size="18" style="color: var(--sd-ink);" />
          <div class="pref-copy">
            <div class="pref-title">Reduce motion</div>
            <div class="pref-sub">Calmer transitions and parallax.</div>
          </div>
          <SdToggle v-model="reduceMotion" />
        </div>
      </div>

      <div style="height: 40px;" />
    </div>
  </AppLayout>
</template>

<style scoped>
.appearance-scroll { display: flex; flex-direction: column; gap: 14px; }

.section-label {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sd-azure);
  margin: 6px 0 0;
}

.theme-row {
  display: flex;
  gap: 10px;
}

.theme-card {
  flex: 1;
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  border-radius: var(--sd-r-lg);
  box-shadow: var(--sd-shadow-glass);
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.theme-card--selected { border: 2px solid var(--sd-ink); }

.theme-preview {
  height: 56px;
  border-radius: 12px;
  margin-bottom: 8px;
  width: 100%;
}
.theme-preview--light { background: linear-gradient(140deg, #f2eae2, #dec38c); border: 1px solid rgba(0,0,0,.06); }
.theme-preview--dark  { background: linear-gradient(140deg, #0a1c3d, #1d3d72); }
.theme-preview--system { background: linear-gradient(140deg, #f2eae2 50%, #0a1c3d 50%); }

.theme-name {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--sd-ink);
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
}
.pref-sub {
  font-family: var(--sd-font-body);
  font-size: 12px;
  color: var(--sd-fg3);
  margin-top: 3px;
}
.pref-value {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--sd-ink);
}
</style>
