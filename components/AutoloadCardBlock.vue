<template>
  <div class="autoload-card-block">
    <div class="autoload-card-block__container">
      <h1 v-if="isTitle" class="autoload-card-block__title">
        {{ $t(`${$route.params.type}_${$route.params.category}.title`) }}
      </h1>
      <TheButton
        v-if="isBackButton"
        @click="$router.back()"
        variant="decoration"
        class="autoload-card-block__back"
      >
        <TheIcon icon="arrow-prev" />
        {{ $t("back") }}
      </TheButton>
      <ul class="autoload-card-block__list">
        <li v-for="item in data" :key="item.id">
          <CarouselCard :data="item" :type="type" />
        </li>
      </ul>
      <TheLoader v-show="isPending" class="autoload-card-block__loader" />
      <div v-intersection-observer="{ callback, options }"></div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  totalPages: {
    type: Number,
    required: true,
    default: 0,
  },
  isPending: {
    type: Boolean,
    required: true,
    default: false,
  },
  isTitle: {
    type: Boolean,
    default: true,
  },
  isBackButton: {
    type: Boolean,
    default: true,
  },
});

const page = defineModel("page", {
  required: true,
  default: 1,
});

const type = computed(() => {
  return route.params.type || route.params.category;
});

const options = {
  rootMargin: "-150px 0px 0px 0px",
};
const callback = (entries) => {
  if (
    entries[0].isIntersecting &&
    props.page < props.totalPages &&
    !props.isPending
  ) {
    page.value += 1;
  }
};
</script>

<style lang="scss">
.autoload-card-block {
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

  &__loader {
    align-self: center;
  }
}
</style>
