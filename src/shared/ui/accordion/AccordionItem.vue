<template>
  <div class="accordion-item">
    <Heading :level="2" class="accordion-item__title">
      <Button
        :id="`accordion-header-${id}`"
        :aria-controls="`accordion-panel-${id}`"
        :aria-expanded="isShow"
        class="accordion-item__button"
        type="button"
        @click="isShow = !isShow"
      >
        {{ title }}
        <Icon icon="arrow-prev" />
      </Button>
    </Heading>
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

<script setup lang="ts">
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { type AccordionItem, activeAccordionItemKey } from "./config";

const props = defineProps<AccordionItem>();

const activeAccordionItem = inject<Ref<AccordionItem>>(activeAccordionItemKey);

const isShow = ref(false);

if (activeAccordionItem?.value?.id === props.id) {
  isShow.value = true;
}
</script>

<style lang="scss">
.accordion-item {
  border-bottom: 1px solid var(--palette-white);

  &:last-child {
    border-bottom: 0;
  }

  &:has(.accordion-item__button[aria-expanded="true"])
    .accordion-item__content {
    grid-template-rows: 1fr;
    margin-bottom: 20px;
    visibility: visible;
  }

  &__title {
    font-size: 18px;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    transition: color var(--transition300ms);

    @include hover {
      color: var(--palette-puerto-rico);
    }

    &[aria-expanded="true"] {
      color: var(--palette-puerto-rico);

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
