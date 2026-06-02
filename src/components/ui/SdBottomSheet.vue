<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title:      { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

function close() { emit('update:modelValue', false) }

// Swipe-to-dismiss
const panel     = ref(null)
const dragStart = ref(0)
const dragging  = ref(false)
const dragY     = ref(0)

function onTouchStart(e) {
  dragStart.value = e.touches[0].clientY
  dragging.value  = true
  dragY.value     = 0
}
function onTouchMove(e) {
  if (!dragging.value) return
  const delta = e.touches[0].clientY - dragStart.value
  if (delta > 0) {
    dragY.value = delta
    if (panel.value) panel.value.style.transform = `translateY(${delta}px)`
  }
}
function onTouchEnd() {
  dragging.value = false
  if (dragY.value >= 60) {
    close()
  } else {
    if (panel.value) panel.value.style.transform = ''
  }
  dragY.value = 0
}

// Reset panel transform when sheet opens
watch(() => props.modelValue, (open) => {
  if (open && panel.value) panel.value.style.transform = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-backdrop">
      <div v-if="modelValue" class="sheet-backdrop" @click.self="close" />
    </Transition>
    <Transition name="sheet-panel">
      <div
        v-if="modelValue"
        ref="panel"
        class="sheet-panel"
        @touchstart="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="sheet-pill" />
        <div class="sheet-header">
          <span class="sheet-title">{{ title }}</span>
          <button class="sheet-close" @click="close">
            <X :size="18" :stroke-width="1.75" />
          </button>
        </div>
        <div class="sheet-body">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 28, 61, .35);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 200;
}

.sheet-panel {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  max-height: 85dvh;
  background: var(--sd-glass-light-bg);
  backdrop-filter: var(--sd-glass-blur-strong);
  -webkit-backdrop-filter: var(--sd-glass-blur-strong);
  border: 1px solid var(--sd-glass-light-border);
  border-bottom: none;
  border-radius: var(--sd-r-xl) var(--sd-r-xl) 0 0;
  box-shadow: var(--sd-shadow-lg);
  z-index: 201;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.sheet-pill {
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: rgba(16, 42, 87, .18);
  margin: 12px auto 0;
  flex-shrink: 0;
}

.sheet-header {
  display: flex;
  align-items: center;
  padding: 14px 20px 12px;
  flex-shrink: 0;
}

.sheet-title {
  flex: 1;
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--sd-fg1);
}

.sheet-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sd-fg3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 999px;
  transition: color var(--sd-dur-fast) var(--sd-ease-out),
              background var(--sd-dur-fast) var(--sd-ease-out);
}
.sheet-close:hover { color: var(--sd-fg1); background: rgba(16,42,87,.06); }

.sheet-body {
  overflow-y: auto;
  padding: 0 20px 24px;
  -webkit-overflow-scrolling: touch;
}

/* Transitions */
.sheet-backdrop-enter-active,
.sheet-backdrop-leave-active {
  transition: opacity var(--sd-dur-base) var(--sd-ease-out);
}
.sheet-backdrop-enter-from,
.sheet-backdrop-leave-to { opacity: 0; }

.sheet-panel-enter-active,
.sheet-panel-leave-active {
  transition: transform var(--sd-dur-base) var(--sd-ease-glass);
}
.sheet-panel-enter-from,
.sheet-panel-leave-to { transform: translateX(-50%) translateY(100%) !important; }
</style>
