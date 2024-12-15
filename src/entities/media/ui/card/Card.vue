<template>
  <article class="card">
    <LazyImage
      :src="`${config.public.apiImgUrl}w400${data.poster_path}`"
      :sizes="{
        width: 400,
        height: 600,
      }"
      loading="lazy"
      class="card__img"
    />
    <div class="card__content">
      <Heading v-if="preparedTitle" :level="headingLevel" class="card__title">
        <Button :to="`/${type}/${data.id}`" class="card__link">
          {{ preparedTitle }}
        </Button>
      </Heading>
      <div class="card__wrapper">
        <Icon icon="star" class="card__icon" />
        <p v-if="data.vote_average" class="card__text">
          {{ data.vote_average }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import LazyImage from "~/src/shared/ui/lazy-image";
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { getTitleOrName } from "~/src/shared/lib/get";
import type { Media, MediaTypes } from "~/src/shared/config";

type CardProps = {
  data: Media;
  type: MediaTypes;
  headingLevel?: number;
};

const props = withDefaults(defineProps<CardProps>(), {
  headingLevel: 3,
});

const config = useRuntimeConfig();

const preparedTitle = computed(() => getTitleOrName(props.data));
</script>

<style lang="scss">
.card {
  $this: &;

  position: relative;
  display: grid;
  height: 100%;

  &::before {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: rgb(var(--palette-black--rgb) / 0%);
    transition: background-color var(--transition300ms);
    content: "";
  }

  @include hover {
    &::before {
      background-color: rgb(var(--palette-black--rgb) / 80%);
    }

    #{$this}__content {
      opacity: 1;
      translate: 0 0;
    }
  }

  &:focus-within {
    &::before {
      background-color: rgb(var(--palette-black--rgb) / 80%);
    }

    #{$this}__content {
      opacity: 1;
      visibility: visible;
      translate: 0 0;
    }
  }

  &__img {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    > .lazy-image__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    padding: 10px;
    opacity: 0;
    translate: 0 2%;
    text-align: center;
    transition:
      opacity var(--transition300ms),
      translate var(--transition300ms);
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__title {
    font-size: 18px;

    @media (--mobile) {
      font-size: 16px;
    }
  }

  &__link {
    outline: none;

    &::before {
      position: absolute;
      inset: 0;
      content: "";
    }
  }

  &__icon {
    color: var(--palette-puerto-rico);

    > svg {
      fill: currentColor;
    }
  }
}
</style>
