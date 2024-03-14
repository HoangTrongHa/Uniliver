<script setup lang="ts">
const router = useRouter();

import { useFilterStore } from "~/stores/filter";
const filterStore = useFilterStore();

interface IProps {
  placeholder: string
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '',
})

</script>

<template>
  <button
      class="flex justify-center rounded-none items-center gap-2.5 w-[142px] h-[72px] md:w-[174px] md:h-[44px] bg-blue-90 hover:bg-blue-100 text-center"
  >
    <img src="/image/icon/search.svg" alt="search" />

    <span
        class="whitespace-nowrap placeholder:text-white focus:outline-none text-sm font-medium"
        @click="filterStore.setQuery($event.target?.value)"
    >
      {{ placeholder }}
    </span>
  </button>
</template>