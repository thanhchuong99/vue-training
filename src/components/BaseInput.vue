<script setup lang="ts">
withDefaults(
  defineProps<{
    disable?: boolean
    modelValue?: string | number
    placeholder?: string
  }>(),
  {
    modelValue: undefined,
    placeholder: 'please enter'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string | number): void
}>()
</script>
<template>
  <el-input
    :disabled="disable"
    :model-value="modelValue"
    :max-length="200"
    :placeholder="placeholder"
    clearable
    class="base-input"
    @input="emit('update:modelValue', $event)"
  />
</template>
<style lang="scss">
.base-input {
  width: 100%;
}

.error {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px red inset;
  }
}
</style>
