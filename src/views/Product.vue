<template>
    <div >
    <v-snackbar
        top
        light
        v-model="notify"
        color="#f58634"
        :timeout="2000"
    >
        {{ message }}
    </v-snackbar>
        <Table
        :object="object"
        :titleObject="titleObject"
        :action="action"
        :headers="headers"
        :listData="listData"
        :defaultItem="defaultItem"
        @add-item="addItem"
        @update-item="updateItem"
        @delete-item="deleteItem" 
        />
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import { productApi } from '@/api/product';

export default {
    name: 'Product',
    components: { 
        Table
    },
    props:{
        keySearch: { 
            type: String, 
            default: "" 
        },
    },
    data() {
        return {
            object: 'Sản phẩm',
            titleObject: 'Danh sách sản phẩm',
            action: {
                add: 'Tạo mới sản phẩm',
                edit: 'Thông tin sản phẩm',
                delete: 'Xóa sản phẩm'
            },
            headers: [
                {
                    text: 'Mã sản phẩm',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Tên sản phẩm', value: 'name' },
                { text: 'Mô tả', value: 'description' },
                { text: 'Giá bán', value: 'price' },
                { text: 'Giá nhập', value: 'cost' },
                { text: 'Số lượng', value: 'quantity' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            listProducts: [],
            defaultItem: [
                { text: 'Tên sản phẩm',value: '', key: 'name' },
                { text: 'Mô tả',value: '', key: 'description' },
                { text: 'Giá bán',value: '', key: 'price',type:'number' },
                { text: 'Giá nhập',value: '', key: 'cost',type:'number'},
                { text: 'Số lượng',value: '', key: 'quantity', type:'number' },
            ],
            notify: false,
            message: ''


        }
    },
    computed: {
        listData(){
            if (this.keySearch) {
                let s = this.keySearch.toLowerCase();
                return this.listProducts.filter((item) => {
                    return JSON.stringify(item).toLowerCase().includes(s);
                });
            } else {
                return this.listProducts;
            }
        },
    },
    watch: {

    },

    created () {
        this.getProduct();
    },

    methods: {
        async getProduct(){
            let res = await productApi.getProducts();
            this.listProducts = res.response;
        },
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            try{
                await productApi.addProducts(object);
                object['id'] = this.listData[this.listData.length - 1].id + 1;
                this.listData.push(object)
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }
        },
        async updateItem(data){
            let object  = {}
            data.item.map(index=>{
                object[index.key] = index.value
            })
            Object.assign(this.listData[data.index], object)
            try{
                await productApi.updateProducts(this.listData[data.index].id, object);
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }            
        },
        async deleteItem(index){

            try{
                await productApi.deleteProducts(this.listData[index].id);
                this.listData.splice(index, 1)
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }
        }
    }
}
</script>

<style>

</style>
