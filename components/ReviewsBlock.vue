<template>
  <div class="reviews-block">
    <AccordionGroup v-if="data.length">
      <AccordionItem
        v-for="item in data"
        :key="item.id"
        :title="item.author"
        :id="item.id"
      >
        <p>{{ item.content }}</p>
      </AccordionItem>
    </AccordionGroup>

    <p v-else class="reviews-block__text">{{ $t("no_reviews") }}</p>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: null,
  },
});
</script>
