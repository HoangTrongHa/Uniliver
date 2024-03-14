<script setup>
import DownloadIcon from "~/components/icons/Download-icon.vue";

const title = ref('')
const myFields = ref('')
const body = ref([])
const itemFile = ref([])
const listBreadcrumbs = ref([])

useAsyncData("fetch", async () => {
  const res = await useApiFetch('static.page', {
    code: 'purpose-and-principles'
  });
  body.value = res.result.element.blocks.filter((item) => item.type !== 'h1')
  itemFile.value = res.result.element.blocks.find((item) => item.name === 'my_accordion')?.items
  title.value = res.result.element.blocks?.find((item) => item.type === 'h1')?.value
  myFields.value = res.result.element.blocks?.find((item) => item.name === 'my_fields')?.items
  listBreadcrumbs.value = res.result.breadcrumbs
  useHead(res.result?.seo)
});
</script>
<template>
  <div class="font-montserrat-alternates">
    <breadcrumbs :crumbs="listBreadcrumbs || []" />

    <div class="flex flex-col lg:flex-row sm:py-18 py-[56px] lg:px-14 px-4 mx-auto justify-center">
      <div class="hidden xl:block xl:w-[370px]" />
      <div class="max-w-[700px] sm:mb-10 mb-8 mx-auto lg:mx-0">
        <div class="sm:mb-5 mb-8">
          <h1 class="w-[700px] sm:text-[44px] text-[32px] text-blue-80 font-montserrat-alternates-bold leading-[normal]">
            {{ title }}
          </h1>
        </div>

        <div class="flex sm:flex-row flex-col sm:gap-x-24 gap-0">
            <div class="w-full">
              <template v-for="item in body" :key="item.type">
                <h2
                  v-if="item.type === 'h2'"
                  class="text-blue-80 text-2xl font-montserrat-alternates-bold sm:mb-4 my-[20px] leading-[normal]"
                >
                  {{ item.value }}
                </h2>
                <p
                  v-if="item.type !== 'h2' || item.type !=='h2'"
                  v-html="item.value?.replace(/<ul>/g, `<ul class='list-disc  ml-[20px]'>`)"
                  class="max-w-[600px] text-sm text-black-40 font-montserrat-alternates-medium leading-[140%] w-auto"
                />
              </template>
            </div>
          </div>
        <div class="accordion flex flex-col items-center justify-center">
            <div class="w-full sm:pt-1 p-0" :class="index < 2 ? 'mb-3' : ''" v-for="(item, index) in itemFile"
                 :key="item.title">
              <input class="md:px-0 px-4 hidden" type="checkbox" name="panel" :id="`panel-${index}`">
              <label :for="`panel-${index}`"
                     class="md:px-0 px-4 relative block bg-white text-blue-80 text-sm font-montserrat-alternates-medium pt-2 pb-6 border-b-2">
                {{ item.title }}
              </label>
              <template v-if="item.blocks.length">
                <div v-for="file in item.blocks" class="accordion__content sm:p-0 px-4 overflow-hidden">
                  <p v-if="file.name ==='text'"
                     class="text-sm text-black-40 font-montserrat-alternates-medium mb-4 sm:block max-w-[600px]"
                     v-html="file.value?.replace(/<ul>/g, `<ul class='list-disc ml-[20px]'>`)">
                  </p>
                  <template v-else>
                    <nuxt-link
                        v-for="link in file.files"
                        :key="link.file.ORIGINAL_NAME"
                        :to="link.file.SRC"
                        target="_blank"
                        class="flex sm:gap-1 gap-[8px] items-center text-sm text-blue-80 underline font-montserrat-alternates font-medium sm:mb-4 mb-2"
                    >
                      <img src="/image/icon/download-blue.svg" alt="Загрузить файл" />
                      {{ link.file.ORIGINAL_NAME }}
                    </nuxt-link>
                  </template>
                </div>
              </template>
            </div>
          </div>
      </div>
      <div class="w-full lg:max-w-[700px] mx-auto lg:mx-0 lg:ml-5">
        <div class="w-full max-w-[700px] lg:max-w-[343px] lg:mb-0 mt-0 lg:mt-48 mx-auto lg:mx-0 ">
          <div class="p-5 bg-black-10 lg:ml-3 ml-0">
            <h3 class="font-montserrat-alternates-bold text-2xl text-blue-80 mb-2">
              {{  myFields[0]?.value }}
            </h3>
            <div
                v-for="item in myFields[1]?.files"
                :key="item.file?.ORIGINAL_NAME"
                class="text-sm text-blue-80 underline font-montserrat-alternates font-medium"
            >
              <span class="flex items-start mb-1 gap-1 hover:text-blue-90">
                <DownloadIcon class="min-w-[16px]" />

                <nuxt-link
                  :to="item.file?.SRC"
                  type="download"
                  target="_blank"
                  class="sm:block cursor-pointer"
                >
                  {{ item.desc }}
                </nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  max-width: 600px;
}
.accordion label:not(:checked)::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 5px;
  right: -4px;
  width: 24px;
  height: 24px;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.9998 17.8878L3.36138 6.11182L20.6382 6.11182L11.9998 17.8878Z" fill="%23015EFF"/></svg>');
  background-size: cover;
}

@media all and (max-width: 767px) {
  .accordion label:not(:checked)::after {
    right: 1rem !important;
  }
}


.accordion input:checked + label:after {
  border-bottom-width: 0px !important;
  width: 20px;
  height: 1px;
  right: 0;
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12.0002 6.11218L20.6386 17.8882L3.36182 17.8882L12.0002 6.11218Z' fill='%23015EFF'/%3E%3C/svg%3E");
}

@media all and (max-width: 375px) {
  .accordion label:not(:checked)::after {
    top: 8px;
    right: -2px;
    width: 16px;
    height: 17px;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.9998 17.8878L3.36138 6.11182L20.6382 6.11182L11.9998 17.8878Z" fill="%23015EFF"/></svg>');
  }

  .accordion input:checked + label:after {
    width: 16px;
    height: 1px;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='17' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12.0002 6.11218L20.6386 17.8882L3.36182 17.8882L12.0002 6.11218Z' fill='%23015EFF'/%3E%3C/svg%3E");
  }
}


.accordion input:checked + label {
  border-bottom-width: 0px !important;
}

.accordion .accordion__content {
  max-height: 0em;
  transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}

.accordion input[name='panel']:checked ~ .accordion__content {
  max-height: 50em;
}
</style>
