<template>
  <div class="tab-group">
    <div class="tab-group__nav" role="tablist">
      <Button
        v-for="(title, index) in tabTitles"
        :id="`tab-${title}`"
        :key="title"
        ref="tabRefs"
        :aria-selected="activeTab === title"
        :aria-controls="`tabpanel-${title}`"
        :tabindex="activeTab !== title ? -1 : 0"
        role="tab"
        type="button"
        class="tab-group__tab"
        @click="setSelectedTab(index)"
        @keydown.right="setSelectedToNextTab"
        @keydown.left="setSelectedToPreviousTab"
        @keydown.home.prevent="setSelectedTab(0)"
        @keydown.end.prevent="tabTitles && setSelectedTab(tabTitles.length - 1)"
      >
        {{ title }}
      </Button>
    </div>
    <div class="tab-group__panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { activeTabKey } from "./config";
import Button from "~/src/shared/ui/button";

const emit = defineEmits(["update:selected-tab"]);

const slots = defineSlots<{
  default: () => VNode[] | undefined;
}>();
const vnodes = slots.default?.();

const tabRefs = ref<InstanceType<typeof Button>[]>([]);

const tabTitles = ref(
  Array.isArray(vnodes?.[0].children)
    ? vnodes[0].children.map((tab) => (tab as VNode).props?.title as string)
    : null,
);

const activeTab = ref(tabTitles.value?.[0]);

if (activeTab.value) {
  provide(activeTabKey, activeTab as Ref<string>);
}

const getCurrentIndexTab = (): number | undefined => {
  return tabTitles.value?.findIndex((title) => title === activeTab.value);
};

const setSelectedTab = (index: number): void => {
  tabRefs.value[index].button?.focus();

  if (tabTitles.value?.[index]) {
    activeTab.value = tabTitles.value?.[index];
  }

  emit("update:selected-tab", activeTab);
};

const setSelectedToPreviousTab = (): void => {
  const index = getCurrentIndexTab();

  if (index === undefined || tabTitles.value === null) {
    return;
  }

  if (index !== 0) {
    setSelectedTab(index - 1);
  } else {
    setSelectedTab(tabTitles.value.length - 1);
  }
};

const setSelectedToNextTab = (): void => {
  const index = getCurrentIndexTab();

  if (index === undefined || tabTitles.value === null) {
    return;
  }

  if (index === tabTitles.value.length - 1) {
    setSelectedTab(0);
  } else {
    setSelectedTab(index + 1);
  }
};
</script>

<style lang="scss">
.tab-group {
  &__nav {
    display: flex;
    justify-content: safe center;
    gap: 60px;
    overflow-x: auto;

    @media (--mobile) {
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

    @media (--mobile) {
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

    @media (--mobile) {
      margin-top: 30px;
    }
  }
}
</style>
