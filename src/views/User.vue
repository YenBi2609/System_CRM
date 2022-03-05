<template>
    <div >
        <Table
        :object="object"
        :titleObject="titleObject"
        :action="action"
        :headers="headers" 
        />
    </div>
</template>

<script>
import Table from '@/components/Table.vue'

export default {
    name: 'Client',
    components: { 
        Table
    },
    props:{

    },
    data() {
        return {
            object: 'Nhân viên',
            titleObject: 'Danh sách nhân viên',
            action: {
                add: 'Tạo mới nhân viên',
                edit: 'Thông tin nhân viên',
                delete: 'Xóa nhân viên'
            },
            headers: [
                {
                    text: 'Mã nhân viên',
                    align: 'start',
                    sortable: true,
                    value: 'name',
                },
                { text: 'Tên nhân viên', value: 'calories' },
                { text: 'Số điện thoại', value: 'fat' },
                { text: 'Địa chỉ', value: 'carbs' },
                { text: 'Tên đăng nhập', value: 'protein' },
                { text: 'Mật khẩu', value: 'protein' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ]


        }
    },
    computed: {

    },
    watch: {

    },

    created () {

    },

    methods: {
    }
}
</script>

<style>

</style>
