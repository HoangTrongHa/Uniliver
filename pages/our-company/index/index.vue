<script setup>
import Banner from "@/assets/images/about/banner.png"
import BannerSM from "@/assets/images/about/banner-sm.png"
import Post1 from "@/assets/images/about/post-1.png"
import Post2 from "@/assets/images/about/post-2.png"
import Post3 from "@/assets/images/about/post-3.png"
import useAsset from "@/helpers/useAsset"

const config = useRuntimeConfig()

try {
    const { data } = await useFetch("/about.main", {
        pick: ['result'],
        method: 'GET',
        baseURL: config.public.baseURL
    });
} catch (error) {
    console.error(error);
}

const { breadcrumbs, seo, element } = data.value.result;

const findElementByName = (name) => {
    const dataElement = element.blocks?.find(item => item.name === name)
    return dataElement.elementList ? dataElement.elementList: dataElement || []
}

const filterElementCard = (name) => {
    const dataElement = element.blocks?.filter(item => item.name === name)
    return  dataElement || []
}

const aboutBanner = findElementByName('my_banner')

const aboutText = findElementByName('my_text')

const aboutButtonLink = findElementByName('my_button_link')

const aboutTable = findElementByName('my_about_table')

const aboutCards = filterElementCard('my_card')

useHead({
    title: seo.title,
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: seo.description
        },
        {
            hid: 'keywords',
            name: 'keywords',
            content: seo.keywords
        }
    ],
});

