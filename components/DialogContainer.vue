<template>
  <dialog ref="dialog" class="dialog">
    <div class="dialog__wrapper">
      <h2 class="dialog__title">{{ title }}</h2>
      <slot />
      <TheButton
        class="dialog__close"
        :aria-label="$t('close')"
        type="button"
        @click="hideSearchDialog"
      >
        <TheIcon icon="close" />
      </TheButton>
    </div>
  </dialog>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isShow = defineModel("isShow", {
  default: false,
});

const dialog = ref(null);

const hideSearchDialog = () => {
  isShow.value = false;
};

const onClickOutsideSearchDialog = (event) => {
  if (event.target === dialog.value) {
    hideSearchDialog();
  }
};

watch(isShow, (newValue) => {
  if (newValue) {
    dialog.value.showModal();
    document.body.classList.add("no-scroll");
    dialog.value.animate(
      {
        opacity: [0, 1],
        translate: ["0 12px", "0 0"],
      },
      200
    );
  } else {
    dialog.value.animate(
      {
        opacity: [1, 0],
        translate: ["0 0", "0 12px"],
      },
      200
    ).onfinish = () => {
      dialog.value?.close();
      document.body.classList.remove("no-scroll");
    };
  }
});

onMounted(() => {
  document.body.addEventListener("click", onClickOutsideSearchDialog);
  dialog.value.addEventListener("close", hideSearchDialog);
});

onUnmounted(() => {
  document.body.removeEventListener("click", onClickOutsideSearchDialog);
  dialog.value?.removeEventListener("close", hideSearchDialog);
});
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";
@import "~/assets/styles/helpers/mixins/scrollbar.scss";

.dialog {
  @include scrollbar;

  max-width: 500px;
  width: 95%;
  padding: 0;
  border: none;
  border-radius: 8px;

  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 30px;
  }

  &__close {
    position: absolute;
    right: 6px;
    top: 6px;
    transition: color var(--transition300ms);

    @include hover {
      color: var(--primary-color);
    }
  }
}
</style>
