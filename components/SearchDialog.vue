<template>
  <DialogContainer
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
        <TheIcon icon="loupe" />
      </template>
    </InputBlock>
    <TheLoader v-if="isPendingSearch" class="search-dialog__loader" />
    <ul
      v-else-if="totalResults.length && !isPendingSearch"
      class="search-dialog__results"
    >
      <li v-for="result in totalResults" :key="result.id">
        <TheButton
          @click="hideSearchDialog"
          class="search-dialog__results-button"
          :to="`/${result.media_type}/${result.id}`"
          variant="underline"
        >
          {{ result.title ?? result.name }}
        </TheButton>
      </li>
    </ul>
    <div
      v-else-if="
        !totalResults.length && !isPendingSearch && searchQueryDebounced.length
      "
      class="search-dialog__no-results"
    >
      <TheIcon icon="loupe-line-through" />
      <p class="search-dialog__no-results-text">
        {{ $t("No results for") }}
        <b>"{{ searchQueryDebounced }}"</b>
      </p>
    </div>
    <div
      v-if="totalResults.length && !isPendingSearch"
      class="search-dialog__pagination"
    >
      <TheButton
        class="search-dialog__pagination-button search-dialog__pagination-button--prev"
        :aria-label="$t('Previous')"
        @click="toPreviousPage"
        :disabled="isFirstPage"
      >
        <TheIcon icon="arrow-prev" />
      </TheButton>
      <p class="search-dialog__pagination-text">
        {{ page }} / {{ totalPages }}
      </p>
      <TheButton
        class="search-dialog__pagination-button search-dialog__pagination-button--next"
        :aria-label="$t('Next')"
        @click="toNextPage"
        :disabled="isLastPage"
      >
        <TheIcon icon="arrow-next" />
      </TheButton>
    </div>
  </DialogContainer>
</template>

<script setup>
const { locale } = useI18n();

const searchQuery = ref("");
const searchQueryDebounced = debouncedRef(searchQuery, 650);
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

const isFirstPage = computed(() => {
  return page.value === 1;
});

const isLastPage = computed(() => {
  return page.value === totalPages.value;
});

useApi("/search/multi", {
  immediate: false,
  query: {
    query: searchQueryDebounced,
    include_adult: false,
    page,
    language: locale,
  },
  onRequest() {
    isPendingSearch.value = true;
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
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

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
