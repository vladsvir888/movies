<template>
  <div class="page page-detail">
    <PageSeoData
      :lang="$t('lang')"
      :title="`${(heroBlockDetail.title || heroBlockDetail.name) ?? ''}`"
      :description="`${heroBlockDetail.text ?? ''}`"
    />
    <HeroBlockDetail :data="heroBlockDetail" />

    <div class="page-detail__tabs container">
      <TabGroup>
        <TabPanel
          v-for="(tabPanelsValue, tabPanelsKey) in tabPanels"
          :key="tabPanelsKey"
          :title="tabPanelsValue.title"
        >
          <component
            v-if="tabPanelsValue.data"
            :is="tabPanelsValue.component"
            :data="tabPanelsValue.data"
          />
        </TabPanel>
      </TabGroup>
    </div>
  </div>
</template>

<script setup>
import {
  VideosBlock,
  PhotosBlock,
  ReviewsBlock,
  InfoBlock,
  SimilarBlock,
} from "#components";

const { t } = useI18n();

const route = useRoute();
const { locale } = useI18n();

const tabPanels = ref({
  info: {
    title: t("tabs.info"),
    component: markRaw(InfoBlock),
    data: ref(null),
  },
  videos: {
    title: t("tabs.videos"),
    component: markRaw(VideosBlock),
    data: ref(null),
  },
  photos: {
    title: t("tabs.photos"),
    component: markRaw(PhotosBlock),
    data: ref(null),
  },
  reviews: {
    title: t("tabs.reviews"),
    component: markRaw(ReviewsBlock),
    data: ref(null),
  },
  similar: {
    title: t("tabs.similar"),
    component: markRaw(SimilarBlock),
    data: ref(null),
  },
});
const heroBlockDetail = ref({});

const transformPhotos = (items) => {
  delete items?.logos;

  for (let key in items) {
    items[key] = items[key].map((item) => item.file_path);
  }

  return items;
};

const transformVideos = (items) => {
  return items.map(({ key, name, type, published_at }) => ({
    id: key,
    name,
    type,
    date: published_at,
  }));
};

const transformReviews = (items) => {
  return items.map(({ id, author, content }) => ({
    id,
    author,
    content,
  }));
};

const type = computed(() => {
  return route.params.type;
});

const id = computed(() => {
  return route.params.id;
});

const data = await useApi(`/${type.value}/${id.value}`, {
  query: {
    language: locale,
    append_to_response: "videos,images,reviews,similar",
  },
  onResponse({ response }) {
    const {
      original_title: originalTitle,
      original_language: originalLanguage,
      runtime,
      budget,
      revenue,
      production_companies: productionCompanies,
      production_countries: productionCountries,
      backdrop_path: backdropImage,
      title,
      name,
      overview: text,
      release_date: date,
      status,
      genres,
      vote_average: voteAverage,
      poster_path: posterImage,
      images,
      reviews: reviewsItems,
      videos: videosItems,
      similar,
    } = response._data;

    heroBlockDetail.value = {
      backdropImage,
      title,
      name,
      text,
      date,
      status,
      genres,
      voteAverage,
      posterImage,
    };

    tabPanels.value.info.data = {
      originalTitle,
      originalLanguage,
      runtime,
      budget,
      revenue,
      status,
      date,
      productionCompanies,
      productionCountries,
    };
    tabPanels.value.photos.data = transformPhotos(images);
    tabPanels.value.reviews.data = transformReviews(reviewsItems.results);
    tabPanels.value.videos.data = transformVideos(videosItems.results);
    tabPanels.value.similar.data = similar;
  },
});

if (!data) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}
</script>

<style lang="scss">
.page-detail {
  &__tabs {
    padding: 50px var(--container-padding);
  }
}
</style>
