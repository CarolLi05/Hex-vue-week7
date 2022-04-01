<template>
  <div class="container">
    <h2>Admin Products</h2>
    <div class="text-end mt-4">
        <button type="button" class="btn btn-primary" @click="openModal('isNew')">建立新的產品</button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
            </tr>
        </thead>
        <tbody v-for="item in products" :key="item.id">
            <tr>
                <td>{{ item.category }}</td>
                <td>{{ item.title }}</td>
                <td class="text-end">{{ item.origin_price }}</td>
                <td class="text-end">{{ item.price }}</td>
                <td>
                <span v-if="item.is_enabled >= 1" class="text-success">啟用</span>
                <span v-else class="">未啟用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">編輯</button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Pagination :pages="pagination" @get-data="getData"></Pagination>
  </div>
  <ProductModal :tempProductData="temp" :is-new="isNew" @get-data ="getData" ref="productModal"></ProductModal>
  <DelProductModal :tempProductData="temp" ref="delModal"></DelProductModal>
</template>

<script>
import Pagination from '@/components/PagiNation'
import ProductModal from '@/components/modal/ProductModal'
import DelProductModal from '@/components/modal/DelProductModal'

export default {
  data () {
    return {
      temp: {
        imagesUrl: []
      },
      products: {},
      pagination: {},
      isNew: false
    }
  },
  components: {
    Pagination,
    ProductModal,
    DelProductModal
  },
  methods: {
    getData () {
      // page=1 /?page=${page}
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products`)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }).catch(err => {
          console.dir(err)
        })
    },
    showProduct (item) {
      this.temp = item
    },
    openModal (status, product) {
      if (status === 'isNew') {
        this.temp = {
          imagesUrl: []
        }
        this.$refs.productModal.openModal()
        this.isNew = true
      } else if (status === 'edit') {
        // 當 temp.imagesUrl 有資料時就使用原本的資料，沒有的話就賦予一個陣列
        // this.imagesUrl = this.temp.imagesUrl ? this.temp.imagesUrl : []
        // 深拷貝
        this.temp = JSON.parse(JSON.stringify(product))
        this.$refs.productModal.openModal()
        this.isNew = false
      } else if (status === 'delete') { // 刪除產品
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
