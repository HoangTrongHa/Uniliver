<script setup>
const dataPage = ref([])
useAsyncData('fetch', async () => {
  try {
    const { result } = await useApiFetch('static.page', {
      code: 'contracts'
    });
    dataPage.value = result;
    useHead(result?.seo);
  } catch (e) {
    console.error(e);
  }
})
</script>

<template>
    <div class="font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage?.breadcrumbs || []" />

        <div class="sm:py-[72px] py-[56px] sm:px-14 px-4">
          <h1
              class="sm:text-[52px] text-[32px] text-blue-80 font-montserrat-alternates-bold leading-[normal] sm:mb-[40px] mb-[32px]">
              {{ dataPage?.name || 'Правовой портал' }}
          </h1>

          <ClientOnly>
            <div
                v-for="block in dataPage.element?.blocks"
                :key="'block_' + block.id"
                class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:gap-x-6 gap-x-[25px] sm:gap-y-[40px] gap-y-[25px]"
            >
              <Card
                v-for="element in block.elementList"
                :key="'element_' + element.id"
                class="gap-0"
                :image="element.image"
                :title="element.name"
                title-class="leading-[24px] sm:-mt-1 mt-0 font-montserrat-alternates-medium font-[600]"
                info=""
                :link="`/our-company/contracts/${element.code}`"
                info-class="sm:pb-[15px] mb-0"
              />
            </div>
          </ClientOnly>
        </div>
    </div>
</template>
