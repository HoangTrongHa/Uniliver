<script setup>
const dataPage = ref({})
const h1 = ref(null);
const h2 = ref(null);
const myText = ref(null);
const myAccordion = ref(null);

useAsyncData('fetch', async () => {
  try {
    dataPage.value = await useApiFetch('static.page', {code: 'faq'})
    useHead(dataPage.value?.result?.seo)

    const blocks = dataPage.value.result.element.blocks;
    const blocksMap = new Map();
    blocks.forEach(block => {
        if (block.type === 'h1') {
            h1.value = block;
        } else if (block.type === 'h2') {
            h2.value = block;
        } else {
            blocksMap.set(block.name, block);
        }
    });

    myText.value = blocksMap.get('my_text');
    myAccordion.value = blocksMap.get('my_accordion');

  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
    <!-- main FAQ -->
    <div id="faq" class="font-montserrat-alternates-medium text-black-40 text-sm">
        <breadcrumbs :crumbs="dataPage?.result?.breadcrumbs || []" />

        <div class="my-14 md:my-18 md:px-32 lg:px-40 xl:px-[370px]">
            <div class="px-4 md:pl-0">
                <h1 class="font-montserrat-alternates-bold text-blue-80 text-[32px] md:text-[44px]">{{ h1?.value }}</h1>
                <p v-html="myText?.value" class="text-base font-semibold mt-8 md:mt-4"></p>
                <h2 class="font-montserrat-alternates-bold text-blue-80 text-[24px] mt-14 pb-[5px] md:mt-10 xl:pb-0">{{ h2?.value }}</h2>
            </div>
            <div v-for="item, key in myAccordion?.items" :key="key"
                class="p-4 border-b md:px-0">
                <details class="group">
                    <summary class="list-none flex flex-wrap md:items-center cursor-pointer py-[6.5px]  xl:py-[7.5px] group">
                        <p class="text-blue-80 flex flex-1 mr-2 md:mr-8 group-hover:text-blue-90 transition duration-300 ease-in-out">{{ item.title }}</p>
                        <div
                            class="w-4 h-4 xl:w-6 xl:h-6 flex items-center justify-center transition duration-400 ease-out group-open:rotate-180">
                            <icons-top-icon />
                        </div>
                    </summary>
                    <div class="mt-4 md:pr-[100px]">
                        <div v-for="block, key1 in item.blocks" :key="key1" v-html="block?.value?.replace(/<a/g, `<a class='text-blue-80'`)"></div>
                    </div>
                </details>
            </div>
        </div>
    </div>
</template>

<style scoped>
#faq {
    line-height: normal;
}
</style>
