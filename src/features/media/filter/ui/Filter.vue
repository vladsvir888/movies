<template>
  <aside class="filter">
    <form class="filter__form">
      <AccordionGroup>
        <AccordionItem id="filter-genres" :title="$t('Genres')">
          <Select
            v-model="filter.with_genres"
            :options="transformedGenres"
            class="filter__select-block"
            :label="$t('Genres')"
            @change="setFilterValuesInUrl"
          />
        </AccordionItem>

        <AccordionItem id="filter-sort" :title="$t('Sort by')">
          <div class="filter__sort-wrapper">
            <RadioButton
              v-for="radio in sortedData"
              :id="`filter-sort-${radio.value}`"
              :key="`filter-sort-${radio.value}`"
              v-model="filter.sort_by"
              :label="radio.label"
              :value="radio.value"
              @change="setFilterValuesInUrl"
            />
            <Switcher
              v-model="isOrderDescending"
              :label="$t('Order descending')"
            />
          </div>
        </AccordionItem>

        <AccordionItem id="filter-rating" :title="$t('Rating')">
          <Rating v-model="ratingCount" :inert="false" />
        </AccordionItem>

        <AccordionItem id="filter-release-date" :title="$t('Release Date')">
          <div class="filter__date">
            <InputBlock
              v-model="filter['release_date.gte']"
              type="date"
              class="filter__date-input-block"
              @input="setFilterValuesInUrl"
            />
            <span class="filter__date-divider">—</span>
            <InputBlock
              v-model="filter['release_date.lte']"
              type="date"
              class="filter__date-input-block"
              @input="setFilterValuesInUrl"
            />
          </div>
        </AccordionItem>
      </AccordionGroup>
    </form>
  </aside>
</template>

<script setup lang="ts">
import { AccordionGroup, AccordionItem } from "~/src/shared/ui/accordion";
import InputBlock from "~/src/shared/ui/input-block";
import Rating from "~/src/shared/ui/rating";
import RadioButton from "~/src/shared/ui/radio-button";
import Switcher from "~/src/shared/ui/switcher";
import Select from "~/src/shared/ui/select";
import { divideByTwoAndRound } from "~/src/shared/lib/format";
import { useRouteParam } from "~/src/shared/lib/use";
import { isEmptyObject } from "~/src/shared/lib/is";
import {
  SORT_ORDERS,
  SORT_TYPES,
  FILTER_VALUES,
  type SortOrdersKeys,
  type TFilter,
  type FilterKeys,
} from "../config";
import { useMediaStore } from "~/src/entities/media";
import type { MediaTypes } from "~/src/shared/config";

const filter = defineModel<TFilter>("filter", {
  required: true,
});
const ratingCount = defineModel<number>("ratingCount", {
  required: true,
});

const mediaStore = useMediaStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const type = useRouteParam<MediaTypes>("type");

const sortOrder = ref<SortOrdersKeys>(SORT_ORDERS.desc);
const isOrderDescending = ref(true);

const transformedGenres = computed(() => {
  return mediaStore[type.value].genres.map(({ id, name }) => ({
    value: String(id),
    text: name,
  }));
});

const sortedData = computed(() => {
  const types = SORT_TYPES[type.value];
  const data: { value: string; label: string }[] = [];

  const transformType = (type: string): string =>
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

const setFilterValuesInUrl = (): void => {
  router.push({
    query: filter.value,
  });
};

const toggleSortOrder = (value: boolean): void => {
  if (!value) {
    sortOrder.value = SORT_ORDERS.asc;
  } else {
    sortOrder.value = SORT_ORDERS.desc;
  }
};

const updateFilterSortBy = (value: string | undefined): void => {
  filter.value.sort_by = value
    ? `${value.split(".")[0]}.${sortOrder.value}`
    : sortedData.value[0].value;
};

const updateFilterValues = (): void => {
  const { query } = route;

  if (isEmptyObject(query)) {
    return;
  }

  for (const key in query) {
    if (typeof query[key] !== "string") {
      return;
    }

    if (key === FILTER_VALUES["vote_average.gte"]) {
      ratingCount.value = divideByTwoAndRound(Number(query[key])); // trigger watch ratingCount
    } else if (key === FILTER_VALUES.sort_by && query[key] !== "") {
      isOrderDescending.value = query[key].split(".")[1] === sortOrder.value;
      toggleSortOrder(isOrderDescending.value);
      updateFilterSortBy(query[key]);
    } else {
      filter.value[key as Exclude<FilterKeys, "sort_by" | "vote_average.gte">] =
        query[key];
    }
  }
};

updateFilterValues();

watch(isOrderDescending, (newValue) => {
  toggleSortOrder(newValue);
  updateFilterSortBy(filter.value.sort_by);
  setFilterValuesInUrl();
});

watch(ratingCount, (newValue) => {
  if (!newValue) {
    return;
  }

  filter.value["vote_average.gte"] = String(newValue * 2);

  setFilterValuesInUrl();
});
</script>

<style lang="scss">
.filter {
  position: sticky;
  top: var(--header-height);
  display: flex;
  align-self: flex-start;

  @media (--desktop) {
    position: static;
  }

  &__form {
    width: 100%;
  }

  &__select-block {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;
    margin: 1px;

    .select-block {
      &__select-wrapper {
        width: 100%;
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

    @media (--mobile) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    &-divider {
      @media (--mobile) {
        display: none;
      }
    }

    &-input-block {
      @media (--mobile) {
        width: 100%;
      }
    }
  }
}
</style>
