<template>
  <div class="card-block">
    <div class="container card-block__container">
      <h1 class="card-block__title">
        {{ $t(`${$route.params.type}_${$route.params.category}.title`) }}
      </h1>
      <TheButton
        @click="$router.back()"
        variant="decoration"
        class="card-block__back"
      >
        <TheIcon icon="arrow-prev" />
        {{ $t("back") }}
      </TheButton>
      <ul class="card-block__list">
        <li v-for="item in data" :key="item.id">
          <CarouselCard :data="item" :type="$route.params.type" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style lang="scss">
.card-block {
  padding: 40px 0 20px;

  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__title {
    text-align: center;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--grid-gap);
  }

  &__back {
    width: max-content;
    color: #fff;
    justify-content: flex-start;
    column-gap: 5px;

    svg {
      rotate: 180deg;
    }
  }
}
</style>
