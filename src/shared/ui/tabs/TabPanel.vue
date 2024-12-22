<template>
  <div
    v-if="activeTab === title"
    :id="`tabpanel-${title}`"
    :aria-labelledby="`tab-${title}`"
    role="tabpanel"
    class="tab-group-panel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type TabPanel, activeTabKey } from "./config";

defineProps<TabPanel>();

const activeTab = inject(activeTabKey);
</script>
