<template>
  <div class="accordion-group">
    <slot />
  </div>
</template>

<script setup>
const slots = useSlots().default();
const accordionItems = ref(null);

if (slots.length > 1) {
  accordionItems.value = slots.map((item) => item.props?.id);
} else {
  accordionItems.value = slots[0].children.map((item) => item.props?.id);
}

const activeAccordionItem = ref(accordionItems.value[0]);

provide("activeAccordionItem", activeAccordionItem);
</script>
