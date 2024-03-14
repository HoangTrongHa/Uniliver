<script setup>
import useAsset from "~/helpers/useAsset";
import {computed, ref} from "vue";


const route = useRoute()
const router = useRouter()

const countQueryParams = computed(() => {
  return Object.keys(route?.query)?.length
})

let dataPage = ref({});
let textSearch = ref(route?.query?.query || '');


const options = {
  type: {
    pdf: "PDF",
    news: "Новости"
  },
  order: {
    asc: "Старые публикации",
    desc: "Новые публикации"
  }
}

const types = [
  {
    value: "pdf",
    label: "PDF"
  },
  {
    value: "news",
    label: "Новости"
  }
]
const orders = [
  {
    value: "asc",
    label: "Старые публикации"
  },
  {
    value: "desc",
    label: "Новые публикации"
  }
]

const isLoading = ref(false)
const isShowAll = ref(false)
const isShowSuggestion = ref(false)
const suggestions = ref([])


const replaceRoute = async (key, value) => {
  const query = await Object.assign({}, route.query);
  if (!value) delete query[key];
  else query[key] = value

  console.log('query', query)
  await router.replace({
    query
  });
}

const setNullFormByKey = (key, value) => {
  // filterStore.setFormByKey(key, value)
  replaceRoute(key, value)

  searchItems()
}

const setNullQuery = () => {
  router.replace({
    query: {}
  });
}

const handleSearchData = () => {
  if (route?.query?.query?.length > 1) {
    // filterStore.setIsShowSuggestion(false);
    if (route.path === '/search') {
      searchItems(false)
    } else {
      router.push({ path: '/search', query: route.query });
    }
  }
};

const chooseOptionSuggest = async item => {
  isShowSuggestion.value = false

  await replaceRoute('query', item.name)
  // filterStore.setQuery(value);
  searchItems(false)
}

const onFocusSearch = () => {
  suggestions.value = []
  isShowSuggestion.value = true
  if (countQueryParams.value > 1 && !suggestions?.value?.length) {
    searchItems()
  }
}

const onInputSearch = async query => {
  suggestions.value = [];
  await replaceRoute('query', query)
  searchItems()
}

const typeOptions = {
  "pdf": "pdf",
  "news": "Новости"
}

const orderOption = {
  "asc": "Старые публикации",
  "desc": "Новые публикации"
}

const searchItems = async (dynamic = true) => {
  try {
    if (!dynamic) isLoading.value = true
    const response = await useApiFetch('static.search', {
      query: route?.query?.query,
      type: route.query?.type || 'news',
      order: route.query?.order || 'asc'
    })

    if (dynamic) {
      suggestions.value = response?.result?.result
    } else {
      dataPage.value = response?.result
      textSearch.value = route?.query?.query
    }
    isShowSuggestion.value = Boolean(dynamic)

    useHead(response?.seo);
    isLoading.value = false;
  } catch (e) {
    isLoading.value = false;
    console.error(e);
  }
}

useAsyncData('fetch', async () => {
  await searchItems(false)
})

</script>

