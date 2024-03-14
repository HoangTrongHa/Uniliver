<script lang="ts" setup>
const emit = defineEmits(['handleSelect'])
const props = defineProps({
  id: String,
  data: Array<{value: String, label: String}>,
  value: String,
  placeholder: String
})

const {id, data, value, placeholder} = toRefs(props)
const isShow = ref(false);

const select = (selectValue: string) => {
  emit('handleSelect', selectValue);
  isShow.value = false;
}

const handleShow = () => {
  isShow.value = !isShow.value
}

onMounted(() => {
  document.addEventListener('click', function (event: any) {
    const el = document.getElementById(`select-${id.value}`)
    if(!el) return;
    if (!(el === event.target || el.contains(event.target))) {
      isShow.value = false;
    }
  });
});

const label = computed(() => {
  if(!Array.isArray(data.value)) return placeholder.value;
  const selectedObj = data.value.find((item: any) => item.value == value.value);
  return (selectedObj ? selectedObj.label : "") || placeholder.value;
})

</script>

<template>
  <client-only>
    <div class="w-full h-full">
      <div class="relative" :id="`select-${id}`">
        <button
            type="button"
            class="w-full h-11 rounded-sm border hover:border-cyan-50 hover:text-white flex items-center justify-between px-[14px] py-3"
            :class="(value || isShow) ? 'border-cyan-50 text-white' : 'border-[#FFFFFFCC] text-[#FFFFFFCC]'"
            @click="handleShow"
        >
          <span class="text-sm font-montserrat-alternates-medium font-medium">
            {{ label }}
          </span>

          <span class="w-3 h-2">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.99986 7.92489L0.240922 0.0742182L11.7588 0.0742188L5.99986 7.92489Z" :fill="value || isShow ? '#76DDF5' : 'white'" fill-opacity="0.8"/>
            </svg>
          </span>
        </button>


        <div v-show="isShow" class="absolute mt-0 w-full rounded-sm bg-white shadow-lg z-10">
          <ul class="max-h-60 overflow-auto">
            <li
                @click="select(d)"
                v-for="d in data"
                v-bind:key="d"
                class="w-full h-10 text-blue-100 cursor-pointer select-none bg-white hover:bg-blue-80 hover:bg-opacity-10"
            >
              <div class="w-full h-full flex items-center text-sm px-[14px] py-3">
                <span class="block truncate" v-bind:class="{ 'font-normal' : !(d?.value === value) , 'font-semibold' : (d?.value === value)}">
                  {{ d.label }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped>

</style>
