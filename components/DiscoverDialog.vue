<template>
  <DialogContainer
    class="discover-dialog"
    :title="$t('discover.title_dialog')"
    v-model:is-show="isDiscoverDialogShow"
  >
    <div class="discover-dialog__wrapper">
      <TheButton
        :to="`/discover/movie`"
        variant="decoration"
        class="discover-dialog__button"
        @click="hideDiscoverDialog"
      >
        {{ $t("discover.movie") }}
      </TheButton>
      <span class="discover-dialog__divider">{{ $t("discover.or") }}</span>
      <TheButton
        :to="`/discover/tv`"
        variant="decoration"
        class="discover-dialog__button"
        @click="hideDiscoverDialog"
      >
        {{ $t("discover.tv") }}
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
