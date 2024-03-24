<template>
  <div class="tab-group">
    <div class="tab-group__nav" role="tablist">
      <TheButton
        v-for="(slot, index) in $slots.default()"
        :key="slot?.props?.title"
        :id="`tab-${slot?.props?.title}`"
        :aria-selected="activeTab === slot?.props?.title"
        :aria-controls="`tabpanel-${slot?.props?.title}`"
        :tabindex="activeTab !== slot?.props?.title ? -1 : 0"
        role="tab"
        type="button"
        class="tab-group__tab"
        ref="tabRefs"
        @click="setSelectedTab(index)"
        @keydown.right="setSelectedToNextTab"
        @keydown.left="setSelectedToPreviousTab"
        @keydown.home.prevent="setSelectedTab(0)"
        @keydown.end.prevent="setSelectedTab($slots.default().length - 1)"
      >
        {{ slot?.props?.title }}
      </TheButton>
    </div>
    <div class="tab-group__panels">
      <slot />
    </div>
  </div>
</template>

<script setup>
const activeTab = inject("activeTab");

const tabs = useSlots().default();
const tabRefs = ref([]);

const getCurrentIndexTab = () => {
  return tabs.findIndex((tab) => tab?.props?.title === activeTab.value);
};

const setSelectedTab = (index) => {
  tabRefs.value[index].button.focus();
  activeTab.value = tabs[index]?.props?.title;
};

const setSelectedToPreviousTab = () => {
  const index = getCurrentIndexTab();

  if (index !== 0) {
    setSelectedTab(index - 1);
  } else {
    setSelectedTab(tabs.length - 1);
  }
};

const setSelectedToNextTab = () => {
  const index = getCurrentIndexTab();

  if (index === tabs.length - 1) {
    setSelectedTab(0);
  } else {
    setSelectedTab(index + 1);
  }
};
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.tab-group {
  &__nav {
    display: flex;
    justify-content: safe center;
    gap: 60px;
    overflow-x: auto;

    @media (width <= 600px) {
      gap: 30px;
      justify-content: safe flex-start;
    }
  }

  &__tab {
    margin: 2px 0;
    padding: 0;
    font-size: 24px;
    color: #fff;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: color var(--transition300ms);

    @media (width <= 600px) {
      font-size: 20px;
    }

    &[aria-selected="true"] {
      color: var(--primary-color);
    }

    @include hover {
      &:not([aria-selected="true"]) {
        color: var(--primary-color);
      }
    }
  }

  &__panels {
    margin-top: 50px;
  }
}
</style>
