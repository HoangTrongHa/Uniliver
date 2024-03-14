<script setup lang="ts">
import ClockIcon from "~/components/icons/Clock-icon.vue";

interface IProps {
    image: string | null
    title: string
    postTime: string
    postedAgo?: string
    limitRowTitle?: number
    link?: string
}

withDefaults(defineProps<IProps>(), {
    limitRowTitle: 6,
})
</script>

<template>
    <div class="flex flex-col">
        <NuxtLink :to="link" v-if="link">
            <img class="w-full min-h-[200px] lg:min-h-[237px] object-contain" :src="image" :alt="image">
        </NuxtLink>
        <img v-else class="w-full min-h-[200px] lg:min-h-[237px] object-contain" :src="image" :alt="image">
        <slot />

        <div class="w-full">
            <div class="w-full h-auto flex mt-5 mb-3">
                <span class="text-xs text-black-40 leading-4 mr-6 font-montserrat-alternates-medium font-medium">
                    {{ postTime }}
                </span>
                <span class="inline-flex items-center">
                    <span class="w-4 h-4 mr-2">
                        <ClockIcon />
                    </span>
                    <span class="text-xs text-black-40 leading-4 font-montserrat-alternates-medium font-medium">
                        {{ postedAgo }}
                    </span>
                </span>
            </div>


            <NuxtLink
                v-if="link"
                :to="link"
                class="
                  text-base text-blue-80 font-montserrat-alternates-medium font-medium mb-2 custom-ellipsis
                  hover:text-blue-90 transition duration-300 ease-in-out
                "
                :style="`-webkit-line-clamp: ${limitRowTitle}`"
            >
                {{ title }}
            </NuxtLink>
            <h3 v-else class="text-base text-blue-80 font-montserrat-alternates-medium font-medium mb-2 custom-ellipsis hover:text-blue-90 transition duration-300 ease-in-out" :style="`-webkit-line-clamp: ${limitRowTitle}`">
                {{ title }}
            </h3>
        </div>
    </div>
</template>

<style scoped>
.custom-ellipsis {
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
