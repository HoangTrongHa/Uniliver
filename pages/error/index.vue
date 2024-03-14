<script setup>
import zyroimage1 from "@/assets/images/error/error-image-1.png";
useHead({
  title: 'Страница не найдена'
})
</script>
<template>
    <div id="error">
        <!-- MAIM ERROR -->
        <div class="error_container overflow-hidden grid sm:grid-cols-2">
            <div class="container__text text-black-40 font-montserrat-alternates ml-4 mb-8 mt-14">
                <div>
                    <h1 style="line-height: normal" class="font-montserrat-alternates-bold text-blue-80 text-[32px] sm:text-[52px]">
                        Страница <span class="whitespace-nowrap"> не найдена </span>
                    </h1>
                    <p class="font-montserrat-alternates-medium font-semibold mt-6">
                        Возможно, страница, которую вы ищете, была удалена,<br />переименована
                        или временно недоступна
                    </p>
                </div>
                <div class="container__link font-montserrat-alternates-medium font-medium mt-8 sm:mt-[40px]">
                    <p class="text-sm">Вы можете перейти на:</p>
                    <div class="text-xs">
                        <div class="text-blue-80 hover:text-blue-100 flex my-5 items-center group">
                            <icons-left-icon />
                            <a
                                class="font-medium font-montserrat-alternates-medium underline underline-offset-2 transition duration-300 ease-in-out"
                                href="#"
                            >
                              Главную страницу сайта
                            </a>
                        </div>
                        <div class="flex group text-blue-80 hover:text-blue-100">
                            <icons-left-icon />
                            <a class="" href="#">Если вы хотите сообщить о проблеме, то
                                <span class="underline underline-offset-2 transition duration-300 ease-in-out">
                                    свяжитесь с администратором сайта.
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container__img  relative">
                <img :src="zyroimage1" alt=""/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @media (min-width: 640px) {
        .container__text{
            margin: 72px 0px 72px 32px;
        }
        .error_container .container__img img{
            position: absolute;
            bottom: 0px;
            right: 0px;
        }
        .container__text .container__link .my-5{
            margin: 16px 0;
        }
    }
    @media (min-width: 1028px){
        .container__text{
            margin-left: 56px;
        }
    }
</style>
