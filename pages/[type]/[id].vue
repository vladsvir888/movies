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
        <TabPanel title="Overview">
          <p>Overview content</p>
        </TabPanel>

        <TabPanel title="Videos">
          <p>Videos content</p>
        </TabPanel>

        <TabPanel title="Photos">
          <PhotosBlock v-if="photos" :data="photos" />
        </TabPanel>

        <TabPanel title="Reviews">
          <ReviewsBlock v-if="reviews" :data="reviews" />
        </TabPanel>
      </TabGroup>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();

const heroBlockDetail = ref({});
const photos = ref(null);
const reviews = ref(null);

const transformPhotos = (images) => {
  delete images?.logos;

  for (let key in images) {
    images[key] = images[key].map((image) => image.file_path);
  }

  return images;
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

    photos.value = transformPhotos(images);
    reviews.value = transformReviews(reviewsItems.results);
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
