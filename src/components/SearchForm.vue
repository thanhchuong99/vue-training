<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const query = ref('')

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const handleSearch = () => {
  emit('search', query.value)
}
</script>
<template>
  <el-input
    v-model="query"
    class="w-25 m-2"
    placeholder="Type something"
    :prefix-icon="Search"
    @keyup.enter="handleSearch"
  />
</template>

<style lang="scss"></style>
