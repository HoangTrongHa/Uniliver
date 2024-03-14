<script lang="ts" setup>
import {ref, onMounted, watch, reactive} from "vue";
import { useAppStore } from "~/stores/app";
import {useState} from "nuxt/app";


const store = useAppStore();
const route = useRoute();
const router = useRouter();
const filterForm = reactive({
  query: '',
  type: '',
  order: 'asc'
});

useAsyncData("fetch", async () => {
    try {
      if (!store?.header?.length) {
        await store.loadHeaderApp();
      }
    } catch (error) {
      console.error(error);
    }
});

const dropDown = ref({
  isShow: false,
  isShowMb: false,
  isShowChildrenMenuMb: false,
  isShowChildrenDropDown: false,
  item: {},
  childrenItem: {},
});

const isMenuOpen = ref(false);

// Используем watch для наблюдения за переменной counter
watch(isMenuOpen, (newValue, oldValue) => {
  if (!newValue) clearDataDropDown()
});

const currentScreen = ref();

const updateCurrentScreen = () => {
  if (process.client) {
    currentScreen.value = window.innerWidth;
    if (currentScreen.value > 1024) {
      isMenuOpen.value = false;
    }
  }
};

const showDropdown = (item: any) => {
  if (dropDown?.value?.item?.title === item?.title) {
    dropDown.value.isShow = !dropDown.value.isShow;
    if (!dropDown.value.isShow) {
      clearDataDropDown();
    }
  } else {
    clearDataDropDown();
    dropDown.value.isShow = true;
    dropDown.value.item = item;
  }
}

const showChildrenDropDown = (item: any) => {
  if (dropDown.value.childrenItem === item) {
    dropDown.value.isShowChildrenDropDown = !dropDown.value.isShowChildrenDropDown;
  } else {
    dropDown.value.isShowChildrenDropDown = true;
    dropDown.value.childrenItem = item;
  }
};


const clearDataDropDown = () => {
  dropDown.value.item = {};
  dropDown.value.childrenItem = {};
  dropDown.value.isShowMb = false;
  dropDown.value.isShow = false;
  dropDown.value.isShowChildrenMenuMb = false;
  isMenuOpen.value = false;
};

const showDropdownMobile = (item: any) => {
  dropDown.value.item = item;
  dropDown.value.isShowMb = true;
};

const showNavMobile = () => {
  if (isMenuOpen.value) {
    clearDataDropDown();
  } else {
    isMenuOpen.value = !isMenuOpen.value;
  }
};

const showDropdownMobileChildren = (item: any) => {
  dropDown.value.childrenItem = item;
  dropDown.value.isShowChildrenMenuMb = true;
};

onMounted(() => {
  updateCurrentScreen();
  window.addEventListener("resize", updateCurrentScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCurrentScreen);
});

// Watch for route changes
watch(router.currentRoute, (to, from) => {
  clearDataDropDown()
});

let isShowSearch = useState('isShowSearch',  () => false);

const showSearchField = () => {
  if (route.path !== '/search') {
    isShowSearch.value = true

    clearDataDropDown()
    if (dropDown?.value?.item?.title) {
      // showDropdown(dropDown.value.item);
      // clearDataDropDown()
    }
  }
}


const isShowSuggestion = ref(false)
const suggestions = ref([])

interface Crumb {
  path: string
  label: string
}

interface IProps {
  crumbs?: Array<Crumb>,
  hiddenWithKeyword?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  crumbs: () => [],
  hiddenWithKeyword: false
})

const searchItems = async () => {
  const { result } = await useApiFetch('static.search', {
    query: route?.query?.query,
    type: route?.query?.type || 'news',
    order: route?.query?.order || 'asc'
  })

  suggestions.value = result.result
  console.log(result.result)
}

const handleSearchData = () => {
  if ((route?.query?.query?.length || 0) > 1) {
    // filterStore.setIsShowSuggestion(false);
    router.push({ path: '/search', query: route.query });
  }
};

