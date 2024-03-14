<script setup lang="ts">
import {onMounted} from "vue";
import useAsset from "~/helpers/useAsset";

interface OptionValue {
  value: string | number;
  label: string;
}

const props = defineProps({
  options: Array<OptionValue>,
  value: String,
  placeholder: String,
});

const emit = defineEmits(["handleSelect"]);

const { options, value, placeholder } = toRefs(props);

const dropdownRef = ref<HTMLDivElement | null>(null);

const isOpen = ref(false);

const selectedOption = computed(() => {
  return (
      options?.value?.find((option) => option.value === value) ||
      ({} as OptionValue)
  );
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const labelSelect = ref(props.placeholder)

const selectOption = (option: OptionValue) => {
  emit("handleSelect", option.value);
  labelSelect.value = option.label;
  isOpen.value = false;
};

const closeDropdownOnOutsideClick = (event: MouseEvent) => {
  if (
      dropdownRef.value &&
      !dropdownRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};


onMounted(() => {
  const find = props.options.find(f => f.value == props.value);
  labelSelect.value = find?.label || props.placeholder;
  emit("handleSelect", find?.value || '');
  document.addEventListener("click", closeDropdownOnOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdownOnOutsideClick);
});
</script>

<template>
  <div class="group" ref="dropdownRef">
    <button
        @click="toggleDropdown"
        class="h-[44px] w-full flex justify-between items-center border border-cyan-50 px-[14px] py-4 rounded-sm text-sm text-white cursor-pointer"
    >
      <span class="text-[#FFFFFFCC] group-hover:text-[#FFFFFF]">
        {{ labelSelect }}
      </span>
      <div
          class="w-3 h-2 transition-all duration-100"
          :class="{ 'rotate-180': isOpen }"
      >
        <img :src="useAsset('icons/arrow-block-down-white.svg')" alt="">
      </div>
    </button>
    <ul
        v-if="isOpen"
        class="absolute w-full mt-1 py-1 bg-white border border-gray-300 shadow-md"
    >
      <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black-40"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
