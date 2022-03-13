import { coreApi } from './api.js'

export const callApi = {
    getCalls() {
        return coreApi.get('calls')
    },
    addCalls(data) {
        return coreApi.post('create/calls', data)
    },
    updateCalls(id, data) {
        return coreApi.put('update-call/' + id, data)
    },
    deleteCalls(id) {
        return coreApi.del('delete-call/' + id)
    },
}