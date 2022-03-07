import { coreApi } from './api.js'

export const clientApi = {
    getClients() {
        return coreApi.get('clients')
    },
    addClients(data) {
        return coreApi.post('create/clients',data)
    },
    updateClients(id, data) {
        return coreApi.put('update-client/'+ id,data)
    },
    deleteClients(id) {
        return coreApi.del('delete-client/'+ id)
    }, 
}