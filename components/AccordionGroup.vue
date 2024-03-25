<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script setup>
const accordionItems = ref(
  useSlots()
    .default()[0]
    .children.map((item) => item.props?.id)
);

const activeAccordionItem = ref(accordionItems.value[0]);

provide("activeAccordionItem", activeAccordionItem);
</script>
