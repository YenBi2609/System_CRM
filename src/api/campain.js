import { coreApi } from './api.js'

export const campainApi = {
    getCampains() {
        return coreApi.get('campains')
    },
    addCampains(data) {
        return coreApi.post('create/campains',data)
    },
    updateCampains(id, data) {
        return coreApi.put('update-campain/'+ id,data)
    },
    deleteCampains(id) {
        return coreApi.del('delete-campain/'+ id)
    },
    sendMail(id) {
        return coreApi.post('campains/sendEmail/'+ id)
    },
}