<template>
  <article class="video-player">
    <div ref="iframe" class="video-player__iframe" v-show="isLoadIframe"></div>
    <div v-show="!isLoadIframe" class="video-player__media">
      <NuxtImg
        :src="`https://i.ytimg.com/vi/${data.id}/maxresdefault.jpg`"
        loading="lazy"
        alt=""
        class="video-player__img"
      />
      <Button
        class="video-player__button"
        :aria-label="`Play video: ${data.name}`"
        @click="createIframe"
      >
        <Icon icon="youtube" />
      </Button>
    </div>
    <Heading v-if="data.name" :level="2" class="video-player__title">{{
      data.name
    }}</Heading>
    <div class="video-player__wrapper">
      <p v-if="data.type" class="video-player__type">{{ data.type }}</p>
      <p v-if="transformedDate" class="video-player__date">
        {{ transformedDate }}
      </p>
    </div>
  </article>
</template>

<script setup>
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { formatDate } from "~/src/shared/lib/format";
import { useVideo } from "~/src/entities/movie";

const videoStore = useVideo();

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const transformedDate = computed(() => {
  return formatDate(props.data.date);
});

const iframe = ref(null);
const isLoadIframe = ref(false);

function createIframe() {
  isLoadIframe.value = true;
  videoStore.createVideo(iframe.value, props.data.id);
}
</script>

<style lang="scss">
@import "~/src/shared/ui/styles/helpers/mixins/hover.scss";

.video-player {
  $this: &;

  display: flex;
  flex-direction: column;
  row-gap: 6px;

  &__iframe,
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1.77;
  }

  &__media {
    position: relative;
    padding: 5px;
    cursor: pointer;

    &::before {
      position: absolute;
      inset: 0;
      background-color: rgb(var(--palette-white--rgb) / 70%);
      backdrop-filter: blur(5px);
      opacity: 0;
      transition: opacity var(--transition300ms);
      content: "";
    }

    @include hover {
      &::before {
        opacity: 1;
      }

      #{$this}__button {
        opacity: 1;
      }
    }

    &:focus-within {
      &::before {
        opacity: 1;
      }

      #{$this}__button {
        opacity: 1;
      }
    }
  }

  &__button {
    position: absolute;
    inset: 0;
    outline: none;
    opacity: 0;
    color: rgb(var(--palette-red--rgb));
    transition: opacity var(--transition300ms);

    > .icon svg {
      width: 64px;
      height: 64px;
    }
  }

  &__title {
    font-size: 18px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }

  &__date {
    font-size: 14px;
    opacity: 0.6;
  }
}
</style>