</script>
<template>
    <div class="font-montserrat-alternates">
        <Breadcrumbs :crumbs="breadcrumbs || []" />
        <!-- start banner -->
        <div
            class="relative grid sm:grid-cols-2 grid-cols-1 items-center bg-cyan-50 sm:px-12 px-4 2xl:py-0 md:py-0 sm:pt-2 pt-2 mb-1">
            <div class="absolute top-0 bottom-0 2xl:left-40 xl:left-40 lg:left-40 md:left-40 sm:left-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="2xl:block xl:block lg:block md:block sm:hidden hidden"
                    width="100%" height="100%" viewBox="0 0 1336 340" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M791.351 -601.891C895.135 -601.891 972.973 -524.054 972.973 -433.243C972.973 -342.433 895.135 -264.594 791.351 -264.594C700.54 -264.594 609.729 -342.433 609.729 -433.243C609.729 -524.054 700.54 -601.891 791.351 -601.891ZM1984.87 1032.7C1894.05 1032.7 1803.24 1110.54 1803.24 1201.35C1803.24 1305.13 1894.05 1370 1984.87 1370C2088.65 1370 2166.49 1292.16 2166.49 1188.38C2166.49 1097.57 2088.65 1032.7 1984.87 1032.7ZM1388.11 708.379C1206.49 708.379 1063.78 851.082 1063.78 1019.73C1063.78 1188.38 1206.49 1331.08 1388.11 1331.08C1569.73 1331.08 1712.43 1188.38 1712.43 1019.73C1712.43 851.082 1569.73 708.379 1388.11 708.379ZM817.297 565.676C713.513 565.676 635.675 643.513 635.675 747.297C635.675 851.081 726.486 928.919 817.297 928.919C921.081 928.919 998.919 851.081 998.919 747.297C998.919 643.513 921.081 565.676 817.297 565.676ZM1958.92 851.081C2075.67 851.081 2179.46 760.271 2179.46 643.514C2179.46 526.757 2075.67 435.946 1958.92 435.946C1842.16 435.946 1738.38 526.757 1738.38 643.514C1738.38 747.298 1842.16 851.081 1958.92 851.081ZM272.432 189.46C129.73 189.46 0 306.216 0 448.919C0 591.622 116.757 708.379 272.432 708.379C415.135 708.379 544.865 591.622 544.865 448.919C531.892 306.216 415.135 189.46 272.432 189.46ZM1245.41 384.054C1245.41 487.838 1323.24 565.676 1427.03 565.676C1530.81 565.676 1608.65 487.838 1608.65 384.054C1608.65 280.271 1530.81 202.432 1427.03 202.432C1323.24 202.432 1245.41 293.244 1245.41 384.054ZM882.162 435.946C1037.84 435.946 1167.57 319.189 1167.57 163.513C1167.57 7.83752 1037.84 -108.919 882.162 -108.919C726.486 -108.919 596.757 7.83752 596.757 163.513C596.757 306.216 713.513 435.946 882.162 435.946ZM1920 254.325C2023.78 254.325 2114.6 163.514 2114.6 59.73C2114.6 -44.0538 2023.78 -134.865 1920 -121.892C1816.22 -121.892 1725.41 -31.0811 1725.41 72.7028C1725.41 176.487 1816.22 254.325 1920 254.325ZM350.27 -5.13489C454.054 -5.13489 531.892 -82.9729 531.892 -186.757C531.892 -290.541 454.054 -368.379 350.27 -368.379C246.486 -368.379 168.648 -290.541 168.648 -186.757C155.675 -82.9729 246.486 -5.13489 350.27 -5.13489ZM1414.05 -18.1077C1582.7 -18.1077 1712.43 -147.838 1712.43 -303.514C1712.43 -459.189 1582.7 -588.919 1414.05 -588.919C1245.4 -588.919 1115.68 -459.189 1115.68 -303.514C1115.68 -147.838 1245.4 -18.1077 1414.05 -18.1077ZM1634.59 -692.703C1738.38 -692.703 1816.22 -770.54 1816.22 -861.351C1816.22 -952.162 1738.38 -1030 1634.59 -1030C1530.81 -1030 1452.97 -952.162 1452.97 -861.351C1465.95 -757.567 1543.78 -692.703 1634.59 -692.703Z"
                        fill="#94E4F7" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="2xl:hidden xl:hidden lg:hidden md:hidden sm:block block"
                    width="100%" height="100%" viewBox="0 0 375 480" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M364.911 -164.713C412.768 -164.713 448.661 -128.843 448.661 -86.9947C448.661 -45.1461 412.768 -9.2756 364.911 -9.2756C323.036 -9.2756 281.16 -45.1461 281.16 -86.9947C281.16 -128.843 323.036 -164.713 364.911 -164.713ZM915.268 588.562C873.393 588.562 831.517 624.432 831.517 666.281C831.517 714.108 873.393 744 915.268 744C963.125 744 999.018 708.13 999.018 660.303C999.018 618.454 963.125 588.562 915.268 588.562ZM640.089 439.103C556.339 439.103 490.535 504.865 490.535 582.584C490.535 660.303 556.339 726.065 640.089 726.065C723.839 726.065 789.643 660.303 789.643 582.584C789.643 504.865 723.839 439.103 640.089 439.103ZM376.875 373.341C329.018 373.341 293.125 409.211 293.125 457.038C293.125 504.865 335 540.735 376.875 540.735C424.732 540.735 460.625 504.865 460.625 457.038C460.625 409.211 424.732 373.341 376.875 373.341ZM903.303 504.865C957.142 504.865 1005 463.016 1005 409.211C1005 355.406 957.142 313.557 903.303 313.557C849.464 313.557 801.607 355.406 801.607 409.211C801.607 457.038 849.464 504.865 903.303 504.865ZM125.625 199.968C59.8213 199.968 0 253.773 0 319.535C0 385.297 53.8392 439.103 125.625 439.103C191.428 439.103 251.25 385.297 251.25 319.535C245.268 253.773 191.428 199.968 125.625 199.968ZM574.286 289.643C574.286 337.47 610.178 373.341 658.036 373.341C705.893 373.341 741.785 337.47 741.785 289.643C741.785 241.816 705.893 205.946 658.036 205.946C610.178 205.946 574.286 247.795 574.286 289.643ZM406.785 313.557C478.571 313.557 538.393 259.751 538.393 188.011C538.393 116.27 478.571 62.4648 406.785 62.4648C335 62.4648 275.178 116.27 275.178 188.011C275.178 253.773 329.018 313.557 406.785 313.557ZM885.357 229.86C933.214 229.86 975.089 188.011 975.089 140.184C975.089 92.3568 933.214 50.5081 885.357 56.4865C837.5 56.4865 795.625 98.3351 795.625 146.162C795.625 193.989 837.5 229.86 885.357 229.86ZM161.518 110.292C209.375 110.292 245.268 74.4216 245.268 26.5946C245.268 -21.2325 209.375 -57.1028 161.518 -57.1028C113.661 -57.1028 77.7676 -21.2325 77.7676 26.5946C71.7854 74.4216 113.661 110.292 161.518 110.292ZM652.053 104.314C729.821 104.314 789.643 44.5296 789.643 -27.2109C789.643 -98.9514 729.821 -158.735 652.053 -158.735C574.285 -158.735 514.464 -98.9514 514.464 -27.2109C514.464 44.5296 574.285 104.314 652.053 104.314ZM753.75 -206.562C801.607 -206.562 837.5 -242.432 837.5 -284.281C837.5 -326.13 801.607 -362 753.75 -362C705.893 -362 670 -326.13 670 -284.281C675.982 -236.454 711.875 -206.562 753.75 -206.562Z"
                        fill="#94E4F7" />
                </svg>
            </div>
            <div
                class="flex flex-col sm:gap-6 gap-3 z-10 sm:mt-2 mt-0 sm:ml-2 ml-0 xl:pr-10 lg:pr-8 md:pr-2 md:py-4 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-4 mb-4">
                <h1
                    class="text-blue-80 2xl:text-3.25xl xl:text-3.25xl lg:text-4xl2 md:text-4xl sm:text-4xl2 text-4xl2 font-montserrat-alternates-bold leading-[normal] sm:mb-5 mb-4 sm:mt-0 mt-1">
                    {{ aboutBanner[0].name }}
                </h1>
                <p class="text-blue-80 text-base font-montserrat-alternates-medium leading-[24px] max-w-[38rem]">Мы – это
                    149 тыс.
                    сотрудников по всему
                    миру, мы – это более 400 брендов в более чем 190 странах, мы – это
                    глобальная компания с глобальной целью.</p>
            </div>
            <div class="w-full h-[340px] z-10 2xl:block xl:block lg:block md:block sm:hidden hidden">
                <img class="w-full h-full" :src="aboutBanner[0].image || Banner" :alt="aboutBanner[0].name">
            </div>
            <div class="w-full h-[198px] z-10 2xl:blohck xl:hidden lg:hidden md:hidden sm:block block">
                <img class="w-full h-full" :src="aboutBanner[0].image || BannerSM" :alt="aboutBanner[0].name">
            </div>
        </div>
        <!-- end banner -->

        <!-- start about -->
        <section
            class="xl:px-[370px] lg:px-40 md:px-32 sm:px-4 px-4 2xl:mt-10 xl:mt-10 lg:mt-10 md:mt-10 2xl:mb-14 xl:mb-14 lg:mb-14 md:mb-14 sm:my-14 my-14">
            <!-- <div class="text-xl font-montserrat-alternates-bold sm:mb-10 mb-6">
                <h1 class="text-cyan-150 text-2xl leading-[normal]">Наша цель – сделать </h1>
                <h1 class="text-blue-80 text-2xl leading-[normal]">экологически ответственную жизнь <br> обычным явлением
                </h1>
            </div> -->
            <div class="text-black-40 lg:w-[600px] w-auto 2xl:pr-18 xl:pr-18 lg:pr-18 md:pr-18 sm:pr-0 pr-0 mb-6">

                <div v-html="aboutText.value"></div>
            </div>
            <NuxtLink :to="aboutButtonLink.url"
                class="inline-flex px-[14px] py-3 bg-cyan-50 text-blue-80 font-montserrat-alternates-medium text-sm 2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-full w-full items-center justify-center gap-2 hover:bg-blue-500 hover:text-white">
                {{ aboutButtonLink.title }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.9254 8.00014L4.07471 13.7591V2.24121L11.9254 8.00014Z" fill="#015EFF" />
                </svg>
            </NuxtLink>
        </section>
        <!-- end about -->

        <!-- start statistical -->
        <section>
            <div class="2xl:px-14 xl:px-14 lg:px-10 md:px-5 sm:px-4 px-4 mb-18">
                <div
                    class="flex flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row 2xl:mb-1 xl:mb-1 lg:mb-8 md:mb-8 sm:mb-8 mb-10">
                    <div
                        v-for="(element, index) in aboutTable"
                        :key="`${index}_${element.title}`"
                        class="2xl:w-1/5 xl:w-1/5 lg:w-1/4 flex flex-col items-center justify-center text-blue-80 text-center sm:py-10 py-5 sm:px-5 px-2"
                        :style="{backgroundColor: `#${element.color}`}"
                        :class="element.image ? 'w-full': 'w-1/2 md:w-1/2'"
                        >
                        <div class="flex justify-center items-center gap-2 sm:mb-3 mb-0">
                            <img v-if="element.image" :src="element.image" alt="Изображение" />
                            <h1
                                v-else-if="element.value"
                                class="md:text-[5rem] h-[98px] text-5xl font-montserrat-alternates-bold font-bold sm:mb-1 mb-0 leading-[normal]"
                                :class="`text-[#${element.text_color}]`"
                            >
                                {{ element.value }}
                            </h1>
                            <h3
                                v-if="element.measure"
                                :style="{color: `#${element.text_color}`}"
                                class="md:text-2xl sm:text-sm text-sm font-montserrat-alternates-medium"
                            >
                                {{ element.measure }}
                            </h3>
                        </div>

                        <p
                            v-if="(element.title || element.value) && element.image"
                            class="text-2xl font-montserrat-alternates-bold sm:mt-0 mt-1 mb-1"
                            :style="{color: `#${element.text_color}`}"
                        >
                            {{ element.title || element.value }}
                        </p>
                        <p
                            v-else
                            class="text-xs md:text-base font-montserrat-alternates-medium mb-3 sm:leading-[24px] leading-[140%]"
                            :style="{color: `#${element.text_color}`}"
                        >
                            {{ element.title }}
                        </p>

                      <CommonButtonLink
                          :link="element.link"
                          :size="12"
                          class-name="sm:flex hidden items-center gap-1 text-blue-80 underline text-xs text-xs"
                      />
                    </div>
                </div>
            </div>
        </section>
        <!-- end statistical -->

        <!-- start post -->
        <section class="2xl:px-14 xl:px-14 lg:px-10 md:px-5 sm:px-4 px-4 mb-18">
            <div
                class="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 2xl:gap-6 xl:gap-6 lg:gap-6 md:gap-6 sm:gap-4 gap-4 gap-y-8">
                <div v-for="card in aboutCards" :key="card.link.title">
                    <img class="mb-5 w-full" :src="card.image.file.SRC || Post1" :alt="card.image.desc" :width="card.image.file.WIDTH" :height="card.image.file.HEIGHT">
                    <NuxtLink :to="`/about${card.link.url}`" class="text-base text-blue-80 font-montserrat-alternates-medium mb-2 text-ellipsis-2 font-[500]">
                        {{ card.link.title }}</NuxtLink>
                    <p v-html="card.text.value" class="sm:block hidden text-xs text-black-40 leading-[normal]"></p>
                    <p v-html="card.text.value" class="sm:hidden block text-xs text-black-40 leading-[normal]">
                    </p>
                </div>
            </div>
        </section>
        <!-- end post -->

        <section>
            <div class="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1">
                <div class="relative flex sm:flex-row flex-col justify-between bg-green-20 overflow-hidden">
                    <div class="absolute left-0 right-0 top-0 bottom-0">
                        <icons-vector-green-icon />
                    </div>
                    <div class="flex flex-col justify-center z-10 md:pl-14 px-4 pt-4">
                        <h3
                            class="text-blue-80 font-montserrat-alternates-bold text-2xl mb-5 2xl:pt-0 xl:pt-0 lg:pt-0 md:pt-0 sm:pt-0 pt-6 leading-[normal] sm:max-w-[340px]">
                            Создаем больше
                            чем просто продукты
                            и несем добро в каждый дом</h3>
                        <p class="flex gap-1 items-center text-sm">
                            <span class="underline text-blue-80 font-montserrat-alternates-medium">Узнать больше</span>
                            <icons-left-icon />
                        </p>
                    </div>
                    <div class="flex justify-end 2xl:pt-32 xl:pt-32 lg:pt-32 md:pt-32 sm:pt-0 pt-0 z-10">
                        <img class="2xl:block xl:block lg:block md:block sm:hidden hidden w-full mt-2"
                            :src="useAsset('images/about/banner-footer1.png')"
                            :alt="useAsset('images/about/banner-footer1.png')">
                        <img class="2xl:hidden xl:hidden lg:hidden md:hidden sm:block block"
                            :src="useAsset('images/about/banner-footer-sm-1.png')"
                            :alt="useAsset('images/about/banner-footer-sm-1.png')">
                    </div>
                </div>
                <div class="relative flex sm:flex-row flex-col justify-between bg-yellow-100 overflow-hidden">
                    <div class="absolute left-0 right-0 top-0 bottom-0">
                        <icons-vector-yellow-icon />
                    </div>
                    <div class="flex flex-col justify-center z-10 md:pl-14 px-4 pt-4">
                        <h3
                            class="text-violet-50 font-montserrat-alternates-bold text-2xl mb-5 2xl:pt-0 xl:pt-0 lg:pt-0 md:pt-0 sm:pt-0 pt-6 leading-[normal] sm:max-w-[340px]">
                            Давайте вместе изменим мир к лучшему</h3>
                        <p class="flex gap-1 items-center text-sm">
                            <span class="underline text-violet-50 font-montserrat-alternates-medium">Узнать больше</span>
                            <icons-left-icon fill="#A655BA" stroke="#A655BA" />
                        </p>
                    </div>
                    <div class="flex justify-end 2xl:pt-32 xl:pt-32 lg:pt-32 md:pt-32 sm:pt-0 pt-0 z-10">
                        <img class="2xl:block xl:block lg:block md:block sm:hidden hidden mt-2"
                            :src="useAsset('images/about/banner-footer2.png')"
                            :alt="useAsset('images/about/banner-footer2.png')">
                        <img class="2xl:hidden xl:hidden lg:hidden md:hidden sm:block block"
                            :src="useAsset('images/about/banner-footer-sm-2.png')"
                            :alt="useAsset('images/about/banner-footer-sm-2.png')">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped>
h2 {
    font-size: 24px;
}
.text-ellipsis-2 {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-ellipsis-3 {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
