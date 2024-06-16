<template>
  <dialog ref="dialog" class="dialog">
    <div class="dialog__wrapper">
      <Heading :level="2" variant="underline" class="dialog__title">{{
        title
      }}</Heading>
      <slot />
      <Button
        class="dialog__close"
        :aria-label="$t('Close')"
        type="button"
        @click="hideDialog"
      >
        <Icon icon="close" />
      </Button>
    </div>
  </dialog>
</template>

<script setup>
import Icon from "~/src/shared/ui/icon";
import Heading from "~/src/shared/ui/heading";
import Button from "~/src/shared/ui/button";
import { toggleScrollbar } from "~/src/shared/lib/dom";

const ANIMATION = [
  {
    opacity: [0, 1],
    translate: ["0 12px", "0 0"],
  },
  {
    opacity: [1, 0],
    translate: ["0 0", "0 12px"],
  },
];
const ANIMATION_DURATION = 200;

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

const hideDialog = () => {
  isShow.value = false;
};

const onClickOutsideDialog = (event) => {
  if (event.target === dialog.value) {
    hideDialog();
  }
};

const toggleIsShow = (value) => {
  if (value) {
    dialog.value.showModal();
    dialog.value.animate(ANIMATION[0], ANIMATION_DURATION);
  } else {
    dialog.value.animate(ANIMATION[1], ANIMATION_DURATION).onfinish = () => {
      dialog.value?.close();
    };
  }

  toggleScrollbar(value);
};

watch(isShow, (newValue) => toggleIsShow(newValue));

onMounted(() => {
  document.body.addEventListener("click", onClickOutsideDialog);
  dialog.value.addEventListener("close", hideDialog);
});

onUnmounted(() => {
  document.body.removeEventListener("click", onClickOutsideDialog);
  dialog.value?.removeEventListener("close", hideDialog);
});
</script>

<style lang="scss">
@import "~/src/shared/ui/styles/helpers/mixins/hover.scss";
@import "~/src/shared/ui/styles/helpers/mixins/scrollbar.scss";

.dialog {
  @include scrollbar;

  max-width: 500px;
  width: 95%;
  padding: 0;
  border: none;
  border-radius: 8px;

  &::backdrop {
    background-color: rgb(var(--palette-black--rgb) / 50%);
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
      color: var(--palette-puerto-rico);
    }
  }
}
</style>
