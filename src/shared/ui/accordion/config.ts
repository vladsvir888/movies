export type AccordionItem = {
  id: string;
  title: string;
};

export const activeAccordionItemKey = Symbol() as InjectionKey<
  Ref<AccordionItem>
>;
