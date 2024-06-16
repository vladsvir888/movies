<template>
  <div
    v-show="activeTab === title"
    :id="`tabpanel-${title}`"
    :aria-labelledby="`tab-${title}`"
    role="tabpanel"
    class="tab-group-panel"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

const activeTab = inject("activeTab");
</script>
