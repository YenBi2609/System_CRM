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
                    value: 'name',
                },
                { text: 'Tên khách hàng', value: 'calories' },
                { text: 'Số điện thoại', value: 'fat' },
                { text: 'Địa chỉ', value: 'carbs' },
                { text: 'Email', value: 'protein' },
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
