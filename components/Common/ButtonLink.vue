<script setup lang="ts">

interface IProps {
  text?: string
  link: string
  fill?: string
  fillHovered?: string
  size?: number
  className?: string,
  underline?: boolean,
  isButton?: boolean,
  left?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  text: 'Узнать больше',
  fill: '#015EFF',
  fillHovered: '#001F82',
  size: 16,
  className: '',
  underline: true,
  isButton: false,
  left: false
})

const hovered = ref(false)
</script>

<template>
  <nuxt-link
      :to="link"
      class="w-full sm:w-auto flex items-center justify-center gap-1 underline-offset-[3px] font-medium sm:mt-1 mt-2 font-montserrat-alternates-medium"
      :class="[className, { underline }, `text-[${!isButton && hovered ? fillHovered : fill}]`, !isButton && 'hover:text-[#001F82]']"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
  >
    <icons-right-icon
        v-if="left"
        :size="size"
        :fill="isButton || !hovered ? fill : fillHovered"
        :stroke="isButton || !hovered ? fill : fillHovered"
    />

    {{ text }}

    <icons-left-icon
        v-if="!left"
        :size="size"
        :fill="isButton || !hovered ? fill : fillHovered"
        :stroke="isButton || !hovered ? fill : fillHovered"
    />
  </nuxt-link>
</template>

<style scoped>

</style>
