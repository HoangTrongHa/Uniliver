<script setup>
import useAsset from "@/helpers/useAsset"
const dataPage = reactive({})
const buttonLinks = reactive([]);
const bannerPage = ref(null)
const contentPage = ref(null)
const evolutionPage = ref(null)
const filePage = ref(null)
const videoPage = ref(null) 
const statementMain = ref([])
const imageVideo = ref(null)
const isShowVideo = ref(false)
useAsyncData('fetch', async () => {
    try {
        dataPage.value = await useApiFetch('static.page', {
            code: 'planet-and-society'
        })
        useHead(dataPage.value?.result?.seo?.title ? dataPage.value?.result?.seo : { title: 'Устойчивое развитие'})

        const blocks = dataPage.value?.result?.element?.blocks;
        const blocksMap = new Map();
        blocks?.forEach(block => {
            if (block.name === 'my_button_link') {
                buttonLinks.push(block)
            } else if(block.name === 'my_banner' && (block.layout === '3,0' || block.layout === '3,1') ) {
                statementMain.value.push(block)
            } else {
                blocksMap.set(block.name, block);
            }
        });
        bannerPage.value = blocksMap.get('my_banner');
        contentPage.value = blocksMap.get('my_text');
        evolutionPage.value = blocksMap.get('my_evolution')
        filePage.value = blocksMap.get('my_fields')
        videoPage.value = blocksMap.get('my_video')
        imageVideo.value = blocksMap.get('my_image')
    } catch (e) {
        console.error(e);
    }
})

const evolutionClass = (index) => {
    const bgColors = ['#B0DFD2', '#EC6A6166', '#94E4F766'];
    const bgClass =  index < bgColors.length ? `${bgColors[index]}` : '';
    return [bgClass];
};

