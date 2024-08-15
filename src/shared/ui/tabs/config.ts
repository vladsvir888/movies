export type TabPanel = {
  title: string;
};

export const activeTabKey = Symbol() as InjectionKey<Ref<string>>;
