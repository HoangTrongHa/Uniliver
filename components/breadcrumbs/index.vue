<script setup lang="ts">

const route = useRoute()
const router = useRouter()


interface Crumb {
  path: string
  label: string
}

interface IProps {
  crumbs?: Array<Crumb>,
  hiddenWithKeyword?: boolean,
}

const props = withDefaults(defineProps<IProps>(), {
  crumbs: () => [],
  hiddenWithKeyword: false,
})

const typeOptions = {
  "pdf": "pdf",
  "news": "Новости"
}

const isShowSearch = useState('isShowSearch')
</script>

<template>
  <client-only>
    <div
        v-if="crumbs?.length && !isShowSearch"
        ref="breadcrumb"
        class="breadcrumb block"
    >
      <div class="w-full bg-blue-90 text-white text-xs gap-[12px] flex items-center px-6 sm:px-4 h-[56px] overflow-hidden">
        <button
            v-for="crumb in crumbs"
            :key="crumb.label"
            class="gap-3 hidden lg:flex"
            :class="{ 'cursor-default': !crumb?.path }"
            @click="crumb?.path && $router.push(crumb.path)"
        >
          <span
              :class="crumb.path && 'underline underline-offset-[3px] hover:text-[#94E4F7]'"
              class="whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ crumb?.label || crumb?.name }}
          </span>

          <icons-left-icon class-name="text-[#44D2F3]" v-if="crumb?.path" fill="#44D2F3" stroke="#44D2F3" />
        </button>
        <button
            v-for="(crumb, index) in [crumbs?.length && crumbs[0], crumbs?.length && crumbs[crumbs?.length - 1]]"
            :key="crumb.label"
            class="gap-3 flex lg:hidden xs:max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
            :class="{ 'cursor-default': !crumb?.path }"
            @click="crumb?.path && $router.push(crumb.path)"
        >
          <span
              :class="crumb.path && 'underline underline-offset-[3px] hover:text-[#94E4F7]'"
              class="text-sm font-montserrat-alternates-medium whitespace-nowrap overflow-hidden text-ellipsis pb-0"
          >
            {{ crumb?.label || crumb?.name }}
          </span>
          <icons-left-icon class-name="text-[#44D2F3]" v-if="crumb?.path && index === 0" fill="#44D2F3" stroke="#44D2F3" />
        </button>

      </div>
    </div>

    <!--
    <div v-if="isShowSearch" class="search" ref="search">
      <div>
        <div
            class="w-full bg-blue-90 max-h-[84px] xs:max-h-[108px] py-5 px-6 flex justify-between items-center px-0 xs:px-4 xs:py-8 md:px-4 lg:px-5 xl:px-0"
        >
          <CommonFilterNewsBox
              ref="filterBoxRef"
              :modelValue="route?.query?.query"
              @handleFocus="onFocusSearch"
              @keydown.enter="handleSearchData"
              @update:modelValue="onInputSearch"
              @handleSearchData="handleSearchData"
              @handleOutsideClick="handleOutsideClick"
              class="relative h-[44px] xl:max-w-[878px] lg:max-w-[848px] custom-screen-1440 mx-auto"
          >
            <div class="absolute w-full z-[1000]">
              <div class="bg-white" v-if="isShowSuggestion">
                <ul class="bg-white max-h-[500px] overflow-y-auto" v-if="suggestions?.length">
                  <li
                      v-for="item in suggestions"
                      :key="item.id"
                      class="py-[8px] px-[14px] cursor-pointer text-blue-100 hover:bg-[#015EFF1A] font-montserrat-alternates-medium font-medium"
                      @click="chooseOptionSuggest(item?.name)"
                  >
                    {{ item?.name }}
                  </li>
                </ul>
              </div>
            </div>
          </CommonFilterNewsBox>
          <div
              class="p-[14px] xl:mr-6 lg:block hidden cursor-pointer bg-blue-90 hover:bg-blue-100 transition-all duration-200"
              @click="isShowSearch = false"
          >
            <img class="w-4" src="/image/icon/clear-search.svg" alt="Закрыть поиск" width="16" height="16"/>
          </div>
        </div>
      </div>
    </div>
    -->
  </client-only>
</template>

<style scoped>
@media (min-width: 1440px) and (max-width: 1535px) {
  .custom-screen-1440 {
    margin-left: 281px;
  }
}
</style>
