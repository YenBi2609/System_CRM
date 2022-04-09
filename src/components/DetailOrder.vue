<template>
    <div>
    <v-snackbar
        top
        light
        v-model="notify"
        color="#f58634"
        :timeout="2000"
    >
        {{ message }}
    </v-snackbar>
        <h3>Thông tin đơn hàng</h3>
        <v-form>
            <v-container>
                <v-row>
        
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-autocomplete
                        v-model="order.client.value"
                        :items="order.client.listValue"
                        dense
                        chips
                        small-chips
                        label="Khách hàng"
                        item-text="title"
                        item-value="id"
                        ></v-autocomplete>
                    </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-autocomplete
                        v-model="order.user.value"
                        :items="order.user.listValue"
                        dense
                        chips
                        small-chips
                        label="Nhân viên"
                        item-text="title"
                        item-value="id"
                        ></v-autocomplete>
                    </v-col>          
            
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-select
                        :items="listStatus"
                        dense
                        label="Trạng thái"
                        v-model="order.status"
                        ></v-select>
                    </v-col>          
                    
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        dense
                        label="Ngày"
                        type="date"
                        v-model="order.date"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

        <v-container>
            <v-autocomplete
                chips
                deletable-chips
                small-chips
                label="Chọn sản phẩm"
                v-model="productSelected"
                :items="listProduct"
                item-text="name"
                item-value="id"
                multiple
                >
                    <template v-slot:item="data">
                    <template>
                        <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                    </template>
                </v-autocomplete>
        </v-container>

        <v-container class="table-product">
            <v-row v-for="product in order.listProduct" :key="product.idProduct">
                <v-col
                    cols="10"
                    sm="1"
                    md="1"
                >
                    <v-text-field
                    dense
                    label="Mã sản phẩm"
                    disabled
                    v-model="product.idProduct"
                    ></v-text-field>
                </v-col>
        
                <v-col
                    cols="10"
                    sm="2"
                    md="4"
                >
                    <v-text-field
                    dense
                    label="Tên sản phẩm"
                    v-model="product.name"
                    disabled
                    ></v-text-field>
                </v-col>
        
                <v-col
                    cols="10"
                    sm="1"
                    md="1"
                >
                    <v-text-field
                    type="number"
                    dense
                    label="Số lượng"
                    v-model="product.quantity"
                    ></v-text-field>
                </v-col>
        
                <v-col
                    cols="10"
                    sm="2"
                    md="2"
                >
                    <v-text-field
                    disabled
                    dense
                    label="Giá"
                    v-model="product.price"
                    type="number"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="10"
                    sm="2"
                    md="2"
                >
                    <v-text-field
                    dense
                    label="Giảm giá (%)"
                    v-model="product.discount"
                    type="number"
                    ></v-text-field>
                </v-col>       
                <v-col
                    cols="10"
                    sm="2"
                    md="2"
                >
                    <v-text-field
                    dense
                    label="Thành tiền"
                    v-model="product.total"
                    disabled
                    type="number"
                    ></v-text-field>
                </v-col>
            
            
            </v-row>
        </v-container>

        
        <v-container>
            <v-row>
                <v-col
                    cols="10"
                    sm="4"
                    md="4"
                >
                <v-textarea
                outlined
                name="input-7-4"
                label="Ghi chú"
                v-model="order.note"
                ></v-textarea>
                </v-col>
    
            <v-col
                cols="10"
                sm="6"
                md="6"
            > 
                <v-row>
                    <v-col
                    cols="10"
                    sm="3"
                    md="3">
                        Tổng tiền hàng
                    </v-col>
                    <v-col
                    cols="10"
                    sm="7"
                    md="7">
                        <v-text-field
                            dense
                            disabled
                            v-model="order.total"
                            type="number"
                        ></v-text-field>
                    </v-col>
                </v-row>
            
            </v-col>
            </v-row>
        </v-container>
        <div style="text-align: center;">
        <v-btn
            color="blue darken-1"
            text
            @click="backToList"
        >
            Trở về danh sách đơn hàng
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="save"
        >
            Lưu
        </v-btn>
        </div>     
    </div>
</template>

<script>

import { productApi } from '@/api/product';
import { orderApi } from '@/api/order';
import { orderDetailApi } from '@/api/orderDetail';

