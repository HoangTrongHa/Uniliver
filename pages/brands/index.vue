<script setup>
const listDataFetch = ref();
const seo = ref({});
const countShow = ref(10)

const showMore = async () => {
  countShow.value += 10
  if (countShow.value < listDataFetch?.value?.result?.elementList?.length) {
    return
  }

  countShow.value = listDataFetch?.value?.result?.elementList?.length || 0
}

useAsyncData('fetch', async () => {
    try {
        listDataFetch.value = await useApiFetch('brands.main');

        seo.value = listDataFetch?.value?.result?.seo || {
            title: 'Бренды Unilever'
        };
        useHead(seo.value);
    } catch (e) {
        console.error(e);
    }
});

</script>

<template>
    <div v-if="listDataFetch" class="font-montserrat-alternates">
        <breadcrumbs :crumbs="listDataFetch?.result?.breadcrumbs || []" />

        <h1 class="hidden">{{ seo?.title }}</h1>

        <div class="block md:flex text-white font-montserrat-alternates md:mb-[40px] mb-[56px] h-auto">
            <div
                v-for="block in listDataFetch?.result?.element?.blocks"
                :key="block"
                class="w-full"
            >
                <div
                    v-for="banner in block?.elementList"
                    :key="banner"
                    class="relative w-full"
                >
                    <img :src="banner.image" alt="image" class="hidden md:block w-full">
                    <div class="absolute top-0 left-0 right-0 bottom-0 mt-[10rem] md:mt-5 lg:mt-0 md:pt-0 md:py-40 ml-[3%] md:ml-[12%] p-[2%] lg:p-[67px] px-4">
                      <h1 class="text-5xl font-montserrat-alternates-bold mb-5 lg:mb-8">
                        {{ banner.name }}
                      </h1>

                      <h2 v-html="banner.text" class="font-montserrat-alternates-medium font-semibold text-[1rem] max-w-[343px] md:max-w-[580px] h-auto" />
                    </div>

                    <img :src="banner.mobile_image" alt="image" class="block md:hidden h-auto w-full">
                </div>
            </div>
        </div>

        <div class="sm:px-14 px-4 sm:mb-[72px] mb-[56px]">
            <div
                class="mx-auto hidden md:grid md:grid-cols-4 lg:gap-6 md:gap-4 gap-3 md:gap-y-10 gap-y-8"
            >
                <card
                    v-for="item in listDataFetch?.result?.elementList?.slice(0, listDataFetch?.result?.elementList?.length)"
                    :key="item"
                    :image="item.image"
                    :link="`/brands/${item.section_code}/${item.code}`"
                    :title="item.name"
                    title-class="leading-[24px] font-semibold"
                    :info="item.section"
                    info-class="leading-[normal] md:-mt-0.5 -mt-1 md:w-auto w-[160px] font-medium font-montserrat-alternates-medium"
                    image-class="w-full h-auto"
                    :limit-row-info="3"
                />
            </div>

          <div class="mx-auto grid grid-cols-2 md:hidden lg:gap-6 md:gap-4 gap-3 md:gap-y-10 gap-y-[32px]">
            <card
                v-for="item in listDataFetch?.result?.elementList?.slice(0, countShow)"
                :key="item"
                :image="item.image"
                :link="`/brands/${item.section_code}/${item.code}`"
                :title="item.name"
                title-class="leading-[24px] font-semibold"
                :info="item.section"
                info-class="leading-[normal] md:-mt-0.5 -mt-1 md:w-auto w-[160px] font-medium font-montserrat-alternates-medium"
                image-class="w-full h-auto"
                :limit-row-info="3"
            />
          </div>

            <div>
                <button
                  v-if="countShow < listDataFetch?.result?.elementList?.length"
                  class="sm:hidden flex gap-2 items-center justify-center py-[12px] px-[14px] bg-cyan-50 text-blue-80 mt-[32px] w-full"
                  @click="showMore"
                >
                    Показать еще
                  <IconsLeftIcon class="rotate-90" />
                </button>
            </div>
        </div>
    </div>
    <ClientOnly v-else>
      <div class="flex justify-center items-center">
        Can't connect database
      </div>
    </ClientOnly>
</template>
