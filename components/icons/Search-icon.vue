<script setup lang="ts">
interface IProps {
  stroke?: string
  size?: number
  className?: string
}

const props = withDefaults(defineProps<IProps>(), {
  stroke: "#fff",
  size: 16,
  className: "group-hover:stroke-blue-700 group-hover:text-blue-700"
})
</script>
<template>
  <svg :class="className" class="stroke-current transition-fill duration-200 ease-in-out"
       xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 16 16" fill="none">
    <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 14L11.1 11.1" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>