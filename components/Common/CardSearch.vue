<script setup lang="ts">
import useAsset from '~/helpers/useAsset';
const router = useRouter()

const props = defineProps({
    data: Object,
});

const { data } = props;

const downloadFile = () => {
    if(data?.type && data.type === 'file') {
        // Создаем временную ссылку для скачивания файла
        const link = document.createElement('a');
        link.href = data.path;
        link.download = data.description; // Оставьте пустым, чтобы браузер сам назначил имя файла
        link.target = '_blank'; // Открываем ссылку в новой вкладке (опционально)
        link.rel = 'noopener noreferrer'; // Рекомендуется для безопасности

        // Симулируем клик на ссылку для скачивания
        link.click();

        // Удаляем временную ссылку
        document.body.removeChild(link);
    } else if(data?.page_url) {
        router.push(data?.page_url);
    }
}

</script>

<template>
    <div class="w-full lg:w-[500px]">
        <div class="flex items-center mb-2 leading-6" @click="downloadFile">
            <!-- ICON Download PDF -->
            <span
                v-if="data?.type && data.type === 'file'"
                class="mr-1 inline-block w-4 h-4 group"
            >
                <icons-download-icon />
            </span>

            <!-- Title Data Search -->
            <h2 class="text-blue-80 font-montserrat-alternates-medium font-semibold text-base flex-1 cursor-pointer hover:text-blue-90 transition duration-300 ease-in-out">
                {{ data?.name }}

                <div v-if="data?.type === 'file'">
                    <img :src="useAsset('icons/underline.svg')" class="w-full" />
                </div>
            </h2>
        </div>
        <div v-if="data?.active_from" class="text-black-40 text-xs font-medium" :class="{'mb-3':data?.description }">
            {{ data?.active_from }}
        </div>

        <p v-if="data?.description" class="text-xs text-black-40 font-medium leading-[15px]">
                {{ data?.description }}
        </p>
    </div>
</template>
