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
import { useVideoStore } from "~/src/entities/media";
import type {
  Media,
  MediaImages,
  BaseVideo,
  Review,
  PageResult,
} from "~/src/shared/config";

const props = defineProps<{
  data: Media;
}>();

const { t } = useI18n();
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

tabPanels.value.info.data = props.data;
tabPanels.value.videos.data = props.data.videos?.results;
tabPanels.value.photos.data = props.data.images;
tabPanels.value.reviews.data = props.data.reviews?.results;
tabPanels.value.similar.data = props.data.similar;
</script>
