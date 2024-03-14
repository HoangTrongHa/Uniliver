<script setup lang="ts">
interface IProps {
    fill?: string
    stroke?: string
    size?: number
    className?: string
}

const props = withDefaults(defineProps<IProps>(), {
    fill: "#015EFF",
    stroke: "#015EFF",
    size: 16,
    className: "text-blue-80 group-hover:fill-blue-700 group-hover:stroke-blue-700 group-hover:text-blue-700"
})
</script>
<template>
    <svg :class="className" class="stroke-current fill-current transition-fill duration-300 ease-in-out"
        xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 16 16" :fill="'white'">
        <path :fill="fill" :stroke="fill"
            d="M11.9254 8.00112L4.07471 13.7601V2.24219L11.9254 8.00112Z" />
    </svg>
</template>