<script>
import DisabledScripts from '~/components/DisabledScripts.vue'

export default {
  components: {DisabledScripts},
  head() {
    return {
      script: [
        {
          hid: 'gtm-script',
          src: 'https://www.googletagmanager.com/gtm.js?id=GTM-MWWZT28',
          async: true
        }
      ]
    }
  }
}
</script>

<template>
  <Header />
  <PopupCookie />
  <div>
    <slot />
  </div>
  <Footer />
</template>

<style scoped>

</style>
