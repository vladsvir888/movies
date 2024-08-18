<template>
  <div
    class="hero-block-detail"
    :style="{
      backgroundImage: `url(${config.public.apiImgUrl}original${data.backdrop_path})`,
    }"
  >
    <div class="container hero-block-detail__container">
      <div class="hero-block-detail__content">
        <Heading v-if="preparedTitle" class="hero-block-detail__title">
          {{ preparedTitle }}
        </Heading>
        <p v-if="data.overview" class="hero-block-detail__text">
          {{ data.overview }}
        </p>
        <p class="hero-block-detail__date">
          <b v-if="data.release_date">{{ data.release_date }}</b>
          <span v-if="data.status">({{ data.status }})</span>
        </p>
        <ul v-if="data.genres?.length" class="hero-block-detail__genres">
          <li v-for="genre in data.genres" :key="genre.id">
            <Button
              :to="`/discover/${type}?${FILTER_VALUES['with_genres']}=${genre.id}`"
              variant="secondary"
              :pill="true"
              size="medium"
            >
              {{ genre.name }}
            </Button>
          </li>
        </ul>
        <div class="hero-block-detail__wrapper">
          <Rating v-if="data.vote_average" v-model="ratingCount" />
          <p v-if="data.vote_average" class="hero-block-detail__wrapper-text">
            {{ data.vote_average }} / 10
          </p>
        </div>
      </div>
      <LazyImage
        :src="`${config.public.apiImgUrl}w500${data.poster_path}`"
        :sizes="{
          width: 550,
          height: 750,
        }"
        class="hero-block-detail__image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LazyImage from "~/src/shared/ui/lazy-image";
import Rating from "~/src/shared/ui/rating";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { divideByTwoAndRound } from "~/src/shared/lib/format";
import { useRouteParam } from "~/src/shared/lib/use";
import { getTitleOrName } from "~/src/shared/lib/get";
import { FILTER_VALUES } from "~/src/features/media";
import type { Media, MediaTypes } from "~/src/shared/config";

type HeroSectionDetailProps = {
  data: Media;
};

const props = defineProps<HeroSectionDetailProps>();

const config = useRuntimeConfig();

const ratingCount = ref(divideByTwoAndRound(props.data.vote_average));

const preparedTitle = computed(() => getTitleOrName(props.data));

const type = useRouteParam<MediaTypes>("type");

watch(
  () => props.data.vote_average,
  (newValue) => (ratingCount.value = divideByTwoAndRound(newValue)),
);
</script>

<style lang="scss">
.hero-block-detail {
  position: relative;
  min-height: min(100vh, 1080px);
  max-width: 1920px;
  margin: 0 auto;
  padding: var(--header-margin) 0;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  &::before {
    position: absolute;
    inset: 0;
    background-color: rgb(var(--palette-black--rgb) / 80%);
    backdrop-filter: blur(5px);
    content: "";
  }

  &__container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 50%;
    gap: 20px;
    align-items: center;

    @media (--tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__text {
    max-width: 800px;
    font-size: 20px;
    line-height: 1.4;
    opacity: 0.8;
  }

  &__date {
    display: flex;
    column-gap: 10px;
  }

  &__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__wrapper {
    display: flex;
    column-gap: 10px;
  }
}
</style>
