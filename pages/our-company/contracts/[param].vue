<script setup>
const router = useRouter()
const route = useRoute()
const dataPage = ref([])
try {
  await router.isReady()
  const response = await useApiFetch('legal.element', {code: route.params.param});
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
    <div class="mx-auto max-w-[900px] sm:py-[72px] mt-[56px] px-4">
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
            class="mt-[32px] mb-[16px] text-[24px] text-blue-80 font-montserrat-alternates-bold leading-[normal]"
        >
          {{ block?.value }}
        </h2>

        <h3
            v-else-if="block?.type === 'h3'"
            class="mt-[32px] mb-[16px] text-[16px] text-blue-80 font-montserrat-alternates-bold leading-[normal]"
        >
          {{ block?.value }}
        </h3>

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
                            title: 'text-sm text-blue-80 leading-[normal] font-montserrat-alternates-medium',
                            button: !item.blocks.length && 'hidden' + ' min-w-[16px]'

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
                      class="cursor-pointer flex gap-2 sm:gap-1 items-center text-sm text-blue-80 hover:text-blue-100 underline sm:mb-3 mb-2 group"
                  >
                    <button @click.stop="downloadFile(el)">
                      <icons-download-icon class="sm:w-auto min-w-[16px] sm:mr-0 mr-[2px]" />
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
                            title: 'text-sm text-blue-80 leading-[normal] font-montserrat-alternates-medium',
                            button: !item.blocks.length && 'hidden' + ' min-w-[16px]'
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
                              class="cursor-pointer flex sm:gap-1 gap-[8px] items-center text-sm text-blue-80 hover:text-blue-100 underline sm:mb-3 mb-2 group"
                          >
                            <button @click.stop="downloadFile(el2)">
                              <icons-download-icon class="min-w-[16px] sm:mr-0 mr-[2px]" />
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
                              class="cursor-pointer flex sm:gap-1 gap-[8px] items-center text-sm text-blue-80 hover:text-blue-100 underline sm:mb-3 mb-2 group"
                          >
                            <button @click.stop="downloadFile(el3)">
                              <icons-download-icon class="min-w-[16px] sm:mr-0 mr-[2px]" />
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
      </div>
    </div>
  </div>
</template>