const showVideo = () => {
    isShowVideo.value = true
}
</script>
<template>
    <div class="font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage?.value?.result?.breadcrumbs || []" />
        <div class="relative bg-green-20 grid md:grid-cols-2 grid-cols-1"> 
            <div class="absolute top-0 bottom-0 left-0 right-0 z-0 md:block hidden">
              <img v-if="bannerPage?.elementList[0]?.image" class="w-full h-full" :src=" bannerPage?.elementList[0]?.image" alt="background">
            </div>
            <div class="absolute top-0 bottom-0 left-0 right-0 z-0 sm:hidden block">
              <img v-if="bannerPage?.elementList[0]?.mobile_image" class="w-full h-full" :src="bannerPage?.elementList[0]?.mobile_image" alt="background">
            </div>
            <div class="text-blue-80 z-20 xl:w-[700px] w-auto xl:ml-[56px] md:mx-[56px] mx-0 flex flex-col justify-center md:px-0 px-4 xl:mb-[53px] pt-8 pb-[54px] xl:py-8 mt-5">
                <h1 class="xl:text-[52px] text-[44px] font-montserrat-alternates-bold mb-6 leading-[normal]">
                  {{ bannerPage?.elementList[0]?.name }}
                </h1> 
                <div
                    v-if="bannerPage?.elementList[0]?.text"
                    class="text-base font-montserrat-alternates font-semibold xl:w-[600px] w-auto leading-[24px]"
                    v-html="bannerPage?.elementList[0]?.text?.replace(/<p>/g, `<p class='font-montserrat-alternates-medium font-semibold'>`)?.replace(/<ul>/g, `<ul class='list-disc ml-[20px]'>`)?.replace(/<br>/g, `<br> <br>`)"
                />
            </div>
        </div>
        <section class="sm:my-[72px] my-[56px]">
            <div class="flex lg:flex-row flex-col-reverse lg:px-0 px-4">
                <div class="lg:w-1/2 w-full lg:pt-[20px] lg:pl-[56px] lg:pr-[64px] p-0">
                    <!-- <div class="mb-6">
                        <div class="text-2xl font-montserrat-alternates-bold">
                            <h1 class="text-[#0CC5F0] leading-[normal]">
                                Unilever Compass — это наша стратегия,
                            </h1>
                            <h1 class="text-blue-80 leading-[normal]">
                                обеспечивающая последовательный, конкурентоспособный, прибыльный и ответственный рост.
                            </h1>
                        </div>

                    </div> -->
                    <div
                        v-if="contentPage"
                        v-html="contentPage.value?.replace(/<h2/g, `<h2 class='text-sm font-montserrat-alternates-bold'`)?.replace(/<p>/g, `<p class='font-montserrat-alternates-medium font-medium'>`)"
                        class="mb-8 xl:mb-6 text-black-40 content-page text-sm"
                    >
                    </div>
                  
                    <NuxtLink
                        v-if="buttonLinks.length > 0"
                        :to="buttonLinks[0].url || buttonLinks[0].target"
                        class="px-[14px] py-[12px] text-blue-80 bg-cyan-50 text-sm inline-flex gap-[10px] items-center justify-center sm:w-auto w-full font-montserrat-alternates-medium hover:bg-[#0CC5F0] transition duration-300 ease-in-out cursor-pointer" v-for="item in buttonLinks" :key="item.title">
                        {{ item.title }}
                        <icons-left-icon />
                    </NuxtLink>
                </div>
                <div v-if="contentPage" class="lg:w-1/2 w-full flex flex-col lg:mb-0 mb-[32px]">
                    <div class="relative">

                      <div class="relative" @mouseover="showVideo">
                            <img
                                v-if="!isShowVideo"
                                class="sm:block hidden w-full" 
                                :src="imageVideo.file.ORIGIN_SRC"
                                alt="banner"

                            >
                            <img 
                                v-if="!isShowVideo" 
                                class="sm:hidden block w-full" 
                                :src="imageVideo.file.SRC"
                                alt="banner">

                            <VideoYoutube v-else  :url="videoPage?.url" :width="videoPage?.width" :height="videoPage?.height"/>
                      </div>

                       
                        <div class="absolute bottom-4 right-4">
                            <div class="flex gap-2">
                                <NuxtLink :to="videoPage?.url" target="_brank" class="p-[9px] bg-cyan-50 border-blue-80 border-2">
                                    <icons-pause-icon />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div 
                        v-for="(itemFile, index) in filePage?.items[1]?.files"
                        :key="index" 
                        class="text-blue-80 sm:p-[24px] px-4 py-6 bg-black-10">
                        <h3 class="text-2xl font-montserrat-alternates-bold sm:mb-[12px] mb-[15px] leading-[normal]">
                            {{ filePage?.items[0]?.value }}    
                        </h3>
                        <nuxt-link
                            :to="itemFile.file.SRC"
                            target="_blank"
                            class="hover:text-blue-100 flex flex-col sm:flex-row gap-1 text-sm underline sm:items-center leading-[normal] font-montserrat-alternates-medium group"
                        >
                            <icons-download-icon />
                            {{ itemFile.file.ORIGINAL_NAME }}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </section>
        <div class="sm:mb-[72px] mb-[56px]">
            <section
                v-for="(evolution, index) in evolutionPage?.elementList"
                :key="evolution.id"
                :class="evolutionClass(index)"
                :style="{backgroundColor: evolutionClass(index)}"
                class="relative sm:px-[56px] px-4 sm:py-[40px] py-[32px] text-black"
            >
                <div class="text-blue-80 xl:w-[700px] w-auto z-10 relative">
                    <h1 class="mb-4 text-2xl font-montserrat-alternates-bold leading-[normal]">
                        {{ evolution.title }}
                    </h1>
                    <p
                        v-html="evolution.description"
                        class="text-sm xl:w-[600px] w-auto font-montserrat-alternates-medium leading-[140%]"
                    />
                </div>
                <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 sm:mt-[40px] mt-[32px] z-10 relative">
                    <card
                        v-bind="item"
                        v-for="item in evolution?.blocks"
                        :key="item.title"
                        :image="item.image"
                        :document="item.document"
                        :info="item.description"
                        :link="item.link"
                        image-class="sm:h-auto h-[205px]"
                        title-class="font-semibold leading-[24px]"
                        info-class="font-medium leading-[normal]"
                        :limit-row-info="10"
                        :limit-row-title="2"
                    />
                </div>
                <div class="absolute top-0 bottom-0 left-0 right-0">
                    <img class="w-full h-full sm:block hidden"
                        :src="evolution.image" :alt="'background' + evolution.title">
                    <img class="w-full h-full sm:hidden block"
                        :src="evolution.image" :alt="'background' + evolution.title">
                </div>
            </section>
        </div>
        <section>
            <div class="grid lg:grid-cols-2 grid-cols-1">
                <div
                    v-for="(statement, index) in statementMain"
                    :key="statement.elementList[0].id"
                    class="relative w-full overflow-hidden"
                >
                    <div class="relative w-full pb-[47%]">
                        <img class="absolute w-full md:block hidden w-1/2 h-auto"
                            :src="statement.elementList[0].image"
                            :alt="useAsset('images/about/banner-footer1.png')">
                        <img class="absolute w-full md:hidden block w-1/2 h-auto"
                            :src="statement.elementList[0].mobile_image"
                            :alt="useAsset('images/about/banner-footer-sm-1.png')">

                      <div
                          class="max-w-[340px] h-full absolute flex flex-col justify-start lg:justify-center z-10 md:pl-14 px-4 xl:pr-[0px]">
                        <div
                            class="font-montserrat-alternates-bold text-2xl mb-5 2xl:pt-0 xl:pt-0 lg:pt-0 md:pt-0 sm:pt-10 pt-10 leading-[normal]"
                            :class="!index ? 'text-blue-80' : 'text-violet-50'"
                            v-html="statement.elementList[0].text?.replace(/<ul>/g, `<ul class='list-disc  ml-[20px]'>`)"
                        />

                        <CommonButtonLink
                            :link="statement.elementList[0].link"
                            :text="buttonLinks[0]?.title"
                            :size="14"
                            :fill="index ? '#A655BA' : ''"
                            :class-name="`!justify-start text-sm ${!index ? 'text-blue-80' : 'text-violet-50'}`"
                        />
                      </div>
                    </div>

                    <!-- <div class="flex justify-end 2xl:pt-32 xl:pt-32 lg:pt-32 md:pt-32 sm:pt-0 pt-0 z-10">
                        <img class="2xl:block xl:block lg:block md:block sm:hidden hidden w-full mt-2"
                            :src="useAsset('images/about/banner-footer1.png')"
                            :alt="useAsset('images/about/banner-footer1.png')">
                        <img class="2xl:hidden xl:hidden lg:hidden md:hidden sm:block block"
                            :src="useAsset('images/about/banner-footer-sm-1.png')"
                            :alt="useAsset('images/about/banner-footer-sm-1.png')">
                    </div> -->
                </div>
            </div>
        </section>
    </div>
</template>
<style lang="css">
.content-page h2 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.015em;

    padding-bottom: 1.25rem;
}
img {
    object-fit: cover;
}
</style>
