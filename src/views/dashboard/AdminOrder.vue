<template>
<div class="container">
  <h2>Order List</h2>
  <table class="table mt-4">
    <thead>
      <tr>
        <th scope="col">購買時間</th>
        <th>Email</th>
        <th scope="col">購買款項</th>
        <th scope="col">應付金額</th>
        <th scope="col">是否付款</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orders" :key="item.id">
        <td>{{orderTime}}</td>
        <td>{{item.user.email}}</td>
        <td>
          <ul class="list-unstyled">
            <li v-for="(product, i) in item.products" :key="i">
              {{ product.product.title }} 數量：{{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </td>
        <td>${{item.total}}元</td>
        <td style="cursor:pointer">
          <label class="switch">
            <input type="checkbox" @change="updatePaid(item)" v-model="item.is_paid">
            <span class="slider"></span>
          </label>
        <!-- ToggleSwitch -->
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit',item)">編輯</button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete',item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @get-data="getOrder"></Pagination>
  <DelModal :tempData="temp" ref="delModal"></DelModal>
</div>
</template>

<script>
import Pagination from '@/components/PagiNation'
import DelModal from '@/components/modal/DelModal'

export default {
  data () {
    return {
      orders: {},
      orderModal: '',
      tempData: {},
      pagination: {}
    }
  },
  components: {
    Pagination,
    DelModal
  },
  methods: {
    getOrders (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`)
        .then(res => {
          console.log(res)
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        }).catch(err => {
          alert(err)
        })
    },
    updatePaid (item, page = 1) {
      this.tempData = item
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`,
        { data: this.tempData })
        .then((res) => {
          alert(res.data.message)
          this.$refs.orderModal.closeModal()
          this.getOrders(page)
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    openModal (status, product) {
      if (status === 'edit') {
        // 當 temp.imagesUrl 有資料時就使用原本的資料，沒有的話就賦予一個陣列
        // this.imagesUrl = this.temp.imagesUrl ? this.temp.imagesUrl : []
        // 深拷貝
        this.temp = JSON.parse(JSON.stringify(product))
        this.$refs.orderModal.openModal()
        this.isNew = false
      } else if (status === 'delete') { // 刪除產品
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    delOrder () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempData.id}`)
        .then((res) => {
          this.$refs.delModal.closeModal()
          this.getOrders()
        }).catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
