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
import { callApi } from '@/api/call';

export default {
    name: 'Call',
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
                { text: 'Ngày', value: 'date' },
                { text: 'Mã nhân viên gọi điện', value: 'idUser' },
                { text: 'Nhân viên gọi điện', value: 'userName' },
                { text: 'Ghi chú', value: 'note' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            listData: [],
            defaultItem: [
                { text: 'Khách hàng',value: '', key: 'idClient',type: 'autocomplete' },
                { text: 'Ngày',value: '', key: 'date',type: 'date' },
                { text: 'Nhân viên gọi điện',value: '', key: 'idUser',type: 'autocomplete' },
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
        this.getCall();
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
                if(index.key == 'idClient'){
                    let allClient = this.$store.state.allClient;
                    let listValue = []
                    allClient.map(client=>{
                        let object = {}
                        object['id'] =  client.id
                        object['title'] =  client.id + ' ' +client.name
                        listValue.push(object)
                    })
                    index['listValue'] = listValue
                }
            }
        })
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
                // tự động tăng số thứ tự
                object['id'] = this.listData[this.listData.length - 1].id + 1;

                let allClient = this.$store.state.allClient;
                allClient.map(client=>{
                    if(client.id == object.idClient){
                        object['clientName'] = client.name
                    }
                })

                let allUser = this.$store.state.allUser;
                allUser.map(user=>{
                    if(user.id == object.idUser){
                        object['userName'] = user.name
                        object['phoneNumber'] = user.phoneNumber
                    }
                })
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
                await callApi.updateCalls(this.listData[data.index].id, object);
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }            
        },
        async deleteItem(index){

            try{
                await callApi.deleteCalls(this.listData[index].id);
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
