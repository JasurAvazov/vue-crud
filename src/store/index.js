import { createStore } from 'vuex'
import { ref, onValue } from "firebase/database";
import db from "../database/firebaseConfig";

const store = createStore({
    state() {
        return {
            data: [],
            dataAuthor: []
        }
    },
    mutations: {
        GET_AUTHOR(state, payload) {
            state.dataAuthor = payload;
        },
        GET_DATA(state, payload) {
            state.data = Object.values(payload);
            console.log(state.data);
        }
    },
    actions: {
        getData({ commit }) {
            const quotesRef = ref(db, "quotes");
            onValue(quotesRef, (snapshot) => {
                const data = snapshot.val();
                if (data != null) {
                    const authors = Object.values(data).map(item => item.author);
                    const uniqueAuthors = [...new Set(authors)];
                    commit('GET_DATA', data);
                    commit('GET_AUTHOR', uniqueAuthors);
                }
            });
        }
    }
})

export default store