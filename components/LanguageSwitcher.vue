<template>
  <div class="language-switcher">
    <label for="languageSwitcher">{{ $t("footer.language") }}</label>
    <select
      :value="locale"
      @change="setLocale($event.target.value)"
      class="language-switcher__select"
      name="language-switcher"
      id="languageSwitcher"
    >
      <option v-for="l in locales" :key="l.code" :value="l.code">
        {{ l.code.toUpperCase() }}
      </option>
    </select>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
</script>

<style lang="scss">
.language-switcher {
  display: flex;
  align-items: center;
  column-gap: 10px;

  &__select {
    min-width: 60px;
    padding: 5px;
    background-color: #000;
    color: #fff;
    border-radius: 8px;
  }
}
</style>
