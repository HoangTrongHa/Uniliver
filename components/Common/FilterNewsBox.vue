<script lang="ts" setup>
import useDetectOutsideClick from "@/composables/useDetectOutsideClick";
import {useRouter} from "vue-router";

const filterBoxRef = ref()
useDetectOutsideClick(filterBoxRef, () => {
  emits("handleOutsideClick");
})

interface IProps {
  modelValue?: string
}

const props = withDefaults(defineProps<IProps>(), {})
const emits = defineEmits(["update:modelValue", "handleFocus", "handleOutsideClick", "handleSearchData"]);


const router = useRouter()
const handleSearchDataEmit = () => {
  emits('handleSearchData')
};
</script>

<template>
  <div ref="filterBoxRef" class="w-full flex flex-wrap justify-between text-sm h-11 font-medium">
    <div class="w-[calc(100%-75px)] relative bg-blue-90">

      <div class="border border-r-0 rounded-0 flex items-center">
        <input
            :value="modelValue"
            placeholder="Поиск по ключевым словам"
            class="w-[calc(100%-30px)] rounded-none rounded-0 font-montserrat-alternates-medium font-medium pl-[14px] py-3 w-full h-full bg-blue-90 !outline-none text-[#FFFFFF] hover:border-cyan-50 placeholder:text-[#FFFFFFCC] hover:placeholder-[#FFFFFF]"
            :class="{ 'hover:border-white': modelValue?.length }"
            @input="emits('update:modelValue', $event.target?.value)"
            @focus="emits('handleFocus')"
        />

        <button
            v-if="modelValue"
            @click="emits('update:modelValue', null)"
        >
          <img class="w-4" src="/image/icon/clear-search.svg" alt="Search" width="16" height="16" />
        </button>
      </div>

      <slot />
    </div>
    <div class="w-[75px] h-full">
      <button
          class="w-full h-full bg-cyan-50 hover:bg-[#0CC5F0] text-blue-80 text-sm font-medium flex items-center justify-center leading-[normal] font-montserrat-alternates-medium"
          @click="handleSearchDataEmit"
      >
        Поиск
      </button>
    </div>
  </div>
</template>
