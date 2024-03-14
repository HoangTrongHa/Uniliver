<script setup>
import { useBreadcrumbStore } from '~/stores/breadcrumbs';

const breadcrumbStore = useBreadcrumbStore();
useHead({
  title: 'Условия использования'
})
const dataPage = ref({});
useAsyncData('fetch', async () => {
  try {
    dataPage.value = await useApiFetch('static.page', {code: 'legal'});
    breadcrumbStore.setSetting({
      breadcrumbs: dataPage.value?.result?.breadcrumbs,
      currentPath: "/terms",
      advanced: false,
      keyword: ""
    });
  } catch (e) {
    console.error(e);
  }
});

</script>

<template>
  <breadcrumbs :crumbs="dataPage?.result?.breadcrumbs || []"></breadcrumbs>
  <!-- main politics -->
  <div class="max-w-[700px] mx-4 sm:mx-auto my-[56px] lg:my-[72px]">
    <div
        v-for="(item, key) in dataPage.result?.element?.blocks" :key="key + 'terms'"
    >
      <h1
          v-if="item.type === `h1`"
          class="font-montserrat-alternates-bold !text-[32px] lg:!text-[44px]"
          v-html="item.value"
      >
      </h1>
      <h2
          v-else-if="item.type === `h2`"
          class="font-montserrat-alternates-bold mt-[56px] lg:mt-[40px]"
          v-html="item.value"
      >
      </h2>
      <div
          v-else
          v-html="item?.value?.replace(/<a/g, `<a class='text-blue-80'`)"
          class="text-[#858380] font-montserrat-alternates-medium text-sm !font-medium lg:mt-[16px] mt-[30px] leading-[140%]"
      >

      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 44px;
  font-weight: bold;
  line-height: normal;
  color: #015EFF;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  color: #015EFF;
}
</style>