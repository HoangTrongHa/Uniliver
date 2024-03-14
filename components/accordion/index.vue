<script setup lang="ts">
import { ref, computed } from "vue"

interface IProps {
    title: string
    info: string
    styles?: any
    icon?: "lg" | "md" | "sm"
    modelValue?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    icon: "lg",
    styles: {
        article: "",
        header: {
            default: "",
            title: "",
            button: ""
        },
        content: {
            default: "mt-4",
            text: ""
        }
    }
})

const sizeIcon = {
    lg: {
        width: 24,
        height: 24,
    },
    md: {
        width: 16,
        height: 16
    },
    sm: {
        width: 12,
        height: 12
    }
}

const expanded = ref(props.modelValue);

const toggle = () => {
    expanded.value = !expanded.value
}
const hovered = ref('#015EFF')
</script>

<template>
    <article
        :class="styles?.article"
    >
        <header class="flex sm:items-start items-center justify-between cursor-pointer" :class="styles?.header?.default" @click="toggle">
            <h4 :class="styles?.header?.title">
                {{ title }}
            </h4>
            <button :class="styles?.header?.button">
                <span v-show="!expanded">
                    <icons-top-icon class="sm:block hidden" :width="sizeIcon[icon].width" :height="sizeIcon[icon].height" :fill="hovered" :stroke="hovered" />
                    <icons-top-icon class="sm:hidden block" :width="16" :height="16" :fill="hovered" :stroke="hovered" />
                </span>
                <span v-show="expanded">
                    <icons-down-icon class="sm:block hidden" :width="sizeIcon[icon].width" :height="sizeIcon[icon].height" :fill="hovered" :stroke="hovered" />
                    <icons-down-icon class="sm:hidden block" :width="16" :height="16" :fill="hovered" :stroke="hovered" />
                </span>
            </button>
        </header>
        <div v-show="expanded" class="content" :class="styles?.content?.default">
            <p :class="styles?.content?.text">{{ info }}</p>
            <slot name="info" v-if="!info?.length"></slot>
        </div>
    </article>
</template>

<style scoped>
.content {
    transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}
</style>