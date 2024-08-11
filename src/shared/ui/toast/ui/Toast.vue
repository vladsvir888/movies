<template>
  <TransitionGroup name="toast" tag="div" class="toasts">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="{
        [`toast--${toast.variant}`]: toast.variant,
      }"
      role="alert"
    >
      {{ toast.content }}
      <Button
        class="toast__close"
        :aria-label="$t('Close')"
        @click="removeToast(toast.id)"
      >
        <Icon icon="close" />
      </Button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import Button from "~/src/shared/ui/button";
import Icon from "~/src/shared/ui/icon";
import { useToastStore } from "../model";

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);
const { removeToast } = toastStore;
</script>

<style lang="scss">
.toasts {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 300px;
  margin: 10px;

  &:empty {
    display: none;
  }
}

.toast {
  position: relative;
  padding: 16px 20px;
  color: var(--palette-cod-gray);
  background-color: var(--palette-white);
  border-radius: 8px;

  &--danger {
    border-top: 3px solid red;
  }

  &--success {
    border-top: 3px solid green;
  }

  &__close {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 20px;
    height: 20px;
  }

  &-move,
  &-enter-active,
  &-leave-active {
    transition: all var(--transition300ms);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
