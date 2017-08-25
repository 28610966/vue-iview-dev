/**
 * Created by binwang on 17/8/24.
 */
export  default {
    state: {
        breadListState:[]
    },
    mutations: {
        breadListStateSet(state,obj){
            state.breadListState = obj;
        }
    }
}