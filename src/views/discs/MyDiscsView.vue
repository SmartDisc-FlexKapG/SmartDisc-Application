<script setup>
import { useRouter } from 'vue-router'
import { Bell, Search, QrCode } from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import SdAppBar from '@/components/ui/SdAppBar.vue'
import SdDiscCard from '@/components/ui/SdDiscCard.vue'
import { useDiscs } from '@/composables/useDiscs'

const router = useRouter()
const { discs } = useDiscs()
</script>

<template>
  <AppLayout>
    <SdAppBar title="">
      <template #action>
        <div class="mydisc-actions">
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

    <div class="mydisc-head">
      <p class="eyebrow">Your equipment · {{ discs.length }} discs</p>
      <h1 class="page-h1">My Discs</h1>
    </div>

    <div class="mydisc-list">
      <SdDiscCard
        v-for="disc in discs"
        :key="disc.id"
        :name="disc.name"
        :uuid="disc.uuid"
        :throws="disc.throws"
        :longest="disc.longest"
        :players="disc.players"
        :fav="disc.fav"
        :last-active="disc.lastActive"
        @click="router.push(`/discs/${disc.id}`)"
      />
    </div>

    <RouterLink to="/discs/add" class="fab">
      <QrCode :size="26" :stroke-width="2" />
    </RouterLink>
  </AppLayout>
</template>

<style scoped>
.mydisc-head { margin-bottom: 14px; }

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

.mydisc-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 100px;
}

.mydisc-actions {
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
  box-shadow: 0 1px 3px rgba(184, 146, 79, .6);
}

.fab {
  position: fixed;
  bottom: 110px;
  right: max(22px, calc(50vw - 173px));
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--sd-gold-grad);
  color: #5a4416;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 32px rgba(184, 146, 79, .5), var(--sd-shadow-md);
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, .4);
  text-decoration: none;
}
.fab:active { transform: scale(0.93); }
</style>
