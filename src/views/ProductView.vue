<template>
  <main>
    <h2 class="d-flex justify-content-center text-4xl">Product Management</h2>
    <div class="d-flex justify-content-center my-4">
      <el-button type="primary" link class="text-lg" @click="toAdd">Add new</el-button>
    </div>
    <SearchForm id="searchForm" @search="handleSearch" />
    <el-table v-loading="loading" :data="tableData.list" :border="true" class="main-table">
      <el-table-column prop="id" label="Id" width="120" />
      <el-table-column prop="name" label="Product Name" sortable />
      <el-table-column prop="price" label="Price" show-overflow-tooltip width="200">
        <template #default="scope">
          {{ $filters.priceFilter(Number(scope.row.price)) }}
        </template></el-table-column
      >
      <el-table-column prop="description" label="Description" min-width="120" />
      <el-table-column label="Action" width="120" align="center">
        <template #default="{ row }">
          <el-row class="flex-nowrap justify-content-center">
            <el-tag @click="toEdit(row)"> Edit </el-tag>
            <el-tag type="warning" @click="toDelete(row.id)"> Delete </el-tag>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="title" :close-on-click-modal="false">
      <SaveForm
        :value="form"
        :loading="saveLoading"
        @submit="handleSubmit"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
    <BasePagination
      v-model:page="params._page"
      v-model:limit="params._limit"
      :total="tableData.total"
      :layout="layout"
      @pagination="fetchData(params)"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, watchEffect } from 'vue'
import { getProductList, delProduct, addProduct, editProduct } from '@/api/product'
import { PageTable, Params } from '@/types/index'
import type { Product } from '@/types/product'
import { ElMessageBox } from 'element-plus'
import { debounce } from 'lodash'
import BasePagination from '@/components/BasePagination.vue'
import SaveForm from '@/components/SaveForm.vue'
import SearchForm from '@/components/SearchForm.vue'

const loading = ref(false)
const saveLoading = ref(false)

const tableData = reactive<PageTable<Product>>({
  list: [],
  total: 0
})
const PAGE_SIZE = 5
const dialogVisible = ref(false)
const form = reactive<Product>({
  id: '',
  name: '',
  price: 0,
  description: ''
})
const params = reactive<Params>({
  _page: 1,
  _limit: PAGE_SIZE,
  _q: ''
})
const layout = ref()

const title = computed<string>(() => {
  if (form.id) return 'Edit Product'
  return 'New Product'
})

const responsive = () => {
  layout.value = document.body.clientWidth < 768 ? 'prev, pager, next' : undefined
}

onMounted(() => {
  window.addEventListener('resize', debounce(responsive, 500))
})

watchEffect(() => {
  if (!saveLoading.value) {
    dialogVisible.value = false
  }
})

const handleSubmit = (payload: Product) => {
  if (payload.id) {
    doEdit(payload)
  } else {
    doAdd(payload)
  }
}

const toEdit = (row: Product) => {
  dialogVisible.value = true
  Object.assign(form, row)
}

const doEdit = (data: Product) => {
  saveLoading.value = true
  editProduct(data)
    .then(() => {
      saveLoading.value = false

      const list = tableData.list
      const index = list.findIndex((item) => item.id === data.id)
      if (index !== -1) {
        list.splice(index, 1, data as Product)
      }
    })
    .catch(() => {
      saveLoading.value = false
    })
}

const doAdd = async (data: Product) => {
  saveLoading.value = true
  await addProduct(data)
    .then(() => {
      saveLoading.value = false
      refresh()
    })
    .catch(() => {
      saveLoading.value = false
    })
}

const toAdd = () => {
  dialogVisible.value = true
  // reset form
  Object.keys(form).forEach((item) => {
    const key = item as keyof Product
    form[key] = undefined as never
  })
}

const toDelete = (id: string) => {
  ElMessageBox.confirm('confirm delete?', {
    title: 'Delete',
    type: 'warning',
    confirmButtonText: 'Ok',
    beforeClose: (action: any, instance: any, done: any) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        delProduct(id).then(() => {
          instance.confirmButtonLoading = false

          refresh()
          done()
        })
        return
      }
      done()
    }
  })
}

const fetchData = (params: Params) => {
  loading.value = true
  getProductList(params)
    .then((data) => {
      tableData.list = data.list
      tableData.total = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

// fetch first page data
const refresh = () => {
  params._page = 1
  fetchData(params)
}

const handleSearch = (keyword?: string) => {
  const value = {
    _q: keyword
  }
  fetchData(keyword ? value : params)
}

fetchData(params)
</script>

<style scoped lang="scss">
.main-table {
  width: 100%;
  margin-top: 10px;

  th {
    background-color: #fafafa;
  }

  .el-tag {
    & + .el-tag {
      margin-left: 4px;
    }

    cursor: pointer;
  }
}
</style>
@/api/user
