<script setup>
import ButtonLink from "~/components/Common/ButtonLink.vue";

const route = useRoute();
const router = useRouter();


const dataPage = ref([]);
const listManagers = ref([]);
useAsyncData('fetch', async () => {
  try {
    if (!route?.query?.code) {
      await router.push('/our-company/our-leadership');
    } else {
      const response = await useApiFetch('static.page', {
        code: 'our-leadership'
      });
      listManagers.value = response.result.elementList;
      await router.isReady()

      const { result } = await useApiFetch('leadership.element',  {code: route.query.code});
      dataPage.value = result;


      useHead(result?.seo);
    }
  } catch (e) {
    console.error(e);
  }
})

const indexManager = computed(() => {
  return listManagers?.value?.findIndex(manager => manager.code === route.query.code) || 0
})

const previousManager = computed(() => {
  return listManagers?.value[indexManager.value > 0 ? indexManager.value - 1 : listManagers.value.length - 1]
})

const nextManager = computed(() => {
  return listManagers?.value[indexManager.value < listManagers.value.length - 1 ? indexManager.value + 1 : 0]
})
</script>

<template>
    <div class="font-montserrat-alternates-medium">
        <breadcrumbs :crumbs="dataPage?.breadcrumbs" />
        <section class="mx-auto max-w-[900px] sm:pt-18 pt-[56px] text-sm px-4">
            <div class="sm:mb-6 mb-7 md:px-16 px-4">
                <h1
                    class="text-blue-80 sm:text-[44px] text-[32px] font-montserrat-alternates-bold pb-3 border-b leading-[normal]">
                    {{ dataPage?.element?.name }}

                </h1>
                <p class="text-sm font-montserrat-alternates-medium text-blue-80 sm:pt-4 pt-3 leading-[140%]">
                    {{ dataPage?.element?.job_title }}
                </p>
            </div>
            <div class="sm:mb-[40px] mb-[32px] block lg:hidden">
                <img 
                    class="w-full" 
                    :src="dataPage?.element?.image"
                    :alt="dataPage?.element?.name"
                >
            </div>
            <div 
                v-for="item in dataPage?.element?.blocks"
                class="sm:mb-[40px] mb-[32px]"
            >
                <img 
                    v-if="item?.file?.ORIGIN_SRC"
                    class="w-full hidden lg:block"
                    :src="item?.file?.ORIGIN_SRC "
                    alt="Picture"
                />
            </div>
            
            <div
                v-for="item in dataPage?.element?.blocks"
                :key="item"
                class="md:px-16 px-4"
            >
                <div 
                    v-html="item.value?.replace(/<ul>/g, `<ul class='list-disc  ml-[20px]'>`)
                        .replace(/<a/g, `<a class='text-blue-80 underline'`).replace(/<li>/g, `<li class='font-montserrat-alternates-medium font-medium'>`)"
                    class="sm:mb-[40px] mb-[32px] show-content-response "
                >
                </div>
            </div>
        </section>

      <section class="w-full">
        <div class="grid grid-cols-2">
          <button-link
              :text="'Назад: ' + previousManager?.name"
              :link="`/our-company/our-leadership/${previousManager?.id}?code=${previousManager?.code}`"
              :underline="false"
              :left="true"
              :size="12"
              class-name="text-left flex items-center !justify-start py-4 pl-4 gap-1 border text-xs text-blue-80 hover:text-blue-700 group font-montserrat-alternates-medium font-medium"
              fill-hovered="text-blue-90"
          >

          </button-link>

          <button-link
              :text="'Далее: ' + nextManager?.name"
              :link="`/our-company/our-leadership/${nextManager?.id}?code=${nextManager?.code}`"
              :underline="false"
              :size="12"
              class-name="text-right flex items-center !justify-end py-4 pr-4 gap-1 border text-xs text-blue-80 hover:text-blue-700 group font-montserrat-alternates-medium font-medium"
              fill-hovered="text-blue-90"
          >

          </button-link>
        </div>
      </section>
</div>
</template>

<style>
    .show-content-response h2 {
        font-size: 1.5rem;
        color: #015eff;
        font-weight: inherit;
        font-family: Montserrat Alternates Bold;
        margin-bottom: 1rem;
        margin-top: 40px;
    }
    .show-content-response li,
    .show-content-response p {
        line-height: 140%;
        margin-bottom: 0.75rem;
        color: #a5a4a2;
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
