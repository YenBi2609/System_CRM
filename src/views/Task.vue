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
        :idTaskShow="idTaskShow"
        />
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import { taskApi } from '@/api/task';

export default {
    name: 'Task',
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
            object: 'Công việc',
            titleObject: 'Danh sách công việc',
            action: {
                add: 'Tạo công việc mới',
                edit: 'Thông tin công việc',
                delete: 'Xóa công việc'
            },
            headers: [
                {
                    text: 'Mã công việc',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Tên công việc', value: 'name' },
                { text: 'Trạng thái', value: 'status' },
                { text: 'Mức độ ưu tiên', value: 'priority' },
                { text: 'Mã người thực thi', value: 'idUser' },
                { text: 'Tên người thực thi', value: 'userName' },
                { text: 'Thời gian', value: 'duration' },
                { text: 'Ngày bắt đầu', value: 'start_date' },
                { text: 'Ngày đến hạn', value: 'end_date' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            defaultItem: [
                { text: 'Tên công việc', value: '',key: 'name' },
                { text: 'Trạng thái', value: '',key: 'status', type: 'autocomplete', listValue: ['Mới', 'Hoàn thành', 'Hủy'] },
                { text: 'Mức độ ưu tiên', value: '',key: 'priority',type: 'autocomplete', listValue: ['Critical', 'High', 'Medium', 'Low'] },
                { text: 'Người thực thi', value: '',key: 'idUser', type: 'autocomplete'},
                { text: 'Thời gian', value: '',key: 'duration', type: 'number' },
                { text: 'Ngày bắt đầu', value: '',key: 'start_date', type:'date' },
                { text: 'Ngày đến hạn', value: '',key: 'end_date',type:'date' },
            ],
            notify: false,
            message: '',
            idTaskShow: 0
        }
    },
    computed: {
      listData(){
        if (this.keySearch) {
            let s = this.keySearch.toLowerCase();
            return this.$store.state.listTask.filter((item) => {
                return JSON.stringify(item).toLowerCase().includes(s);
            });
        } else {
            return this.$store.state.listTask;
        }
      }
    },
    watch: {

    },

    created () {
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
        if(this.$route.name == 'EditTask'){
            this.idTaskShow = this.$route.params.id
        }
    },

    methods: {
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })

            try{
                let res = await taskApi.addTasks(object);
                object['id'] = res.data.data.id;

                let allUser = this.$store.state.allUser;
                allUser.map(user=>{
                    if(user.id == object.idUser){
                        object['userName'] = user.name
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
                await taskApi.updateTasks(this.listData[data.index].id, object);
                this.$store.commit('handleGetTask', this.listData);
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }            
        },
        async deleteItem(index){

            try{
                await taskApi.deleteTasks(this.listData[index].id);
                this.listData.splice(index, 1)
                this.$store.commit('handleGetTask', this.listData);
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
