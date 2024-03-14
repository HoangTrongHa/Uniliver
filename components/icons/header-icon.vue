<script setup lang="ts">
interface IProps {
  start?: string,
  end?: string
}
const props = withDefaults(defineProps<IProps>(), { start: '#FFF', end: '#44D2F3' })
</script>

<template>
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 17" fill="none">
        <path
            d="M4.57471 3.72785L11.08 8.4999L4.57471 13.272V3.72785Z"
            class="fill-white stroke-white"
            :class="`fill-[${start}] ` + `stroke-[${start}] `  + `group-hover:fill-[${end}] ` + `group-hover:stroke-[${end}]`"
        />
    </svg>
</template>