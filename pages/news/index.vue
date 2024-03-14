<script setup lang="ts">
import {debouncedFunction} from "~/helpers/debounce";

const {debounce} = debouncedFunction()
useHead({
  title: "Новости Unilever"
})

const showFilter = ref(false)

const orderByOptions = [
  {value: "DESC", label: "Новые публикации"},
  {value: "ASC", label: "Старые публикации"}
]
const monthOptions = [
  {value: '', label: "Месяц", en: ''},
  {value: 1, label: "январь", en: 'January'},
  {value: 2, label: "февраль", en: 'February'},
  {value: 3, label: "март", en: 'March'},
  {value: 4, label: "апрель", en: 'April'},
  {value: 5, label: "май", en: 'May'},
  {value: 6, label: "июнь", en: 'June'},
  {value: 7, label: "июль", en: 'July'},
  {value: 8, label: "август", en: 'August'},
  {value: 9, label: "сентябрь", en: 'September'},
  {value: 10, label: "октябрь", en: 'October'},
  {value: 11, label: "ноябрь", en: 'November'},
  {value: 12, label: "декабрь", en: 'December'},
]
const now = (new Date()).getFullYear();
const yearOptions = Array.from(
    {length: now - 1970 + 1},
    (_, index) => ({value: now - index, label: `${now - index}`})
);
yearOptions.unshift({value: "", label: "Год"});

const listDataFetch = ref();
const listCard = ref();
const keyWord = ref('');
const orderBy = ref({value: 'DESC', label: 'Новые публикации'});
const startMonth = ref({});
const startYear = ref({});
const endMonth = ref({});
const endYear = ref({});
const currentScreen = ref();
const isShowMore = ref(false);
const isClickShowMore = ref(false);

const isShowResultSearch = computed(() => {
  return keyWord.value.length > 0
})
const renderFromDate = computed(() => {
  const currentDate = new Date();
  if (startMonth.value?.value) {
    return `${startMonth.value?.value < 10 ? '0' : ''}${startMonth.value?.value}.${startYear.value?.value || currentDate.getFullYear()}`
  }
  return null
})

const renderToDate = computed(() => {
  const currentDate = new Date();
  if (endMonth.value?.value) {
    return `${endMonth.value.value < 10 ? '0' : ''}${endMonth.value?.value}.${endYear.value?.value || currentDate.getFullYear()}`
  }
  return null
})

const checkDate = () => {
  let startTimeMonth
  let startTimeYear
  let endTimeMonth
  let endTimeYear
  startTimeYear = startYear.value
  startTimeMonth = startMonth.value
  endTimeYear = endYear.value
  endTimeMonth = endMonth.value
  if (startYear.value?.value > endYear.value?.value) {
    endYear.value = startTimeYear
    endMonth.value = startTimeMonth
    startYear.value = endTimeYear
    startMonth.value = endTimeMonth
  } else {
    if (startYear.value?.value === endYear.value?.value) {
      if (startMonth.value.value > endMonth.value?.value) {
        endMonth.value = startTimeMonth
        startMonth.value = endTimeMonth
      }
    }
  }

}
const initSortData = () => {
  listDataFetch.value.result.news = listDataFetch.value.result.news?.map((item: any) => {
    const time = monthOptions.find((month) => item.active_from.includes(month.label))
    const dateObject = new Date(item.active_from.replace(time?.label, time?.en));
    item['time_en'] = dateObject.getTime()
    return item
  })
  sortData()
}

const sortData = () => {
  if (orderBy.value?.value === 'DESC') {
    listDataFetch.value.result.news = listDataFetch.value.result.news?.sort((item1: any, item2: any) => item2.time_en - item1.time_en)
  } else {
    listDataFetch.value.result.news = listDataFetch.value.result.news?.sort((item1: any, item2: any) => item1.time_en - item2.time_en)
  }
}

const handleFetch = () => {
  useAsyncData("fetch", async () => {
    listDataFetch.value = await useApiFetch('news.main');
    initSortData()
    updateCurrentScreen();
  });
}

handleFetch()

const setDataListCard = (number: number, isFilter: boolean) => {
  if (!isFilter) {
    if (listDataFetch.value?.result?.news.length > 0) {
      isShowMore.value = listDataFetch.value?.result?.news.length > number
      listCard.value = listDataFetch.value.result?.news.slice(0, number);

    } else {
      listCard.value = []
      isShowMore.value = false
    }
  } else {
    isShowMore.value = listCard.value.length > number
    listCard.value = listCard.value.slice(0, number);
  }
}

const updateCurrentScreen = (isFilter = false) => {
  if (process.client) {
    currentScreen.value = window.innerWidth;
    if (currentScreen.value < 768) {
      setDataListCard(4, isFilter);
    } else {
      setDataListCard(12, isFilter);
    }
  }
};

const showMore = () => {
  isClickShowMore.value = !isClickShowMore.value;
  if (!isClickShowMore.value) {
    updateCurrentScreen();
  } else {
    listCard.value = listDataFetch.value.result?.news;
  }
}

