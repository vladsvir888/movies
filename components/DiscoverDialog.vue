<template>
  <DialogContainer
    class="discover-dialog"
    :title="$t('What are you trying to discover?')"
    v-model:is-show="isDiscoverDialogShow"
  >
    <div class="discover-dialog__wrapper">
      <TheButton
        :to="`/discover/movie`"
        variant="decoration"
        class="discover-dialog__button"
        @click="hideDiscoverDialog"
      >
        {{ $t("Movies") }}
      </TheButton>
      <span class="discover-dialog__divider">{{ $t("Or") }}</span>
      <TheButton
        :to="`/discover/tv`"
        variant="decoration"
        class="discover-dialog__button"
        @click="hideDiscoverDialog"
      >
        {{ $t("TV Shows") }}
      </TheButton>
    </div>
  </DialogContainer>
</template>

<script setup>
const isDiscoverDialogShow = inject("isDiscoverDialogShow");

const hideDiscoverDialog = () => (isDiscoverDialogShow.value = false);
</script>

<style lang="scss">
.discover-dialog {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
  }

  &__button {
    font-size: 18px;
    font-weight: 700;
  }

  &__divider {
    display: flex;
    align-items: center;
    column-gap: 10px;

    &::before,
    &::after {
      background-color: rgb(0 0 0 / 50%);
      width: 50px;
      height: 1px;
      content: "";
    }
  }
}
</style>
