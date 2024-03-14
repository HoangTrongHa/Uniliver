<script setup>
const dataPage = reactive({})
const fillIcon = ref('#015EFF');

useAsyncData('fetch', async () => {
  try {
    dataPage.value = await useApiFetch('static.page', {code: 'compas'});
    console.log('dataPAGE', dataPage.value);
    useHead(dataPage.value?.result?.seo);

    blocks.value = dataPage.value?.result?.element?.blocks.slice(1,);

    const outputArray = [];
    let currentGroup = [];

    blocks.value.forEach((item) => {
      if (item.name === 'my_text' && item.color) {
        currentGroup.push(item);
      } else {
        if (currentGroup.length > 0) {
          outputArray.push(currentGroup);
          currentGroup = [];
        }
        outputArray.push(item);
      }
    });

    if (currentGroup.length > 0) {
      outputArray.push(currentGroup);
    }

    blocks.value = outputArray
  } catch (e) {
    console.error(e);
  }
})

const blocks = ref([]);

const maxWord = computed(() => {
  return (word, status) => {
    if (status) {
      return word;
    } else {
      const maxWords = 100;
      const words = word.split(' ');
      if (words.length <= maxWords) {
        return word;
      } else {
        const limitedWords = words.slice(0, maxWords).join(' ');
        return `${limitedWords}...`;
      }
    }
  }
})
</script>
<template>
  <div class="font-montserrat-alternates">
    <breadcrumbs :crumbs="dataPage.value?.result?.breadcrumbs" />

    <ClientOnly>
      <div class="flex flex-col">
        <div class="w-full mb-14 md:mb-18 relative grid grid-cols-1 items-center bg-cyan-50">
          <template v-for="element in dataPage.value?.result?.element?.blocks[0]?.elementList">
            <img
                class="md:block hidden w-full h-[480px] sm:h-[340px]"
                :src="element?.image"
                alt="Banner"
            >
            <img
                class="md:hidden block w-full h-full"
                :src="element?.mobile_image"
                alt="Banner"
            >
            <div class="absolute top-0 left-0 w-full h-full">
              <div class="w-auto md:w-[700px] z-10 flex flex-col sm:gap-6">
                <div
                    class="px-4 md:px-14 py-10 text-blue-80 text-[44px] text-2xl sm:text-5xl1 font-montserrat-alternates-bold leading-[normal]"
                    v-html="element?.text"
                />
              </div>
            </div>
          </template>
        </div>

        <div class="w-[700px] lg:w-3/4 mx-auto lg:mx-0 self-end flex flex-row flex-wrap pl-4 lg:pl-0 pr-4 lg:pr-14">
          <template v-for="block in blocks">
             <div
                v-if="Array.isArray(block)"
                class="w-full xl:w-auto max-w-[700px] relative flex flex-col text-base font-montserrat-alternates-medium mb-5 lg:mb-8"
            >
              <div
                  v-for="item in block"
                  class="xl:max-w-[289px] px-2 sm:min-h-[120px] min-h-[60px] sm:py-0 py-[6px] sm:text-base text-sm text-center flex items-center !font-semibold justify-center"
                  :style="`background-color: ${item?.color}`"
                  v-html="item?.value"
              />
            </div>

            <div
                v-if="block?.name === 'my_fields'"
                :style="`background-color: ${block?.color}`"
                class="xl:max-w-[289px] xl:max-h-[127px] p-6 hidden lg:block text-blue-80"
            >
              <h2
                  class="font-montserrat-alternates-bold text-2xl mb-1"
                  v-html="block?.items[0].value"
              />

              <nuxt-link
                  :to="block?.items[1].files[0].file.SRC"
                  target="_blank"
                  class="text-sm hover:text-blue-90 underline underline-offset-[3px] group font-montserrat-alternates font-medium"
              >
                  <span class="group flex items-start gap-1 font-montserrat-alternates-medium font-medium">
                      <icons-download-icon class="mt-0.5 min-w-[16px]" />
                      {{ block?.items[1].files[0].desc }}
                  </span>
              </nuxt-link>
            </div>

            <div
                v-else-if="block.name === 'htag' && block.type === 'h2'"
                class="h-auto w-full mb-5 md:mb-4"
            >
              <h2 class="max-w-[700px] text-2xl text-blue-80 font-montserrat-alternates-bold leading-[normal]">
                {{ block.value }}
              </h2>
            </div>

            <div
                v-else-if="block.name === 'my_text'"
                class="mb-10 sm:mb-10 h-auto w-full lg:w-2/3 max-w-[700px] mr-5 font-montserrat-alternates-medium"
            >
              <div class="lg:max-w-[700px]">
                <div
                    class="text-sm text-black-40 font-medium leading-[140%] lg:max-w-[600px] xs:w-[340px] w-auto h-auto block-link"
                    v-html="maxWord(block?.value || '', block.isShow)"
                />
              </div>

              <div v-if="!['my_image', 'my_quote'].includes(block?.name) && block?.value?.length > 1000"
                   @click="block.isShow = !block.isShow"
                   @mouseenter="fillIcon = '#1F35C6'"
                   @mouseleave="fillIcon = '#015EFF'"
                   class="cursor-pointer flex gap-1 text-blue-80 text-xs underline font-montserrat-alternates font-medium items-center hover:text-blue-90 transition duration-300 ease-in-out my-5">
                <p>
                  {{  !block?.isShow ? 'Показать больше' : 'Показать меньше' }}
                </p>
                <icons-top-icon v-if="!block.isShow" :width="12" :height="12" :fill="fillIcon" />
                <icons-down-icon v-else :width="12" :height="12" :fill="fillIcon" />
              </div>
            </div>

            <div v-if="block?.name === 'my_quote'" class="lg:w-2/3 max-w-[700px] bg-black-10 sm:p-6 px-3 py-8 mb-4">
              <div class="flex justify-start">
                <icons-comma-left />
              </div>
              <div v-if="block.text.value.length">
                <div class="text-base text-blue-80 leading-[24px] font-montserrat-alternates-bold p-1"
                     v-html="block?.text.value">
                </div>
              </div>
              <div class="flex justify-end mb-2">
                <icons-comma-right />
              </div>
              <div v-if="block.description.value.length">
                <div class="text-black-40 text-xs leading-[normal] sm:px-0"
                     v-html="block?.description?.value"></div>
              </div>
            </div>

            <div v-else-if="block?.name == 'my_image'" class="relative my-5 sm:my-10 w-full">
              <img
                  :src="block?.file?.SRC"
                  :width="block?.file?.WIDTH"
                  :height="block?.file?.HEIGHT"
                  class="w-full max-w-[800px] ml-[-4rem]"
                  alt="Image"
              >
            </div>
          </template>

          <div
              v-if="blocks?.length && blocks[2]?.name === 'my_fields'"
              :style="`background-color: ${blocks[2]?.color}`"
              class="w-full lg:max-w-[700px] lg:mr-5 p-6 block lg:hidden mb-5"
          >
            <h2 class="font-montserrat-alternates-bold text-2xl text-blue-80 mb-1">{{
                blocks[2]?.items[0].value
              }}
            </h2>
            <nuxt-link
                :to="blocks[2]?.items[1].files[0].file.SRC"
                target="_blank"
                class="text-sm text-blue-80 underline group font-montserrat-alternates font-medium"
            >
                  <span class="group flex items-start gap-1 font-montserrat-alternates-medium font-medium">
                      <icons-download-icon class="mt-0.5 min-w-[16px]" />
                      {{ blocks[2]?.items[1].files[0].desc }}
                  </span>
            </nuxt-link>
          </div>
        </div>
      </div>


    </ClientOnly>
  </div>
</template>

<style scoped>
.block-link a {
  color: #015EFF;
  text-decoration: underline;
}
</style>
