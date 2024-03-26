<template>
  <div class="accordion-item">
    <h3 class="accordion-item__title">
      <TheButton
        :id="`accordion-header-${id}`"
        :aria-controls="`accordion-panel-${id}`"
        :aria-expanded="activeAccordionItem === id"
        class="accordion-item__button"
        @click="onClickButton(id)"
      >
        {{ title }}
        <TheIcon icon="arrow-prev" />
      </TheButton>
    </h3>
    <div
      :id="`accordion-panel-${id}`"
      :aria-labelledby="`accordion-header-${id}`"
      class="accordion-item__content"
    >
      <div class="accordion-item__content-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const activeAccordionItem = inject("activeAccordionItem");

const onClickButton = (id) => {
  if (id === activeAccordionItem.value) {
    activeAccordionItem.value = null;
  } else {
    activeAccordionItem.value = id;
  }
};
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.accordion-item {
  border-bottom: 1px solid #fff;

  &:last-child {
    border-bottom: 0;
  }

  &:has(.accordion-item__button[aria-expanded="true"])
    .accordion-item__content {
    grid-template-rows: 1fr;
    margin-bottom: 20px;
    visibility: visible;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    color: #fff;
    transition: color var(--transition300ms);

    @include hover {
      color: var(--primary-color);
    }

    &[aria-expanded="true"] {
      color: var(--primary-color);

      > .icon svg {
        rotate: -90deg;
      }
    }

    > .icon svg {
      rotate: 90deg;
      transition: rotate var(--transition300ms) ease-in;
    }
  }

  &__content {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition: all var(--transition500ms);

    &-wrapper {
      overflow: hidden;
    }
  }
}
</style>
