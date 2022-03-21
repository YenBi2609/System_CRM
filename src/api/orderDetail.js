import { coreApi } from './api.js'

export const orderDetailApi = {
    getOrderDetails() {
        return coreApi.get('orderDetails')
    },
    addOrderDetails(data) {
        return coreApi.post('create/orderDetails',data)
    },
    getOrders(id, data) {
        return coreApi.get('show-orderDetail/'+ id,data)
    },
    // deleteOrders(id) {
    //     return coreApi.del('delete-order/'+ id)
    // }, 
}