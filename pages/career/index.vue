<script setup>
const dataPage = ref([]);
const buttonLinks = reactive([]);
const myBanners = reactive({
    0: null,
    1: null,
    2: null,
    3: [],
    4: null,
});
const myTexts = reactive([]);
const h3 = reactive([]);
const mybrand = ref(null);
const myAboutTable = ref(null)

useAsyncData('fetch', async () => {
  try {
    const { result } = await useApiFetch('static.page', {code: 'career'});
    dataPage.value = result;
    const blocks = dataPage.value.element.blocks;
    const blocksMap = new Map();
    let bannercount = 0;
    blocks.forEach((block, index) => {
        if (block.name === 'my_button_link') {
            buttonLinks.push(block);
        } else if (block.name === 'my_banner') {
            if(myBanners[3].length >= 3) {
                myBanners[4] = block;
            } else if(bannercount > 2) {
                myBanners[3].push(block);
            } else {
                myBanners[bannercount] = block;
            }
            bannercount ++;
        } else if (block.name === 'my_text') {
            myTexts.push(block);
        } else if (block.type === 'h3') {
            h3.push(block);
        } else {
            blocksMap.set(block.name, block);
        }
    });

    mybrand.value = blocksMap.get('my_brands');
    myAboutTable.value = blocksMap.get('my_about_table')
    // useHead(result?.seo);
  } catch (e) {
    console.error(e);
  }
})
const elememtCompany = computed(() => {
    return myAboutTable.value?.elementList
})

