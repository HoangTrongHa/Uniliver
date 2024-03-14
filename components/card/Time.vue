<script setup lang="ts">
interface IProps {
    image: string
    imageClass?: string
    date: string
    title: string
    titleClass?: string
    limitRowTitle?: number
    timezone?: boolean
    link?: string,
    isNotFormatDate?: boolean,
    readTime?: string
}

const props = withDefaults(defineProps<IProps>(), {
    isNotFormatDate: false
})

const russianLocale = {
    months: [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль',
        'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ],
    weekdays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
};

const formatTime = (time: string) => {
    const date = new Date(time);
    const day = date.getDate();
    const month = russianLocale.months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeZone = 'MSK';
    if (props.timezone) return `${day} ${month} ${year}, ${hours}:${minutes} ${timeZone}`;
    return `${day} ${month} ${year}`;
};

const formatTimeDiff = (startTime: string) => {
    const start = new Date(startTime);
    const end = new Date();
    const diffMilliseconds = end.getTime() - start.getTime();

    if (diffMilliseconds < 60 * 1000) {
        const diffSeconds = Math.floor(diffMilliseconds / 1000);
        return `${diffSeconds} второй`;
    } else if (diffMilliseconds < 60 * 60 * 1000) {
        const diffMinutes = Math.floor(diffMilliseconds / (60 * 1000));
        return `${diffMinutes} минута`;
    } else if (diffMilliseconds < 24 * 60 * 60 * 1000) {
        const diffHours = Math.floor(diffMilliseconds / (60 * 60 * 1000));
        return `${diffHours} час`;
    } else {
        const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
        return `${diffDays} день`;
    }
};
</script>

<template>
    <div class="flex flex-col gap-5 2xl:gap-6">
        <NuxtLink :to="link" v-if="link">
            <img :class="imageClass" :src="image" :alt="image" class="w-full">
        </NuxtLink>
        <img v-else :class="imageClass" :src="image" :alt="image" class="w-full">
        <slot />
        <div class="w-full font-montserrat-alternates-medium font-semibold">
            <div class="flex gap-10 text-xs leading-2 text-black-40 md:gap-3 xl:gap-12 mb-3 font-medium font-montserrat-alternates-medium">
                <div>
                    {{ isNotFormatDate ? date : formatTime(date) }}
                </div>
                <div class="flex items-center gap-2">
                    <icons-clock-v2-icon />
                    {{ readTime ? readTime + ` минуты` : formatTimeDiff(date) }}
                </div>
            </div>
            <NuxtLink
                v-if="link"
                :to="link"
                :class="titleClass"
                class="max-w-full sm:w-[314px] 2xl:w-auto text-normal line-height-6 leading-6 text-blue-80 font-montserrat-alternates sm:mb-2 hover:text-blue-90 transition duration-300 ease-in-out font-semibold line-clamp-3"
                :style="`-webkit-line-clamp: ${limitRowTitle}`"
            >
              {{ title }}
            </NuxtLink>
            <h3
                v-else
                class="leading-6 text-blue-80 font-montserrat-alternates mb-2 hover:text-blue-90 transition duration-300 ease-in-out font-semibold line-clamp-3"
                :class="titleClass"
                :style="`-webkit-line-clamp: ${limitRowTitle}`"
            >
                {{ title }}
            </h3>
        </div>
    </div>
</template>

<style scoped>
.custom-ellipsis {
    display: -webkit-box;
    max-width: 100%;
    -webkit-box-orient: vertical;
    overflow: hidden;
}</style>