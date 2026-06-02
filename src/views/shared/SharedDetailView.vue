<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MoreHorizontal, Eye } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import SdStatTile from '@/components/ui/SdStatTile.vue'
import SdThrowRow from '@/components/ui/SdThrowRow.vue'
import { SdChip } from '@/components/ui'
import { useDiscs } from '@/composables/useDiscs'

const route  = useRoute()
const router = useRouter()
const { getSharedDisc } = useDiscs()
const disc = computed(() => getSharedDisc(route.params.id))
</script>

<template>
  <AppLayout>
    <SdAppBar back :title="disc?.name ?? ''" >
      <template #action>
        <button class="icon-btn">
          <MoreHorizontal :size="18" :stroke-width="1.75" />
        </button>
      </template>
    </SdAppBar>

    <!-- Hero card -->
    <div class="hero-card" v-if="disc">
      <div class="hero-top">
        <div class="hero-info">
          <div class="hero-name">{{ disc.name }}</div>
          <div class="hero-uuid">{{ disc.uuid }} · owned by {{ disc.owner }}</div>
        </div>
        <SdChip tone="read">
          <template #icon><Eye :size="12" /></template>
          Read
        </SdChip>
      </div>
      <div class="stat-row">
        <SdStatTile :v="disc.throws" k="Throws" />
        <SdStatTile :v="disc.longest" u="m" k="Longest" />
        <SdStatTile :v="disc.topRpm" k="Top RPM" />
      </div>
    </div>

    <!-- Throws -->
    <div class="section-header">
      <span class="eyebrow">Recent throws</span>
      <span class="count">{{ disc?.throws }} total</span>
    </div>

    <div class="throws-list">
      <SdThrowRow
        v-for="t in disc?.throws_list ?? []"
        :key="t.id"
        :name="t.name"
        :time="t.time"
        :rpm="t.rpm"
        :fav="t.fav"
        :auto="t.auto"
        :readonly="true"
        @click="router.push(`/shared/${disc.id}/throw/${t.id}`)"
      />
    </div>

    <div style="height: 100px;" />
  </AppLayout>
</template>

<style scoped>
.icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur-thin);
          backdrop-filter: var(--sd-glass-blur-thin);
  box-shadow: var(--sd-shadow-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sd-ink);
  cursor: pointer;
}

.hero-card {
  background: var(--sd-glass-light-bg);
  border: 1px solid var(--sd-glass-light-border);
  -webkit-backdrop-filter: var(--sd-glass-blur);
          backdrop-filter: var(--sd-glass-blur);
  border-radius: var(--sd-r-lg);
  box-shadow: var(--sd-shadow-glass);
  padding: 18px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-top { display: flex; align-items: center; gap: 14px; }

.hero-mark {
  width: 58px;
  height: 58px;
  border-radius: var(--sd-r-md);
  background: linear-gradient(140deg, #1d3d72, #0a1c3d);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--sd-shadow-sm);
  flex: none;
}
.hero-mark img { width: 44px; height: 44px; object-fit: contain; }

.hero-info { flex: 1; min-width: 0; }
.hero-name {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.01em;
  color: var(--sd-fg1);
  line-height: 1;
}
.hero-uuid {
  font-family: var(--sd-font-display);
  font-size: 11px;
  color: var(--sd-fg3);
  letter-spacing: 0.02em;
  margin-top: 4px;
}

.stat-row { display: flex; gap: 10px; }

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.eyebrow {
  font-family: var(--sd-font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sd-azure);
  flex: 1;
}
.count {
  font-family: var(--sd-font-display);
  font-size: 12px;
  color: var(--sd-fg3);
}

.throws-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