</script>
<template>
    <div class="flex flex-col font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage?.breadcrumbs || []" />

        <!-- start banner -->
        <div class="relative inline-block" v-for="(element, key) in myBanners[0]?.elementList" :key="key">

            <img
                :src="element.image"
                :alt="element.name"
                class="w-full h-auto hidden lg:block"
            />

            <img
                :src="element.mobile_image"
                :alt="element.name"
                class="w-full block lg:hidden"
            />
            <div class="absolute top-[50%] translate-y-[-50%] text-overlay w-full md:w-[700px]">
              <div
                  class="z-10 flex flex-col lg:gap-6 gap-5 lg:px-14 md:px-5 sm:px-4 px-4 py-0 lg:py-[30px] text-white leading-[23px] xl:leading-[25px]"
                  v-html="element?.text?.replace(/<h1>/g, `
                        <h1 class='xl:text-[52px] text-[32px] text-white font-montserrat-alternates-bold leading-[39px] xl:leading-[62px]'>
                    `).replace(/<p>/g, `
                        <p class='text-semibold font-montserrat-alternates-medium'>
                    `)"
              />

            </div>
        </div>
        <!-- end banner -->

        <!-- start banner -->
      <div class="relative inline-block" v-for="(element, key) in myBanners[1]?.elementList" :key="key">
        <img
            :src="element.image"
            :alt="element.name"
            class="w-full h-auto hidden lg:block"
        />

        <img
            :src="element.mobile_image"
            :alt="element.name"
            class="w-full block lg:hidden"
        />
        <div class="absolute top-[50%] translate-y-[-50%] text-overlay w-full md:w-[700px] right-0 lg:right-[90px]">
          <div
              class="z-10 flex flex-col 2xl:gap-6 xl:gap-[40px] lg:gap-6 md:gap-6 sm:gap-5 gap-5 lg:px-14 md:px-5 sm:px-4 px-4 sm:py-0 py-[107px] text-white"
              v-html="element?.text?.replace(/<h2>/g, `<h2 class='lg:w-[600px] text-[24px] w-auto xl:text-3xl1 leading-[32px] lg:leading-[40px] text-white font-montserrat-alternates-bold'>`).replace(/<p>/g, `<p class='font-montserrat-alternates-medium font-semibold'>`)"
          />

        </div>
      </div>
        <!-- end banner -->

        <!-- start -->
        <section class="2xl:my-18 xl:my-18 lg:my-18 md:my-18 sm:my-[72px] my-[56px] 2xl:mb-[56px] md:mb-[56px] sm:mb-8 mb-[54px] lg:mb-[32px]">
            <div class="2xl:px-14 xl:px-14 lg:px-14 md:px-14 sm:px-4 px-4 2xl:mb-1 xl:mb-1 lg:mb-8 md:mb-8 sm:mb-8 mb-8">
                <div class="w-full flex flex-col text-blue-80 sm:mb-[0.1px] mb-0.5">
                    <h3 class="text-blue=80 text-2xl font-montserrat-alternates-bold mb-[16px] lg:mb-6">{{ h3[0]?.value }}</h3>
                    <img class="2xl:block xl:block lg:block md:block sm:hidden hidden"
                        :src="myBanners[2]?.elementList[0]?.image" :alt="myBanners[2]?.elementList[0]?.name">
                    <img class="2xl:hidden xl:hidden lg:hidden md:hidden sm:block block"
                        :src="myBanners[2]?.elementList[0]?.mobile_image" :alt="myBanners[2]?.elementList[0]?.name">
                    <!-- <img class="2xl:block xl:block lg:block md:block sm:hidden hidden" :src="Banner5" :alt="Banner5">
                    <img class="2xl:hidden xl:hidden lg:hidden md:hidden sm:block block" :src="BannerSm5" :alt="BannerSm5"> -->
                </div>
                <div class="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 sm:gap-0 gap-1 min-h-[340px] lg:min-h-[262px]">

                  <div
                      v-for="(element, index) in elememtCompany"
                      :key="`${index}_${element.title}`"
                      class="pt-10 sm:pt-5 min-w-[171px] min-h-[171px] justify-center p-2 md:px-2.5 border lg:border-0 border-white text-blue-80 text-center sm:px-5 px-2 sm:h-[265px] sm:mb-0 lg:mb-1"
                      :class="{
                        '!pt-2 flex flex-col justify-center' : !element?.image && !element?.value && !element?.measure,
                        'w-full mb-5 mt-8 sm:mt-0 h-auto' : element.image,
                        'xl:pt-10' : !element.image
                      }"
                      :style="{ backgroundColor: `#${element.color}` }"
                  >
                    <div
                        class="flex justify-center items-center gap-2 mb-3 lg:mb-0"
                        :class="{ 'h-[49px] sm:h-[98px]' : (element?.value || element?.measure) && !element.image }"
                    >
                      <img v-if="element.image" :src="element.image" alt="Cell"/>
                      <h2 v-else-if="element.value" :style="{ color: `#${element.text_color}` }"
                          class="sm:text-[5rem] text-[2.5rem] font-montserrat-alternates-bold font-bold">
                        {{ element.value }}
                      </h2>
                      <h3 v-if="element.measure" :style="{ color: `#${element.text_color}` }"
                          class="text-left sm:text-2xl text-sm font-montserrat-alternates-bold font-bold">
                        {{ element.measure }}
                      </h3>
                    </div>

                    <p
                       v-if="(element.title || element.value) && element.image"
                       class="text-2xl font-montserrat-alternates-bold"
                       :style="{ color: `#${element.text_color}` }">
                      {{ element.title || element.value }}
                    </p>
                    <p
                        v-else
                        class="text-[11px] sm:text-base font-montserrat-alternates font-semibold sm:leading-6 leading-[140%]"
                        :style="{ color: `#${element.text_color}` }"
                    >
                      {{ element.title }}
                    </p>

                    <CommonButtonLink v-if="element.link" :link="element.link" :size="12" :class-name="'text-sm'" />
                  </div>


                </div>
            </div>
        </section>
        <!-- end -->

        <!-- start post -->
        <section
            class="2xl:px-14 xl:px-14 lg:px-14 md:px-14 sm:px-4 px-4 mb-[16px] lg:mb-[56px]">
            <h3 class="sm:mb-6 mb-[19px] text-blue-80 text-2xl font-montserrat-alternates-bold">
              {{ h3[1]?.value }}
            </h3>
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 sm:gap-6 gap-4 gap-y-[12px] lg:gap-y-0">
                <NuxtLink
                    v-for="(element, key) in mybrand?.elementList"
                    :key="key"
                    :to="`/brands/${element.section_code}/${element.code}`"
                    class="block text-blue-80 hover:text-blue-100"
                >
                    <img
                        class="mb-5 w-full sm:block hidden"
                        :src="element.image"
                        :alt="element.name"
                    >
                    <img
                        class="mb-5 w-full sm:hidden block"
                        :src="element.image"
                        :alt="element.name"
                    >
                    <h3
                        class="text-base font-montserrat-alternates-medium font-semibold mb-1 leading-[24px]"
                    >
                        {{ element.name }}
                    </h3>
                    <p
                        class="text-xs text-black-40 font-montserrat-alternates-medium font-medium leading-normal"
                    >
                        {{ element.section }}
                    </p>
                </NuxtLink>
            </div>
        </section>
        <!-- end post -->

        <!-- start -->
        <div class="flex justify-center 2xl:px-0 xl:px-0 lg:px-0 md:px-0 sm:px-4 px-4">
            <NuxtLink
                :to="buttonLinks[0]?.url"
                class="flex gap-2 items-center justify-center 2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-full w-full bg-cyan-50 p-3 text-blue-80 text-sm font-montserrat-alternates-medium font-medium hover:bg-[#0CC5F0] transition duration-300 ease-in-out"
            >
                {{ buttonLinks[0]?.title }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <path d="M11.9254 8.50112L4.07471 14.2601V2.74219L11.9254 8.50112Z" fill="#015EFF" />
                </svg>
            </NuxtLink>
        </div>
        <!-- end -->

        <!-- start -->
        <section
            class="2xl:my-18 xl:my-18 lg:my-18 md:my-18 sm:my-[56px] my-[56px] 2xl:px-14 xl:px-14 lg:px-14 md:px-14 sm:px-0 px-0">
            <div
                v-for="(item, key) in myBanners[3]"
                :key="key"
                class="relative bg-blue-80 sm:mb-6 mb-[32px]"
            >
                    <img
                        class="w-full 2xl:hidden xl:hidden lg:hidden md:hidden sm:block block"
                        :src="item?.elementList[0]?.mobile_image"
                        :alt="item?.elementList[0]?.name"
                    >
                    <img
                        class="w-full md:block hidden"
                        :src="item?.elementList[0]?.image"
                        :alt="item?.elementList[0]?.name"
                    >
                <div
                    :class="key === 2 ? 'text-blue-80' : 'text-white'"
                    class="absolute top-0 left-0 w-full h-full flex md:justify-center md:items-center pt-4 sm:pt-0 px-4 sm:px-0"
                >

                  <div v-html="item?.elementList[0]?.text?.replace(/<h3>/g, `<h3 class='text-2xl font-montserrat-alternates-bold sm:mb-5 mb-[14px]'>`)
                        .replace(/<a/g, `<a class='font-montserrat-alternates-medium font-medium underline underline-offset-[3px] hover:text-blue-90 ${key < 2 ? 'fill-white stroke-white' : 'fill-blue-80 stroke-blue-80' } hover:fill-blue-90 hover:stroke-blue-90 text-sm flex gap-1 items-center' `)
                        .replace(/<\/a>/g, `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill=''><path d='M4.57471 3.22907L11.08 8.00112L4.57471 12.7732V3.22907Z' /></svg></a>`)"
                        class="md:w-[400px] p-4"
                  />
                </div>
            </div>
        </section>
        <!-- end -->

        <!-- start -->
        <section class="md:mb-18 sm:mb-[56px] mb-[56px] px-4 sm:-mt-3 mt-0 2xl:px-14 xl:px-14 lg:px-14 md:px-14 sm:px-0">
            <div class="flex sm:justify-center justify-start">
                <div class="block text-2xl font-montserrat-alternates-bold leading-[normal]">
                    <div class="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex sm:flex-col flex-col max-w-[700px] leading-[28px] lg:leading-[32px]" v-html="myTexts[0]?.value"></div>
                </div>
            </div>
        </section>
        <!-- end -->

        <!-- start -->
        <div class="relative">
            <img
                class="w-full md:hidden block  min-h-[180px]"
                :src="myBanners[4]?.elementList[0]?.mobile_image"
                :alt="myBanners[4]?.elementList[0]?.name"
            >
            <img
                class="w-full md:block hidden min-h-[120px]"
                :src="myBanners[4]?.elementList[0]?.image"
                :alt="myBanners[4]?.elementList[0]?.name"
            >

          <div
              class="absolute top-0 left-0 w-full h-full text-blue-80 flex md:justify-center items-center px-4">
            <div v-html="myBanners[4]?.elementList[0]?.text.replace(/<h3>/g,
            `<h3 class='hovered-container text-2xl font-montserrat-alternates-bold mb-5 mt-[10px]'>`)
                    .replace(/<a/g, `<a class='hovered-container svg-icon underline underline-offset-[3px] text-sm flex gap-1 items-center hover:text-blue-90 fill-blue-80 stroke-blue-80 hover:fill-blue-90 hover:stroke-blue-90'`)
                    .replace(/<\/a>/g, `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill=''><path d='M4.57471 3.22907L11.08 8.00112L4.57471 12.7732V3.22907Z' class='' /></svg></a>`)"
                 class="md:w-[400px] p-4"
            />
          </div>
        </div>
        <!-- end -->
    </div>
</template>
<style scoped>
.hovered-container:hover .icon-svg {
  fill: #44D2F3 !important; /* Новый цвет fill иконки при ховере на родительский элемент */
  stroke: #44D2F3 !important; /* Новый цвет stroke иконки при ховере на родительский элемент */
}
</style>
