<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
*,
*::before,
*::after { box-sizing: border-box; }

html,
body {
  margin: 0;
  padding: 0;
  font-family: var(--sd-font-body);
  color: var(--sd-fg1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
