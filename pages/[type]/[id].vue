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
          <p>Photos content</p>
        </TabPanel>
      </TabGroup>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();

const activeTab = ref("Overview");
provide("activeTab", activeTab);

const heroBlockDetail = ref({});

useApi(`/${route.params.type}/${route.params.id}`, {
  query: {
    language: locale,
    append_to_response: "videos,images",
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
  },
});
</script>

<style lang="scss">
.page-detail {
  &__tabs {
    padding: 50px 0;
  }
}
</style>
