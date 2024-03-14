<script setup lang="ts">
interface IProps {
    width?: number
    height?: number
    fill?: string
    className?: string
}

withDefaults(defineProps<IProps>(), {
    width: 24,
    height: 24,
    fill: "#015EFF",
    className: "text-blue-80",
})
</script>

<template>
    <svg :class="className" class="transition-fill duration-300 ease-in-out" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24" :fill="fill">
        <path d="M12.0003 17.8878L3.36187 6.11182L20.6387 6.11182L12.0003 17.8878Z" />
    </svg>
</template>