<template>
  <div class="info-tabs">
    <TabGroup @update:selected-tab="onUpdateSelectedTab">
      <TabPanel
        v-for="(tabPanelsValue, tabPanelsKey) in tabPanels"
        :key="tabPanelsKey"
        :title="tabPanelsValue.title"
      >
        <component
          :is="tabPanelsValue.component"
          v-if="tabPanelsValue.data"
          :data="tabPanelsValue.data"
        />
      </TabPanel>
    </TabGroup>
  </div>
</template>

<script setup>
import { Info, Videos, Photos, Reviews, Similar } from "./blocks";
import { transformPhotos, transformVideos, transformReviews } from "../lib";
import { TabGroup, TabPanel } from "~/src/shared/ui/tabs";
import { useCustomFetch } from "~/src/shared/api";
import { useRouteParam } from "~/src/shared/lib/use";
import { useVideoStore } from "~/src/entities/media";

const heroDetail = defineModel("heroDetail", {
  type: Object,
  required: true,
  default: null,
});

const { t, locale } = useI18n();
const videoStore = useVideoStore();

const tabPanels = ref({
  info: {
    title: t("Info"),
    component: markRaw(Info),
    data: ref(null),
  },
  videos: {
    title: t("Videos"),
    component: markRaw(Videos),
    data: ref(null),
  },
  photos: {
    title: t("Photos"),
    component: markRaw(Photos),
    data: ref(null),
  },
  reviews: {
    title: t("Reviews"),
    component: markRaw(Reviews),
    data: ref(null),
  },
  similar: {
    title: t("Similar"),
    component: markRaw(Similar),
    data: ref(null),
  },
});
const isNotFoundMediaObject = ref(false);

const onUpdateSelectedTab = () => videoStore.stopAllVideos();

const type = useRouteParam("type");
const id = useRouteParam("id");

await useCustomFetch(`/${type.value}/${id.value}`, {
  query: {
    language: locale,
    append_to_response: "videos,images,reviews,similar",
  },
  onResponse({ response }) {
    if (response.status === 404) {
      isNotFoundMediaObject.value = true;
      return;
    }

    const {
      original_title,
      original_language,
      runtime,
      budget,
      revenue,
      production_companies,
      production_countries,
      backdrop_path,
      title,
      name,
      overview,
      release_date,
      status,
      genres,
      vote_average,
      poster_path,
      images,
      reviews,
      videos,
      similar,
    } = response._data;

    heroDetail.value = {
      backdrop_path,
      title,
      name,
      overview,
      release_date,
      status,
      genres,
      vote_average,
      poster_path,
    };

    tabPanels.value.info.data = {
      original_title,
      original_language,
      runtime,
      budget,
      revenue,
      status,
      release_date,
      production_companies,
      production_countries,
    };
    tabPanels.value.photos.data = transformPhotos(images);
    tabPanels.value.reviews.data = transformReviews(reviews.results);
    tabPanels.value.videos.data = transformVideos(videos.results);
    tabPanels.value.similar.data = similar;
  },
});

watch(isNotFoundMediaObject, (newValue) => {
  if (newValue) {
    throw createError({
      statusCode: 404,
      fatal: true,
    });
  }
});
</script>
