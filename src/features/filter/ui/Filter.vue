<template>
  <aside class="filter">
    <form class="filter__form">
      <AccordionGroup>
        <AccordionItem :title="$t('Genres')" id="filter-genres">
          <Select
            v-model="filter.with_genres"
            :options="transformedGenres"
            wrapper-class="filter__select-block"
            @change="setFilterValuesInUrl"
          />
        </AccordionItem>

        <AccordionItem :title="$t('Sort by')" id="filter-sort">
          <div class="filter__sort-wrapper">
            <RadioButton
              v-for="radio in sortedData"
              :key="`filter-sort-${radio.value}`"
              v-model="filter.sort_by"
              :label="radio.label"
              :id="`filter-sort-${radio.value}`"
              :value="radio.value"
              name="filter-sort"
              @change="setFilterValuesInUrl"
            />
            <Switcher
              v-model="isOrderDescending"
              :label="$t('Order descending')"
            />
          </div>
        </AccordionItem>

        <AccordionItem :title="$t('Rating')" id="filter-rating">
          <Rating :inert="false" v-model="ratingCount" />
        </AccordionItem>

        <AccordionItem :title="$t('Release Date')" id="filter-release-date">
          <div class="filter__date">
            <InputBlock
              v-model="filter['release_date.gte']"
              type="date"
              wrapper-class="filter__date-input-block"
              @change="setFilterValuesInUrl"
            />
            <span class="filter__date-divider">—</span>
            <InputBlock
              v-model="filter['release_date.lte']"
              type="date"
              wrapper-class="filter__date-input-block"
              @change="setFilterValuesInUrl"
            />
          </div>
        </AccordionItem>
      </AccordionGroup>
    </form>
  </aside>
</template>

<script setup>
import { AccordionGroup, AccordionItem } from "~/src/shared/ui/accordion";
import InputBlock from "~/src/shared/ui/input-block";
import Rating from "~/src/shared/ui/rating";
import RadioButton from "~/src/shared/ui/radio-button";
import Switcher from "~/src/shared/ui/switcher";
import Select from "~/src/shared/ui/select";
import { useCustomFetch } from "~/src/shared/api";
import { divideByTwoAndRound } from "~/src/shared/lib/format";
import { useRouteParam } from "~/src/shared/lib/use";
import { isEmptyObject } from "~/src/shared/lib/is";
import { SORT_ORDERS, SORT_TYPES, FILTER_VALUES, FILTER } from "../config";
import { useMediaStore } from "~/src/entities/media";

const mediaStore = useMediaStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const removedVariant = defineModel("removedVariant", {
  default: null,
});

const ratingCount = ref(0);
const sortOrder = ref(SORT_ORDERS.descending);
const isOrderDescending = ref(true);

const category = useRouteParam("category");

const transformedGenres = computed(() => {
  return mediaStore[category.value].genres.map(({ id, name }) => ({
    value: id,
    text: name,
  }));
});

const sortedData = computed(() => {
  const types = SORT_TYPES[category.value];
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

const filter = ref(FILTER);

const setFilterValuesInUrl = () => {
  router.push({
    query: filter.value,
  });
};

const toggleSortOrder = (value) => {
  if (!value) {
    sortOrder.value = SORT_ORDERS.ascending;
  } else {
    sortOrder.value = SORT_ORDERS.descending;
  }
};

const updateFilterSortBy = (value) => {
  filter.value[FILTER_VALUES["sort_by"]] = value
    ? `${value.split(".")[0]}.${sortOrder.value}`
    : sortedData.value[0].value;
};

const updateFilterValues = () => {
  const { query } = route;

  if (isEmptyObject(query)) {
    return;
  }

  for (let key in query) {
    if (key === FILTER_VALUES["vote_average.gte"]) {
      ratingCount.value = divideByTwoAndRound(Number(query[key])); // trigger watch ratingCount
    } else if (key === FILTER_VALUES["sort_by"] && query[key] !== "") {
      isOrderDescending.value = query[key].split(".")[1] === sortOrder.value;

      toggleSortOrder(isOrderDescending.value);
      updateFilterSortBy(query[key]);
    } else {
      filter.value[key] = query[key];
    }
  }
};

watch(isOrderDescending, (newValue) => {
  toggleSortOrder(newValue);
  updateFilterSortBy(filter.value[FILTER_VALUES["sort_by"]]);
  setFilterValuesInUrl();
});

watch(ratingCount, (newValue) => {
  if (!newValue) {
    return;
  }

  filter.value[FILTER_VALUES["vote_average.gte"]] = newValue * 2;

  setFilterValuesInUrl();
});

watch(removedVariant, (newValue) => {
  if (newValue === FILTER_VALUES["vote_average.gte"]) {
    ratingCount.value = 0;
  }

  filter.value[newValue] = "";

  setFilterValuesInUrl();
});

useCustomFetch(`/genre/${category.value}/list`, {
  onResponse({ response }) {
    mediaStore[category.value].genres = response._data.genres;
  },
});

onMounted(updateFilterValues);
</script>

<style lang="scss">
.filter {
  position: sticky;
  top: var(--header-height);
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
