<script setup>
import useAsset from "@/helpers/useAsset"

definePageMeta({
  layout: false,
})
const dataPage = ref([]);
const h1 = ref(null);
const myText = ref(null);
const myAccordion = ref(null);
useAsyncData('fetch', async () => {
  try {
    const {result} = await useApiFetch('static.page', {code: 'cookie-notices'});
    dataPage.value = result;

    const blocks = dataPage.value.element.blocks;
    blocks.forEach(block => {
      if (block.type === 'h1') {
        h1.value = block;
      } else if (block.name === 'my_text') {
        myText.value = block;
      } else if (block.name === 'my_accordion') {
        myAccordion.value = block;
      }
    });

    useHead(result?.seo);
  } catch (e) {
    console.error(e);
  }
})
</script>

<template>
  <!-- main cookies -->
  <div id="cookies" class="my-14 md:my-18 flex items-center justify-center md:px-32 lg:px-40 xl:px-[370px]">
    <div class="font-montserrat-alternates-medium text-black-40 text-sm">
      <div class="container__top px-4 md:px-0">
        <nuxt-link to="/">
          <img class="xl:w-[110px] xl:h-[118px]" :src="useAsset('icons/logo/logo_large.svg')" alt="">
        </nuxt-link>
        <div class="container__text">
          <h1
              v-if="h1"
              class="font-montserrat-alternates-bold text-blue-80 text-[32px] my-8 md:mt-10 md:mb-0 md:pr-0 leading-[normal]">
            {{ h1.value }}
          </h1>
          <div v-if="myText" v-html="myText.value?.replace(/<ul>/g, `<ul class='list-disc  ml-[20px]'>`)" class="mt-5 xl:mt-4 md:pr-[100px]"></div>
        </div>
      </div>
      <div class="h-[40px] xl:h-[26px]"></div>
      <div v-if="myAccordion" class="container__list pb-4 md:pr-[100px]">
        <div
            v-for="(item, index) in myAccordion.items"
            class="px-4 py-[15.5px] border-b md:px-0"
            :key="index"
        >
          <details class="group">
            <summary
                class="list-none flex flex-wrap items-center cursor-pointer transition duration-400 ease-out my-[6.5px] xl:my-[7.5px] group-open:mb-6 group"
            >
              <span class="text-blue-80 flex flex-1 group-hover:text-blue-90 text-sm font-montserrat-alternates-medium">
                {{ item.title }}
              </span>
              <span
                  class="w-4 h-4 xl:h-6 xl:w-6 flex items-center justify-center transition duration-400 ease-out group-open:rotate-180">
                <icons-top-icon/>
              </span>
            </summary>
            <template v-for="block in item.blocks" :key="block.value">
              <div v-if="block.name == 'text'" v-html="block.value?.replace(/<ul>/g, `<ul class='list-disc  ml-[20px]'>`)" class="block-link"></div>

              <h2
                  v-else-if="block?.type === 'h2'"
                  class="mt-[32px] mb-[16px] text-[24px] text-blue-80 font-montserrat-alternates-bold leading-[normal] sm:px-0 px-4"
              >
                {{ block?.value }}
              </h2>

              <h3
                  v-else-if="block?.type === 'h3'"
                  class="mt-[32px] mb-[16px] text-[16px] text-blue-80 font-montserrat-alternates-bold leading-[normal] sm:px-0 px-4"
              >
                {{ block?.value }}
              </h3>
            </template>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>Ò

<style scoped>
.container__top h4 {
  line-height: normal;
}

.block-link a {
  color: #015EFF;
  text-decoration-line: underline;
  font-size: 14px;
}
</style>
