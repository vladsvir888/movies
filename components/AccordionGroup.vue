<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script setup>
const slots = useSlots().default();
const accordionItems = ref(null);

if (!slots[0].children?.default) {
  accordionItems.value = slots[0].children.map((item) => item.props?.id);
} else {
  accordionItems.value = slots.map((item) => item.props?.id);
}

const activeAccordionItem = ref(accordionItems.value[0]);

provide("activeAccordionItem", activeAccordionItem);
</script>
