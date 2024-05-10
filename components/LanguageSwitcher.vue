<template>
  <TheSelect
    v-model="locale"
    :options="transformedLocales"
    :label="$t('Language:')"
    id="language-switcher"
    wrapper-class="language-switcher"
    @change="updateLocale"
  />
</template>

<script setup>
const config = useRuntimeConfig();
const { locale, locales, setLocale } = useI18n();

const transformedLocales = computed(() => {
  return locales.value.map(({ code }) => ({
    value: code,
    text: code.toUpperCase(),
  }));
});

const updateLocale = (event) => {
  setLocale(event.target.value);
  setItemInLocalStorage(config.public.appLangKey, event.target.value);
};

onBeforeMount(() => {
  const value = getItemFromLocalStorage(config.public.appLangKey);

  if (value) {
    setLocale(value);
  }
});
</script>

<style lang="scss">
.language-switcher {
  .select-block {
    &__select {
      width: 60px;
    }
  }
}
</style>