<template>
    <div class="font-montserrat-alternates-medium">
        <Breadcrumbs :crumbs="dataPage.breadcrumbs || [
            {
              name: 'Главная',
              path: '/'
            },
            {
              name: 'Поиск',
            }
          ]"
        />

      <div class="w-full bg-blue-90 text-white text-sm lg:pt-5 py-8 px-4 lg:px-14">
        <div class="flex flex-wrap lg:flex-nowrap items-end gap-6 lg:gap-[18px]">
          <div class="w-full lg:flex-1 lg:w-[710px]">
            <CommonFilterNewsBox
                ref="filterBoxRef"
                :modelValue="route?.query?.query || ''"
                @handleFocus="onFocusSearch"
                @keydown.enter="searchItems(false)"
                @update:modelValue="onInputSearch"
                @handleSearchData="searchItems(false)"
                @handleOutsideClick="isShowSuggestion = false"
            >
              <div v-if="isShowSuggestion" class="absolute w-full z-1000">
                <div class="bg-white">
                  <ul class="bg-white max-h-[500px] overflow-y-auto" v-if="suggestions?.length">
                    <li class="py-[8px] px-[14px] hover:bg-[#015EFF1A] cursor-pointer text-blue-100"
                        v-for="item in suggestions" :key="item.id" @click="chooseOptionSuggest(item)">
                      {{ item?.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </CommonFilterNewsBox>
            <div v-if="countQueryParams" class="block lg:hidden mt-6">
              <div class="flex flex-col gap-3">
                <span class="text-sm font-medium text-white leading-[140%]">Выбранные фильтры:</span>
                <div class="flex items-center gap-5">
                  <div
                      v-if="route?.query?.query?.length"
                      class="text-xs flex items-center gap-1 font-medium text-yellow-70 cursor-pointer"
                      @click="setNullFormByKey('query', null)"
                  >
                    <span>{{ route?.query?.query }}</span>
                    <button class="min-w-[12px]">
                      <img :src="useAsset('icons/xmartYellow.svg')" width="12" alt="XmartYellow" />
                    </button>
                  </div>
                  <div v-if="route?.query?.type" @click="setNullFormByKey('type', null)"
                       class="text-xs flex items-center gap-1 font-medium text-yellow-70 cursor-pointer">
                    <span>{{ typeOptions[route?.query?.type] }}</span>
                    <button class="min-w-[12px]">
                      <img :src="useAsset('icons/xmartYellow.svg')" alt="XmartYellow"/>
                    </button>
                  </div>
                  <div v-if="route?.query?.order" @click="setNullFormByKey('order', null)"
                       class="text-xs flex items-center gap-1 font-medium text-yellow-70 cursor-pointer">
                    <span>{{ route?.query?.order }}</span>
                    <button>
                      <img :src="useAsset('icons/xmartYellow.svg')" alt="XmartYellow"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center flex-wrap lg:flex-nowrap gap-6 lg:gap-10 w-full lg:w-[600px]">
            <div class="flex flex-col w-full lg:w-1/2">
              <p class="text-base leading-6 font-semibold mb-3 lg:mb-[14px]">
                Фильтр
              </p>
              <FormInputSelect
                  :options="types"
                  :value="route?.query?.type || 'news'"
                  placeholder="Все категории"
                  @handleSelect="selected => setNullFormByKey('type', selected)"
              />
            </div>

            <div class="flex flex-col w-full lg:w-1/2">
              <p class="text-base leading-6 font-semibold mb-3 lg:mb-[14px]">
                Сортировка
              </p>

              <FormInputSelect
                  :options="orders"
                  :value="route?.query?.order || 'desc'"
                  placeholder="Новые публикации"
                  @handleSelect="selected => setNullFormByKey('order', selected)"
              />
            </div>
          </div>
        </div>

        <div class="hidden lg:block mt-5">
          <div class="flex flex-col gap-3">
            <span
                v-if="countQueryParams"
                class="text-sm font-medium text-white leading-[140%]"
            >
              Выбранные фильтры:
            </span>
            <div class="flex items-center gap-5">

              <div
                  v-if="countQueryParams > 1"
                  class="text-xs flex items-center gap-1 font-medium text-yellow-70 cursor-pointer"
                  @click="setNullQuery"
              >
                <span>Очистить все фильтры</span>
                <button>
                  <img :src="useAsset('icons/xmartYellow.svg')" alt="XmartYellow" />
                </button>
              </div>
              <div
                  v-for="(value, key) in $route?.query"
                  class="text-xs flex items-center gap-1 font-medium text-yellow-70 cursor-pointer"
                  @click="setNullFormByKey(key, null)"
              >
                <span>{{ options?.[key]?.[value] || value }}</span>
                <button class="min-w-[12px]">
                  <img :src="useAsset('icons/xmartYellow.svg')" width="12" alt="XmartYellow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        <!-- Content -->
        <div class="w-full pt-8 lg:pt-10 pb-14 lg:pb-18">
            <div v-if="isLoading" class="sm:py-[56px] py-[12px] sm:flex block justify-center items-center mb-[2rem]">
                <div  class="md:w-[768px] w-auto rounded-[24px] md:p-[24px] py-[24px] px-[16px]">
                    <div
                        class="flex justify-center items-center flex-col text-center md:mb-[32px] mb-[20px]"
                    >
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <section v-else class="w-full px-4 lg:px-14">
                <div class="w-full mb-5 lg:mb-6">
                    <h5
                        v-if="textSearch?.length"
                        class="text-2xl text-blue-80 font-montserrat-alternates-bold leading-7"
                    >
                        По запросу “{{ textSearch }}” показано {{ dataPage?.result?.length || 0 }} результатов поиска:
                    </h5>
                </div>
                <div class="flex flex-col gap-8">
                    <!-- Card Item Search -->
                    <CommonCardSearch
                        v-for="(item, index) in dataPage?.result?.slice(0, isShowAll ? dataPage?.result?.length : 9)"
                        :key="index"
                        :data="item"
                    />
                </div>
                <button
                    v-if="dataPage?.result?.length >= 9 && !isShowAll"
                    @click="isShowAll = true"
                    class="py-3 px-[14px] bg-cyan-50 flex justify-center items-center gap-[10px] h-11 mt-8 w-full lg:w-auto hover:bg-[#0CC5F0] transition duration-300 ease-in-out"
                >
                    <span class="text-blue-80 font-montserrat-alternates-medium font-medium text-sm">
                      Показать больше
                    </span>
                    <span>
                        <img :src="useAsset('icons/arrow-block-down-dark-blue.svg')" alt="Arrow down" />
                    </span>
                </button>
            </section>
        </div>
    </div>
</template>