export default {
  name: 'OrderDetail',
  components: { 

  },
  data() {
    return {
      productSelected: [],
      listProduct: [],
      listStatus: ['Mới', 'Hoàn thành', 'Hủy'],
      order: {
        id: '',
        status: '',
        client: {"value":"","listValue":[]},
        user: {"value":"","listValue":[]},
        date: '',
        note: '',
        total: '',
        listProduct: [
            // {idProduct: '',
            // name: '',
            // price: 0,
            // quantity: 0,
            // discount: 0,
            // total: 0,
            // }
        ]
      },
        notify: false,
        message: '',
        listProductSaved: []
    }
  },
  computed: {

  },
  watch: {
      productSelected:{
        //   immediate: true,
          handler(){
            this.productSelected.map(prd=>{
                this.listProduct.map(p=>{
                    if(prd == p.id){
                        this.order.listProduct.map(prdSelected=>{
                            if(prdSelected.idProduct != prd){
                                this.order.listProduct.push(
                                    {idProduct: p.id,
                                    name: p.name,
                                    price: p.price,
                                    quantity: p.quantity,
                                    discount: 0,
                                    total: p.price * p.quantity,
                                    }                
                                )
                            }
                        })
                    }
                })
            })
        }
      },
      order: {
          immediate: true,
          deep: true,
          handler(vl){
            let sum = 0
            vl.listProduct.map(p=>{
                p.total = Math.round( p.price * p.quantity - p.total * p.discount * 0.01)
                sum += p.total
            })
            this.order.total = sum

          }
      }
  },
  created() {
    // get client
    let allUser = this.$store.state.allUser;
    let listValue = []
    allUser.map(user=>{
        let object = {}
        object['id'] =  user.id
        object['title'] =  user.id + ' ' +user.name
        listValue.push(object)
    })
    this.order.user['listValue'] = listValue

    // get user
    let allClient = this.$store.state.allClient;
    let listValueClient = []
    allClient.map(client=>{
        let object = {}
        object['id'] =  client.id
        object['title'] =  client.id + ' ' +client.name
        listValueClient.push(object)
    })
    this.order.client['listValue'] = listValueClient

    // get product
    this.getProduct()

    // get order
    if(this.$route.name == 'OrderDetail'){
        this.getOrder();
    }

  },
  mounted() {

  },
  methods: {
    async getProduct(){
        let res = await productApi.getProducts();
        this.listProduct = res.response;
    },
    async getOrder(){

        let res = await orderDetailApi.getOrders(this.$route.params.id);
        this.order.status = res.listObject[0].orders.status;
        this.order.client.value = res.listObject[0].orders.idClient;
        this.order.user.value = res.listObject[0].orders.idUser;
        this.order.date = res.listObject[0].orders.date;
        this.order.note = res.listObject[0].orders.note;
        this.order.total = res.listObject[0].orders.total;
        res.listObject.map(obj =>{
            this.order.listProduct.push({
                idProduct: obj.idProduct,
                name: obj.productName,
                price: obj.products.price,
                quantity: obj.quantity,
                discount: obj.discount,
                total: obj.total
            })
            this.listProductSaved.push(obj.id)
            this.productSelected.push(obj.idProduct)
        })

    },
    backToList(){
        this.$router.push("/order");
    },
    async save(){
        let order  = {
            idClient : this.order.client.value,
            idUser : this.order.user.value,
            date: this.order.date,
            status: this.order.status,
            total: this.order.total,
            note: this.order.note
        }
        //update
        if(this.$route.name == 'OrderDetail'){
                
            try{
                await orderApi.updateOrders(this.$route.params.id, order);
                this.listProductSaved.map(async (prdSaved)=>{
                    // xóa hết chi tiết đơn hàng cũ
                    await orderDetailApi.deleteOrderDetails(prdSaved); 
                })

                // add lại
                this.order.listProduct.map(async (product)=>{
        
                    let orderDetail = {
                        idOrder: this.$route.params.id,
                        idProduct: product.idProduct,
                        quantity: product.quantity,
                        discount: product.discount,
                        total: product.total
                    }
                    await orderDetailApi.addOrderDetails(orderDetail);
                })                          
                this.$router.push("/order");
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }
        }else {
            // add new
                
            try{
                let res = await orderApi.addOrders(order);
                this.order.listProduct.map(async (product)=>{
        
                    let orderDetail = {
                        idOrder: res.data.data.id,
                        idProduct: product.idProduct,
                        quantity: product.quantity,
                        discount: product.discount,
                        total: product.total
                    }
                    await orderDetailApi.addOrderDetails(orderDetail);
                })
                this.$router.push("/order");
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }
        }
    }
  }
}
</script>

<style>
.table-product{
    border: 1px solid gainsboro;
    max-height: 500px;
    overflow-y: scroll;
}

</style>