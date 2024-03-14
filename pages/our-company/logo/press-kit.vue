<script setup>
import useAsset from "@/helpers/useAsset"

useHead({
    title: "Пресс-кит"
})

const data1 = [
    {
        image: useAsset('images/about/press-kit/Img.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-1.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-2.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-3.png')
    },
]

const data1Sm = [
    {
        image: useAsset('images/about/press-kit/Img-sm.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-1-sm.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-2-sm.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-3-sm.png')
    },
]

const data2 = [
    {
        image: useAsset('images/about/press-kit/Img-4.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-5.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-6.png')
    },
]

const data2Sm = [
    {
        image: useAsset('images/about/press-kit/Img-4-sm.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-5-sm.png')
    },
    {
        image: useAsset('images/about/press-kit/Img-6-sm.png')
    },
]

const data3 = [
    {
        image: useAsset('images/about/press-kit/Img-7.png'),
        title: "Цель Юнилевер",
    },
    {
        image: useAsset('images/about/press-kit/Img-8.png'),
        title: "Чистое будущее",
    },
    {
        image: useAsset('images/about/press-kit/Img-9.png'),
        title: "Климат и природа",
    },
    {
        image: useAsset('images/about/press-kit/Img-10.png'),
        title: "Позитивная красота",
    },
]

