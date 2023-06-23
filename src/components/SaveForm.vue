<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watchEffect } from 'vue'

import BaseInput from './BaseInput.vue'
import type { Product } from '@/types/product'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import type { FormInstance } from 'element-plus/lib/components/index.js'

const props = defineProps<{
  value: Product
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', value: Product): void
  (e: 'cancel'): void
}>()

const form = reactive(props.value)
const position = ref<'left' | 'right' | 'top'>('right')
const ruleFormRef = ref<FormInstance>()

const positiveNumber = helpers.regex(/^\d+(?:\.\d+)?$/)

const rules = {
  name: { required, $lazy: true },
  price: {
    required,
    positive: helpers.withMessage('Price must be positive number', positiveNumber),
    $lazy: true
  },
  description: {
    maxLength: maxLength(255),
    $lazy: true
  }
}
const v$ = useVuelidate(rules, form as { name: any; price: any; description: any })

onMounted(() => {
  if (window.screen.width < 767) {
    position.value = 'top'
  }
})

watchEffect(() => {
  Object.assign(form, props.value)
  nextTick(() => {
    ruleFormRef.value!.clearValidate()
  })
})

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  emit('submit', form)
}

const handleCancel = () => {
  ruleFormRef.value!.clearValidate()
  emit('cancel')
}
</script>
<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    class="save-form"
    label-width="80px"
    :label-position="position"
  >
    <el-form-item v-if="form.id" label="Id" prop="id">
      <BaseInput v-model="form.id" :disable="true" />
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <BaseInput v-model="form.name" :class="{ error: v$.name?.$errors?.length }" />
      <p class="text-error" v-for="error of v$.name?.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <BaseInput v-model="form.price" :class="{ error: v$.price?.$errors?.length }" />
      <p class="text-error" v-for="error of v$.price?.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <BaseInput v-model="form.description" :class="{ error: v$.description?.$errors?.length }" />
      <p class="text-error" v-for="error of v$.description?.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </el-form-item>
    <el-form-item class="footer-item">
      <el-button @click="handleCancel"> Cancel </el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit" class="text-blue-500">
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.save-form {
  .el-input {
    width: 100%;
  }

  .footer-item {
    margin-bottom: 0;

    .el-form-item__content {
      justify-content: flex-end;
    }
  }
}

.text-error {
  color: red;
}
</style>
