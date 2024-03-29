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
import { VideosBlock, PhotosBlock, ReviewsBlock } from "#components";

const route = useRoute();
const { locale } = useI18n();

const tabPanels = ref({
  videos: {
    title: "Videos",
    component: markRaw(VideosBlock),
    data: ref(null),
  },
  photos: {
    title: "Photos",
    component: markRaw(PhotosBlock),
    data: ref(null),
  },
  reviews: {
    title: "Reviews",
    component: markRaw(ReviewsBlock),
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

useApi(`/${route.params.type}/${route.params.id}`, {
  query: {
    language: locale,
    append_to_response: "videos,images,reviews",
  },
  onResponse({ response }) {
    const {
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

    tabPanels.value.photos.data = transformPhotos(images);
    tabPanels.value.reviews.data = transformReviews(reviewsItems.results);
    tabPanels.value.videos.data = transformVideos(videosItems.results);
  },
});
</script>

<style lang="scss">
.page-detail {
  &__tabs {
    padding: 50px var(--container-padding);
  }
}
</style>
