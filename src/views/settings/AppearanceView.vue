<script setup>
import { ref, computed } from 'vue'
import { Ruler, Gauge, Languages, Sparkles, Wand2, CheckCircle2, ChevronRight, Check } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import { SdToggle, SdBottomSheet } from '@/components/ui'
import { usePreferences } from '@/composables/usePreferences'

const {
  language, theme, distanceUnit, speedUnit,
  saveLanguage, saveTheme, saveDistanceUnit, saveSpeedUnit,
} = usePreferences()

const glassEffects = ref(true)
const reduceMotion = ref(false)

// Sheet open states
const distanceSheet = ref(false)
const speedSheet    = ref(false)
const languageSheet = ref(false)

// ── Distance options ──────────────────────────────────────────────────────
const distanceOptions = [
  { value: 'm',  label: 'Kilometers / Meters',  badge: 'km · m' },
  { value: 'ft', label: 'Miles / Feet',          badge: 'mi · ft' },
]
const distanceLabel = computed(() =>
  distanceOptions.find(o => o.value === distanceUnit.value)?.badge ?? 'm'
)

// ── Speed options ─────────────────────────────────────────────────────────
const speedOptions = [
  { value: 'km/h', label: 'Kilometers per hour', badge: 'km/h' },
  { value: 'mph',  label: 'Miles per hour',       badge: 'mph'  },
]
const speedLabel = computed(() =>
  speedOptions.find(o => o.value === speedUnit.value)?.badge ?? 'km/h'
)

// ── Language options ──────────────────────────────────────────────────────
const languageOptions = [
  { value: 'en', label: 'English',    badge: 'EN' },
  { value: 'de', label: 'Deutsch',    badge: 'DE' },
  { value: 'fr', label: 'Français',   badge: 'FR' },
  { value: 'es', label: 'Español',    badge: 'ES' },
]
const languageLabel = computed(() =>
  languageOptions.find(o => o.value === language.value)?.badge ?? 'EN'
)

// ── Theme options ─────────────────────────────────────────────────────────
const themeOptions = [
  { value: 'light',  label: 'Light'  },
  { value: 'dark',   label: 'Dark'   },
  { value: 'system', label: 'System' },
]
const activeTheme = computed(() => theme.value ?? 'light')

function pickDistance(val) { saveDistanceUnit(val); distanceSheet.value = false }
function pickSpeed(val)    { saveSpeedUnit(val);    speedSheet.value    = false }
function pickLanguage(val) { saveLanguage(val);     languageSheet.value = false }
</script>

