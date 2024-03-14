<script setup>
const dataPage = ref({});
const h2 = ref(null);
const myTexts = reactive({
  0: null,
  1: [],
  2: null,
  3: [],
  4: null
});

useAsyncData('fetch', async () => {
  try {
    dataPage.value = await useApiFetch('static.page', {code: 'contact'})
    useHead(dataPage.value?.result?.seo)
    const blocks = dataPage.value.result.element.blocks;
    const blocksMap = new Map();
    blocks.forEach((block, index) => {
      if (block.name === 'my_text') {
        if (index === 0) {
          myTexts[0] = block;
        } else if (index === blocks.length - 1) {
          myTexts[4] = block;
        } else if (block.value.search('mailto') !== -1) {
          myTexts[1].push(block);
        } else {
          if (!myTexts[2]) {
            myTexts[2] = block;
          } else {
            myTexts[3].push(block);
          }
        }
      }
      if (block?.type === 'h2') {
        h2.value = block;
      } else {
        blocksMap.set(block.name, block);
      }
    });
  } catch (e) {
    console.error(e);
  }
});
</script>
<template>
  <div class="font-montserrat-alternates text-sm flex flex-col justify-center w-full">
    <breadcrumbs :crumbs="dataPage?.result?.breadcrumbs || []"/>

    <div class="xl:my-18 lg:my-18 md:my-18 sm:my-10 my-[56px] mx-5 xl:mx-0 lg:mx-0 md:mx-0 sm:mx-5 flex flex-col items-center">
      <section class="w-full max-w-[700px] text-[#858380] font-medium">
        <div class="xl:pb-10 lg:pb-10 w-full md:pb-10 sm:pb-8 pb-8 border-b-2 font-medium"
             v-html="myTexts[0]?.value.replace(/<h1>/g, `<h1 class='leading-[normal] text-blue-80 lg:block md:text-4xl2 text-3xl1 font-montserrat-alternates-bold md:mb-4 mb-5'>`)
                        .replace(/<h2>/g, `<h2 class='mt-[60px] lg:mt-[40px] text-blue-80 text-2xl font-montserrat-alternates-bold mb-4 leading-[normal]'>`)
                        .replace(/<a/g, `<a class='whitespace-nowrap text-blue-80 hover:text-blue-100 font-montserrat-alternates-medium font-medium !underline underline-offset-[3px]'`)
                        .replace(/<p>/g, `<p class='font-montserrat-alternates-medium font-medium mb--1 md:md-0'>`)"
        />
        <div class="xl:py-10 lg:py-10 md:py-10 sm:py-8 py-8 border-b-2 custom-margin-p"
             v-html="myTexts[2]?.value?.replace(/<h2>/g, `<h2 class='text-blue-80 text-2xl font-montserrat-alternates-bold mb-4 leading-[normal]'>`).replace(/<p>/g, `<p class='font-montserrat-alternates-medium font-medium'>`)" />
        <div class="xl:py-10 lg:py-10 md:py-10 sm:py-8 py-8">
          <h2 class="text-blue-80 text-2xl font-montserrat-alternates-bold mb-4 leading-[normal]">
            {{ h2?.value }}
          </h2>
          <div
              class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 font-medium grid-cols-1 sm:gap-x-[24px] sm:gap-y-[16px] gap-y-[20px]">
            <div v-for="(item, key) in myTexts[3]" :key="key"
                 v-html="item?.value?.replace(/<h2>/g, `<h2 class='text-blue-80 text-2xl font-montserrat-alternates-bold mb-4 leading-[normal]'>`).replace(/<p>/g, `<p class='font-montserrat-alternates-medium font-medium'>`)"/>
          </div>
        </div>
      </section>
      <section class="xl:px-80 lg:px-35 md:px-24 sm:px-0 px-0">
        <div class="grid xl:grid-cols-2 w-full max-w-[800px] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 services">
          <div
              v-for="(item, index) in myTexts[1]"
              :key="index"
              v-html="item?.value.replace(/<p class=/g, `<p class='mail_icon font-montserrat-alternates-medium font-medium hover:text-blue-100'`)"
              class="p-6 contact-mail flex flex-col text-base !justify-between text-blue-80"
          />
        </div>
      </section>

      <div class="w-full max-w-[700px]">
        <div class="w-full max-w-[600px] md:mt-10 mt-8"
             v-html="myTexts[4]?.value?.replace(/<h2>/g, `<h2 class='text-blue-80 text-2xl font-montserrat-alternates-bold md:mb-4 mb-3 leading-[normal]'>`)
                    .replace(/<a/g, `<a class='text-blue-80 hover:text-blue-100 underline'`)
                    .replace(/<p>/g, `<p class='font-montserrat-alternates-medium font-medium text-[#858380]'>`)"
        />
      </div>
    </div>
  </div>
</template>
<style>
.contact-mail {
  a {
    font-size: 12px;
  }
}

.contact-mail {
  p:nth-child(2) {
    display:none;
  }
}

.contact-mail {
  p:nth-child(1) {
    margin-bottom: 10px;
  }
}

.services > div:nth-child(4n - 2),
.services > div:nth-child(4n - 1) {
  background: #EAEAEA;
}

.services > div:not(:nth-child(4n - 2)):not(:nth-child(4n - 1)) {
  background-color: #F6F6F6;
}

@media (max-width: 640px),
(max-width: 375px) {
  .services > div:nth-child(2n) {
    background: #EAEAEA !important;
  }

  .services > div:not(:nth-child(2n)) {
    background-color: #F6F6F6 !important;
  }
}


.services .text-ellipsis {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.telegram_icon {
  text-align: left;
}
.telegram_icon a::before {
  content: '';
  display: inline-block;
  width: 16px; /* Ширина иконки */
  height: 16px; /* Высота иконки */
  background: url('/image/icon/telegram.svg') no-repeat; /* Путь к иконке */
  background-size: contain; /* Автоматическое масштабирование иконки */
  margin-right: 5px; /* Расстояние между иконкой и текстом */
  vertical-align: middle; /* Выравнивание по центру по вертикали */
  margin-bottom: 5px;
}

.mail_icon a::before {
  content: '';
  display: inline-block;
  width: 16px; /* Ширина иконки */
  height: 16px; /* Высота иконки */
  background: url('/image/icon/mail.svg') center center no-repeat; /* Путь к иконке */
  background-size: contain; /* Автоматическое масштабирование иконки */
  margin-right: 5px; /* Расстояние между иконкой и текстом */
  vertical-align: middle; /* Выравнивание по центру по вертикали */
}
</style>
