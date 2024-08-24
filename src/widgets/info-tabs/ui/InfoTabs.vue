<template>
  <div class="info-tabs">
    <TabGroup @update:selected-tab="videoStore.stopAllVideos()">
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

<script setup lang="ts">
import { Info, Videos, Photos, Reviews, Similar } from "./blocks";
import { TabGroup, TabPanel } from "~/src/shared/ui/tabs";
import { useCustomFetch } from "~/src/shared/api";
import { useRouteParam } from "~/src/shared/lib/use";
import { useVideoStore } from "~/src/entities/media";
import type {
  MediaTypes,
  Media,
  MediaImages,
  BaseVideo,
  Review,
  PageResult,
} from "~/src/shared/config";

const heroDetail = defineModel<Media | null>("heroDetail", {
  required: true,
});

const { t, locale } = useI18n();
const videoStore = useVideoStore();

const tabPanels = ref({
  info: {
    title: t("Info"),
    component: markRaw(Info),
    data: ref<Media | undefined>(undefined),
  },
  videos: {
    title: t("Videos"),
    component: markRaw(Videos),
    data: ref<BaseVideo[] | undefined>(undefined),
  },
  photos: {
    title: t("Photos"),
    component: markRaw(Photos),
    data: ref<MediaImages | undefined>(undefined),
  },
  reviews: {
    title: t("Reviews"),
    component: markRaw(Reviews),
    data: ref<Review[] | undefined>(undefined),
  },
  similar: {
    title: t("Similar"),
    component: markRaw(Similar),
    data: ref<PageResult<Media> | undefined>(undefined),
  },
});
const isNotFoundMediaObject = ref(false);

const type = useRouteParam<MediaTypes>("type");
const id = useRouteParam<string>("id");

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

    const responseData = response._data as Media;
    heroDetail.value = responseData;
    tabPanels.value.info.data = responseData;
    tabPanels.value.videos.data = responseData.videos?.results;
    tabPanels.value.photos.data = responseData.images;
    tabPanels.value.reviews.data = responseData.reviews?.results;
    tabPanels.value.similar.data = responseData.similar;
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
