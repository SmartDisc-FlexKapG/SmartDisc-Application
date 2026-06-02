<script setup>
import { useRouter } from 'vue-router'
import { Bell, Search } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import SdDiscCard from '@/components/ui/SdDiscCard.vue'
import { useDiscs } from '@/composables/useDiscs'

const router = useRouter()
const { sharedDiscs } = useDiscs()
</script>

<template>
  <AppLayout>
    <SdAppBar title="">
      <template #action>
        <div class="shared-actions">
          <RouterLink to="/notifications" class="icon-wrap">
            <Bell :size="17" :stroke-width="1.75" />
            <span class="icon-wrap__badge" />
          </RouterLink>
          <RouterLink to="/search" class="icon-wrap">
            <Search :size="17" :stroke-width="1.75" />
          </RouterLink>
        </div>
      </template>
    </SdAppBar>

    <div class="shared-head">
      <p class="eyebrow">Shared with you</p>
      <h1 class="page-h1">Team discs</h1>
      <p class="page-sub">View throws and stats. Read-only — you can't edit these discs.</p>
    </div>

    <div class="shared-list">
      <SdDiscCard
        v-for="disc in sharedDiscs"
        :key="disc.id"
        :name="disc.name"
        :uuid="`from ${disc.owner} · ${disc.uuid.slice(0, 11)}–`"
        :throws="disc.throws"
        :longest="disc.longest"
        :players="disc.players"
        :shared="true"
        @click="router.push(`/shared/${disc.id}`)"
      />
    </div>
  </AppLayout>
</template>

<style scoped>
.shared-head { margin-bottom: 16px; }

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
.page-sub {
  font-family: var(--sd-font-body);
  font-size: 14px;
  line-height: 1.4;
  color: var(--sd-fg2);
  margin: 6px 0 0;
}

.shared-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 100px;
}

.shared-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.icon-wrap {
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
  position: relative;
  text-decoration: none;
}
.icon-wrap__badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--sd-gold-500);
  border: 2px solid var(--sd-paper);
}
</style>
