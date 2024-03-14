<script setup>
const route = useRoute()
let dataPage = reactive({})
let dataCardPage = reactive({})


const more = ref(false)

try {
    dataPage = await useApiFetch('news.element', {code: route.params.param});

    dataCardPage = await useApiFetch('news.main');

    useHead(dataPage?.result?.seo || { title: dataPage?.result?.element[0].name});
} catch (e) {
    console.error(e);
}

const getOrderedArticle = (items = []) => {
  let listArticle = []
  let currentArticle = []
  let validsName = ["htag", "my_image", "my_text"]
  items.forEach((item)=>{
    if(validsName.includes(item.name)) {
        currentArticle = [...currentArticle, item]
    }
    if(currentArticle.length === 3) {
      listArticle.push(currentArticle)
      currentArticle = []
    }
  })

  return listArticle
}

const getItemsByOnTheFields = (items = []) => {
  let listItems = []
  let htag = items?.find(obj => obj?.name === 'htag')
  let my_video = items?.find(obj => obj?.name === 'my_video')
  let my_text = items?.find(obj => obj?.name === 'my_text')
  let my_image = items?.find(obj => obj?.name === 'my_image')
  listItems = [htag,  my_text, my_video ?? my_image]
  return listItems
}
const embedYoutubeUrl = (url) => {
    const videoId = url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
}
</script>

