<template>
  <Html :lang="lang">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="description" />
    </Head>
  </Html>
</template>

<script setup>
defineProps({
  lang: {
    type: String,
    default: "en",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
