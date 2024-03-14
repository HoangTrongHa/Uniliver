<script setup>

useHead({
  title: "Производственные центры"
})

const states = reactive({
  dataHead: {},
  dataBlock: [],
  breadcrumbs: []
})

const mappingDataHead = (data) => {
  return {
    anchor: data.anchor,
    value: data.value
  }
}
const mappingDataBlock = (data) => {
  return data?.map((item) => {
    return {
      image: item.image,
      blocks: item.blocks.map((blog) => {
        return {
          value: blog.value,
          name: blog.name,
          color: blog.color,
          colorMobile: blog.color,
          colorText: blog.text_color
        }
      }),
      name: item.name,
      code: item.code
    }
  })
}

const formatValueBlock = (inputString) => {
  let regex = ['/', ',', '>']
  const { numericAndSlashes, string } = [...inputString].reduce(
      (result, character) => {
        if ((!isNaN(character) && character !== ' ') || regex.includes(character)) {
          result.numericAndSlashes += character;
        } else {
          result.string += character;
        }
        return result;
      },
      { numericAndSlashes: '', string: '' }
  );
  return {
    string: string,
    unit: numericAndSlashes,
  };
}
useAsyncData("fetch", async () => {
  const res = await useApiFetch('static.page', {code: 'factories'})

  useHead(res.result.seo)

  states.dataHead = mappingDataHead(res.result?.element.blocks[0])
  states.dataBlock = mappingDataBlock(res.result?.element.blocks[1].elementList)
  states.breadcrumbs = res.result.breadcrumbs
})


const getColor = block => {
  for (let i = 0; i < block?.blocks?.length; i++) {
    if (block?.blocks?.[i]?.colorText && block?.blocks?.[i]?.colorText?.toLowerCase() !== 'fff') {
      return block?.blocks?.[i]?.colorText
    }
    for (const key in block?.blocks[i]) {
      if (key?.toLowerCase()?.indexOf('color') > -1) {
        return block?.blocks[i][key]
      }
    }
  }
  block?.blocks.forEach(b => {
    Object.keys(b).forEach(k => {
      if (k?.toLowerCase()?.indexOf('color') > -1) return b[k]
    })
  })
  return 'FF0101'
}
</script>

<template>
  <div class="font-montserrat-alternates">
    <breadcrumbs :crumbs="states.breadcrumbs || []" />
  </div>

  <!-- start -->
  <div class="sm:my-18 my-14 sm:px-14 px-4 xl:mb-1 mb-8">
      <div class="sm:mb-[40px] mb-[52px]">
        <h1 class="text-blue-80 sm:text-[52px] text-[30px] font-montserrat-alternates-bold leading-[normal]">
          {{ states.dataHead.value }}
        </h1>
      </div>
      <section v-for="(block, index) in states.dataBlock" :key="index + block.name">
        <div class="w-full flex flex-col mb-0.5">
          <h2
              class="text-2xl font-montserrat-alternates-bold sm:mb-6 mb-[20px] leading-[normal] sm:block"
              :style="{ color: `#${getColor(block)}` }"
          >
            {{ block.name }}
          </h2>
          <img
              class="2xl:block xl:block lg:block md:block sm:hidden hidden"
              :src="block.image"
              :alt="block.code"
          >
          <img
              :src="block.image"
              :alt="block.code"
              class="2xl:hidden xl:hidden lg:hidden md:hidden sm:block block h-[160px]"
          >
        </div>
        <div class="grid lg:grid-cols-4 grid-cols-2 sm:gap-0 gap-1 sm:mb-[56px] mb-[32px] text-white">
          <div
              v-for="rectage in block.blocks" :key="rectage.name"
              class="h-[46.655vw] sm:h-auto items-center justify-center text-center sm:pt-[72px] pt-[20px] sm:pb-[63px] pb-[50px] lg:min-h-[265px] min-h-[171px]"
              :style="`background: #${rectage.color}; color: #${rectage.colorText || 'fff'}`"
          >
            <div class="flex flex-col md:flex-row flex-wrap justify-center items-center">
              <div class="text-5xl mr-2 font-montserrat-alternates-bold leading-[normal]">
                {{ formatValueBlock(rectage.value).unit }}
              </div>
              <div
                  class="sm:text-2xl text-sm md:max-w-[80px] font-montserrat-alternates-bold mb-3 lg:mb-0 leading-[normal] text-left">
                {{ formatValueBlock(rectage.value).string }}
              </div>
            </div>
            <p class="px-[1.5rem] sm:text-base text-xs font-montserrat-alternates font-semibold sm:leading-[24px] leading-[140%]">
              {{ rectage.name }}
            </p>
          </div>
        </div>
      </section>
    </div>
  <!-- end --></template>
