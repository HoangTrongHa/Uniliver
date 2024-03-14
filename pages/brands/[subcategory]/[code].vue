<script setup>
const route = useRoute();
const dataPage = ref({});

useAsyncData('fetch', async () => {
    try {
        const { result } = await useApiFetch('brands.element', {code: route.params.code});
        dataPage.value = result;
        useHead(dataPage.value?.seo);
    } catch (e) {
        console.error(e);
    }
})

</script>
<template>
  <div class="font-montserrat-alternates">
      <breadcrumbs :crumbs="dataPage?.breadcrumbs || []" />

      <h1>{{ dataPage.name }}</h1>

      <div class="block sm:mb-[40px] mb-[32px]">
        <img
          :src="dataPage?.element?.blocks[0]?.elementList[0]?.image" :alt="dataPage?.element?.name"
          class="w-full h-full hidden sm:block"
        />
        <img
          :src="dataPage?.element?.blocks[0]?.elementList[0]?.mobile_image" :alt="dataPage?.element?.name"
          class="w-full h-full sm:hidden"
        />
      </div>

      <div class="xl:px-[370px] lg:px-40 md:px-32 px-4 mb-[56px] md:mx-auto">
          <div class="text-black-40 text-sm sm:mb-[40px] mb-[32px] sm:w-[578px] md:mx-auto flex flex-row flex-wrap">
            <template
                v-for="block in dataPage?.element?.blocks"
                :key="block"
            >
              <div
                v-if="block.name === 'my_text' || block.name === 'text'"
                v-html="block?.value?.replace(/<h2>/g, `<h2 class='font-montserrat-alternates-bold text-2xl text-blue-80 sm:mb-[16px] mb-[20px]'>`).replace(/<ol>/g, `<ol class='list-decimal ml-3'>`).replace(/<ul>/g, `<ul class='list-disc ml-3'>`).replace(/<li>/g, `<li class='font-montserrat-alternates-medium font-medium'>`).replace(/<a/g, `<a class='text-blue-80 underline'`).replace(/<p/g, `<p class='font-montserrat-alternates-medium font-medium'`)"
                class="sm:w-[578px] show-content-response"
              />

              <nuxt-link
                v-if="block.name === 'my_button_link'"
                :to="block.url"
                :target="block.target"
                class="mr-2 hover:bg-[#0CC5F0] w-full sm:w-auto mt-4 flex gap-3 items-center justify-center py-[12px] px-[14px] leading-[140%] text-sm font-montserrat-alternates-medium font-medium"
                :class="{
                  'text-blue-80 bg-cyan-50': block.type === 'primal',
                  'text-white bg-blue-90': block.type === 'secondary'
                }"
              >
                {{ block.title || 'Перейти на сайт бренда' }}
                <IconsLeftIcon
                    :stroke="block.type === 'secondary' && '#fff' || undefined"
                    :fill="block.type === 'secondary' && '#fff' || undefined"
                />
              </nuxt-link>

              <div v-if="block.type === 'primal'" class="w-full" />
            </template>
          </div>
      </div>
  </div>
</template>
<style scoped>
.show-content-response li,
.show-content-response p {
  line-height: 140%;
  margin-bottom: 0.75rem;
  color: #a5a4a2;
  font-weight: inherit;
  font-family: Montserrat Alternates Medium;
}
.show-content-response li strong {
  font-family: Montserrat Alternates Bold;
  font-weight: inherit;
}
.show-content-response p a{
  color: #015EFF;
}
.show-content-response p a:hover {
  text-decoration: underline;
}
</style>

