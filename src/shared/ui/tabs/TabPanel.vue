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

<script setup lang="ts">
type TabPanelProps = {
  title: string;
};

defineProps<TabPanelProps>();

const activeTab = inject("activeTab");
</script>
