<template>
  <div class="reviews-block-wrapper">
    <div v-if="data.length" class="reviews-block">
      <OrganismAccordionGroup>
        <MoleculeAccordionItem
          v-for="item in data"
          :key="item.id"
          :title="item.author"
          :id="item.id"
        >
          {{ item.content }}
        </MoleculeAccordionItem>
      </OrganismAccordionGroup>
    </div>
    <p v-else class="reviews-block-wrapper__text">{{ $t("No reviews") }}</p>
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

<style lang="scss">
.reviews-block {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
