<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="app-container bg-light">
    <NavBar />
    <div class="container pt-4 pb-4">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import '@/assets/base.css';
@import '/node_modules/bootstrap/dist/css/bootstrap.css';
</style>
