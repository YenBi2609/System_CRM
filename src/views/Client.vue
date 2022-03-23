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
import { clientApi } from '@/api/client';

export default {
    name: 'Client',
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
            object: 'Khách hàng',
            titleObject: 'Danh sách khách hàng',
            action: {
                add: 'Tạo khách hàng mới',
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
            defaultItem: [
                { text: 'Tên khách hàng',value: '', key: 'name' },
                { text: 'Số điện thoại',value: '', key: 'phoneNumber',type:'number' },
                { text: 'Địa chỉ', value: '', key: 'address' },
                { text: 'Email', value: '', key: 'email' },
            ],
            notify: false,
            message: ''


        }
    },
    computed: {
        listData(){
            if (this.keySearch) {
                let s = this.keySearch.toLowerCase();
                return this.$store.state.allClient.filter((item) => {
                    return JSON.stringify(item).toLowerCase().includes(s);
                });
            } else {
                return this.$store.state.allClient;
            }
            // return this.$store.state.allClient;
        },
    },
    watch: {

    },
    created () {
    },

    methods: {
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            try{
                await clientApi.addClients(object);
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
                await clientApi.updateClients(this.listData[data.index].id, object);
                this.$store.commit('handleGetClient', this.listData);
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }            
        },
        async deleteItem(index){

            try{
                await clientApi.deleteClients(this.listData[index].id);
                this.listData.splice(index, 1)
                this.$store.commit('handleGetClient', this.listData);
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
