<template>
  <div class="reviews-wrapper">
    <div v-if="data.length" class="reviews">
      <AccordionGroup>
        <AccordionItem
          v-for="item in data"
          :id="item.id"
          :key="item.id"
          :title="item.author"
        >
          {{ item.content }}
        </AccordionItem>
      </AccordionGroup>
    </div>
    <p v-else class="reviews-wrapper__text">{{ $t("No reviews") }}</p>
  </div>
</template>

<script setup>
import { AccordionGroup, AccordionItem } from "~/src/shared/ui/accordion";

defineProps({
  data: {
    type: Array,
    default: null,
  },
});
</script>

<style lang="scss">
.reviews {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
