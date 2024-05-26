<template>
  <div class="page page-detail">
    <MoleculePageSeoData
      :lang="$t('lang')"
      :title="`${(heroBlockDetail.title || heroBlockDetail.name) ?? ''}`"
      :description="`${heroBlockDetail.text ?? ''}`"
    />
    <MoleculeHeroBlockDetail :data="heroBlockDetail" />

    <div class="page-detail__tabs container">
      <OrganismTabGroup>
        <MoleculeTabPanel
          v-for="(tabPanelsValue, tabPanelsKey) in tabPanels"
          :key="tabPanelsKey"
          :title="tabPanelsValue.title"
        >
          <component
            v-if="tabPanelsValue.data"
            :is="tabPanelsValue.component"
            :data="tabPanelsValue.data"
          />
        </MoleculeTabPanel>
      </OrganismTabGroup>
    </div>
  </div>
</template>

<script setup>
import {
  OrganismVideosBlock,
  OrganismPhotosBlock,
  OrganismReviewsBlock,
  AtomInfo,
  OrganismSimilarBlock,
} from "#components";

const { t, locale } = useI18n();

const tabPanels = ref({
  info: {
    title: t("Info"),
    component: markRaw(AtomInfo),
    data: ref(null),
  },
  videos: {
    title: t("Videos"),
    component: markRaw(OrganismVideosBlock),
    data: ref(null),
  },
  photos: {
    title: t("Photos"),
    component: markRaw(OrganismPhotosBlock),
    data: ref(null),
  },
  reviews: {
    title: t("Reviews"),
    component: markRaw(OrganismReviewsBlock),
    data: ref(null),
  },
  similar: {
    title: t("Similar"),
    component: markRaw(OrganismSimilarBlock),
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

const type = useRouteParam("type");
const id = useRouteParam("id");

const data = await useCustomFetch(`/${type.value}/${id.value}`, {
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