const chooseOptionSuggest = async (value: string) => {
  // filterStore.setIsShowSuggestion(false);
  isShowSuggestion.value = false
  // filterStore.setQuery(value);

  await replaceRoute('query', value)

  handleSearchData();
}

const onFocusSearch = () => {
  suggestions.value = []
  isShowSuggestion.value = true
  if (filterForm?.query?.length > 1 && !suggestions?.value?.length) {
    searchItems()
  }
}

const replaceRoute = async (key: string, value: string) => {
  const query = Object.assign({}, route.query);
  if (!value) delete query[key];
  else query[key] = value;

  await router.replace({
    query
  });
}

const onInputSearch = async (query: string) => {
  suggestions.value = [];

  await replaceRoute('query', query)
  if (query?.length > 1) {
    searchItems();
  }
}

const typeOptions = {
  "pdf": "pdf",
  "news": "Новости"
}

const orderOption = {
  "asc": "Старые публикации",
  "desc": "Новые публикации"
}

/*
watchEffect(() => {
  filterStore.setIsShowSearch(false)
  filterStore.setQuery('')
  if (route.path == '/search') {
    filterStore.setIsShowSearch(true)
  }
});

 */

const closeSearch = () => {
  showSearchField()
  // filterStore.setQuery('')
  router.replace({ query: {} })
}
</script>

