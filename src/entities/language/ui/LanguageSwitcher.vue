<template>
  <Select
    id="language-switcher"
    v-model="locale"
    :options="transformedLocales"
    :label="$t('Language:')"
    wrapper-class="language-switcher"
    @change="updateLocale"
  />
</template>

<script setup lang="ts">
import Select from "~/src/shared/ui/select";
import { useLanguageSwitcherStore } from "../model";

const { locale } = useI18n();

const languageSwitcherStore = useLanguageSwitcherStore();
const { updateLocale, transformedLocales } = languageSwitcherStore;
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
