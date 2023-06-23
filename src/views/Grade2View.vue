<script setup lang="ts">
import { ref, computed } from 'vue'

const priceInput = ref()

const priceFilter = computed(() => {
  return priceInput.value ? `$$$$${priceInput.value}` : '-'
})
</script>

<template>
  <main>
    <ul>
      <li>
        <input v-model="priceInput" type="number" />
        <h5>Custom filter</h5>
        <p>{{ priceFilter }}</p>
        <h5>Global filter</h5>
        <p>{{ $filters.priceFilter(priceInput) }}</p>
      </li>
    </ul>
  </main>
</template>
