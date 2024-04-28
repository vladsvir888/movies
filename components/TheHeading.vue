<template>
  <component :is="heading" class="heading">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  level: {
    type: Number,
    default: 1,
  },
});

const headings = ref({
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
});

const heading = computed(() => {
  return headings.value[props.level];
});
</script>
