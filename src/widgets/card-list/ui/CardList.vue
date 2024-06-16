<template>
  <div class="card-list">
    <div class="card-list__container">
      <Heading v-if="title" variant="underline" class="card-list__title">
        {{ $t(title) }}
      </Heading>
      <Button
        v-if="isBackButton"
        @click="$router.back()"
        variant="underline"
        class="card-list__back"
      >
        <Icon icon="arrow-prev" />
        {{ $t("Go back") }}
      </Button>
      <ul class="card-list__list">
        <li v-for="item in data" :key="item.id">
          <MovieCard :data="item" :type="preparedType" :heading-level="2" />
        </li>
      </ul>
      <BaseLoader v-show="isPending" class="card-list__loader" />
      <div v-intersection-observer="{ callback, options }"></div>
    </div>
  </div>
</template>

<script setup>
import { MovieCard } from "~/src/entities/movie";
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { BaseLoader } from "~/src/shared/ui/loaders";
import { useRouteParam } from "~/src/shared/lib/use";

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
  title: {
    type: String,
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

const type = useRouteParam("type");
const category = useRouteParam("category");

const preparedType = computed(() => type.value || category.value);

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
.card-list {
  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__title {
    text-align: center;
    margin: 0 auto;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--grid-gap);
  }

  &__back {
    width: max-content;
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
