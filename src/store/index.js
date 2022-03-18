import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        listTask: []
    },
    mutations: {
        handleGetTask(state, task){
            state.listTask = task
        },
    }
});