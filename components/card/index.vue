<script setup lang="ts">
import { formatSize } from '~/helpers/format';

interface DocumentInfo {
  link: string;
  name: string;
  size: number;
}

interface IProps {
    image: string
    imageClass?: string
    title: string
    titleClass?: string
    limitRowTitle?: number
    info: string
    infoClass?: string
    limitRowInfo?: number
    link?: string
    font?: "normal" | "medium" | "bold",
    params?: string,
    document?: DocumentInfo
}

const fonts = {
    "normal": "font-montserrat-alternates",
    "medium": "font-montserrat-alternates-medium",
    "bold": "font-montserrat-alternates-bold"
}

withDefaults(defineProps<IProps>(), {
    font: "normal"
})
</script>

<template>
    <div class="flex flex-col gap-5">
        <NuxtLink 
            v-if="link"
            :to="link"
        >
            <img :class="imageClass" :src="image" :alt="image">
        </NuxtLink>
        <img v-else :class="imageClass" :src="image" :alt="image">
        <slot />
        <div
            class="w-full font-montserrat-alternates-medium font-semibold"
            v-if="!(typeof info === 'string' && info.length === 0) || !(typeof title === 'string' && title.length === 0)"
        >
            <NuxtLink 
                v-if="link"
                :to="link"
                :class="titleClass"
                class="text-base text-blue-80 mb-2 custom-ellipsis transition duration-300 ease-in-out"
                :style="`-webkit-line-clamp: ${limitRowTitle}`"
            > 
                {{ title }}
            </NuxtLink>
            <h3 v-else
                :class="[titleClass, fonts[font], `line-clamp-${limitRowTitle}`]"
                class="text-base text-blue-80 mb-1 3 custom-ellipsis transition duration-300 ease-in-out"
            >
                {{ title }}
            </h3>

          <NuxtLink
              v-if="link"
              :to="link.split('/').slice(0, 3).join('/')"
              :class="infoClass"
              class="text-xs text-black-40 leading-2 custom-ellipsis"
              :style="`-webkit-line-clamp: ${limitRowInfo}`"
          >
            {{ info }}
          </NuxtLink>
          <span
              v-else
              v-html="info"
              :class="infoClass"
              class="text-xs text-black-40 leading-2 custom-ellipsis"
              :style="`-webkit-line-clamp: ${limitRowInfo}`"
          >
          </span>

          <div
              v-if="document?.link"
              class="text-blue-80 hover:text-blue-100 mt-3"
          >
              <nuxt-link
                  :to="document.link"
                  target="_blank"
                  class="flex gap-[4px] text-sm underline items-center leading-[normal] group">
                  <icons-download-icon />
                  <span>
                      {{ document?.name }}
                      <span>(PDF {{ formatSize(document?.size) }})</span>
                  </span>
              </nuxt-link>

          </div>
        </div>
    </div>
</template>

<style scoped>
.custom-ellipsis {
    display: -webkit-box;
    max-width: 100%;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>