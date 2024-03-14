<script setup>
const dataPage = ref([]);
const htags = reactive([]);
const myTexts = reactive([]);
useAsyncData('fetch', async () => {
  try {
    const { result } = await useApiFetch('static.page', {code: 'accessibility'});
    dataPage.value = result;

    const blocks = dataPage.value.element.blocks;
    blocks.forEach(block => {
        if (block.name === 'htag') {
            htags.push(block);
        } else if (block.name === 'my_text') {
            myTexts.push(block);
        }
    });

    useHead(result?.seo);
  } catch (e) {
    console.error(e);
  }
})
</script>
<template>
    <div class="font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage?.breadcrumbs || []" />

        <div class="sm:my-[72px] my-[56px]">
            <section class="xl:px-[370px] lg:px-40 md:px-32 px-4 sm:mb-[40px] mb-[56px]">
                <div v-for="(htag, key) in htags" :key="key"
                    :class="{
                        'sm:mb-[40px] mb-[56px]': key !== (htags.length - 1)
                    }">
                    <h1 v-if="htag.type == 'h1'"
                        class="leading-[normal] text-blue-80 sm:text-[44px] text-[32px] sm:mb-[16px] mb-[32px] font-montserrat-alternates-bold" v-html="htag.value">
                    </h1>
                    <h2 v-if="htag.type == 'h2'"
                        class="text-2xl text-blue-80 font-montserrat-alternates-bold sm:mb-[16px] mb-[20px] leading-[normal]" v-html="htag.value">
                    </h2>
                    <div
                        v-html="myTexts[key]?.value?.replace(/<ul>/g, `<ul class='list-disc ml-[20px]'>`)?.replace(/<a /g, `<a class='text-blue-90 hover:text-blue-100'`)"
                        class="text-[14px] text-black-40 leading-[24px] lg:w-[600px] w-auto font-montserrat-alternates-medium"
                    />
                </div>
            </section>
        </div>
    </div>
</template>
