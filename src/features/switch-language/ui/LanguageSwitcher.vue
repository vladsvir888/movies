<template>
  <Select
    v-model="locale"
    :options="transformedLocales"
    :label="$t('Language:')"
    id="language-switcher"
    wrapper-class="language-switcher"
    @change="updateLocale"
  />
</template>

<script setup>
import Select from "~/src/shared/ui/select";
import { useLanguageSwitcherStore } from "../model";

const { locale } = useI18n();

const languageSwitcherStore = useLanguageSwitcherStore();
const { checkLocale, updateLocale, transformedLocales } = languageSwitcherStore;

onBeforeMount(checkLocale);
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