<template>
  <div>
    <breadcrumbs :crumbs="dataPage?.result?.breadcrumbs?.length && dataPage?.result?.breadcrumbs || dataCardPage?.result?.breadcrumbs || []" />
    <ClientOnly>
      <div
          v-for="(element, index) in dataPage?.result?.element || []"
          :key="index"
          class="font-montserrat-alternates-medium max-w-[800px] px-4 md:m-auto"
      >
        <div class="py-[56px] sm:py-18 max-w-[800px] m-auto">
          <div class="mb-6 max-w-[700px] m-auto">
            <h1 class="text-blue-80 text-3xl font-montserrat-alternates-bold sm:pb-4 pb-3 border-b-2">
              {{ element?.name }}
            </h1>
            <div class="w-full h-auto flex mt-5 mb-3 font-montserrat-alternates-medium font-medium">
              <span class="text-xs text-black-40 leading-4 mr-6">
                {{ element?.active_from }}
              </span>
              <span class="inline-flex items-center">
                  <span class="w-4 h-4 mr-2">
                      <icons-clock-icon />
                  </span>
                  <span class="text-xs text-black-40 leading-4">
                    {{ element.read_time + (element.read_time === 1 ? " минуту" : element.read_time < 5 ? " минуты" : " минут") }}
                  </span>
              </span>
            </div>
          </div>
          <div
              v-for="block in element.blocks"
              :key="block"
          >
            <div v-if="block.file">
              <img
                  class="w-full mt-8 sm:mt-10"
                  :src="block.file.SRC"
                  :alt="block.file.SRC"
                  :width="block.file.WIDTH"
                  :height="block.file.height"
              />
            </div>

            <div class="w-full max-w-[700px] h-auto m-auto mt-8 sm:mt-10">
              <div v-if="block.url">
                <iframe
                    :src="embedYoutubeUrl(block.url)"
                    :width="block.width"
                    :height="block.height"
                    frameborder="0"
                    allowfullscreen
                />
              </div>
              <div v-if="block.type">
                <template v-if="block.type === 'ordered'">
                  <div>
                    <h3 class="text-2xl text-blue-80 font-montserrat-alternates-bold mb-4">
                      The purpose that powers it
                    </h3>
                    <div v-for="(article, index) in getOrderedArticle(block?.items)" class="w-full flex mb-10">
                      <div class="w-8 flex flex-col items-center">
                        <span
                            class="w-8 h-10 shrink-0 text-[#20A980] flex items-center justify-center text-[40px] font-montserrat-alternates-bold font-bold">
                            {{ index + 1 }}
                        </span>
                        <div class="grow w-[1px] h-full bg-[#20A980] mt-3"></div>
                      </div>
                      <div class="w-[calc(100%-32px)] pl-3">
                        <template v-for="item in article">
                          <h3 v-if="item?.name === 'htag'" class="text-base text-blue-80 font-montserrat-alternates-bold mb-4">
                            {{ item?.value }}
                          </h3>
                          <img v-if="item?.name === 'my_image'" class="w-full my-10" :src="item?.file?.SRC" alt="banner-5" />
                          <div
                              v-html="item?.value"
                              v-if="item?.name === 'my_text'"
                              class="font-montserrat-alternates-medium font-medium text-sm leading-6 list-disc text-black-40"
                          />
                        </template>

                      </div>
                    </div>
                  </div>
                </template>


                <template v-if="block.type === 'unordered'">
                  <template v-for="item in block?.items">
                    <div class="w-full flex mb-10 max-w-[600px]">
                      <div class="w-8 flex flex-col items-center">
                        <span class="w-8 h-8 shrink-0 flex items-center justify-center bg-[#EC6A61]">
                          <img src="/image/icon/news-info-icon.svg" alt="icon info" />
                        </span>
                        <div class="grow w-full h-full bg-[#EC6A6166]" />
                      </div>
                      <div class="w-[calc(100%-32px)] bg-blue-90 text-[#F6F6F6] p-[20px]">
                        <template v-for="children in getItemsByOnTheFields(item?.items)">
                          <h3
                              v-if="children?.name === 'htag' || children?.name === 'h3'"
                              class="text-base font-montserrat-alternates-bold"
                          >
                            {{ children?.value }}
                          </h3>
                          <div
                              v-html="children?.value"
                              v-if="children?.name === 'my_text'"
                              class="font-montserrat-alternates-medium font-medium text-sm leading-6 list-disc"
                          />
                          <div v-if="children?.name === 'my_video'" class="w-full h-auto">
                            <iframe class="w-full aspect-video" :src="children?.url"
                                    title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                          </div>
                          <img
                              v-if="children?.name === 'my_image'"
                              class="h-auto w-full"
                              :src="children?.file?.SRC"
                              alt="Image article"
                          />
                        </template>

                      </div>
                    </div>
                  </template>
                </template>

                <template v-if="block.type === 'on_the_fields'">
                  <template v-for="(item, index) in block?.items">
                    <div>
                      <h3 v-if="index === 0" class="text-2xl text-blue-80 font-montserrat-alternates-bold mb-4">
                        Iconic ads
                      </h3>
                      <div class="w-full flex mb-10">
                        <div class="w-8 flex flex-col items-center">
                              <span class="w-8 h-8 shrink-0 flex items-center justify-center bg-[#A655BA]">
                                  <img src="/image/icon/lightbulb.svg" alt="icon" />
                              </span>
                          <div class="grow w-full h-full bg-[#b55ccb66]"></div>
                        </div>
                        <div class="w-[calc(100%-32px)] pl-3">
                          <template v-for="children in getItemsByOnTheFields(item?.items)">
                            <h3
                                v-if="children?.name === 'htag'"
                                class="text-base text-blue-80 font-montserrat-alternates-bold mb-4"
                            >
                              {{ children?.value }}
                            </h3>
                            <div
                                v-html="children?.value"
                                v-if="children?.name === 'my_text'"
                                class="text-sm leading-6 list-disc text-black-40"
                            />
                            <div v-if="children?.name === 'my_video'" class="w-full h-auto">
                              <iframe
                                  class="w-full aspect-video"
                                  :src="children?.url"
                                  title="YouTube video player"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowfullscreen
                              />
                            </div>
                            <img
                                v-if="children?.name === 'my_image'"
                                class="h-auto w-full mt-8 sm:mt-10"
                                :src="children?.file?.SRC"
                                alt=""
                            />
                          </template>

                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
              <div
                  v-html="block?.value?.replace(/<a/g, `<a class='text-blue-80 underline underline-offset-[3px] font-medium font-montserrat-alternates-medium'`).replace(/<ul>/g, `<ul class='list-disc pl-3 font-medium font-montserrat-alternates-medium'>`).replace(/<h3>/g, `<h3 class='text-blue-80 text-2xl font-montserrat-alternates-bold leading-[normal]'>`).replace(/<h2>/g, `<h2 class='text-blue-80 text-2xl font-montserrat-alternates-bold mt-4 leading-[normal]'>`).replace(/<p>/g, `<p class='max-w-[600px] text-medium font-montserrat-alternates-medium'>`)"
                  class="text-sm list-disc text-black-40 show-content-response mx-auto max-w-[700px]"
              />

            </div>

          </div>
        </div>
      </div>
      <div class="px-4 md:px-14 pt-8 md:pt-10 pb-16 md:pb-18 bg-[#b1dfd3]">
        <h3 class="text-2xl text-blue-80 font-montserrat-alternates-bold mb-5">
          Похожие новости
        </h3>
        <div v-if="dataCardPage?.result?.news.length">
          <div class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-0 md:gap-x-6 gap-y-8 md:gap-y-10">
            <CommonCardNews
                v-for="item in dataCardPage?.result?.news.slice(0, more ? dataCardPage?.result?.news.length : 4)"
                :key="item.id"
                :image="item?.image || 'null'"
                :title="item.name"
                :postTime="item.active_from"
                :postedAgo="item.read_time + ' минуты'"
                :link="item.page_url"
            />
          </div>
        </div>

        <div class="w-full h-auto flex items-center justify-center mt-8 sm:mt-10">
          <CommonButton />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style>
.show-content-response p a{
  color: #015EFF;
}
.show-content-response p a:hover {
  text-decoration: underline;
}

.uol-c-stat__value {
  line-height: 140%;
}
</style>
