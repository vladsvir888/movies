<template>
  <div
    class="hero"
    :style="{
      backgroundImage: `url('${config.public.apiImgUrl}original${data?.backdrop_path}')`,
    }"
  >
    <div class="container">
      <div class="hero__content">
        <p v-if="preparedTitle" class="hero__title">
          {{ preparedTitle }}
        </p>
        <div class="hero__wrapper">
          <Rating v-if="ratingCount" v-model="ratingCount" />
          <p v-if="data?.vote_average" class="hero__rating-count">
            {{ data.vote_average }} / 10
          </p>
          <p v-if="data?.vote_count" class="hero__reviews">
            {{ $t("Reviews") }}: {{ data.vote_count }}
          </p>
          <p v-if="data?.release_date" class="hero__date">
            {{ $t("Release Date") }}:
            {{ formatDate(data.release_date) }}
          </p>
        </div>
        <p v-if="data?.overview" class="hero__text">
          {{ data.overview }}
        </p>
        <Button
          v-if="data?.id"
          :to="`/${type}/${data.id}`"
          class="hero__more"
          variant="underline"
        >
          {{ $t("Explore more") }}
          <Icon icon="arrow-next" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/src/shared/ui/icon";
import Rating from "~/src/shared/ui/rating";
import Button from "~/src/shared/ui/button";
import { getTitleOrName } from "~/src/shared/lib/get";
import { formatDate, divideByTwoAndRound } from "~/src/shared/lib/format";
import { MEDIA_TYPES } from "~/src/entities/media";
import type { Media } from "~/src/shared/config";

type HeroSectionProps = {
  data?: Media;
};

const props = defineProps<HeroSectionProps>();

const config = useRuntimeConfig();

const ratingCount = computed(() => {
  if (!props.data?.vote_average) {
    return 0;
  }

  return divideByTwoAndRound(props.data.vote_average);
});

const preparedTitle = computed(() => {
  if (!props.data) {
    return undefined;
  }

  return getTitleOrName(props.data);
});

const type = computed(() => {
  if (!props.data) {
    return undefined;
  }

  return props.data.title ? MEDIA_TYPES[0] : MEDIA_TYPES[1];
});
</script>

<style lang="scss">
.hero {
  position: relative;
  min-height: min(100vh, 1080px);
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: calc(var(--header-height) * -1);

  @media (--mobile) {
    min-height: 500px;
    margin-top: unset;
  }

  &::before {
    position: absolute;
    inset: 0;
    background-color: rgb(var(--palette-black--rgb) / 80%);
    content: "";
  }

  &__content {
    position: relative;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;
    max-width: 1000px;
  }

  &__title {
    margin-bottom: 12px;
    font-size: 32px;
    font-weight: 700;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    > *:not(.rating) {
      opacity: 0.5;
    }
  }

  &__text {
    font-size: 20px;
    line-height: 1.4;
    opacity: 0.8;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__more {
    column-gap: 5px;
  }
}
</style>
