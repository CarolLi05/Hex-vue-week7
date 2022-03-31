<template>
<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>{{ isNew ? "新增產品" : "編輯產品"}}</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempData.imageUrl">
              </div>
              <img class="img-fluid" :src="tempData.imageUrl" alt="tempData.title">
            </div>
            <div class="mb-3">
              <h3>多圖設置</h3>
              <!-- 判斷是不是陣列 -->
              <div v-if="Array.isArray(tempData.imagesUrl)">
                <!-- 跑迴圈，如果有圖片的話顯示出來，key 值後面加上數字避免重複-->
                <template v-for="(img, key) in tempData.imagesUrl" :key="key + '834'">
                  <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempData.imagesUrl[key]">
                  <img class="img-fluid" :src="tempData.imagesUrl[key]" alt="img.title">
                </template>
                <!-- 以 length 做判斷，如果一個都沒有的話(length 是 0)，出現新增的按鈕，否則就出現刪除最後一個的按鈕-->
                <div v-if="!tempData.imagesUrl.length || tempData.imagesUrl[tempData.imagesUrl.length - 1]">
                  <!-- 點擊後，以字串形式，新增到 temp.imagesUrl -->
                  <button type="button" class="btn btn-outline-primary d-block w-100" @click="tempData.imagesUrl.push('')">新增圖片</button>
                </div>
                <div v-else>
                  <!-- 點擊後刪除最後一張圖片 -->
                  <button type="button" class="btn btn-outline-danger d-block w-100" @click="tempData.imagesUrl.pop()">刪除最後一張圖片</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempData.title">
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempData.category">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempData.unit">
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempData.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempData.price">
              </div>
            </div>
            <hr>
            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="tempData.description">
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="tempData.content">
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempData.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempProductData', 'isNew'],
  data () {
    return {
      tempData: {
        imagesUrl: [],
        imgPreviewURL: ''
      },
      productModal: ''
    }
  },
  watch: {
    tempProductData () {
      this.tempData = this.tempProductData
    }
  },
  methods: {
    updateProduct () {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      if (!this.isNew) { // 如果不是新增產品，把 url 跟 method 做替換
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProductData.id}`
        method = 'put'
      }
      // 因為所有資料都要在 data 裡，所以要用 data 帶剛剛新增產品的資料
      this.$http[method](url, { data: this.tempData })
        .then(res => {
          console.log(res)
          this.$emit('get-data') // 改成用 emit 由內往外取得資料
          this.productModal.hide()
        }).catch(err => {
          // 錯誤跳出通知
          // console.dir(err);
          alert(err.data.message)
        })
    },
    openModal () {
      this.productModal.show()
    }
  },
  mounted () {
    this.productModal = new BsModal(this.$refs.modal)
  }
}
</script>
