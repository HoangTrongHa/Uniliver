<script setup>
const router = useRouter();
const dataPage = ref([]);

try {
  await router.isReady();
  const response = await useApiFetch('static.page?code=official-information');
  dataPage.value = response?.result;
  useHead(response.result?.seo);
} catch (error) {
  console.error(error);
}
const downloadFile = item => {
  // Создаем временную ссылку для скачивания файла
  const link = document.createElement('a');
  link.href = item.src;
  link.download = item.description; // Оставьте пустым, чтобы браузер сам назначил имя файла
  link.target = '_blank'; // Открываем ссылку в новой вкладке (опционально)
  link.rel = 'noopener noreferrer'; // Рекомендуется для безопасности

  // Симулируем клик на ссылку для скачивания
  link.click();

  // Удаляем временную ссылку
  document.body.removeChild(link);
}
</script>

<template>
  <div class="font-montserrat-alternates">
    <breadcrumbs :crumbs="dataPage?.breadcrumbs || []" />
    <div class="sm:py-[72px] py-[56px] text-[#858380] px-4 max-w-[900px] mx-auto">
      <h1
          v-if="dataPage?.element?.name"
          class="mb-[16px] sm:text-5xl text-4xl text-blue-80 font-montserrat-alternates-bold leading-[normal]"
      >
        {{ dataPage.element.name }}
      </h1>

      <div v-for="(block, index) in dataPage?.element?.blocks || []" :key="block?.id">
        <h1
            v-if="block?.type === 'h1'"
            class="mb-[16px] sm:text-[44px] text-[32px] text-blue-80 font-montserrat-alternates-bold leading-[normal] sm:px-0 px-4"
            :class="{ 'mt-[32px]': Boolean(index) }"
        >
          {{ block?.value }}
        </h1>
        <h2
            v-else-if="block?.type === 'h2'"
            class="mt-[32px] mb-[16px] text-[24px] text-blue-80 font-montserrat-alternates-bold leading-[normal] sm:px-0 px-4"
        >
          {{ block?.value }}
        </h2>

        <template v-if="block.name === 'my_medialib_pdf'">
          <a
              v-for="el in block.elementList"
              :key="el.id"
              :href="el.src"
              download
              target="_blank"
              class="cursor-pointer flex sm:gap-1 gap-[8px] items-center text-sm text-blue-80 underline sm:mb-3 mb-2 group"
          >
            <button @click.stop="downloadFile(el)">
              <icons-download-icon class="w-[20px] sm:mr-0 mr-[2px]" />
            </button>

            {{ el.description }}
          </a>
        </template>

        <div v-if="block?.name === 'my_accordion'">
          <accordion
              v-for="(item, idx) in block?.items"
              :key="item?.title"
              :title="item?.title"
              info=""
              :styles="{
                        article: idx < block.items?.length -1 && 'border-b-[1px]' || '',
                        header: {
                            default: 'pt-[8px] pb-[24px]',
                            title: 'text-sm text-blue-80 leading-[normal] font-montserrat-alternates-medium'
                        },
                        content: {
                            text: 'text-sm text-black-40 font-montserrat-alternates-medium'
                        }
                    }"
              class="sm:mb-[16px] mb-[13px]"
          >
            <template #info>
              <div
                  v-for="blockChild in item?.blocks"
                  :key="blockChild.name"
              >
                <template v-if="blockChild.name === 'my_medialib_pdf'">
                  <a
                      v-for="el in blockChild.elementList"
                      :key="el.id"
                      :href="el.src"
                      download
                      target="_blank"
                      class="cursor-pointer flex sm:gap-1 gap-[8px] items-center text-sm text-blue-80 underline sm:mb-3 mb-2 group"
                  >
                    <button @click.stop="downloadFile(el)">
                      <icons-download-icon class="sm:w-auto w-1/12 sm:mr-0 mr-[2px]" />
                    </button>

                    {{ el.description }}
                  </a>
                </template>

                <template v-if="blockChild.name === 'my_accordion'">
                  <accordion
                      v-for="(item2, idx2) in blockChild?.items"
                      :key="item2?.title"
                      :title="item2?.title"
                      icon="md"
                      info=""
                      :styles="{
                        article: idx2 < blockChild.items?.length -1 && 'border-b-[1px]' || '',
                        header: {
                            default: 'pt-[8px] pb-[24px]',
                            title: 'text-sm text-blue-80 leading-[normal] font-montserrat-alternates-medium'
                        },
                        content: {
                            text: 'text-sm text-black-40 font-montserrat-alternates-medium'
                        }
                    }"
                      class="sm:mb-[16px] mb-[13px]"
                  >
                    <template #info>
                      <div
                          v-for="blockChild2 in item2?.blocks"
                          :key="blockChild2.name"
                      >
                        <template v-if="blockChild2.name === 'my_medialib_pdf'">
                          <a
                              v-for="el2 in blockChild2.elementList"
                              :key="el2.id"
                              :href="el2.src"
                              download
                              target="_blank"
                              class="cursor-pointer flex sm:gap-1 gap-[8px] items-center text-sm text-blue-80 underline sm:mb-3 mb-2 group"
                          >
                            <button @click.stop="downloadFile(el2)">
                              <icons-download-icon class="sm:w-auto w-1/12 sm:mr-0 mr-[2px]" />
                            </button>

                            {{ el2.description }}
                          </a>
                        </template>

                        <template v-if="blockChild2.name === 'my_accordion'">
                          <a
                              v-for="el3 in blockChild2.elementList"
                              :key="el3.id"
                              :href="el3.src"
                              download
                              target="_blank"
                              class="cursor-pointer flex sm:gap-1 gap-[8px] items-center text-sm text-blue-80 underline sm:mb-3 mb-2 group"
                          >
                            <button @click.stop="downloadFile(el3)">
                              <icons-download-icon class="sm:w-auto w-1/12 sm:mr-0 mr-[2px]" />
                            </button>

                            {{ el3.description }}
                          </a>
                        </template>
                      </div>
                    </template>
                  </accordion>
                </template>
              </div>
            </template>
          </accordion>
        </div>

        <div
            v-if="block.name === 'my_text'"
            v-html="block.value?.replace(/<a/g, `<p class='gap-1 mt-4 flex flex-row align-baseline content-baseline items-baseline leading-[140%]'><span class='self-center'><svg width='16' height='16' viewBox='0 0 12 13' fill='#015EFF' xmlns='http://www.w3.org/2000/svg'>
        <g id='icon l'>
          <path id='Vector' d='M4.30615 3.16657L8.84882 6.49889L4.30615 9.8312V3.16657Z' fill='#015EFF' stroke='#015EFF'/>
        </g>
        </svg> </span> <a class='text-blue-80 underline'`)"
            class="show-content-response mt-4 max-w-[600px] lg:max-w-[800px]"
        />
      </div>
    </div>
  </div>
</template>
