<script setup>
import useAsset from './helpers/useAsset';
</script>
<template>
    <NuxtLayout>
        <div id="error">
            <!-- MAIM ERROR -->
            <div class="overflow-hidden flex flex-wrap">
                <div class= "font-montserrat-alternates mt-14 mb-8 lg:my-18 px-4 lg:pl-14  w-full lg:w-7/12">
                    <div>
                        <h1 class="font-montserrat-alternates-bold text-blue-80 text-3xl1 lg:text-5xl1 leading-none">
                            Страница <span class="whitespace-nowrap"> не найдена </span>
                        </h1>
                        <p class="text-black-40 font-semibold mt-5 lg:mt-6">
                            Возможно, страница, которую вы ищете, была удалена,<br />переименована
                            или временно недоступна
                        </p>
                    </div>
                    <div class="font-medium font-montserrat-alternates-medium mt-8 lg:mt-10">
                        <p class="text-sm text-black-40 mb-4">Вы можете перейти на:</p>
                        <ul class="text-xs flex flex-col gap-4 lg:gap-5">
                            <li class="flex items-center">
                                <img class="mr-1 w-3 h-3" :src="useAsset('icons/arrow-block-right-blue.svg')" alt="Иконка вправо" />
                                <NuxtLink
                                    to="/"
                                    class="text-blue-80 hover:text-blue-100 underline underline-offset-[3px]"
                                >
                                  Главную страницу сайта
                                </NuxtLink>
                            </li>
                            <li class="flex">
                                <img class="mr-1 w-3 h-3" :src="useAsset('icons/arrow-block-right-blue.svg')" alt="" />
                                <p class="text-black-40 font-medium font-montserrat-alternates-medium leading-none">Если вы хотите сообщить о проблеме, то
                                    <NuxtLink to="/contact" class="text-blue-80 hover:text-blue-100 underline underline-offset-[3px] whitespace-nowrap leading-none">
                                        свяжитесь с администратором сайта.
                                    </NuxtLink>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="relative w-full lg:w-5/12">
                    <img src="@/assets/images/error/error-image-1.png" alt="" class="ml-auto h-full object-cover"/>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>