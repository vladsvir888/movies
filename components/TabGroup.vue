<template>
  <div class="tab-group">
    <div class="tab-group__nav" role="tablist">
      <TheButton
        v-for="slot in $slots.default()"
        :key="slot?.props?.title"
        :id="`tab-${slot?.props?.title}`"
        :aria-selected="activeTab === slot?.props?.title"
        :aria-controls="`tabpanel-${slot?.props?.title}`"
        role="tab"
        type="button"
        class="tab-group__tab"
        @click="activeTab = slot?.props?.title"
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
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.tab-group {
  &__nav {
    display: flex;
    justify-content: center;
    column-gap: 60px;
  }

  &__tab {
    font-size: 24px;
    color: #fff;
    transition: color var(--transition300ms);

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
