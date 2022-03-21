import { coreApi } from './api.js'

export const orderDetailApi = {
    getOrderDetails() {
        return coreApi.get('orderDetails')
    },
    addOrderDetails(data) {
        return coreApi.post('create/orderDetails',data)
    },
    // updateOrders(id, data) {
    //     return coreApi.put('update-order/'+ id,data)
    // },
    // deleteOrders(id) {
    //     return coreApi.del('delete-order/'+ id)
    // }, 
}