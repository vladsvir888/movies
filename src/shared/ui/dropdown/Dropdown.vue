<template>
  <div ref="dropdown" class="dropdown">
    <Button
      ref="reference"
      class="dropdown__toggle"
      :class="toggleClass"
      :aria-expanded="isShowMenu"
      :aria-haspopup="true"
      :aria-controls="`menu-${uid}`"
      :title="toggleTitleAttr"
      type="button"
      data-test="dropdown-toggle"
      @click="toggleMenu"
      @keydown.esc="hideMenu"
      @keydown.shift.tab="hideMenu"
      @keydown.down.prevent="setFocus"
      @keydown.home.prevent="setSelectedToFirstMenuItem"
      @keydown.end.prevent="setSelectedToLastMenuItem"
      @keydown.tab="setSelectedToFirstMenuItem"
    >
      <slot name="toggle" />
    </Button>
    <Transition name="dropdown">
      <ul
        v-show="isShowMenu"
        :id="`menu-${uid}`"
        ref="floating"
        role="menu"
        class="dropdown__menu"
        :style="floatingStyles"
        data-test="dropdown-menu"
      >
        <li
          v-for="(item, index) in items"
          :key="item.value"
          ref="menuItems"
          role="menuitem"
          :tabindex="index === activeIndexMenuItem ? 0 : -1"
          class="dropdown__menu-item"
          data-test="dropdown-menu-item"
          @click="onClickMenuItem(item.value)"
          @keydown.enter="onClickMenuItem(item.value)"
          @keydown.space.prevent="onClickMenuItem(item.value)"
          @keydown.up.prevent="setSelectedToPreviousMenuItem"
          @keydown.down.prevent="setSelectedToNextMenuItem"
          @keydown.esc="hideMenuAndSetFocusOnButton"
          @keydown.home.prevent="setSelectedToFirstMenuItem"
          @keydown.end.prevent="setSelectedToLastMenuItem"
          @keydown.shift.tab.prevent="hideMenuAndSetFocusOnButton"
          @keydown.tab.exact.prevent="hideMenuAndSetFocusOnButton"
        >
          {{ item.text }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useFloating, offset, type Placement } from "@floating-ui/vue";
import Button from "~/src/shared/ui/button";
import { useClickOutside } from "~/src/shared/lib/use";

type DropdownMenuItem = {
  text: string;
  value: string;
};

type DropdownProps = {
  toggleClass?: string;
  toggleTitleAttr?: string;
  placementMenu?: Placement;
  items: DropdownMenuItem[];
  selectedItem?: string;
};

const props = withDefaults(defineProps<DropdownProps>(), {
  toggleClass: undefined,
  toggleTitleAttr: undefined,
  placementMenu: "bottom-start",
  selectedItem: undefined,
});

const emit = defineEmits<{
  "update:selected-item": [value: string];
}>();

const uid = useId();

const menuItems = ref<HTMLLIElement[]>([]);
const activeIndexMenuItem = ref(0);

const isShowMenu = ref(false);
const reference = ref<InstanceType<typeof Button> | null>(null);
const floating = ref<HTMLUListElement | null>(null);
const dropdown = ref<HTMLDivElement | null>(null);

const { floatingStyles, update } = useFloating(reference, floating, {
  placement: props.placementMenu,
  middleware: [offset(10)],
});

const hideMenu = (): void => {
  isShowMenu.value = false;
  activeIndexMenuItem.value = 0;
};

const toggleMenu = (): void => {
  isShowMenu.value = !isShowMenu.value;
  update();
};

const onClickMenuItem = (value: string): void => {
  emit("update:selected-item", value);
  hideMenu();
};

const setFocus = (): void => menuItems.value[activeIndexMenuItem.value].focus();

const setSelectedToPreviousMenuItem = (): void => {
  if (activeIndexMenuItem.value === 0) {
    return;
  }

  activeIndexMenuItem.value -= 1;
  setFocus();
};

const setSelectedToNextMenuItem = (): void => {
  if (activeIndexMenuItem.value >= menuItems.value.length - 1) {
    return;
  }

  activeIndexMenuItem.value += 1;
  setFocus();
};

const setSelectedToFirstMenuItem = (event: Event): void => {
  if (isShowMenu.value) {
    event.preventDefault();
  }

  activeIndexMenuItem.value = 0;
  setFocus();
};

const setSelectedToLastMenuItem = (): void => {
  activeIndexMenuItem.value = menuItems.value.length - 1;
  setFocus();
};

const hideMenuAndSetFocusOnButton = (): void => {
  reference.value?.button?.focus();
  hideMenu();
};

useClickOutside(dropdown, hideMenu);
</script>

<style lang="scss">
.dropdown {
  position: relative;

  &__menu {
    z-index: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    min-width: 105px;
    padding: 6px 0;
    color: var(--palette-black);
    background-color: var(--palette-white);
    border-radius: 8px;
  }

  &__menu-item {
    padding: 6px 12px;
    cursor: pointer;
    outline: none;
    transition-property: color, background-color;
    transition-duration: var(--transition300ms);

    &:focus-visible {
      color: var(--palette-white);
      background-color: var(--palette-puerto-rico);
    }

    @include hover {
      color: var(--palette-white);
      background-color: var(--palette-puerto-rico);
    }
  }

  &-enter-active,
  &-leave-active {
    transition: opacity var(--transition300ms);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
