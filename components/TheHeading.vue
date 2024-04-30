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

const heading = computed(() => {
  return `h${props.level}`;
});
</script>
