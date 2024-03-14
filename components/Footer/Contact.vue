<script setup lang="ts">
import useAsset from "@/helpers/useAsset";
interface IProps {
    bannerImagePC?: string;
    bannerImageSP?: string;
    bannerImageBottom?: string;
    imageClass?: string;
    title?: string;
    titleClass?: string;
    link?: string;
    font?: "normal" | "medium" | "bold";
    buttonText?: string;
    description: string;
    href?: string;
    type?: string;
}

const fonts = {
    "normal": "font-montserrat-alternates",
    "medium": "font-montserrat-alternates-medium",
    "bold": "font-montserrat-alternates-bold"
}

const props = withDefaults(defineProps<IProps>(), {
    font: "normal",
    buttonText: 'Контактная информация',
    title: 'Свяжитесь с нами'
});

const componentTag = computed(() => {
    if (props.link) return defineNuxtLink({})
    if (props.href) return 'a'
    return 'button'
});
</script>

<template>
    <div
        class="relative overflow-hidden font-montserrat-alternates-medium text-sm lg:bg-black-10"
    >
        <div class="flex gap-8 flex-wrap xl:gap-36 2xl:gap-[405px] px-4 md:pl-8 lg:pr-0 lg:pl-14">
            <div
                class="text-blue-80 pb-[70px] pt-[71px] md:pb-[52px] md:pt-[53px] xl:py-[30px] 2xl:py-[35px] md:w-[340px] lg:w-[500px]"
            >
                <h3 class="text-[32px] leading-[39px] 2xl:text-[53px] whitespace-nowrap text-blue-80 font-montserrat-alternates-bold font-bold mb-3">
                    {{ props.title }}
                </h3>
                <p v-if="props.description" class="text-sm font-medium font-montserrat-alternates-medium mb-6 md:mb-10 xl:mb-[25px] 2xl:mb-10">
                   {{ props.description }}
                </p>

                <component
                    :is="componentTag"
                    :to="props.link"
                    :href="props.href"
                    :type="props.type"
                    class="bg-blue-90 hover:bg-blue-100 text-white text-[14px] px-[14px] leading-[17px] py-[12px] text-center w-full inline-flex gap-[10px] justify-center items-center md:w-auto font-montserrat-alternates-medium font-medium"
                >
                    <span>
                      {{ props.buttonText }}
                    </span>

                  <IconsLeftIcon
                      :fill="'#fff'"
                  />
                </component>
            </div>

            <img
                class="z-[-1] absolute left-0 bottom-0 md:hidden"
                :src="useAsset('images/footer/footerImg-3.png')"
                alt=""
            />
            <img
                class="z-[1] hidden lg:block absolute right-[-3rem] top-[-1.7rem] md:right-0 md:top-0 object-contain 2xl:h-full"
                :src="useAsset('images/footer/footer-bird.png')"
                alt=""
            />
            <img
                    class="z-[1] hidden md:block lg:hidden absolute right-[-3rem] top-[-1.7rem] md:right-0 md:top-0 object-contain 2xl:h-full"
                    :src="useAsset('images/footer/footerImg-2.png')"
                    alt=""
            />
            <img
                class="z-[-1] block lg:hidden absolute top-0 right-0 md:top-0 object-contain"
                :src="useAsset('images/footer/footer-bird-mobile.png')"
                alt=""
            />
        </div>
    </div>
</template>
