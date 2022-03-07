<template>
    <div >
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
            listData: [],
            defaultItem: [
                { text: 'Tên sản phẩm',value: '', key: 'name' },
                { text: 'Mô tả',value: '', key: 'description' },
                { text: 'Giá bán',value: '', key: 'price' },
                { text: 'Giá nhập',value: '', key: 'cost' },
                { text: 'Số lượng',value: '', key: 'quantity' },
            ],


        }
    },
    computed: {

    },
    watch: {

    },

    created () {
        this.getProduct();
    },

    methods: {
        async getProduct(){
            let res = await productApi.getProducts();
            this.listData = res.response;
        },
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            try{
                await productApi.addProducts(object);
            }
            catch(err){
                console.log(err)
            }
            object['id'] = this.listData[this.listData.length - 1].id + 1;
            this.listData.push(object)
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
            }            
        },
        async deleteItem(index){

            try{
                await productApi.deleteProducts(this.listData[index].id);
                this.listData.splice(index, 1)
            }
            catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>
