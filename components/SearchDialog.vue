<template>
  <DialogContainer
    class="search-dialog"
    :title="$t('search_dialog.title')"
    v-model:is-show="isSearchDialogShow"
  >
    <div class="search-dialog__input-wrapper">
      <TheIcon icon="loupe" class="search-dialog__loupe-icon" />
      <input
        v-model="searchQuery"
        type="text"
        class="search-dialog__input"
        autocomplete="off"
        :placeholder="$t('search_dialog.input')"
      />
      <TheButton
        v-show="searchQueryDebounced.length"
        @click="cleanSearchQuery"
        class="search-dialog__clean"
        :aria-label="$t('search_dialog.clean_button')"
        type="button"
      >
        <TheIcon icon="close" />
      </TheButton>
    </div>
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
          variant="decoration"
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
        {{ $t("search_dialog.no_results") }}
        <b>"{{ searchQueryDebounced }}"</b>
      </p>
    </div>
    <div
      v-if="totalResults.length && !isPendingSearch"
      class="search-dialog__pagination"
    >
      <TheButton
        class="search-dialog__pagination-button search-dialog__pagination-button--prev"
        :aria-label="$t('previous')"
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
        :aria-label="$t('next')"
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

const isSearchDialogShow = inject("isSearchDialogShow");

const cleanSearchQuery = () => {
  searchQuery.value = "";
};

const toPreviousPage = () => {
  page.value -= 1;
};

const toNextPage = () => {
  page.value += 1;
};

const hideSearchDialog = () => {
  isSearchDialogShow.value = false;
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
  &__input-wrapper {
    position: relative;
  }

  &__loupe-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    translate: 0 -50%;
    display: flex;
    transition: color var(--transition300ms);
  }

  &__input {
    width: 100%;
    padding: 16px 40px;
    border: 1px solid #e0ded7;
    border-radius: 8px;
    font: inherit;
    color: #000;
    font-weight: 700;

    &:focus {
      outline: 2px solid var(--primary-color);
      border-color: transparent;
    }

    &::placeholder {
      color: inherit;
      font-weight: 400;
    }
  }

  &__clean {
    position: absolute;
    right: 10px;
    top: 50%;
    translate: 0 -50%;
  }

  &__clean,
  &__pagination-button {
    transition: color var(--transition300ms);

    @include hover {
      &:not(:disabled) {
        color: var(--primary-color);
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
}
</style>
