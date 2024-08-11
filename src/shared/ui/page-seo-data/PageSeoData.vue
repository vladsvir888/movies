<template>
  <Html :lang="locale">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="description" />
    </Head>
  </Html>
</template>

<script setup lang="ts">
type PageSeoDataProps = {
  title: string;
  description: string;
};

defineProps<PageSeoDataProps>();

const { locale } = useI18n();
</script>
