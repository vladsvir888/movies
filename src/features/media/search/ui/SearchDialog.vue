<template>
  <Dialog
    class="search-dialog"
    :title="$t('Search')"
    v-model:is-show="isSearchDialogVisible"
  >
    <InputBlock
      v-model="searchQuery"
      :placeholder="$t('Type to search...')"
      :clearable="true"
      autocomplete="off"
      class="search-dialog__input"
    >
      <template #prefix-icon>
        <Icon icon="loupe" />
      </template>
    </InputBlock>
    <BaseLoader v-if="isPendingSearch" class="search-dialog__loader" />
    <ul
      v-else-if="totalResults?.length && !isPendingSearch"
      class="search-dialog__results"
    >
      <li v-for="result in totalResults" :key="result.id">
        <Button
          class="search-dialog__results-button"
          :to="`/${mediaType}/${result.id}`"
          variant="underline"
          @click="hideSearchDialog"
        >
          {{ result.title ?? result.name }}
        </Button>
      </li>
    </ul>
    <div
      v-else-if="
        !totalResults?.length &&
        !isPendingSearch &&
        searchQueryDebounced?.length
      "
      class="search-dialog__no-results"
    >
      <Icon icon="loupe-line-through" />
      <p class="search-dialog__no-results-text">
        {{ $t("No results for") }}
        <b>"{{ searchQueryDebounced }}"</b>
      </p>
    </div>
    <div
      v-if="totalResults?.length && !isPendingSearch"
      class="search-dialog__pagination"
    >
      <Button
        class="search-dialog__pagination-button search-dialog__pagination-button--prev"
        :aria-label="$t('Previous')"
        :disabled="isFirstPage"
        @click="toPreviousPage"
      >
        <Icon icon="arrow-prev" />
      </Button>
      <p class="search-dialog__pagination-text">
        {{ page }} / {{ totalPages }}
      </p>
      <Button
        class="search-dialog__pagination-button search-dialog__pagination-button--next"
        :aria-label="$t('Next')"
        :disabled="isLastPage"
        @click="toNextPage"
      >
        <Icon icon="arrow-next" />
      </Button>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from "~/src/shared/ui/dialog";
import InputBlock from "~/src/shared/ui/input-block";
import Icon from "~/src/shared/ui/icon";
import Button from "~/src/shared/ui/button";
import { BaseLoader } from "~/src/shared/ui/loaders";
import { useDebouncedRef, useRouteParam } from "~/src/shared/lib/use";

const { locale } = useI18n();
const { $api } = useNuxtApp();
const mediaType = useRouteParam("type");

const searchQuery = ref("");
const searchQueryDebounced = useDebouncedRef(searchQuery, 650);
const totalResults = ref([]);
const isPendingSearch = ref(false);
const page = ref(1);
const totalPages = ref(null);
const totalResultsCount = ref(null);

const isSearchDialogVisible = defineModel("isSearchDialogVisible");

const toPreviousPage = () => {
  page.value -= 1;
};

const toNextPage = () => {
  page.value += 1;
};

const hideSearchDialog = () => {
  isSearchDialogVisible.value = false;
};

const resetSearchQuery = () => {
  searchQuery.value = "";
  totalResults.value = [];
  page.value = 1;
  totalPages.value = null;
  totalResultsCount.value = null;
};

const isFirstPage = computed(() => {
  return page.value === 1;
});

const isLastPage = computed(() => {
  return page.value === totalPages.value;
});

watch([searchQueryDebounced, page], async () => {
  if (!mediaType.value) {
    return;
  }

  await $api(`/search/${mediaType.value}`, {
    onRequest({ options }) {
      isPendingSearch.value = true;
      options.query = {
        query: searchQueryDebounced.value,
        include_adult: false,
        page: page.value,
        language: locale.value,
      };
    },
    onResponse({ response }) {
      isPendingSearch.value = false;
      totalResults.value = response._data.results;

      if (
        totalPages.value !== response._data.total_pages &&
        totalResultsCount.value !== response._data.total_results
      ) {
        page.value = 1;
      }

      totalPages.value = response._data.total_pages;
      totalResultsCount.value = response._data.total_results;
    },
  });
});

watch(mediaType, resetSearchQuery);
</script>

<style lang="scss">
.search-dialog {
  &__input {
    font-weight: 700;
  }

  &__pagination-button {
    transition: color var(--transition300ms);

    @include hover {
      &:not(:disabled) {
        color: var(--palette-puerto-rico);
      }
    }
  }

  &__results {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding-left: 20px;
    list-style: circle;

    &-button {
      padding: 5px 0;
    }
  }

  &__no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;

    b {
      word-break: break-all;
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    gap: 20px;

    &-button {
      &--prev {
        rotate: 180deg;
      }
    }
  }

  &__loader {
    align-self: center;
  }
}
</style>
