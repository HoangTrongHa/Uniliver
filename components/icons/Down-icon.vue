<script setup lang="ts">
interface IProps {
    width?: number
    height?: number
    fill?: string
}

withDefaults(defineProps<IProps>(), {
    width: 24,
    height: 24,
    fill: '#015EFF'
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24" :fill="fill">
        <path d="M11.9997 6.11218L20.6381 17.8882L3.36133 17.8882L11.9997 6.11218Z" :fill="fill" />
    </svg>
</template>