<script setup>
const dataPage = reactive({})
const myBanners = reactive({
  1: [],
  2: null,
  3: null,
  4: null
});
const buttonLinks = reactive([]);
const myNews = ref(null);
const h2 = ref(null);

useAsyncData('fetch', async () => {
  try {
    dataPage.value = await useApiFetch('static.page', {code: 'home'});
    if (dataPage.value) {
      useHead(dataPage.value?.result?.seo);

      const blocks = dataPage?.value?.result?.element?.blocks;
      const blocksMap = new Map();
      let bannerCount = 0;
      blocks.forEach(block => {
        if (block.name === 'my_banner') {
          if(bannerCount < 2) {
            myBanners[1].push(block);
          } else {
            myBanners[bannerCount] = block;
          }
          bannerCount++;
        } if (block.type === 'h2') {
          h2.value = block;
        } if (block.name === 'my_button_link') {
          buttonLinks.push(block);
        } else {
          blocksMap.set(block.name, block);
        }
      });

      myNews.value = blocksMap.get('my_news');
    }
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <div class="font-montserrat-alternates">
    <Breadcrumbs :crumbs="[]" />

      <div v-for="(myBanner, key) in myBanners[1]" :key="myBanner.iblock_id"
           class="relative"
      >
        <img
            :src="myBanner.elementList[0]?.image"
            :alt="myBanner.elementList[0]?.name"
            class="md:block hidden w-full h-full"
        >
        <img
            :src="myBanner.elementList[0]?.mobile_image"
            :alt="myBanner.elementList[0]?.name"
            class="md:hidden w-full h-full"
        >
        <div class="absolute top-0 left-0 w-full h-full flex justify-center"
             :class="{
            'items-center': key === 0,
            'items-start sm:items-center': key !== 0
          }"
        >
          <div class="px-4 sm:w-3/5 lg:w-1/2 "
               :class="{
              'lg:pl-[0] sm:ml-[-100px] lg:ml-[-155px] 2xl:ml-[-160px] 2xl:px-[93px]': key === 0,
              'lg:pl-[95px] 2xl:pl-[80px]': key !== 0
            }"
          >
            <h1 v-if="key === 0"
                class="text-[24px] lg:text-[32px] 2xl:text-[44px] font-montserrat-alternates-bold lg:pt-0 text-white mt-[75px] lg:mt-0"
            >{{ myBanner.elementList[0]?.name }}</h1>
            <h2 v-else
                class="text-2xl 2xl:text-[32px] font-montserrat-alternates-bold pt-[47.5px] sm:pt-0 lg:pt-0 text-[#EC6A61]"
            >{{ myBanner.elementList[0]?.name }}</h2>
            <div class="mt-6 2xl:mt-[18px] text-2xl lg:text-[32px] 2xl:text-[44px] font-montserrat-alternates-bold leading-[28px] lg:leading-[40px] 2xl:leading-[53px]"
                 :class="key === 0 ? 'text-white' : 'text-[#015EFF]'"
                 v-html="myBanner.elementList[0]?.text"
            />
          </div>
        </div>
      </div>

      <div
          v-if="myNews?.elementList?.length > 0"
          class="px-4 lg:px-14 pt-14 lg:pt-18 2xl:pt-36 pb-14 lg:pb-24 2xl:pb-[108px]"
      >
        <h2 class="text-2xl leading-[29px] font-montserrat-alternates-bold text-[#015EFF] font-bold">
          {{ h2?.value }}
        </h2>
        <div class="flex flex-wrap justify-between pt-5 lg:pt-6 pb-[32px] gap-[32px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px]">
          <div
              v-for="(item, key) in myNews?.elementList"
              :key="item.title"
              class="w-full sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-40px)/3)] lg:w-[calc((100%-72px)/4)] 2xl:flex-1 cursor-pointer"
          >

            <CardTime
                :imageClass="'w-full max-h-[276px] h-[200px] object-contain'"
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
        <div class="flex justify-center text-center">
          <CommonButtonLink
              v-if="myBanners[2].elementList[0]?.link"
              :link="myBanners[2].elementList[0]?.link || '/our-company/our-leadership'"
              :size="12"
              :class-name="'inline-flex w-auto gap-[10px] px-[14px] py-3 bg-cyan-50 text-sm hover:bg-[#0CC5F0] transition duration-300 ease-in-out gap-[10px]'"
              :underline="false"
              :is-button="true"
          />
        </div>
      </div>

      <div v-if="myBanners[2]">
        <div class="relative bg-cover bg-center w-full lg:mt-0">
          <img
              :src="myBanners[2].elementList[0]?.image"
              :alt="myBanners[2].elementList[0]?.name"
              class="sm:block hidden w-full h-full sm:min-h-[340px] 2xl:min-h-[454px]"
          >
          <img
              :src="myBanners[2].elementList[0]?.mobile_image"
              :alt="myBanners[2].elementList[0]?.name"
              class="sm:hidden w-full h-full"
          >
          <div class="absolute top-0 left-0 w-full h-full flex items-start md:items-center">
            <div class="pl-4 sm:pl-[40px] lg:pl-[56px] lg:w-1/2">
              <div class="pt-[16px] lg:pt-0 text-[32px] 2xl:text-[44px] text-blue-80 leading-[39px] 2xl:leading-[56px] font-montserrat-alternates-bold w-[30px]">
                {{ myBanners[2].elementList[0].name }}
              </div>
              <div class="mt-[14px] lg:mt-[20px] 2xl:mt-[24px] lg:w-[400px] 2xl:w-[500px] w-[343px] text-[14px] leading-[19.6px] font-montserrat-alternates-medium text-[#015EFF]">
                <div v-if="myBanners[2].elementList[0]?.text">
                  {{ myBanners[2].elementList[0]?.text }}
                </div>
              </div>

              <CommonButtonLink
                  :link="myBanners[2].elementList[0]?.link"
                  :size="14"
                  class-name="text-sm !justify-start"
                  class="mt-3 lg:mt-5"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="block bg-center lg:flex items-stretch justify-center">
        <div v-if="myBanners[3]" class="lg:w-1/2 relative">
          <img :src="myBanners[3].elementList[0]?.image" :alt="myBanners[3].elementList[0]?.name"
               class="sm:block hidden w-full h-full sm:min-h-[340px] 2xl:min-h-[454px]">
          <img :src="myBanners[3].elementList[0]?.mobile_image" :alt="myBanners[3].elementList[0]?.name"
               class="sm:hidden w-full h-full">
          <div class="absolute top-0 left-0 w-full h-full flex items-start md:items-center">
            <div class="pl-4 lg:w-1/2 lg:pl-[56px] sm:pl-[30px]">
              <div class="pt-[13px] lg:pt-0 text-[32px] 2xl:text-[44px] font-montserrat-alternates-bold text-[#A655BA]">{{ myBanners[3].elementList[0]?.name }}</div>
              <div class="mt-[8.6px] lg:mt-[14px] 2xl:mt-[20px] lg:w-[340px] 2xl:w-[400px] w-[343px] text-[14px] leading-[19.6px] font-montserrat-alternates-medium text-[#A655BA]">
                <div v-if="myBanners[3].elementList[0]?.text">
                  {{ myBanners[3].elementList[0]?.text }}
                </div>

                <CommonButtonLink
                    :link="myBanners[3].elementList[0]?.link"
                    :size="14"
                    :class-name="'text-sm'"
                    :fill="'#A655BA'"
                    class="mt-3 lg:mt-5 !justify-start"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="myBanners[4]" class="lg:w-1/2 relative">
          <img class="sm:block hidden w-full h-full sm:min-h-[340px] 2xl:min-h-[454px]"
               :src="myBanners[4].elementList[0]?.image" :alt="myBanners[4].elementList[0]?.name">
          <img class="sm:hidden w-full h-full"
               :src="myBanners[4].elementList[0]?.mobile_image" :alt="myBanners[4].elementList[0]?.name">
          <div class="absolute top-0 left-0 w-full h-full flex items-center">
            <div class="pl-4 lg:w-1/2 lg:pl-[56px] sm:pl-[30px]">
              <div class="pt-[13px] lg:pt-0 text-[32px] 2xl:text-[44px] font-montserrat-alternates-bold text-white">
                {{ myBanners[4].elementList[0]?.name }}
              </div>
              <div class="mt-[8.6px] lg:mt-[20px] 2xl:mt-[20px] lg:w-[340px] 2xl:w-[400px] w-[343px] text-[14px] leading-[19.6px] font-montserrat-alternates-medium text-white">
                <div
                    v-if="myBanners[4].elementList[0]?.text"
                >
                  {{ myBanners[4].elementList[0]?.text }}
                </div>
              </div>

              <CommonButtonLink
                  :link="myBanners[4].elementList[0]?.link"
                  :size="14"
                  :class-name="'text-sm !justify-start'"
                  :fill="'#FFFFFF'"
                  class="mt-3 lg:mt-5"
              />
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<style scoped>
.btn-link-banner:hover > .btn-link-icon {
  display: none;
}
.btn-link-banner:hover > .btn-link-icon-hover {
  display: block;
}
</style>
