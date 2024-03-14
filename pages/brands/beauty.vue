<script setup>
import useAsset from "@/helpers/useAsset"
const dataPage = reactive({})
useAsyncData('fetch', async () => {
    try {
        dataPage.value = await useApiFetch('brands.section', {code: 'beauty-wellbeing'});
        useHead(dataPage.value?.result?.seo)
    } catch (e) {
        console.error(e);
    }
})

const categoryOptions = {
    1: "bg-[#44D2F3]",
    2: "bg-blue-90"
}

const posts = [
    {
        id: 1,
        image: useAsset('images/about/post-1.png'),
        title: "Компания Unilever представила результаты деятельности за 2021 год",
        date: "2023-08-14 18:58:20",
        categoryId: 1,
        categoryName: "Пресс-релиз",
    },
    {
        id: 2,
        image: useAsset('images/brands/subcategory/Img.png'),
        title: "Компания Unilever представила результаты деятельности за 2021 год",
        date: "2023-08-14 18:58:20",
        categoryId: 2,
        categoryName: "Новости",
    },
    {
        id: 3,
        image: useAsset('images/brands/subcategory/Img-1.png'),
        title: "Компания Unilever представила результаты деятельности за 2021 год",
        date: "2023-08-14 18:58:20",
        categoryId: 2,
        categoryName: "Новости",
    },
    {
        id: 4,
        image: useAsset('images/brands/subcategory/Img-2.png'),
        title: "Компания Unilever представила результаты деятельности за 2021 год",
        date: "2023-08-14 18:58:20",
        categoryId: 1,
        categoryName: "Пресс-релиз",
    }
]
</script>
<template>
    <div class="font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage.value?.result?.breadcrumbs || []" />
        <section class="sm:px-14 px-4 sm:py-18 py-[56px]">
            <div v-html="dataPage.value?.result?.section?.description?.replace(/<h1>/g, `<h1 class='text-blue-80 sm:text-[52px] text-[32px] font-montserrat-alternates-bold mb-6 flex leading-[normal]'>`)
                    .replace(/<p>/g, `<p class='text-base text-black-40 leading-[24px] font-montserrat-alternates-medium sm:w-[600px] w-auto sm:mb-[40px] mb-[56px]'>`)"></div>
            <div class="grid sm:grid-cols-4 grid-cols-2 sm:gap-6 gap-3 sm:gap-y-10 gap-y-[32px]">
                <card v-bind="item" v-for="item in dataPage.value?.result?.elementList" v-bind:key="item.name" v-bind:image="item.image"
                    v-bind:title="item.name" title-class="leading-[24px] font-[600]" info=""
                    info-class="leading-[normal] sm:-mt-0.5 -mt-1 sm:w-auto w-[160px]"
                    image-class="sm:w-full sm:h-auto w-[164px] h-[100px]" v-bind:limit-row-info="3"
                    v-bind:link="`/brands/${item.section_code}/${item.code}`" />
            </div>
        </section>
        <section class="sm:px-14 px-4 sm:py-[40px] py-10 bg-green-20 relative">
            <h1 class="text-2xl text-blue-80 leading-[normal] font-montserrat-alternates-bold sm:mb-[40px] mb-[24px] z-10">
                Актуальные новости
            </h1>
            <div
                class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-3 sm:gap-y-6 gap-y-[26px]">
                <card-time v-bind="item" v-for="item in posts" class="z-10 relative" v-bind:key="item.title" v-bind:image="item.image"
                    :title="item.title" title-class="leading-[24px] sm:mt-[15px] mt-0 font-[600]" v-bind:date="item.date"
                    image-class="sm:w-full sm:h-auto w-[343px] h-[200px]" v-bind:limit-row-title="3">
                    <span class="absolute top-0 left-0 p-[8px] text-white text-xs leading-[normal] sm:hidden block"
                        v-bind:class="categoryOptions[item.categoryId]">
                        {{ item.categoryName }}
                    </span>
                </card-time>
            </div>
            <div class="absolute top-0 bottom-0 left-0 right-0">
                <img class="w-full h-full" v-bind:src="useAsset('images/brands/subcategory/Vector_bg.png')"
                    v-bind:alt="useAsset('images/brands/subcategory/Vector_bg.png')">
            </div>
            <div class="sm:mt-[32px] mt-[32px] flex justify-center">
              <CommonButton />
            </div>
        </section>
    </div>
</template>