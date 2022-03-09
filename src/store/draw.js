import { deepCopy } from '@/utils/misc';

export default {
    namespaced: true,
    state: {
        featureList: [],
    },
    mutations: {
        add({ featureList }, feature) {
            featureList.push(deepCopy(feature));
        },
        remove({ featureList }, index) {
            featureList[index] && featureList.splice(index, 1);
        },
        clear(state) {
            state.featureList = [];
        },
    },
};
