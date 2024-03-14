  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface IProps {
    url: string;
    width: string;
    height: string;
  }
  const props = withDefaults(defineProps<IProps>(), {
    url: '',
    width: '720',
    height: '408'
  });
  
  const embedUrl = ref('');
  
  const getVideoId = (url: string) => {
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  };
  
  const playVideo = () => {
    embedUrl.value = `https://www.youtube.com/embed/${getVideoId(props.url)}?autoplay=1`;
  };
  
  onMounted(() => {
    // Set the initial URL without autoplay
    embedUrl.value = `https://www.youtube.com/embed/${getVideoId(props.url)}`;
  });
  </script>

<template>
    <div class="youtube-video" @mouseover="playVideo">
      <iframe
        class="w-full h-[207px] sm:h-[56.5vh]"
        ref="youtubeFrame"
        :src="embedUrl"
        :width="props.width"
        :height="props.height"
        frameborder="0"
        allowfullscreen
        allow='autoplay'
      ></iframe>
    </div>
</template>


<style scoped>
.youtube-video {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
</style>