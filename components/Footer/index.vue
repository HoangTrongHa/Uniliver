<script setup lang="ts">
const router = useRouter()
const LIST_ROUTES_HIDE = ['contact']
const checkRouteHide = computed(() => {
  return LIST_ROUTES_HIDE.includes(<string>router.currentRoute?.value?.name)
})
</script>

<template>
  <div id="footer" class="overflow-hidden">
    <FooterContact
        v-if="!checkRouteHide"
        description="Оставайтесь на связи с компанией Unilever и командами
                    специалистов или выходите на связь с сотрудниками по всему
                    миру."
        link="/contact"
    />
    <!-- Main -->
    <FooterMain />
  </div>
</template>

<style scoped></style>