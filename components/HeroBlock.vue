<template>
  <div
    class="hero"
    :style="{
      backgroundImage: `url('${config.public.apiImgUrl}original${data.backdrop_path}')`,
    }"
  >
    <div class="hero__content">
      <p v-if="computedTitle" class="hero__title">
        {{ computedTitle }}
      </p>
      <div class="hero__wrapper">
        <TheRating v-if="data.vote_average" v-model="ratingCount" />
        <p v-if="data.vote_average" class="hero__rating-count">
          {{ data.vote_average }} / 10
        </p>
        <p v-if="data.vote_count" class="hero__reviews">
          {{ $t("Reviews") }}: {{ data.vote_count }}
        </p>
        <p v-if="data.release_date" class="hero__date">
          {{ $t("Release Date") }}:
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
    default: () => {},
  },
});

const ratingCount = ref(divideByTwoAndRound(props.data.vote_average));

const computedTitle = computed(() => {
  if (props.data.title) {
    return props.data.title;
  }

  return props.data.name;
});

watch(
  () => props.data.vote_average,
  (newValue) => (ratingCount.value = divideByTwoAndRound(newValue))
);
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

  @media (width <= 600px) {
    min-height: 500px;
  }

  &::before {
    position: absolute;
    inset: 0;
    background-color: rgb(0 0 0 / 80%);
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
}
</style>
