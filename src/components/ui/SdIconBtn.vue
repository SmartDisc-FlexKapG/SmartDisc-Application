<script setup>
defineProps({
  variant:  { type: String, default: '' }, // '' | glass | gold
  badge:    { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type:     { type: String, default: 'button' },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['sd-iconbtn', variant ? `sd-iconbtn--${variant}` : '']"
  >
    <slot />
    <span v-if="badge" class="sd-iconbtn__badge" aria-hidden="true" />
  </button>
</template>

<style scoped>
.sd-iconbtn {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--sd-fg2);
  cursor: pointer;
  transition: background var(--sd-dur-fast) var(--sd-ease-out),
              transform var(--sd-dur-fast) var(--sd-ease-out);
}
.sd-iconbtn:disabled { opacity: 0.45; cursor: not-allowed; }
.sd-iconbtn:not(:disabled):active { transform: scale(0.93); }

.sd-iconbtn--glass {
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  box-shadow: var(--sd-shadow-glass);
  -webkit-backdrop-filter: var(--sd-glass-blur-thin);
          backdrop-filter: var(--sd-glass-blur-thin);
  color: var(--sd-ink);
}
.sd-iconbtn--glass:not(:disabled):hover { background: rgba(255,255,255,.72); }

.sd-iconbtn--gold { color: var(--sd-gold-500); }

.sd-iconbtn__badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--sd-gold-500);
  border: 2px solid var(--sd-paper);
  box-shadow: 0 1px 3px rgba(184,146,79,.6);
}
</style>
