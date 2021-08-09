
<template>
    <div class="row">
        <div class="col col-12">
            <h2>Perfiles Favoritos:</h2>
            <TableComponent 
                class="table-responsive" 
                :tBody="getFavoriteUsers"
            />
            <ButtonComponent 
                v-show="getFavoriteUsers.length"
                @clickButton="exporterCSV"
                class="button"
                text="Exportar"
            />
        </div>
    </div>
</template>

<script>
    import ButtonComponent from '../components/ButtonComponent';
    import TableComponent from '../components/TableComponent';
    import { mapGetters  } from 'vuex';
    export default {
        name: 'Exporter',
        components: {
            ButtonComponent,
            TableComponent,
        },
        data() {
            return {
                theads: ['Genero', 'Nombre', 'Email', 'Nacionalidad', 'Fecha Nacimiento', 'Fecha Registro'],
            }
        },
        computed: {
            ...mapGetters(['getFavoriteUsers']),
        },
        methods: {
            exporterCSV() {
                let csvFile = this.theads.join(';');
                this.getFavoriteUsers.forEach(thead => {
                    csvFile += `\n${thead?.genero};${thead?.nombre};${thead?.email};${thead?.nacionalidad};${thead?.fecha_nacimiento};${thead?.fecha_registro}`;
                });

                var exportedFilename = 'export.csv';
                var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
                
                var link = document.createElement("a");
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        },
        mounted () {
            if(!this.getFavoriteUsers.length) {
                this.$router.push({name: 'home'});
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>