<script setup>
import ButtonLink from "~/components/Common/ButtonLink.vue";

const dataPage = reactive({})
const bannerPages = reactive([]);
const contentPage = ref(null);
const buttonLinks = reactive([]);
const aboutTable = ref([]);
const aboutCardPosts = reactive([]);
const hTag = ref(null);
const aboutCardLeaders = ref(null);
useAsyncData('fetch', async () => {
    try {
        dataPage.value = await useApiFetch('static.page', {
            code: 'our-company'
        })

        useHead(dataPage.value?.result?.seo)
        const blocks = dataPage.value.result.element.blocks;
        const blocksMap = new Map();
        blocks?.forEach(block => {

            if (block.name === 'my_button_link') {
                buttonLinks.push(block)
            } else if (block.name === 'my_banner') {
                bannerPages.push(block)
            } else if (block.name === 'my_card') {
                aboutCardPosts.push(block)
            } else {
                blocksMap.set(block.name, block);
            }
        });

        contentPage.value = blocksMap.get('my_text')
        aboutTable.value = blocksMap.get('my_about_table')
        aboutCardPosts.value = blocksMap.get('my_about_card')
        hTag.value = blocksMap.get('htag')
        aboutCardLeaders.value = blocksMap.get('my_leadership')
    } catch (e) {
        console.error(e);
    }
})
</script>
<template>
    <div v-if="dataPage.value" class="font-montserrat-alternates">
        <breadcrumbs :crumbs="dataPage.value.result?.breadcrumbs" />
        <div
            class="relative grid grid-cols-1 2xl:py-0 md:py-0 mb-1">
            <div
                class="absolute z-[1] w-full h-full flex items-start sm:items-center justify-start">
                <div class="sm:gap-6 gap-3 sm:mt-4 mt-2 sm:ml-2 ml-0 xl:pr-10 xl:pl-14 px-4 lg:pr-8 lg:pl-8 md:pr-2 md:py-4 md:mb-0 sm:mb-4 mb-4">
                    <h1 class="
                      text-blue-80
                      text-[2.75rem]
                      sm:text-[3.25rem]
                      font-[700]
                      font-montserrat-alternates-bold
                      leading-[normal]
                      sm:mb-6
                      mb-5
                      sm:mt-0
                      mt-2"
                    >
                        {{ bannerPages[0]?.elementList?.length > 0 ? bannerPages[0]?.elementList[0]?.name : 'Мы – это Unilever' }}
                    </h1>

                    <div
                        class="text-blue-80 text-[1rem] font-montserrat-alternates-medium leading-[24px] max-w-[580px] font-[600]"
                        v-html="bannerPages[0]?.elementList[0]?.text?.replace(/<a/g, `<a class='text-blue-80 underline'`)
                            .replace(/<ol>/g, `<ol class='list-disc  ml-[20px]'>`)">
                    </div>
                </div>
            </div>
            <div class="w-full z-0 md:block hidden  top-0 left-0 right-0">
                <img v-if="bannerPages[0]" class="w-full" :src="bannerPages[0]?.elementList[0]?.image" :alt="'banner' + bannerPages[0]?.elementList[0].name">
            </div>
            <div class="w-full z-0 md:hidden top-0 left-0 right-0 block">
                <img v-if="bannerPages[0]" class="w-full" :src="bannerPages[0]?.elementList[0]?.mobile_image" :alt="'banner' + bannerPages[0]?.elementList[0].name">
            </div>
        </div>

      <div class="max-w-[900px] mx-auto 2xl:px-14 xl:px-14 lg:px-10 md:px-5 px-4">
        <section class="mb-[72px] mt-[56px] md:my-[40px]">
          <div v-if="contentPage?.value" v-html="contentPage?.value?.replace(/<h2>/g, `<h2 class='text-blue-80 text-2xl font-montserrat-alternates-bold mb-4 leading-[normal]'>`)
                .replace(/<ol>/g, `<ol class='list-disc ml-[20px]'>`)
                .replace(/<h3>/g, `<h3 class='text-blue-80 text-2xl font-montserrat-alternates-bold mb-4 leading-[normal]'>`)
                .replace(/<a/g, `<a class='text-blue-80 underline'`)
                 .replace(/<br>/g,``)"
               class="text-black-40 w-auto sm:mb-6 mb-[1.9rem] show-content-about-response">
          </div>

          <div v-else>
            <div class="text-xl font-montserrat-alternates-bold sm:mb-[42px] mb-6">
              <h1 class="text-cyan-150 text-2xl leading-[normal]">Наша цель – сделать </h1>
              <h1 class="text-blue-80 text-2xl leading-[normal]">экологически ответственную жизнь <br> обычным
                явлением
              </h1>
            </div>
            <div
                class="text-black-40 w-auto sm:mb-6 mb-[1.9rem]">
              <p class="mb-6 text-[14px] leading-[142%] font-[500] sm:w-auto w-[337px]">
                Это та цель, ради которой мы работаем и ведем наш бизнес. Цель, которая вдохновляет других
                добиваться
                отличных показателей в работе. Ещё в 1883 году в Великобритании наш основатель Уильям Хескет Левер
                выпустил
                на рынок мыло Sunlight – новый революционный продукт, созданный для того, чтобы сделать
                чистоплотность
                обычным явлением.
              </p>

              <p class="mb-6 text-[14px] leading-[142%] font-[500] sm:w-auto w-[337px] sm:block hidden">
                Уже тогда это стало частью устойчивого образа жизни. Сейчас в портфель компании входят более
                400 брендов, и
                мы продолжаем придерживаться конкретной цели в нашей деятельности: мы хотим не только причинять
                меньший
                вред
                планете и обществу, но и приносить больше пользы.Мы хотим помочь разрешить социальные и
                экологические
                проблемы человечества, мы хотим улучшить жизнь людей с помощью наших продуктов.
              </p>

              <p class="mb-6 text-[14px] leading-[142%] font-[500] sm:w-auto w-[337px] sm:hidden block">
                Уже тогда это стало частьюустойчивого образа жизни. Сейчас в портфель компании входят более
                400 брендов, и
                мы продолжаем придерживаться конкретной цели в нашей деятельности: мы хотим не только
                причинять меньший
                вред
                планете и обществу, но и приносить больше пользы.Мы хотим помочь разрешить социальные и
                экологические
                проблемы человечества, мы хотим улучшить жизнь людей с помощью наших продуктов.
              </p>

              <p class="mb-6 text-sm leading-[142%] font-[500]">
                Мы были первооткрывателями, новаторами и творцами будущего на протяжении более 120 лет, и мы
                планируем
                действовать в том же духе, придерживаясь принципов устойчивого развития.
              </p>
            </div>
          </div>


          <CommonButtonLink
              :link="(buttonLinks?.length && buttonLinks[0]?.url) || '/our-company/our-leadership'"
              :size="16"
              :class-name="'inline-flex justify-center gap-2.5 px-[14px] py-3 bg-cyan-50 text-sm hover:bg-[#0CC5F0] transition duration-300 ease-in-out gap-[10px]'"
              :underline="false"
              :is-button="true"
          />

        </section>
      </div>

      <div class="max-w-[1920px] mx-auto">
        <!-- start statistical -->
        <section>
          <div v-if="aboutTable?.elementList?.length" class="mb-18">
            <div class="flex flex-wrap sm:flex-row xl:mb-1 sm:mb-8 mb-10">
              <div
                v-for="(element, index) in aboutTable.elementList"
                :key="`${index}_${element.title}`"
                class="pt-10 sm:pt-5 min-w-[171px] min-h-[171px] justify-center p-2 md:px-2.5 border lg:border-0 border-white lg:w-1/5 text-blue-80 text-center sm:px-5 px-2 sm:h-[265px] sm:mb-0 lg:mb-1"
                :class="{
                  '!pt-2 flex flex-col justify-center' : !element?.image && !element?.value && !element?.measure,
                  'w-full mb-5 mt-8 sm:mt-0 h-auto' : element.image,
                  'xl:pt-10 w-[50vw] h-[50vw]' : !element.image
                }"
                :style="{ backgroundColor: `#${element.color}` }"
              >
                <div
                    class="flex justify-center items-center gap-2 mb-3 lg:mb-0"
                    :class="{ 'h-[49px] sm:h-[80px] xl:h-[98px]' : (element?.value || element?.measure) && !element.image }"
                >
                  <img v-if="element.image" :src="element.image" alt="Cell"/>
                  <h2 v-else-if="element.value" :style="{ color: `#${element.text_color}` }"
                      class="sm:text-[5rem] text-[2.5rem] font-montserrat-alternates-bold font-bold">
                    {{ element.value }}
                  </h2>
                  <h3 v-if="element.measure" :style="{ color: `#${element.text_color}` }"
                      class="text-left sm:text-2xl text-sm font-montserrat-alternates-bold font-bold">
                    {{ element.measure }}
                  </h3>
                </div>

                <p v-if="(element.title || element.value) && element.image"
                   class="text-2xl font-montserrat-alternates-bold"
                   :style="{ color: `#${element.text_color}` }">
                  {{ element.title || element.value }}
                </p>
                <p
                   v-else
                   class="text-[11px] sm:text-base font-montserrat-alternates font-semibold sm:leading-6 leading-[140%]"
                   :style="{ color: `#${element.text_color}` }"
                >
                  {{ element.title }}
                </p>

                <CommonButtonLink v-if="element.link" :link="element.link" :size="12" :class-name="'text-sm'" />
              </div>
            </div>
          </div>
        </section>
        <!-- end statistical -->
        <section class=" sm:mb-[72px] mb-[56px] 2xl:px-14 xl:px-14 lg:px-10 md:px-5 sm:px-4 px-4 ">
          <div class="grid md:grid-cols-3 grid-cols-1 2xl:gap-6 md:gap-6 gap-4 gap-y-8">
            <div v-for="card in aboutCardPosts" :key="card.link.title">
              <NuxtLink :to="card.link.url">
                <img
                    :src="card.image.file.SRC || Post1"
                    :alt="card.image.desc"
                    :width="card.image.file.WIDTH"
                    :height="card.image.file.HEIGHT"
                    class="mb-5 w-full"
                />
              </NuxtLink>
              <NuxtLink
                  :to="card.link.url"
                  class="text-base text-blue-80 font-montserrat-alternates-medium mb-2 text-ellipsis-2 font-semibold"
              >
                {{ card.link.title }}
              </NuxtLink>
              <p v-html="card.text.value?.replace(/<ol>/g, `<ol class='list-disc ml-[20px]'>`)" class="sm:block hidden text-xs text-black-40 leading-[normal] font-montserrat-alternates-medium font-medium" />
              <p v-html="card.text.value?.replace(/<ol>/g, `<ol class='list-disc ml-[20px]'>`)" class="sm:hidden block text-xs text-black-40 leading-[normal] font-montserrat-alternates-medium font-medium" />
            </div>
          </div>
        </section>

        <section
            v-if="aboutCardLeaders?.elementList?.length > 0"
            class="sm:mb-[72px] mb-[56px]"
        >
          <h2 class="text-3xl font-bold font-montserrat-alternates-bold leading-[normal] text-blue-80 sm:mb-6 mb-5">
            {{ hTag?.value }}
          </h2>
          <div class="grid md:grid-cols-4 grid-cols-2 2xl:gap-6 md:gap-6 gap-4 gap-y-8">
            <card
                v-for="item in aboutCardLeaders?.elementList"
                :key="item.name"
                :limit-row-info="4"
                :title="item.name"
                :info="item.job_title" :image="item.image" :link="`/our-company/our-leadership/${item.id}`" :params="item.code"
                image-class="sm:w-auto w-[164px] sm:h-auto h-[100px]"
                title-class="text-[16px] leading-[24px] font-semibold font-montserrat-alternates-medium mb-1 sm:mt-[0.7px] mt-0"
                info-class="text-xs font-medium leading-[normal]"
            />
          </div>
          <div class="flex justify-center">
            <NuxtLink to="/our-company/our-leadership" class="inline-flex sm:w-auto w-full items-center justify-center gap-x-[10px] py-[12px] px-[14px] bg-cyan-50 sm:mt-[40px] mt-[32px] hover:bg-[#0CC5F0] transition duration-300 ease-in-out">
              <p class="text-sm font-medium leading-[normal] text-blue-80 font-montserrat-alternates-medium">
                {{ buttonLinks[1]?.title }}
              </p>
              <icons-left-icon />
            </NuxtLink>
          </div>
        </section>




        </div>

        <section>
          <div class="grid lg:grid-cols-2 grid-cols-1">
            <div
                v-if="bannerPages[1]"
                class="relative w-full pb-[47%] flex sm:flex-row flex-col justify-between overflow-hidden"
            >
              <img
                  class="hidden md:block w-full absolute w-1/2 h-auto"
                  :src="bannerPages[1]?.elementList[0]?.image"
                  :alt="bannerPages[1]?.elementList[0]?.name"
              >
              <img
                  class="md:hidden w-full absolute md:block w-1/2 h-auto"
                  :src="bannerPages[1]?.elementList[0]?.mobile_image"
                  :alt="bannerPages[1]?.elementList[0]?.name"
              >
              <div class="max-w-[340px] h-full absolute flex flex-col justify-start lg:justify-center z-10  flex flex-col justify-start sm:justify-center z-10 md:pl-14 px-4 sm:mt-2 mt-[0.9rem] absolute left-0 right-0 top-0 bottom-0">
                <div v-html="bannerPages[1]?.elementList[0]?.text?.replace(/<h3>/g, `<h3 class='text-blue-80 font-montserrat-alternates-bold text-[24px] mb-5 sm:pt-0 pt-6 leading-[normal] sm:max-w-[340px]'>`)" />
                <ButtonLink :link="bannerPages[1]?.elementList[0]?.link" class-name="text-sm !justify-start" />
              </div>

            </div>
            <div
                v-if="bannerPages[2]"
                class="relative w-full pb-[47%] flex sm:flex-row flex-col justify-between overflow-hidden"
            >
              <img
                  class="md:block hidden w-full hidden absolute w-1/2 h-auto"
                  :src="bannerPages[2]?.elementList[0]?.image"
                  :alt="bannerPages[2]?.elementList[0]?.name"
              >
              <img
                  class="md:hidden block w-full absolute w-1/2 h-auto"
                  :src="bannerPages[2]?.elementList[0]?.mobile_image"
                  :alt="bannerPages[2]?.elementList[0]?.name"
              >
              <div class="max-w-[340px] h-full absolute flex flex-col justify-start lg:justify-center z-10 flex flex-col justify-start sm:justify-center z-10 md:pl-14 px-4 sm:mt-2 mt-[0.9rem] absolute left-0 right-0 top-0 bottom-0">
                <div v-html="bannerPages[2]?.elementList[0]?.text?.replace(/<h3>/g, `<h3 class='text-violet-50 font-montserrat-alternates-bold text-2xl sm:mb-5 mb-3 sm:pt-0 pt-6 leading-[normal] sm:max-w-[340px]'>`)
                            .replace(/<ol>/g, `<ol class='list-disc ml-[20px]'>`)" />

                <ButtonLink
                    :link="bannerPages[2]?.elementList[0]?.link"
                    :fill="'#A655BA'"
                    class-name="text-sm text-violet-50 underline-[#333] !justify-start"
                />
              </div>
            </div>
          </div>
        </section>

    </div>
</template>

<style>
    .show-content-about-response li,
    .show-content-about-response p {
        line-height: 140%;
        margin-bottom: 0.75rem;
        color: #a5a4a2;
        font-weight: inherit;
        font-family: Montserrat Alternates Medium;
    }
    .show-content-about-response li strong {
        font-family: Montserrat Alternates Bold;
        font-weight: inherit;
    }
    .show-content-about-response  p a{
        color: #015EFF;
    }

    @media screen and (max-width: 460px) {
        .show-content-about-response h2 {
            margin-bottom: 20px;
            margin-top: 56px;
            line-height: 29.5px;
        }
    }

</style>
