<template>
  <div class="accordion-group">
    <slot />
  </div>
</template>

<script setup lang="ts" generic="T, U, V extends AccordionItem">
import { type AccordionItem, activeAccordionItemKey } from "./config";

const slots = defineSlots<{
  default: () => VNode<T, U, V>[] | undefined;
}>();
const vnodes = slots.default?.();

const accordionItems: Ref<V[] | null> = ref(null);

if (vnodes !== undefined) {
  if (vnodes.length > 1) {
    accordionItems.value = vnodes.map(
      (item) =>
        ({
          id: item.props?.id,
          title: item.props?.title,
        }) as V,
    );
  } else {
    const children = vnodes[0].children;
    accordionItems.value = Array.isArray(children)
      ? children.map(
          (item) =>
            ({
              id: (item as VNode).props?.id,
              title: (item as VNode).props?.title,
            }) as V,
        )
      : null;
  }
}

const activeAccordionItem = ref(
  accordionItems.value?.[0],
) as Ref<AccordionItem>;

provide(activeAccordionItemKey, activeAccordionItem);
</script>
