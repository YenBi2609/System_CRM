import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        listTask: [],
        allUser: [],
        allClient: [],
        currentUser: {}
    },
    mutations: {
        handleGetTask(state, task){
            state.listTask = task
        },
        handleGetUser(state, user){
            state.allUser = user
        },
        handleGetClient(state, client){
            state.allClient = client
        },
        updateCurentUser(state, user){
            state.currentUser = user
        },
    }
});