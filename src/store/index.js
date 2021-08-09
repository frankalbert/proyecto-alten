import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        urlApi: 'https://randomuser.me/api/?results=100',
        users: [],
    },
    getters: {
        parseNumber: () => number => {
            return number < 10 ? `0${number}` : number;
        },
        convertStringToDate: (state, getters) => (string, formatFirstDay = true) => {
            const date = new Date(string),
                day = getters.parseNumber(date.getDate()),
                month = getters.parseNumber(date.getMonth() + 1),
                year = date.getFullYear();
            return formatFirstDay ? `${day}-${month}-${year}` : `${year}-${month}-${day}`;
        },
        getUserById: state => userId => {
            const user = state.users.find(user => user.id === userId);
            return user ? user : {};
        },
        getFavoriteUsers: state => {
            return state.users.filter(user => user.favorito);
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setUserFavorite(state, userId) {
            const index = state.users.findIndex(user => user.id === userId);
            if (index > -1) {
                state.users[index].favorito = !state.users[index].favorito;
            }
        },
    },
    actions: {
        async getUsers({ commit, state, getters }) {
            try {
                const basicUserInfo = await fetch(state.urlApi)
                    .then(resp => resp.json())
                    .then(users => {
                        const infoUser = users?.results?.map(user => {
                            return {
                                id: user.login.uuid,
                                genero: user.gender,
                                nombre: `${user.name.first} ${user.name.last}`,
                                edad: user.dob.age,
                                email: user.email,
                                nacionalidad: user.nat,
                                fecha_nacimiento: getters.convertStringToDate(user.dob.date),
                                fecha_registro: getters.convertStringToDate(user.registered.date),
                                imagen: user.picture.large,
                                localizacion: user.location,
                                telefono: user.phone,
                                cell: user.cell,
                                favorito: false,
                            }
                        });
                        return infoUser;
                    });

                commit('setUsers', basicUserInfo);
            }
            catch (error) {
                console.error(error);
            }
        },
        async setUserFavorite({ commit }, userId) {
            commit('setUserFavorite', userId);
        }
    }
});

store.dispatch('getUsers');

export default store;