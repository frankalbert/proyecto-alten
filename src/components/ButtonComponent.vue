<template>
    <button @click="$emit('clickButton')">{{ text }}</button>
</template>

<script>
    export default {
        name: 'ButtonComponent',
        props: {
            text: {
                type: String,
                default: '',
            },
        },
    }
</script>

<style lang="scss" scoped>
    .button {
        width: 100%;
        padding: 10px 12px;
        background-color: grey;
        color: #fff;
        border: 1px solid #fff;
        cursor: pointer;
        transition: all .25s ease-in-out;
        &:hover {
            background-color: transparent;
            color: grey;
            border: 1px solid grey;
        }
    }
</style>