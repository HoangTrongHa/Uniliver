<script setup>
import useAsset from "@/helpers/useAsset"
useHead({
    title: "Логотип Unilever"
})

const dataPage = reactive({})
const logos = ref([])
const countShow = ref(0)

const showMore = async () => {
  await window.onload
  if (window.innerWidth < 768) {
    countShow.value += 4

    if (countShow?.value < logos?.value?.length) {
      return
    }
  }

  countShow.value = logos?.value?.length || 0
}

watch(logos, () => {
  if (logos?.value?.length) showMore()
})

useAsyncData('fetch', async () => {
  try {
    dataPage.value = await useApiFetch('static.page', {code: 'logo'})

    if (dataPage.value) {
      useHead(dataPage.value?.result?.seo)

      const blocks = dataPage?.value?.result?.element?.blocks.filter(block => block.name === 'my_logos')
      if (blocks?.length) logos.value = blocks[0].elementList
    }
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
    <div class="font-montserrat-alternates">
        <Breadcrumbs :crumbs="dataPage?.value?.result?.breadcrumbs || [
            {
                name: 'Главная',
                path: '/'
            },
            {
                name: 'О нас',
                path: '/our-company'
            },
            {
                name: 'Логотип',
            }
        ]" />
        <div class="sm:py-18 py-[56px]">
            <div class="mx-auto max-w-[900px] sm:mb-[40px] mb-[32px]">

              <div v-for="block in dataPage?.value?.result?.element?.blocks.slice(0, countShow - 1)">
                <h1
                    v-if="block.type === 'h1'"
                    class="sm:mx-14 mx-4 mb-6 text-blue-80 sm:text-[52px] text-[32px] font-montserrat-alternates-bold leading-[normal]"
                >
                  {{ block.value }}
                </h1>

                <div v-else-if="block.name === 'my_text'" v-html="block.value" class="sm:mx-14 mx-4 text-sm text-black-40 font-montserrat-alternates-medium font-medium leading-[140%]" />

                <div v-else-if="block?.name === 'my_image'" class="w-full mt-10">
                  <img :src="block?.file?.SRC" :alt="block.desc" />
                </div>

                <div v-else-if="block.type === 'h2'" class="bg-black-10 sm:p-6 p-4 !pb-1">
                  <h3 class="break-after-left text-2xl text-blue-80 font-montserrat-alternates-bold">
                    {{ block.value }}
                  </h3>
                </div>

                <div
                    v-else-if="block.name === 'files'"
                    class="mb-10 bg-black-10 sm:p-6 p-4 !pt-2 cursor-pointer group text-blue-80 hover:text-blue-90"
                >
                  <span v-for="file in block.files" class="flex gap-1">
                    <icons-download-icon />
                    <a
                      :href="file.file.SRC"
                      class="text-sm font-montserrat-alternates-medium underline"
                      download
                    >
                      {{ file.desc }}
                    </a>
                  </span>
                </div>
              </div>

              <!--
                <div class="my-[56px]">
                    <div class="sm:p-6 p-4 bg-blue-80 text-white">
                        <h1 class="text-2xl font-montserrat-alternates-bold mb-3">How to use our logo</h1>
                        <p class="sm:mb-4 mb-5 text-xs">
                            Unilever agencies can view guidelines and advice on using our logo, by visiting our Brand
                            Centre.
                        </p>
                        <button
                            class="py-[12px] px-[14px] bg-cyan-50 text-sm font-montserrat-alternates-medium flex gap-2 items-center justify-center text-blue-80 sm:w-auto w-full hover:bg-[#0CC5F0] transition duration-300 ease-in-out"
                            @click="$router.push('/brands')"
                        >
                            Go to Brand Centre
                            <icons-left-icon />
                        </button>
                    </div>
                </div>
              -->
            </div>


            <div class="w-auto max-w-[1520px] mx-auto flex flex-row flex-wrap justify-center">
              <div
                  v-for="logo in logos.slice(0, countShow)"
                  class="md:p-5 p-4 max-w-[443px] max-h-[373px] w-[443px] h-[373px]"
                  :style="{backgroundColor: '#' + logo.background_color }"
              >
                <img :src="logo.image" class="w-[100px] md:w-[140px]" :alt="logo.title" />
                <h1
                    class="mb-3 text-2xl font-montserrat-alternates-bold leading-[normal] md:mt-2 mt-5"
                    :class="`text-[#${logo.title_color}]`"
                >
                  {{ logo.name }}
                </h1>
                <p
                  v-html="logo.text"
                  class="text-sm text-black-40 md:pb-0 pb-10 font-montserrat-alternates-medium"
                />
              </div>
            </div>
          


            <button
                v-if="countShow < logos?.length"
                class="w-full sm:w-auto sm:hidden mt-[32px] sm:py-[12px] py-[10px]  bg-cyan-50 flex gap-1 items-center justify-center text-blue-80"
                @click="showMore"
            >
              Показать еще
              <img :src="useAsset('icons/arrow-block-down-dark-blue.svg')" alt="">
            </button>
        </div>
    </div>
</template>

<style scoped>
.block-container>.card:nth-child(2n) {
    background: #EAEAEA;
}

.block-container>.card:not(:nth-child(2n)) {
    background: #F6F6F6;
}
</style>