<template>
 <div
     class="header bg-[#015EFF] w-full top-0 flex justify-between text-white z-[1000] font-montserrat-alternates text-sm"
     :class="{ relative: !isMenuOpen, fixed: isMenuOpen }"
 >
    <NuxtLink
        to="/"
        class="w-[72px] h-[72px] md:w-[90px] md:h-[90px] lg:w-[144px] lg:h-[144px] overflow-hidden"
    >
      <img class="w-full h-full object-cover" src="/image/logo.svg" alt="logo">
    </NuxtLink>
    <div class="w-[calc(100%-72px)] md:w-[calc(100%-90px)] lg:w-[calc(100%-144px)] h-[72px] md:h-[90px] lg:h-[144px] overflow-hidden">
      <!-- max width to lg -->
      <div class="flex lg:hidden w-full h-full items-center justify-end">
        <div class="hidden md:flex gap-1 items-center text-xs font-medium">
            <img
                src="/image/icon/earth.svg"
                alt="icon"
            />
            Unilever Россия
        </div>
        <NuxtLink class="hidden md:block ml-6 mr-14 underline text-xs font-medium" to="/">
            Label
        </NuxtLink>
        <CommonSearchField
            :placeholder="currentScreen > 768 ? `Поиск по сайту` : `Поиск`"
            :class="{ 'cursor-default': route.path === '/search' }"
            @click="showSearchField"
        />
        <div :class="`flex items-center justify-center w-[72px] h-[72px] md:w-[90px] md:h-[90px] p-[22px] md:p-[26px] md:ml-6 ${isMenuOpen ? `bg-[#015EFF]` : `bg-[#76DDF5]`}`">
        <button
            class="button-hamburger w-full h-full flex items-center justify-center"
            @click="showNavMobile()"
        >
            <img class="w-full h-full" :src="isMenuOpen? '/image/icon/close.svg' : '/image/icon/hamburger.svg'" alt="icon">
        </button>
        </div>
      </div>

      <!-- max width from lg -->
      <div class="hidden lg:flex flex-col justify-between w-full h-full pt-6 pr-6">
        <div class="w-full h-auto flex items-center justify-end gap-12">
            <div class="hidden md:flex gap-1 items-center text-xs font-medium">
                <img src="/image/icon/earth.svg" alt="icon">
                Unilever Россия
            </div>
            <CommonSearchField
                :placeholder="currentScreen > 768 ? 'Поиск по сайту' : 'Поиск'"
                :class="{ 'cursor-default': route.path === '/search' }"
                @click="showSearchField"
            />
        </div>
        <div class="w-full h-auto flex items-center justify-end gap-2">
          <div
            v-for="item in store.header"
            :key="item"
            class="relative cursor-pointer group h-[64px] pt-5 px-[24px] xl:px-[32px]"
            :class="{
                'bg-[#1F35C6]': item.link === dropDown.item.link && dropDown.isShow || $route.path.startsWith(item.link)
            }"
          >
              <div
                  v-if="item?.subMenu?.length > 0"
                  class="flex items-center justify-center gap-2.5 flex-nowrap"
                  @click="showDropdown(item)"
              >
                <span class="whitespace-nowrap text-sm font-medium text-white leading-4 relative group-hover:text-[#94E4F7] transition-all duration-200">
                  {{ item?.title }}
                  <span :class="`${dropDown?.item?.label === item.label && '!w-1/3 !opacity-0'}`" />
                </span>
                <div
                    :class="[
                      'mt-0.5',
                      'transition-all',
                      'duration-300',
                      dropDown?.item?.label === item?.label && '!rotate-0'
                    ]"
                >
                  <img class="w-full h-full minh-w-[10px]" src="/image/icon/arrow-down.svg" alt="icon">
                </div>
              </div>

              <NuxtLink v-else :to="item.link" class="flex items-center justify-center gap-2.5 whitespace-nowrap">
                <span class="text-sm font-medium font-montserrat-alternates-medium text-white leading-4 relative group-hover:text-[#94E4F7] transition-all duration-200">
                    {{ item.title }}
                    <span
                        class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-[#94E4F7] rounded-full opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-200"
                        :class="dropDown?.item?.label === item.label && '!w-1/3 !opacity-0'"
                    />
                </span>
              </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isMenuOpen" class="fixed w-full h-full z-[1000] top-[72px] md:top-[90px] bg-[#015EFF] py-8 px-6 text-white font-montserrat-alternates text-sm font-medium leading-4">
        <div
          v-for="item in store.header"
          :key="item"
          type="button"
          class="flex gap-1 align-center justify-start mb-4"
        >
          <div
            v-if="item.subMenu?.length > 0"
            class="flex gap-1 align-center justify-start"
            @click="showDropdownMobile(item)"
          >
            <span class="text-sm font-medium text-white leading-4 relative">
              {{ item.title }}
            </span>
            <div class="w-[16px]">
              <icons-left-icon class-name="text-[#44D2F3]" fill="#44D2F3" stroke="#44D2F3" />

            </div>
          </div>
          <NuxtLink v-else :to="item.link" class="flex items-center justify-center gap-2.5">
              <span class="text-sm font-medium text-white leading-4 relative">
                {{ item.title }}
              </span>
          </NuxtLink>
        </div>
        <div
          v-if="dropDown.isShowMb"
          class="bg-[#1F35C6] absolute w-full h-full top-0 left-0 slide-in overflow-y-auto"
        >
          <div
            class="w-full h-14 px-6 py-5 flex items-center gap-3 bg-[#015EFF]"
            @click="dropDown.isShowMb = false"
          >
            <div class="`shrink-0 w-4 h-3 p-0.5 rotate-90">
                <img class="w-full h-full" src="/image/icon/arrow-down.svg" alt="icon">
            </div>
            <span class="text-sm font-medium text-white leading-4 relative">
                Назад
            </span>
          </div>

          <h2 class="text-2xl leading-[30px] font-bold px-6 py-8">
            {{ dropDown.item.title }}
          </h2>
          <div
            v-for="item in dropDown?.item?.subMenu"
            :key="item?.label"
          >
            <div
              v-if="item?.subMenu?.length > 0"
              class="mb-3 px-6"
              @click="showDropdownMobileChildren(item)"
            >
              <div class="flex items-center gap-1">
                <span class="text-sm font-medium text-white leading-4 relative">
                  {{ item.title }}
                </span>
                <div class="w-[16px]">
                  <icons-header-icon size="16" end="#FFFFFF" />
                </div>
              </div>
            </div>
            <div v-else class="mb-3 px-6">
              <NuxtLink
                  :to="item.link"
                  class="text-sm font-medium text-white leading-4 decoration-[#77DDF5]"
                  @click="clearDataDropDown"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
            v-if="dropDown.isShowChildrenMenuMb"
            class="bg-[#001F82] absolute w-full h-full top-0 left-0 slide-in overflow-y-auto"
        >
            <div
                class="w-full h-14 px-6 py-5 flex items-center gap-3 bg-[#1F35C6]"
                @click="dropDown.isShowChildrenMenuMb = false"
            >
                <div class="`shrink-0 w-4 h-3 p-0.5 rotate-90">
                    <img class="w-full h-full" src="/image/icon/arrow-down.svg" alt="icon">
                </div>
                <span class="text-sm font-medium text-white leading-4 relative">
                    Назад
                </span>
            </div>

            <h2 class="text-2xl leading-[30px] font-bold px-6 py-8">
              {{ dropDown.childrenItem.title }}
            </h2>
            <div
                v-for="(item, key) in dropDown.childrenItem?.subMenu"
                :key="key"
            >
                <div v-if="item.link" class="mb-3 px-6">
                  <NuxtLink :to="item.link" class="text-sm font-medium text-white leading-4 text-decoration-[#77DDF5]">
                    {{ item.title }}
                  </NuxtLink>
                </div>
                <div
                  v-else
                  class="mb-3 px-6"
                  @click="showDropdownMobileChildren(item)"
                >
                    <div class="flex items-center gap-1">
                        <span class="text-sm font-medium text-white leading-4 relative">
                          {{ item.label }}
                        </span>
                        <IconsRightIcon size="16" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </Teleport>

    <!-- for desktop -->
    <div v-if="dropDown.isShow" class="hidden lg:flex absolute bg-[#1F35C6] dropdown-menu w-full top-[144px] z-40">
      <div class="w-1/2 flex justify-between pl-[56px] pt-[32px] pb-[32px]">
        <div class="w-2/5 max-w-[175px] xl:max-w-[201px] 3xl:max-w-[281px] pr-6">
          <h5 class="text-2xl font-bold leading-[29px]">
            {{ dropDown.item.title }}
          </h5>
        </div>

        <div class="w-3/5">
            <div
                class="group relative"
                v-for="(item, key) in dropDown.item.subMenu"
                :key="key"
            >
              <div
                v-if="item.subMenu?.length > 0"
                class="w-full line-height-[31px] cursor-pointer pl-2 hover:bg-blue-100"
                :class="{ 'bg-blue-100': dropDown?.childrenItem === item }"
                @click="showChildrenDropDown(item)"
              >
                <div class="flex items-center gap-1">
                  <span class="text-sm font-medium text-white leading-[31px] relative">
                    {{ item.title }}
                  </span>
                  <div class="w-[16px]">
                    <icons-header-icon size="16" end="#FFFFFF" />
                  </div>

                </div>
              </div>
              <NuxtLink v-else :to="item.link">
                <div class="w-full pl-2 hover:bg-blue-100 h-[31px] leading-[31px] transition-all duration-200 text-sm font-medium text-white text-decoration-[#77DDF5]">
                   {{ item.title }}
                </div>
              </NuxtLink>
            </div>
        </div>
      </div>
      <div class="w-1/2 flex justify-between px-[56px] py-[32px] bg-[#001F82]">
        <div class="w-2/5 max-w-[175px] xl:max-w-[201px] 3xl:max-w-[281px] pr-6">
          <h5 class="text-2xl font-bold leading-[29px]">
            {{ dropDown.childrenItem.title }}
          </h5>
        </div>
        <div class="w-3/5">
          <div
            v-for="(item, key) in dropDown.childrenItem.subMenu"
            :key="key"
            class="cursor-pointer hover:text-cyan-50 font-medium text-sm leading-[31px]"
          >
            <NuxtLink
              :to="item.link"
              class="flex items-center"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
 </div>

  <div v-if="isShowSearch && route.path !== '/search'" class="search" ref="search">
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
            @handleOutsideClick="isShowSuggestion= false"
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
</template>

<style scoped>
.z-fixed {
  position: fixed;
  z-index: 100;
}
  .slide-in {
    animation: slideIn 0.3s forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