const hasEndValues = computed(() => {
  if (Boolean(startMonth.value?.value) && Boolean(startYear.value.value) && Boolean(endMonth.value.value) && Boolean(endYear.value.value)) {
    return `${startMonth.value?.label} ${startYear.value.label} - ${endMonth.value.label} ${endYear.value.label}`;
  }
  return false;
})

const clearDataFilter = (clearAll: boolean = true) => {
  startMonth.value = {};
  startYear.value = {};
  endMonth.value = {};
  endYear.value = {};
}

const fetchSearchData = () => {
  useAsyncData("fetch", async () => {
    let queryParams = {}
    if (keyWord.value) {
      queryParams.query = keyWord.value;
    }

    if (renderFromDate.value) {
      queryParams.date_from = renderFromDate.value;
    }

    if (renderToDate.value) {
      queryParams.date_to = renderToDate.value;
    }
    const res: any = await useApiFetch('news.search', queryParams)
    if (res !== null) {
      res.result['news'] = res.result?.elementList
      listDataFetch.value = res
      initSortData()
    } else {
      listDataFetch.value = null
    }
    updateCurrentScreen();
  })
}
const handleSearchData = debounce(() => {
  if (!keyWord?.value?.length && !renderFromDate?.value && !renderToDate?.value) {
    handleFetch()
  } else {
    fetchSearchData()
  }
}, 300)

watch(() => [renderToDate.value, renderFromDate.value, keyWord.value], () => {
  handleSearchData()
  if (renderFromDate.value && renderToDate.value) {
    checkDate()
  }
})
const lengthData = computed(() => {
  return listDataFetch.value.result.news.length > 12
})

