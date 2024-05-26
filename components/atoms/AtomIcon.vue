<template>
  <span class="icon">
    <component :is="icons[icon]" />
  </span>
</template>

<script setup>
import {
  AtomIconHome,
  AtomIconMovie,
  AtomIconTV,
  AtomIconSearch,
  AtomIconTMDB,
  AtomIconStar,
  AtomIconArrowPrev,
  AtomIconArrowNext,
  AtomIconMenu,
  AtomIconClose,
  AtomIconLoupe,
  AtomIconLoupeLineThrough,
  AtomIconYoutube,
  AtomIconFilter,
  AtomIconRightToBracket,
} from "#components";

defineProps({
  icon: {
    type: String,
    required: true,
  },
});

const icons = shallowRef({
  home: AtomIconHome,
  movie: AtomIconMovie,
  tv: AtomIconTV,
  search: AtomIconSearch,
  tmdb: AtomIconTMDB,
  star: AtomIconStar,
  "arrow-prev": AtomIconArrowPrev,
  "arrow-next": AtomIconArrowNext,
  menu: AtomIconMenu,
  close: AtomIconClose,
  loupe: AtomIconLoupe,
  "loupe-line-through": AtomIconLoupeLineThrough,
  youtube: AtomIconYoutube,
  filter: AtomIconFilter,
  "right-to-bracket": AtomIconRightToBracket,
});
</script>

<style lang="scss">
.icon {
  display: inline-flex;

  > svg {
    flex-shrink: 0;
  }

  .cls-1 {
    fill: url(#linear-gradient);
  }
}
</style>
