<template>
<div class="container">
  <h2>Cart</h2>
  <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <!-- 原價及折扣價一樣時，只顯示單一價格 -->
            <div class="h5" v-if="product.price === product.origin_price">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" @click="openProductModal(product.id)" :disabled="isLoadingItem === product.id">
                <i class="fas fa-spinner fa-pulse" v-show="isLoadingItem === product.id" ></i>
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)" :disabled="isLoadingItem === product.id">
                <i class="fas fa-spinner fa-pulse" v-show="isLoadingItem === product.id"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: [] // 清空購物車時需要
      }, // 購物車列表
      products: [], // 產品列表
      isLoadingItem: ''
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          // console.log(res);
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    addToCart (id, qty = 1) { // 加入購物車，要記得把 id 跟 qty（數量）加入
      const data = { // 建構資料格式
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          // console.log(res);
          // this.getCart() // 加入購物車後，再重新取得購物車內容
          // this.$refs.productModal.closeModal() // 使用 ref 關閉 modal
          this.isLoadingItem = '' // 加入購物車後，把 id 清空
          // 匯入 emitter 的 get-cart
          emitter.emit('get-cart')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