watch(() => orderBy.value, () => {
  sortData()
  updateCurrentScreen();
})
</script>
<template>
  <div class="font-montserrat-alternates">
    <breadcrumbs :crumbs="listDataFetch?.result?.breadcrumbs || []"/>
    <!-- start banner -->
    <div class="w-full h-auto bg-white">
      <div class="px-4 md:px-14 pt-14 md:pt-18 mb-8 md:mb-10">
        <h1 class="text-[32px] leading-10 md:text-[52px] font-montserrat-alternates-bold md:leading-[64px] text-blue-80 mb-4 md:mb-6">
          {{ listDataFetch?.result?.element?.name }}
        </h1>
        <div class="max-w-[600px] pr-2">
          <h6 class="font-montserrat-alternates-medium text-base text-[#858380]">
            {{ listDataFetch?.result?.element?.text }}
          </h6>
        </div>
      </div>
    </div>

    <!-- start filter form -->
    <div class="w-full h-auto bg-blue-90 text-white">
      <div class="w-full h-auto px-4 md:px-14 pt-8 md:pt-5">
        <div class="w-full h-auto flex flex-col md:flex-row">
          <div class="w-full md:pr-3 md:mb-0">
            <div class="w-full h-auto pt-0 md:pt-9 mb-6 md:mb-12">
              <CommonFilterNewsBox v-model="keyWord" />
            </div>
            <div class="w-full h-11 mb-6 md:hidden">
              <button
                class="w-full h-full bg-cyan-50 text-blue-90 text-sm font-medium flex items-center justify-center"
                @click="showFilter = !showFilter"
              >
                {{ showFilter ? 'Скрыть фильтр' : 'Показать фильтр' }}
              </button>
            </div>
            <div
                v-if="startMonth.value || startYear.value || endMonth.value || endYear.value"
                class="font-medium"
            >
              <p>Выбранные фильтры: </p>
              <div class="inline-flex">
                <div
                    @click="clearDataFilter"
                    class="inline-flex items-center mr-3 text-xs text-yellow-70"
                >
                    <span class="mr-1">
                        Очистить все фильтры
                    </span>
                  <button
                      class="w-3 h-3 cursor-pointer"
                  >
                    <img src="/image/icon/remove.svg" alt="icon">
                  </button>
                </div>
                <div v-if="hasEndValues" class="inline-flex items-center mr-3 text-xs text-yellow-70">
                                    <span class="mr-1">
                                        {{ hasEndValues }}
                                    </span>
                  <button @click="clearDataFilter(false)" class="w-3 h-3 cursor-pointer">
                    <img src="/image/icon/remove.svg" alt="icon">
                  </button>
                </div>
                <div v-if="startMonth.value && !hasEndValues"
                     class="inline-flex items-center mr-3 text-xs text-yellow-70">
                                    <span class="mr-1">
                                        {{ startMonth.label }}
                                    </span>
                  <button
                      @click="() => { startMonth = {} }"
                      class="w-3 h-3 cursor-pointer"
                  >
                    <img src="/image/icon/remove.svg" alt="icon">
                  </button>
                </div>
                <div
                    v-if="startYear.value && !hasEndValues"
                    class="inline-flex items-center mr-3 text-xs text-yellow-70"
                >
                                    <span class="mr-1">
                                        {{ startYear.label }}
                                    </span>
                  <button
                      @click="() => { startYear = {} }"
                      class="w-3 h-3 cursor-pointer"
                  >
                    <img src="/image/icon/remove.svg" alt="icon">
                  </button>
                </div>
                <div v-if="endMonth.value && !hasEndValues"
                     class="inline-flex items-center mr-3 text-xs text-yellow-70">
                                    <span class="mr-1">
                                        {{ endMonth.label }}
                                    </span>
                  <button
                      @click="() => { endMonth = {} }"
                      class="w-3 h-3 cursor-pointer"
                  >
                    <img src="/image/icon/remove.svg" alt="icon">
                  </button>
                </div>
                <div v-if="endYear.value && !hasEndValues" class="inline-flex items-center mr-3 text-xs text-yellow-70">
                                    <span class="mr-1">
                                        {{ endYear.label }}
                                    </span>
                  <button
                      @click="() => { endYear = {} }"
                      class="w-3 h-3 cursor-pointer"
                  >
                    <img src="/image/icon/remove.svg" alt="icon">
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
              v-if="showFilter || currentScreen >= 768"
              class="w-full mb-8"
          >
            <div class="w-full h-auto flex flex-col">
              <div class="w-full h-auto mb-6 md:mb-5">
                <p class="text-base font-semibold font-montserrat-alternates-medium mb-3">
                  Сортировка
                </p>
                <CommonSelectField
                    id="orderBy"
                    :data="orderByOptions"
                    :value="orderBy.value"
                    placeholder="Новые публикации"
                    @handleSelect="(selected) => orderBy = selected"
                />
              </div>

              <div class="w-full h-auto flex flex-wrap">
                <div class="w-full pr-0 mb-6 md:mb-0 md:w-1/2 md:pr-2">
                  <p class="text-base font-semibold font-montserrat-alternates-medium mb-3">
                    Дата от
                  </p>
                  <div class="w-full auto flex items-center gap-3">
                    <CommonSelectField
                        id="startMonth"
                        :data="monthOptions"
                        :value="startMonth.value"
                        placeholder="Месяц"
                        @handleSelect="(selected) => startMonth = selected"
                    />
                    <CommonSelectField
                        id="startYear"
                        :data="yearOptions"
                        :value="startYear.value"
                        placeholder="Год"
                        @handleSelect="(selected) => startYear = selected"
                    />
                  </div>
                </div>
                <div class="w-full pl-0 md:w-1/2 md:pl-2">
                  <p class="text-base font-semibold font-montserrat-alternates-medium mb-3">
                    Дата до
                  </p>
                  <div class="w-full auto flex items-center gap-3">
                    <CommonSelectField
                        id="endMonth"
                        :data="monthOptions"
                        :value="endMonth.value"
                        placeholder="Месяц"
                        @handleSelect="(selected) => endMonth = selected"
                    />
                    <CommonSelectField
                        id="endYear"
                        :data="yearOptions"
                        :value="endYear.value"
                        placeholder="Год"
                        @handleSelect="(selected) => endYear = selected"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- end filter form -->

    <!-- start result news -->
    <div class="px-4 md:px-14 pt-8 md:pt-10 pb-16 md:pb-18">
      <h5 v-if="isShowResultSearch" class="text-blue-80 text-2xl leading-8 font-bold mb-5 md:mb-6">
        {{
          'По запросу “ ' + keyWord + '” показано ' + (listDataFetch?.result?.news?.length || 0) + ' результатов поиска:'
        }}
      </h5>
      <h5 v-if="!isShowResultSearch && (renderToDate || renderFromDate) && !listDataFetch?.result?.news.length"
          class="text-blue-80 text-2xl leading-8 font-bold mb-5 md:mb-6">
        0 результатов поиска
      </h5>
      <div>
        <div class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-0 md:gap-x-6 gap-y-8 md:gap-y-10">
          <CardTime
              v-for="item in listCard"
              :imageClass="'w-full max-h-[276px] min-h-[200px] object-contain'"
              :titleClass="'leading-6'"
              :image="item.image"
              :title="item.name"
              :date="item.active_from"
              :isNotFormatDate="true"
              :readTime="String(item.read_time)"
              :limitRowTitle="3"
              :link="item.page_url"
          />
        </div>
      </div>

      <div class="w-full h-auto flex items-center justify-center mt-8 md:mt-10">
        <button
            v-if="isShowMore && lengthData"
            class="text-sm gap-2.5 py-[12px] px-[14px] flex items-center justify-center bg-cyan-50 text-blue-80 font-medium font-montserrat-alternates-medium cursor-pointer hover:bg-[#0CC5F0] transition duration-300 ease-in-out"
            @click="showMore()"
        >
          {{ isClickShowMore ? `Показать меньше` : `Показать больше` }}

          <img src="/image/icon/arrow-blur-down.svg" alt="Arrow down" :class="{ 'rotate-180': isClickShowMore }" />
        </button>
      </div>
    </div>
    <!-- end result news -->

  </div>
</template>
