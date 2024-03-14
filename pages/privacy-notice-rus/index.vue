<script setup>
import useAsset from "~/helpers/useAsset";

definePageMeta({
  layout: false,
});

const dataPage = ref([]);
const h1 = ref(null);
const myText = ref(null);
const myAccordion = ref(null);
useAsyncData('fetch', async () => {
  try {
    const { result } = await useApiFetch('static.page', { code: 'privacy-notice-rus' });

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
  <!-- main politics -->
  <div id="politics" class="my-14 md:my-18 md:px-32 lg:px-40 xl:px-[370px]">
    <div class="politics__container font-montserrat-alternates-medium text-black-40 text-sm min-w-[343px] 2xl:max-w-[900px] 2xl:mx-auto">
      <ClientOnly>
        <div class="container__top px-4 md:px-0 sm:mb-[40px] mb-[60px]">
        <nuxt-link to="/">
          <img class="sm:w-[110px] sm:h-[118px] w-[91px] h-[98px]" :src="useAsset('icons/logo/logo_large.svg')" alt="">
        </nuxt-link>

        <div class="container__text">
          <h1
            v-if="h1"
            class="line-height-normal font-montserrat-alternates-bold text-blue-80 text-[32px] my-8 md:mt-10 sm:mb-[16px] mb-[32px] leading-[normal]"
            v-html="h1.value"
          />
          <div v-if="myText" v-html="myText.value?.replace(/<a/g, `<a class='text-blue-80 underline'`).replace(/<ul>/g, `<ul class='list-disc  ml-[20px]'>`)"></div>
        </div>
      </div>

        <div v-if="myAccordion" class="container__list pb-4">
          <!-- item -->
          <div class="px-4 border-b md:px-0" v-for="(item, index) in myAccordion.items" :key="index">
            <details class="group my-4">
              <summary
                  class="py-2 flex flex-wrap items-center cursor-pointer transition duration-400 ease-out group-open:mb-[10px]"
                  @click="item.isOpen = !item.isOpen"
              >
                <span
                    class="text-blue-80 flex flex-1 !leading-[normal] group-hover:text-blue-90 transition duration-300 ease-in-out text-sm font-montserrat-alternates-medium">
                  {{ item.title }}
                </span>
                <span>
                <span v-if="!item.isOpen">
                  <icons-top-icon class="sm:block hidden" />
                  <icons-top-icon class="sm:hidden block" :width="16" :height="16" />
                </span>

                <span v-else>
                  <icons-down-icon class="sm:block hidden" />
                  <icons-down-icon class="sm:hidden block" :width="16" :height="16" />
                </span>
              </span>
              </summary>
              <template v-for="block in item.blocks" :key="block.value">
                <div
                    v-if="block.name == 'text'"
                    v-html="block.value?.replace(/<ul>/g, `<ul class='list-disc  ml-5'>`)?.replace(/<a>/g, `<a class='font-medium text-blue-80 hover:text-blue-100 underline underline-offset-[3px]'>`)" class="block-link mt-4 leading-[140%]"
                />
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
                <div v-else-if="block.name == 'htag'"
                     class="font-montserrat-alternates-bold leading-[140%]"
                     v-html="block.value?.replace(/<ul>/g, `<ul class='list-disc  ml-5'>`)">
                </div>
              </template>
            </details>
          </div>
        </div>
      </ClientOnly>

    </div>
  </div>
</template>

<style>
.block-link a {
  color: #015EFF;
  text-decoration-line: underline;
  font-size: 14px;
}

details > summary::-webkit-details-marker {
  display: none;
}
</style>
