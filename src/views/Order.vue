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
        :isOrder="true"
        />
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import { orderApi } from '@/api/order';
import { orderDetailApi } from '@/api/orderDetail';

export default {
    name: 'Order',
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
            object: 'Đơn hàng',
            titleObject: 'Danh sách đơn hàng',
            action: {
                add: 'Tạo mới đơn hàng',
                edit: 'Thông tin đơn hàng',
                delete: 'Xóa đơn hàng'
            },
            headers: [
                {
                    text: 'Mã đơn hàng',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Trạng thái', value: 'status' },
                { text: 'Mã khách hàng', value: 'idClient' },
                { text: 'Tên khách hàng', value: 'clientName' },
                { text: 'Ngày', value: 'date' },
                { text: 'Mã nhân viên xử lý',value: 'idUser'},
                { text: 'Tên nhân viên xử lý', value: 'userName' },
                { text: 'Tổng tiền', value: 'total' },
                { text: 'Ghi chú', value: 'note' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            listData: [],
            defaultItem: [
                { text: 'Trạng thái',value: '', key: 'status' },
                { text: 'Mã khách hàng',value: '', key: 'idClient' },
                { text: 'Ngày',value: '', key: 'date' },
                { text: 'Nhân viên xử lý',value: '',key: 'idUser', type: 'autocomplete'},
                { text: 'Tổng tiền',value: '', key: 'total' },
                { text: 'Ghi chú',value: '', key: 'note' },
            ],
            notify: false,
            message: ''

        }
    },
    computed: {

    },
    watch: {

    },

    created () {
        this.getOrder();
        this.defaultItem.map(index => {
            if(index.type == 'autocomplete'){
                if(index.key == 'idUser'){
                    let allUser = this.$store.state.allUser;
                    let listValue = []
                    allUser.map(user=>{
                        let object = {}
                        object['id'] =  user.id
                        object['title'] =  user.id + ' ' +user.name
                        listValue.push(object)
                    })
                    index['listValue'] = listValue
                }
            }
      })
    },

    methods: {
        async getOrder(){
            let res = await orderApi.getOrders();
            this.listData = res.listObject;
        },
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            try{
                await orderApi.addOrders(object);
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
                await orderApi.updateOrders(this.listData[data.index].id, object);
            }
            catch(err){
                console.log(err)
            }            
        },
        async deleteItem(index){

            try{
                // xóa chi tiết đơn hàng
                let res = await orderDetailApi.getOrders(this.listData[index].id);
                for(let a = 0; a < res.listObject.length; a ++){
                    await orderDetailApi.deleteOrderDetails(res.listObject[a].id);
                }
                // xóa đơn hàng
                await orderApi.deleteOrders(this.listData[index].id);
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
