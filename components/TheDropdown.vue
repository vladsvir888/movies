<template>
  <div v-click-outside="hideMenu" class="dropdown">
    <TheButton
      ref="reference"
      class="dropdown__toggle"
      :class="toggleClass"
      :aria-expanded="isShowMenu"
      :aria-haspopup="true"
      :aria-controls="`menu-${uid}`"
      :title="toggleTitleAttr"
      type="button"
      @click="toggleMenu"
      @keydown.esc="onKeydownEsc"
      @keydown.shift.tab="hideMenu"
      @keydown.down.prevent="setFocus"
      @keydown.home.prevent="setSelectedToFirstMenuItem"
      @keydown.end.prevent="setSelectedToLastMenuItem"
    >
      <slot name="toggle" />
    </TheButton>
    <Transition name="dropdown">
      <ul
        v-show="isShowMenu"
        ref="floating"
        role="menu"
        :id="`menu-${uid}`"
        class="dropdown__menu"
        :style="floatingStyles"
      >
        <li
          v-for="(item, index) in items"
          :key="item.value"
          ref="menuItems"
          role="menuitem"
          :tabindex="index === activeIndexMenuItem ? 0 : -1"
          class="dropdown__menu-item"
          @click="onClickMenuItem(item.value)"
          @keydown.enter="onClickMenuItem(item.value)"
          @keydown.space.prevent="onClickMenuItem(item.value)"
          @keydown.down.prevent="setSelectedToNextMenuItem"
          @keydown.up.prevent="setSelectedToPreviousMenuItem"
          @keydown.esc="onKeydownEsc"
          @keydown.tab="hideMenu"
          @keydown.home.prevent="setSelectedToFirstMenuItem"
          @keydown.end.prevent="setSelectedToLastMenuItem"
        >
          {{ item.text }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { useFloating, offset } from "@floating-ui/vue";

const props = defineProps({
  toggleClass: {
    type: String,
  },
  toggleTitleAttr: {
    type: String,
  },
  placementMenu: {
    type: String,
    default: "bottom-start",
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedItem: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:selected-item"]);

const menuItems = ref([]);
const activeIndexMenuItem = ref(0);

const uid = ref(getCurrentInstance().uid);
const isShowMenu = ref(false);
const reference = ref(null);
const floating = ref(null);

const { floatingStyles, update } = useFloating(reference, floating, {
  placement: props.placementMenu,
  middleware: [offset(10)],
});

const hideMenu = () => {
  isShowMenu.value = false;
  activeIndexMenuItem.value = 0;
};

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value;

  update();
};

const onClickMenuItem = (value) => {
  emit("update:selected-item", value);
  hideMenu();
};

const setFocus = () => menuItems.value[activeIndexMenuItem.value].focus();

const setSelectedToPreviousMenuItem = () => {
  if (activeIndexMenuItem.value === 0) {
    return;
  }

  activeIndexMenuItem.value -= 1;
  setFocus();
};

const setSelectedToNextMenuItem = () => {
  if (activeIndexMenuItem.value >= menuItems.value.length - 1) {
    return;
  }

  activeIndexMenuItem.value += 1;
  setFocus();
};

const setSelectedToFirstMenuItem = () => {
  activeIndexMenuItem.value = 0;
  setFocus();
};

const setSelectedToLastMenuItem = () => {
  activeIndexMenuItem.value = menuItems.value.length - 1;
  setFocus();
};

const onKeydownEsc = () => {
  hideMenu();
  reference.value.button.focus();
};
</script>

<style lang="scss">
@import "~/assets/styles/helpers/mixins/hover.scss";

.dropdown {
  position: relative;

  &__menu {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    min-width: 100px;
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
