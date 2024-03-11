<template>
  <div
    class="hero"
    :style="{
      backgroundImage: `url('${config.public.apiImgUrl}${data.backdrop_path}')`,
    }"
  >
    <div class="hero__content">
      <h1 v-if="data.title" class="hero__title">
        {{ data.title }}
      </h1>
      <div class="hero__wrapper">
        <TheRating v-if="data.vote_average" v-model="ratingCount" />
        <p v-if="data.vote_average" class="hero__rating-count">
          {{ data.vote_average }} / 10
        </p>
        <p v-if="data.vote_count" class="hero__reviews">
          {{ $t("hero_block.reviews") }} {{ data.vote_count }}
        </p>
        <p v-if="data.release_date" class="hero__date">
          {{ $t("hero_block.release_date") }}
          {{ transformDate(data.release_date) }}
        </p>
      </div>
      <p v-if="data.overview" class="hero__text">
        {{ data.overview }}
      </p>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: null,
  },
});

const ratingCount = ref(Math.ceil(props.data.vote_average / 2));
</script>

<style lang="scss">
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (width <= 600px) {
    min-height: 500px;
  }

  &::before {
    position: absolute;
    inset: 0;
    background-color: rgb(0 0 0 / 45%);
    content: "";
  }

  &__content {
    position: relative;
    padding: 20px 100px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 1000px;

    @media (width <= 600px) {
      padding: 20px;
    }
  }

  &__title {
    margin-bottom: 12px;
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
}
</style>
