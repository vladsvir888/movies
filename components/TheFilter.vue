<template>
  <aside class="filter">
    <form class="filter__form">
      <AccordionGroup>
        <AccordionItem :title="$t('filter.genres')" id="filter-genres">
          <TheSelect
            v-model="filter.with_genres"
            :options="transformedGenres"
            wrapper-class="filter__select-block"
            @change="setFilter"
          />
        </AccordionItem>
        <AccordionItem :title="$t('filter.sort')" id="filter-sort">
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
          </div>
        </AccordionItem>
      </AccordionGroup>
    </form>
  </aside>
</template>

<script setup>
const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const category = computed(() => {
  return route.params.category;
});

const transformedGenres = computed(() => {
  return store[category.value].genres.map(({ id, name }) => ({
    value: id,
    text: name,
  }));
});

const sortData = ref([
  {
    value: "popularity.desc",
    label: t("filter.sort_popularity"),
  },
  {
    value: "vote_count.desc",
    label: t("filter.sort_vote_count"),
  },
]);

const filter = ref({
  with_genres: "",
  sort_by: "",
});

const setFilter = () => {
  router.push({
    query: filter.value,
  });
};

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

  &__sort-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 5px;
  }
}
</style>
