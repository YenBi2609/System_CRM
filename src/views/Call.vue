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
import { callApi } from '@/api/call';

export default {
    name: 'Call',
    components: { 
        Table
    },
    props:{

    },
    data() {
        return {
            object: 'Cuộc gọi',
            titleObject: 'Danh sách cuộc gọi',
            action: {
                add: 'Tạo mới cuộc gọi',
                edit: 'Thông tin cuộc gọi',
                delete: 'Xóa cuộc gọi'
            },
            headers: [
                {
                    text: 'Mã cuộc gọi',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Số điện thoại', value: 'phoneNumber' },
                { text: 'Mã khách hàng', value: 'idClient' },
                { text: 'Tên khách hàng', value: 'clientName' },
                { text: 'Thời gian', value: 'date' },
                { text: 'Mã nhân viên gọi điện', value: 'idUser' },
                { text: 'Nhân viên gọi điện', value: 'userName' },
                { text: 'Ghi chú', value: 'note' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            listData: [],
            defaultItem: [
                { text: 'Mã khách hàng',value: '', key: 'idClient' },
                { text: 'Thời gian',value: '', key: 'date' },
                { text: 'Mã nhân viên gọi điện',value: '', key: 'idUser' },
                { text: 'Ghi chú',value: '', key: 'note' },
            ],
        }
    },
    computed: {

    },
    watch: {

    },

    created () {
        this.getCall();
    },

    methods: {
        async getCall(){
            let res = await callApi.getCalls();
            this.listData = res.listObject;
        },
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            try{
                await callApi.addCalls(object);
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
                await callApi.updateCalls(this.listData[data.index].id, object);
            }
            catch(err){
                console.log(err)
            }            
        },
        async deleteItem(index){

            try{
                await callApi.deleteCalls(this.listData[index].id);
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
