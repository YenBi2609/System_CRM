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
import { clientApi } from '@/api/client';

export default {
    name: 'Client',
    components: { 
        Table
    },
    props:{

    },
    data() {
        return {
            object: 'Khách hàng',
            titleObject: 'Danh sách khách hàng',
            action: {
                add: 'Tạo khách hàn mới',
                edit: 'Thông tin khách hàng',
                delete: 'Xóa khách hàng'
            },
            headers: [
                {
                    text: 'Mã khách hàng',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Tên khách hàng', value: 'name' },
                { text: 'Số điện thoại', value: 'phoneNumber' },
                { text: 'Địa chỉ', value: 'address' },
                { text: 'Email', value: 'email' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            listData: [],
            defaultItem: [
                { text: 'Tên khách hàng',value: '', key: 'name' },
                { text: 'Số điện thoại',value: '', key: 'phoneNumber' },
                { text: 'Địa chỉ', value: '', key: 'address' },
                { text: 'Email', value: '', key: 'email' },
            ],


        }
    },
    computed: {

    },
    watch: {

    },
    created () {
        this.getClient();
    },

    methods: {
        async getClient(){
            let res = await clientApi.getClients();
            this.listData = res.response;
        },
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            try{
                await clientApi.addClients(object);
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
                await clientApi.updateClients(this.listData[data.index].id, object);
            }
            catch(err){
                console.log(err)
            }            
        },
        async deleteItem(index){

            try{
                await clientApi.deleteClients(this.listData[index].id);
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