const data3Sm = [
    {
        image: useAsset('images/about/press-kit/Img-7-sm.png'),
        title: "Цель Юнилевер",
    },
    {
        image: useAsset('images/about/press-kit/Img-8-sm.png'),
        title: "Чистое будущее",
    },
    {
        image: useAsset('images/about/press-kit/Img-9-sm.png'),
        title: "Климат и природа",
    },
    {
        image: useAsset('images/about/press-kit/Img-10-sm.png'),
        title: "Позитивная красота",
    },
]
</script>
<template>
    <div class="font-montserrat-alternates">
        <Breadcrumbs :crumbs="[
            {
                name: 'Главная',
                path: '/'
            },
            {
                name: 'Логотип',
                path: '/'
            },
            {
                name: 'Пресс-кит',
            }
        ] || []" />
        <div class="sm:py-18 py-[56px] sm:px-14 px-4">
            <div class="sm:mb-[40px] mb-[32px]">
                <h1
                    class="text-blue-80 sm:text-[52px] text-[32px] font-montserrat-alternates-bold sm:mb-6 mb-5 leading-[normal]">
                    Пресс-кит</h1>
                <p
                    class="font-montserrat-alternates-medium text-black-40 text-base sm:w-[600px] font-[600] w-auto leading-[24px]">
                    Загрузите наш логотип, презентации, ключевые документы и отчеты и посмотрите некоторые из наших
                    последних видеороликов.
                </p>
            </div>
            <div class="sm:mb-[40px] mb-[56px]">
                <h3 class="text-blue-80 text-2xl font-montserrat-alternates-bold sm:mb-6 mb-5 leading-[normal]">Презентации
                    2022-2023</h3>
                <div class="sm:grid hidden lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:gap-6 gap-[25px]">
                    <card v-for="(item, index) in data1" :key="index" class="gap-0" :image="item.image" title="" info="">
                        <div class="bg-black-10 p-6 text-blue-80 text-sm underline flex-col group">
                            <span class="flex items-center gap-[4px] leading-[normal] mb-[4px] font-montserrat-alternates-medium">
                                <icons-download-icon />
                                Название перезнтации
                            </span>
                            <p class="leading-[normal] font-montserrat-alternates-medium">Самара 2022 01 18 (PDF 406.8 KB)</p>
                        </div>
                    </card>
                </div>
                <div class="sm:hidden grid grid-cols-1 gap-y-[32px]">
                    <card v-for="(item, index) in data1Sm" :key="index" class="gap-0" :image="item.image" title="" info="">
                        <div class="bg-black-10 p-6 text-blue-80 text-sm underline flex-col group">
                            <span class="flex items-center gap-[4px] leading-[normal] mb-[4px] font-montserrat-alternates-medium">
                                <icons-download-icon />
                                Название перезнтации
                            </span>
                            <p class="leading-[normal] font-montserrat-alternates-medium">Самара 2022 01 18 (PDF 406.8 KB)</p>
                        </div>
                    </card>
                </div>
            </div>
            <div class="sm:mb-[40px] mb-[56px]">
                <h3 class="text-blue-80 text-2xl font-montserrat-alternates-bold sm:mb-6 mb-5 leading-[normal]">Файлы
                    логотипов</h3>
                <div class="sm:grid hidden lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:gap-6 gap-[25px]">
                    <card v-for="(item, index) in data2" :key="index" class="gap-0" :image="item.image" title="" info="">
                        <div class="bg-black-10 p-6 text-blue-80 text-sm underline flex-col group">
                            <span class="flex items-center gap-[4px] leading-[normal] mb-[4px] font-montserrat-alternates-medium" v-if="index < 2">
                                <icons-download-icon />
                                Название перезнтации
                            </span>
                            <p class="leading-[normal]" v-if="index < 2">Самара 2022 01 18 (PDF 406.8 KB)</p>
                            <span class="flex items-center gap-[4px] leading-[normal] w-full mb-[4px] font-montserrat-alternates-medium" v-if="index > 1">
                                <icons-link-icon />
                                Ознакомиться с инструкц
                            </span>
                            <p class="leading-[normal] font-montserrat-alternates-medium" v-if="index > 1">по использованию логотипа</p>
                        </div>
                    </card>
                </div>
                <div class="sm:hidden grid grid-cols-1 gap-y-[32px]">
                    <card v-for="(item, index) in data2Sm" :key="index" class="gap-0" :image="item.image" title="" info="">
                        <div class="bg-black-10 p-6 text-blue-80 text-sm underline flex-col group">
                            <span class="flex items-center gap-[4px] leading-[normal] mb-[4px] font-montserrat-alternates-medium" v-if="index < 2">
                                <icons-download-icon />
                                Название перезнтации
                            </span>
                            <p class="leading-[normal]" v-if="index < 2">Самара 2022 01 18 (PDF 406.8 KB)</p>
                            <span class="flex items-center gap-[4px] leading-[normal] w-full mb-[4px] font-montserrat-alternates-medium" v-if="index > 1">
                                <icons-download-icon />
                                Ознакомиться с инструкц
                            </span>
                            <p class="leading-[normal] font-montserrat-alternates-medium" v-if="index > 1">по использованию логотипа</p>
                        </div>
                    </card>
                </div>
            </div>
            <div class="sm:mb-[24px] mb-[32px]">
                <h3 class="text-blue-80 text-2xl font-montserrat-alternates-bold sm:mb-6 mb-5 leading-[normal]">Ключевые
                    видео 2023</h3>
                <div class="sm:grid hidden lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:gap-6 gap-[25px]">
                    <card v-for="(item, index) in data3" :key="index" class="gap-0" :image="item.image" title="" info="">
                        <div class="bg-black-10 p-6 text-blue-80 text-sm underline flex-col group">
                            <span class="flex items-center gap-[4px] leading-[normal] font-montserrat-alternates-medium">
                                <icons-left-icon />
                                {{ item.title }}
                            </span>
                        </div>
                    </card>
                </div>
                <div class="sm:hidden grid grid-cols-1 gap-y-[32px]">
                    <card v-for="(item, index) in data3Sm" :key="index" class="gap-0" :image="item.image" title="" info="">
                        <div class="bg-black-10 p-6 text-blue-80 text-sm underline flex-col group">
                            <span class="flex items-center gap-[4px] leading-[normal] font-montserrat-alternates-medium">
                                <icons-left-icon />
                                {{ item.title }}
                            </span>
                        </div>
                    </card>
                </div>
            </div>
            <div class="flex justify-center">
                <button
                    class="sm:w-auto w-full bg-cyan-50 py-[12px] px-[14px] flex items-center justify-center gap-2 text-blue-80 leading-[normal] text-sm">
                    Показать больше видео
                    <icons-top-icon :width="16" :height="16" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gap-0 {
    gap: 0 !important;
}
</style>
