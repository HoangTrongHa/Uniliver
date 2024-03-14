<script setup>
const dataPage = ref([])
useAsyncData('fetch', async () => {
  try {
    const data = await useApiFetch('static.page', {
      code: 'order-our-products-now'
    });
    if (data?.result) {
      dataPage.value = data.result;
      useHead(data.result?.seo);
    }

  } catch (e) {
    console.error(e);
  }
})

const openWebsiteCompany = link => {
  window.open(link, '_target')
}
</script>
<template>
    <div class="font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage.breadcrumbs" />
        <div class="sm:py-18 py-[56px]">
            <div class="sm:px-[56px] px-4">
                <h1 class="sm:text-[52px] text-[32px] leading-[normal] text-blue-80 font-montserrat-alternates-bold sm:mb-[40px] mb-[32px]">
                    {{ dataPage?.element?.name }}
                </h1>
                <ClientOnly>
                  <div
                      v-for="block in dataPage?.element?.blocks"
                      :key="block.id"
                      class="grid sm:grid-cols-4 grid-cols-2 sm:gap-x-6 gap-x-[15px] sm:gap-y-[3.2rem] gap-y-[1.1rem] font-montserrat-alternates-bold"
                  >
                    <Card
                        v-for="el in block.elementList"
                        :key="el.id"
                        :title="el.name"
                        title-class="cursor-pointer leading-[24px] font-montserrat-alternates-medium font-semibold"
                        image-class="cursor-pointer "
                        font="bold"
                        info=""
                        info-class="hidden"
                        :image="el.image"
                        @click="openWebsiteCompany(el.link)"
                    />
                  </div>
                </ClientOnly>

            </div>
        </div>
    </div>
</template>