<template>
  <AppLayout :tabs="false">
    <SdAppBar back title="Appearance" />

    <div class="appearance-scroll">
      <!-- Theme -->
      <p class="section-label">Theme</p>
      <div class="theme-row">
        <button
          v-for="opt in themeOptions"
          :key="opt.value"
          class="theme-card"
          :class="{ 'theme-card--selected': activeTheme === opt.value }"
          @click="saveTheme(opt.value)"
        >
          <div class="theme-preview" :class="`theme-preview--${opt.value}`" />
          <div class="theme-name">{{ opt.label }}</div>
          <CheckCircle2
            v-if="activeTheme === opt.value"
            :size="14"
            style="color: var(--sd-ink); margin-top: 4px;"
          />
        </button>
      </div>

      <!-- Units -->
      <p class="section-label">Units</p>
      <div class="list">
        <button class="pref-row pref-row--tap" @click="distanceSheet = true">
          <Ruler :size="18" style="color: var(--sd-ink);" :stroke-width="1.75" />
          <div class="pref-copy">
            <div class="pref-title">Distance &amp; height</div>
            <div class="pref-sub">Currently {{ distanceUnit === 'm' ? 'metric' : 'imperial' }}</div>
          </div>
          <span class="pref-value">{{ distanceLabel }}</span>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </button>
        <button class="pref-row pref-row--tap" @click="speedSheet = true">
          <Gauge :size="18" style="color: var(--sd-ink);" :stroke-width="1.75" />
          <div class="pref-copy">
            <div class="pref-title">Speed</div>
            <div class="pref-sub">km/h · mph</div>
          </div>
          <span class="pref-value">{{ speedLabel }}</span>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </button>
        <button class="pref-row pref-row--tap" @click="languageSheet = true">
          <Languages :size="18" style="color: var(--sd-ink);" :stroke-width="1.75" />
          <div class="pref-copy">
            <div class="pref-title">Language</div>
            <div class="pref-sub">
              {{ languageOptions.find(o => o.value === language) ?.label ?? 'English' }}
            </div>
          </div>
          <span class="pref-value">{{ languageLabel }}</span>
          <ChevronRight :size="16" style="color: var(--sd-fg3);" />
        </button>
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

    <!-- Distance & Height sheet -->
    <SdBottomSheet v-model="distanceSheet" title="Distance &amp; Height">
      <div class="option-list">
        <button
          v-for="opt in distanceOptions"
          :key="opt.value"
          class="option-row"
          :class="{ 'option-row--active': distanceUnit === opt.value }"
          @click="pickDistance(opt.value)"
        >
          <span class="option-label">{{ opt.label }}</span>
          <span class="option-badge">{{ opt.badge }}</span>
          <Check v-if="distanceUnit === opt.value" :size="18" style="color: var(--sd-ink); flex-shrink: 0;" />
        </button>
      </div>
    </SdBottomSheet>

    <!-- Speed sheet -->
    <SdBottomSheet v-model="speedSheet" title="Speed">
      <div class="option-list">
        <button
          v-for="opt in speedOptions"
          :key="opt.value"
          class="option-row"
          :class="{ 'option-row--active': speedUnit === opt.value }"
          @click="pickSpeed(opt.value)"
        >
          <span class="option-label">{{ opt.label }}</span>
          <span class="option-badge">{{ opt.badge }}</span>
          <Check v-if="speedUnit === opt.value" :size="18" style="color: var(--sd-ink); flex-shrink: 0;" />
        </button>
      </div>
    </SdBottomSheet>

    <!-- Language sheet -->
    <SdBottomSheet v-model="languageSheet" title="Language">
      <div class="option-list">
        <button
          v-for="opt in languageOptions"
          :key="opt.value"
          class="option-row"
          :class="{ 'option-row--active': language === opt.value }"
          @click="pickLanguage(opt.value)"
        >
          <span class="option-label">{{ opt.label }}</span>
          <span class="option-badge">{{ opt.badge }}</span>
          <Check v-if="language === opt.value" :size="18" style="color: var(--sd-ink); flex-shrink: 0;" />
        </button>
      </div>
    </SdBottomSheet>

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

/* Theme cards */
.theme-row { display: flex; gap: 10px; }

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
  cursor: pointer;
  transition: transform var(--sd-dur-fast) var(--sd-ease-out),
              box-shadow var(--sd-dur-fast) var(--sd-ease-out);
}
.theme-card:active { transform: scale(0.97); }
.theme-card--selected { border: 2px solid var(--sd-ink); }

.theme-preview {
  height: 56px;
  border-radius: 12px;
  margin-bottom: 8px;
  width: 100%;
}
.theme-preview--light  { background: linear-gradient(140deg, #f2eae2, #dec38c); border: 1px solid rgba(0,0,0,.06); }
.theme-preview--dark   { background: linear-gradient(140deg, #0a1c3d, #1d3d72); }
.theme-preview--system { background: linear-gradient(140deg, #f2eae2 50%, #0a1c3d 50%); }

.theme-name {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--sd-ink);
}

/* Pref list */
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
  width: 100%;
  background: none;
  border: none;
  text-align: left;
}
.pref-row + .pref-row { border-top: 1px solid rgba(16, 42, 87, .07); }

.pref-row--tap { cursor: pointer; }
.pref-row--tap:hover  { background: rgba(16, 42, 87, .03); }
.pref-row--tap:active { background: rgba(16, 42, 87, .07); }

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

/* Sheet option rows */
.option-list { display: flex; flex-direction: column; gap: 4px; }

.option-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: var(--sd-r-md);
  background: none;
  border: 1px solid transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background var(--sd-dur-fast) var(--sd-ease-out),
              border-color var(--sd-dur-fast) var(--sd-ease-out);
}
.option-row:hover  { background: rgba(16, 42, 87, .04); }
.option-row:active { background: rgba(16, 42, 87, .08); }
.option-row--active {
  background: rgba(16, 42, 87, .06);
  border-color: rgba(16, 42, 87, .14);
}

.option-label {
  flex: 1;
  font-family: var(--sd-font-body);
  font-weight: 600;
  font-size: 15px;
  color: var(--sd-fg1);
}
.option-badge {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--sd-fg3);
}

</style>
