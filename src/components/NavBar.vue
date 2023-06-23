<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div :key="index" v-for="({ path, name }, index) in routes?.options.routes" class="navbar-nav">
      <RouterLink :to="path" class="nav-item nav-link"> {{ name }}</RouterLink>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { inject, ref, onBeforeMount } from 'vue'
const routes = ref()

onBeforeMount(() => {
  routes.value = inject('route')
})
</script>

<style scoped lang="scss">
.router-link-active.nav-link {
  color: #fff;
}
</style>
