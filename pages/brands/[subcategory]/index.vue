<script setup>
const route = useRoute()
const dataPage = reactive({})
let dataCardPage = reactive({})


useAsyncData('fetch', async () => {
    try {
        dataPage.value = await useApiFetch('brands.section', {code: route.params.subcategory});
        useHead(dataPage.value?.result?.seo)
        dataCardPage.value = await useApiFetch('news.main');
    } catch (e) {
        console.error(e);
    }
})
</script>
<template>
    <div v-if="dataPage.value" class="font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage.value?.result?.breadcrumbs || []" />
        <section class="sm:px-14 px-4 sm:py-18 py-[56px]">
            <div v-html="dataPage.value?.result?.section?.description?.replace(/<h1>/g, `<h1 class='text-blue-80 sm:text-[52px] text-[32px] font-montserrat-alternates-bold mb-6 flex leading-[normal]'>`)
                    .replace(/<p>/g, `<p class='text-base text-black-40 leading-[24px] font-montserrat-alternates-medium sm:w-[600px] w-auto sm:mb-[40px] mb-[56px]'>`)"></div>
            <div class="grid sm:grid-cols-4 grid-cols-2 sm:gap-6 gap-3 sm:gap-y-10 gap-y-[32px]">
              <card
                  v-for="item in dataPage?.value?.result?.elementList"
                  :key="item"
                  :image="item.image"
                  :link="`/brands/${item.section_code}/${item.code}`"
                  :title="item.name"
                  title-class="leading-[24px] font-[600]"
                  :info="item.section"
                  info-class="leading-[normal] md:-mt-0.5 -mt-1 md:w-auto w-[160px] font-medium font-montserrat-alternates-medium"
                  image-class="w-full h-auto"
                  :limit-row-info="3"
              />
            </div>
        </section>
        <section class="sm:px-14 px-4 sm:py-[40px] py-10 bg-green-20">
            <h1 class="text-2xl text-blue-80 leading-[normal] font-montserrat-alternates-bold sm:mb-[40px] mb-[24px] z-10">
                Актуальные новости
            </h1>

            <div
                v-if="dataCardPage?.value?.result?.news?.length"
                class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-3 sm:gap-y-6 gap-y-[26px]"
            >
              <CommonCardNews
                  v-for="item in dataCardPage?.value?.result?.news.slice(dataCardPage?.value?.result?.news?.length > 3 ? -4 : -1 * dataCardPage?.value?.result?.news?.length)"
                  :key="item.id"
                  :image="item?.image || 'null'"
                  :title="item.name"
                  :postTime="item?.active_from"
                  :postedAgo="item?.read_time + ' минуты'"
                  :link="item?.page_url"
                  :limit-row-title="3"
              />
            </div>
            <div class="mt-[32px] flex justify-center">
                <CommonButton />
            </div>
        </section>
    </div>
</template>