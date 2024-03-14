<script setup>
const dataPage = reactive({})
const myBanners = reactive({
  1: [],
  2: null,
  3: null,
  4: null,
});
const buttonLinks = reactive([]);

const h2 = ref(null);

useAsyncData('fetch', async () => {
  try {
    dataPage.value = await useApiFetch('static.page', {code: 'sitemap'})

    if (dataPage.value) {
      useHead(dataPage.value?.result?.seo)

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
          buttonLinks.push(block)
        } else {
          blocksMap.set(block.name, block);
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
});

</script>

<template>
  <div class="font-montserrat-alternates">
    <Breadcrumbs :crumbs="dataPage?.value?.result?.breadcrumbs || []" />

    <ClientOnly>
      <div class="px-4 md:px-8 lg:px-16 py-8 md:py-16">

        <h1 class="text-[32px] leading-[39px] 2xl:text-[53px] whitespace-nowrap text-blue-80 font-montserrat-alternates-bold font-bold">
          {{ dataPage?.value?.result?.element?.name }}
        </h1>

        <div
          v-for="block in dataPage?.value?.result?.element?.blocks"
          :key="block"
        >
          <div v-for="element in block.elementList" class="my-10">
            <h2 class="font-montserrat-alternates-bold text-2xl text-blue-80 mb-1">
              {{ element.title }}
            </h2>
            <div class="flex flex-row flex-wrap font-montserrat-alternates-normal text-sm font-normal gap-x-5">
              <div v-for="blockChild in element.blocks" class="mt-4 w-[317px]">
                <nuxt-link
                    :to="blockChild.link"
                    class="text-blue-80 hover:underline underline-offset-[3px]"
                >
                  {{ blockChild.name }}
                </nuxt-link>
              </div>
            </div>

          </div>
          <br/>
        </div>
      </div>

    </ClientOnly>
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