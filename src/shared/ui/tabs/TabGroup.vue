<template>
  <div class="tab-group">
    <div class="tab-group__nav" role="tablist">
      <Button
        v-for="(title, index) in tabTitles"
        :key="title"
        :id="`tab-${title}`"
        :aria-selected="activeTab === title"
        :aria-controls="`tabpanel-${title}`"
        :tabindex="activeTab !== title ? -1 : 0"
        role="tab"
        type="button"
        class="tab-group__tab"
        ref="tabRefs"
        @click="setSelectedTab(index)"
        @keydown.right="setSelectedToNextTab"
        @keydown.left="setSelectedToPreviousTab"
        @keydown.home.prevent="setSelectedTab(0)"
        @keydown.end.prevent="setSelectedTab(tabTitles.length - 1)"
      >
        {{ title }}
      </Button>
    </div>
    <div class="tab-group__panels">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Button from "~/src/shared/ui/button";

const emit = defineEmits(["update:selected-tab"]);

const tabRefs = ref([]);
const tabTitles = ref(
  useSlots()
    .default()[0]
    .children.map((tab) => tab.props?.title)
);
const activeTab = ref(tabTitles.value[0]);

provide("activeTab", activeTab);

const getCurrentIndexTab = () => {
  return tabTitles.value.findIndex((title) => title === activeTab.value);
};

const setSelectedTab = (index) => {
  tabRefs.value[index].button.focus();
  activeTab.value = tabTitles.value[index];

  emit("update:selected-tab", activeTab);
};

const setSelectedToPreviousTab = () => {
  const index = getCurrentIndexTab();

  if (index !== 0) {
    setSelectedTab(index - 1);
  } else {
    setSelectedTab(tabTitles.value.length - 1);
  }
};

const setSelectedToNextTab = () => {
  const index = getCurrentIndexTab();

  if (index === tabTitles.value.length - 1) {
    setSelectedTab(0);
  } else {
    setSelectedTab(index + 1);
  }
};
</script>

<style lang="scss">
@import "~/src/shared/ui/styles/helpers/mixins/hover.scss";

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
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: color var(--transition300ms);

    @media (width <= 600px) {
      font-size: 20px;
    }

    &[aria-selected="true"] {
      color: var(--palette-puerto-rico);
    }

    @include hover {
      &:not([aria-selected="true"]) {
        color: var(--palette-puerto-rico);
      }
    }
  }

  &__panels {
    margin-top: 50px;

    @media (width <= 600px) {
      margin-top: 30px;
    }
  }
}
</style>
