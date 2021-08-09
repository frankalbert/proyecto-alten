<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <td v-for="(tdHead, index) in tHeads" :key="index" :nowrap="tdHead.nowrap" :class="{'text--center': tdHead.center}">{{ tdHead.text }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trBody in tBody" :key="trBody.id" @click="$emit('editUser', trBody.id)">
                    <td v-for="(tdBody, indexTd) in tHeads" :key="`${trBody.id}-${indexTd}`" :class="{'text--center': tdBody.center}">{{ trBody[tdBody.keyTbody] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'TableComponent',
        props: {
            tHeads: {
                type: Array,
                default: () => [
                    {
                        text: 'Género',
                        center: true,
                        nowrap: false,
                        keyTbody: 'genero',
                    },
                    {
                        text: 'Nombre',
                        center: true,
                        nowrap: false,
                        keyTbody: 'nombre',
                    },
                    {
                        text: 'Email',
                        center: true,
                        nowrap: false,
                        keyTbody: 'email',
                    },
                    {
                        text: 'Nacionalidad',
                        center: true,
                        nowrap: false,
                        keyTbody: 'nacionalidad',
                    },
                    {
                        text: 'Fecha de Nacimiento',
                        center: true,
                        nowrap: true,
                        keyTbody: 'fecha_nacimiento',
                    },
                    {
                        text: 'Fecha de registro',
                        center: true,
                        nowrap: true,
                        keyTbody: 'fecha_registro',
                    },
            ]},
            tBody: {
                type: Array,
                default: () => [],
            },
        },
    }
</script>

<style lang="scss" scoped>
    .table {
        margin: 30px 0;
        &-responsive {
            overflow-x: auto;
        }
        width: 100%;
        thead {
            tr {
                background-color: grey;
                color: #fff;
            }
        }
        tbody {
            tr {
                cursor: pointer;
                transition: background-color .5s;
                &:nth-of-type(2n) {
                    background-color: #d7d7d7;
                }
                &:hover {
                    background-color: #c7c7c7;
                }
            }
        }
        td {
            padding: 8px 12px;
            &.text--center {
                text-align: center;
            }
        }
    }
</style>