<template>
  <div class="autoload-card-block">
    <div class="autoload-card-block__container">
      <AtomHeading
        v-if="title"
        variant="underline"
        class="autoload-card-block__title"
      >
        {{ $t(title) }}
      </AtomHeading>
      <AtomButton
        v-if="isBackButton"
        @click="$router.back()"
        variant="underline"
        class="autoload-card-block__back"
      >
        <AtomIcon icon="arrow-prev" />
        {{ $t("Go back") }}
      </AtomButton>
      <ul class="autoload-card-block__list">
        <li v-for="item in data" :key="item.id">
          <MoleculeCard :data="item" :type="preparedType" :heading-level="2" />
        </li>
      </ul>
      <AtomLoader v-show="isPending" class="autoload-card-block__loader" />
      <div v-intersection-observer="{ callback, options }"></div>
    </div>
  </div>
</template>

<script setup>
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
.autoload-card-block {
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
