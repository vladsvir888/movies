<template>
  <div class="similar-block">
    <AutoloadCardBlock
      :data="totalResults"
      :page="page"
      :total-pages="totalPages"
      :is-pending="isPendingAutoload"
      :is-title="false"
      :is-back-button="false"
      @update:page="page = $event"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const route = useRoute();
const { locale } = useI18n();

const page = ref(props.data.page);
const totalPages = ref(props.data.total_pages);
const totalResults = ref(props.data.results);
const isPendingAutoload = ref(false);

const id = computed(() => {
  return route.params.id;
});

useApi(`/movie/${id.value}/similar`, {
  immediate: false,
  query: {
    page,
    language: locale,
  },
  onRequest() {
    isPendingAutoload.value = true;
  },
  onResponse({ response }) {
    isPendingAutoload.value = false;
    totalResults.value = [...totalResults.value, ...response._data.results];
    totalPages.value = response._data.total_pages;
  },
});
</script>
