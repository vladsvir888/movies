<template>
  <div class="reviews-wrapper">
    <div v-if="data.length" class="reviews">
      <AccordionGroup>
        <AccordionItem
          v-for="item in localData"
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

<script setup lang="ts">
import { AccordionGroup, AccordionItem } from "~/src/shared/ui/accordion";
import type { Review } from "~/src/shared/config";

const props = defineProps<{
  data: Review[];
}>();

const localData = computed(() => {
  return props.data.map(({ id, author, content }) => ({
    id,
    author,
    content,
  }));
});
</script>

<style lang="scss">
.reviews {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
