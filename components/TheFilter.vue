<template>
  <aside class="filter">
    <form class="filter__form">
      <AccordionGroup>
        <AccordionItem :title="$t('Genres')" id="filter-genres">
          <TheSelect
            v-model="filter.with_genres"
            :options="transformedGenres"
            wrapper-class="filter__select-block"
            @change="setFilter"
          />
        </AccordionItem>

        <AccordionItem :title="$t('Sort by')" id="filter-sort">
          <div class="filter__sort-wrapper">
            <RadioButton
              v-for="radio in sortData"
              :key="`filter-sort-${radio.value}`"
              v-model="filter.sort_by"
              :label="radio.label"
              :id="`filter-sort-${radio.value}`"
              :value="radio.value"
              name="filter-sort"
              @change="setFilter"
            />
            <TheSwitcher v-model="isChecked" label="Order descending" />
          </div>
        </AccordionItem>

        <AccordionItem :title="$t('Rating')" id="filter-rating">
          <TheRating :inert="false" v-model="ratingCount" />
        </AccordionItem>

        <AccordionItem :title="$t('Release Date')" id="filter-release-date">
          <div class="filter__date">
            <InputBlock
              v-model="filter['release_date.gte']"
              type="date"
              wrapper-class="filter__date-input-block"
              @change="setFilter"
            />
            <span class="filter__date-divider">—</span>
            <InputBlock
              v-model="filter['release_date.lte']"
              type="date"
              wrapper-class="filter__date-input-block"
              @change="setFilter"
            />
          </div>
        </AccordionItem>
      </AccordionGroup>
    </form>
  </aside>
</template>

<script setup>
import { sortTypes } from "~/constants";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const ratingCount = ref(0);
const sortOrder = ref("desc");
const isChecked = ref(true);

const category = computed(() => {
  return route.params.category;
});

const transformedGenres = computed(() => {
  return store[category.value].genres.map(({ id, name }) => ({
    value: id,
    text: name,
  }));
});

const sortData = computed(() => {
  const types = sortTypes[category.value];
  const data = [];

  const transformType = (type) =>
    type
      .split("_")
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(" ");

  types.forEach((type) => {
    data.push({
      value: `${type}.${sortOrder.value}`,
      label: t(transformType(type)),
    });
  });

  return data;
});

const filter = ref({
  with_genres: "",
  sort_by: sortData.value[0].value,
  "vote_average.gte": "",
  "release_date.gte": "",
  "release_date.lte": "",
});

const setFilter = () => {
  router.push({
    query: filter.value,
  });
};

watch(isChecked, (newValue) => {
  if (!newValue) {
    sortOrder.value = "asc";
  } else {
    sortOrder.value = "desc";
  }

  filter.value.sort_by = `${filter.value.sort_by.split(".")[0]}.${
    sortOrder.value
  }`;

  setFilter();
});

watch(ratingCount, (newValue) => {
  filter.value["vote_average.gte"] = newValue * 2;

  setFilter();
});

useApi(`/genre/${category.value}/list`, {
  onResponse({ response }) {
    store[category.value].genres = response._data.genres;
  },
});
</script>

<style lang="scss">
.filter {
  position: sticky;
  top: 0;
  display: flex;
  align-self: flex-start;

  @media (width <= 1200px) {
    position: static;
  }

  &__form {
    width: 100%;
  }

  &__select-block {
    .select-block {
      &__select-wrapper {
        width: 100%;
        margin: 1px;
      }

      &__select {
        padding: 10px;
      }
    }
  }

  &__sort-wrapper,
  &__date {
    margin: 5px;
  }

  &__date {
    display: flex;
    align-items: center;
    gap: 5px;

    @media (width <= 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    &-divider {
      @media (width <= 600px) {
        display: none;
      }
    }

    &-input-block {
      @media (width <= 600px) {
        width: 100%;
      }
    }
  }
}
</style>
