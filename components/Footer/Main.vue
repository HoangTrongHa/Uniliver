<script setup>
import useAsset from "@/helpers/useAsset";
import { pushToShareLink } from "@/helpers/socialNetwork";
const route = useRoute();
const dataPage = reactive({});
const menu = reactive([]);
const isSocialNetwork = ref(false);
const pathUrl = ref(route.path);

const config = useRuntimeConfig();
const NUXT_PUBLIC_BASEURL = config.public.baseURL;

useAsyncData('fetch', async () => {
    try {
        dataPage.value = await useApiFetch('static.menu.bottom');
        menu.value = dataPage?.value?.result?.menu;
    } catch (e) {
        console.error(e);
    }
});

watch(() => route.path, () => {
    pathUrl.value = route.path;
})
</script>
<template>
  <div class="flex flex-col">
    <div
        class="font-montserrat-alternates text-white flex justify-center items-center py-4 2xl:py-5 group hover:bg-blue-100 font-medium"
        :class="isSocialNetwork ? 'bg-blue-100' : 'bg-blue-90 cursor-pointer'"
        @click.stop.prevent="isSocialNetwork = true"
    >
        <div
          v-if="!isSocialNetwork"
          class="flex justify-center items-center transition-all duration-150 z-10"
        >

            <IconsShareIcon />
            <span class="ml-4 text-sm leading-[17px] font-montserrat-alternates-medium font-medium">
              Поделиться сайтом
            </span>
        </div>
        <div v-else class="flex justify-center items-center gap-10 z-10">
            <a
                :href="pushToShareLink('ok', {
                    url: NUXT_PUBLIC_BASEURL + pathUrl
                })"
                target="_brand"
            >
                <IconsOkIcon />
             </a>
            <a :href="pushToShareLink('vk', {
                url: NUXT_PUBLIC_BASEURL + pathUrl
            })" target="_brand">
                    <IconsVkIcon/>
            </a>
            <a :href="pushToShareLink('telegram', {
                url: NUXT_PUBLIC_BASEURL + pathUrl
            })" target="_brand">
                <IconsTeleIcom />
            </a>
        </div>  
    </div>

    <div class="relative text-xs text-white bg-blue-80 min-h-40 h-auto">
      <div class="px-4 py-10 md:px-8 lg:px-14">
            <div class="flex items-center gap-6">
                <div class="flex justify-center items-center">
                  <IconsGlobeIcon />

                  <p class="ml-1">Unilever Россия</p>
                </div>
            </div>
            <div class="h-[32px] md:h-[56px] lg:h-20 xl:h-[93px] 2xl:h-[107px]"></div>
            <div class="
              leading-[1.625rem]
              text-xs
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-1
              xxl:grid-cols-2
              gap-3
              md:gap-6
              lg:gap-1
              xl:gap-3
              xxl:gap-6
              max-w-[900px]"
            >
                <ul class="flex flex-col gap-3">
                    <li v-for="item in menu?.value?.slice(0, Math.floor(menu?.value?.length / 2))" :key="item.link"
                        class="leading-tight">
                        <NuxtLink :to="item.link">
                            <h2 class="font-montserrat-alternates-medium underline underline-offset-[3px] hover:text-[#94E4F7] transition-all duration-200 whitespace-nowrap">{{ item.title }}</h2>
                        </NuxtLink >
                    </li>
                </ul>
                <ul class="flex flex-col gap-3">
                    <li
                        v-for="item in menu?.value?.slice(Math.ceil(menu?.value?.length / 2), menu?.value?.length)"
                        :key="item.link"
                        class="leading-tight"
                    >
                        <NuxtLink :to="item.link" class="font-montserrat-alternates-medium font-medium underline underline-offset-[3px] hover:text-[#94E4F7] transition-all duration-200">
                            <h2 class="underline underline-offset-[3px] hover:text-[#94E4F7] transition-all duration-200 whitespace-nowrap">
                              {{ item.title }}
                            </h2>
                        </NuxtLink >
                    </li>
                </ul>
            </div>
            <div class="h-[32px] md:h-[40px]"></div>
            <!-- Copyright -->
            <div class="footer_coppyRight font-medium">&copy; Unilever 2023</div>
        </div>
        <div class="pt-[130px] md:pt-[280px] lg:pt-0">
            <img
                :src="useAsset('images/footer/footerImg-1.png')"
                alt="Footer img"
                class="absolute bottom-0 md:right-0 h-auto md:w-max-[718px]"
            />
        </div>
    </div>
  </div>
</template>
