<template>
    <div>
        <h2>Bienvenidos a la APP</h2>
        <ButtonComponent 
            @clickButton="getUsers"
            class="button"
            text="Botón consulta"
        />
        <TableComponent 
            class="table-responsive" 
            :tBody="getUserFilter"
            @editUser="editUser"
        />
        <ButtonComponent 
            v-show="getUserFilter.length"
            @clickButton="showFilter = !showFilter"
            class="button"
            text="Área de filtros"
        />

        <div 
            class="filtros"
            v-if="showFilter"
        >
            <div class="row">
                <div class="col">
                    <select v-model="filters.genero">
                        <option value="">Género</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                
                <div class="col">
                    <h4>Edad</h4>
                    <input type="range" v-model="filters.edad" />
                    <label>{{ filters.edad }}</label>
                </div>

                <div class="col">
                    <input type="search" v-model.trim="filters.nacionalidad" placeholder="Nacionalidad" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ButtonComponent from '../components/ButtonComponent';
    import TableComponent from '../components/TableComponent';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'Home',
        components: {
            ButtonComponent,
            TableComponent,
        },
        data() {
            return {
                showFilter: false,
                filters: {
                    genero: '',
                    edad: 150,
                    nacionalidad: '',
                },
            }
        },
        computed: {
            ...mapState(['users']),
            getUserFilter() {
                return this.users.filter(user => {
                    return (this.filters.genero ? user.genero === this.filters.genero : user.genero.includes('')) && (user.edad <= this.filters.edad) && (user.nacionalidad.toLowerCase().includes(this.filters.nacionalidad.toLowerCase()));
                });
            }
        },
        methods: {
            ...mapActions(['getUsers']),
            editUser(userId) {
                if(userId) {
                    this.$router.push({name: 'user', params: {userId,}})
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .table {
        &-responsive {
            height: 75vh;
            overflow-y: auto;
        }
    }
    .filtros {
        .row {
            justify-content: space-between;
            align-items: center;
        }
        input[type="range"] {
            cursor: pointer;
        }
        h4 {
            margin: 0;
        }
    }
</style>