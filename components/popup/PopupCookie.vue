<script lang="ts" setup>
import {useCookie} from "#app/composables/cookie";

//visible popup cookie
const cookie = useCookie<boolean>('cookie-accepted')
const visiblePopup = ref(false);
const visiblePopupSuccess = ref(false);
const checkCookie = () => {
  if (!cookie.value) {
    visiblePopup.value = true;
  }
}

const handleAcceptCookie = () => {
  cookie.value = true
  visiblePopup.value = false;
  visiblePopupSuccess.value = true
}

const handleClosePopNotification = () => {
  visiblePopupSuccess.value = false
}
watch(() => visiblePopupSuccess.value, () => {
  if (visiblePopupSuccess.value) {
    setTimeout(() => {
      visiblePopupSuccess.value = false
    }, 3000)
  }
})
onMounted(() => {
  checkCookie()
})
</script>
<template>
  <div>
    <div v-if="visiblePopup"
         class="flex flex-col items-start popup-cookie bottom-0 lg:bottom-6 lg:right-6 right-0 p-4 lg:p-0">
      <div class="flex flex-col lg:flex-row items-start gap-5 lg:gap-3 popup-cookie__body bg-violet-40 p-4">
        <img src="/image/popup/logo-white.svg" alt="Логотип"/>
        <div class="flex flex-col items-start gap-5 lg:gap-4">
          <p class="text-sm text-white font-montserrat-alternates-medium">
            Здравствуйте! Мы используем cookies - Cookies информируют нас о
            страницах сайта, которые вы посещаете, позволяют измерить
            эффективность рекламы и поиска, а также сделать необходимые выводы о
            взаимодействии с сайтом в целях улучшения коммуникации и продуктов.
            Узнайте больше о
            <a href="https://www.unilevernotices.com/cookie-notices/russia-russian.html" target="_blank"
               class="font-bold cursor-pointer"
            >политике Cookies</a
            >
          </p>
          <button @click="handleAcceptCookie" class="px-[14px] py-3 bg-[#76DDF5] flex text-blue-80 h-[44px] w-full lg:w-[98px]">
          <span class="font-montserrat-alternates-medium text-sm m-auto">
            Согласен
          </span>
          </button>
        </div>
      </div>
    </div>
    <!--
    <div v-if="visiblePopupSuccess"
         class="pop-notification z-[1000] max-w-[343px] lg:max-w-[400px] fixed min-h-[92px] w-full flex flex-row  gap-5 items-center items-start bg-violet-40 top-6 right-6 p-6">
      <div class="w-[44px] h-[44px] bg-cyan-50 flex">
        <img class="m-auto" src="/image/icon/icon-tick.svg">
      </div>
      <p class="text-base text-white font-montserrat-alternates-medium font-semibold">Форма успешно отправлена</p>
      <img @click="handleClosePopNotification" class="absolute w-6 h-6 top-2 cursor-pointer right-2"
           src="/image/icon/close.svg">
    </div>
    -->
  </div>
</template>

<style scoped>
.popup-cookie {
  width: 100%;
  max-width: 820px;
  position: fixed;
  z-index: 100;
  min-height: 188px;
}
</style>
