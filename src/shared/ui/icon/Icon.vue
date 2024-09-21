<template>
  <span class="icon">
    <component :is="icons[icon]" />
  </span>
</template>

<script setup lang="ts">
import {
  IconHome,
  IconMovie,
  IconTV,
  IconSearch,
  IconTMDB,
  IconStar,
  IconArrowPrev,
  IconArrowNext,
  IconMenu,
  IconClose,
  IconLoupe,
  IconLoupeLineThrough,
  IconYoutube,
  IconFilter,
  IconRightToBracket,
  IconEye,
  IconEyeSlash,
} from "./icons";

type IconProps = {
  icon:
    | "home"
    | "movie"
    | "tv"
    | "search"
    | "tmdb"
    | "star"
    | "arrow-prev"
    | "arrow-next"
    | "menu"
    | "close"
    | "loupe"
    | "loupe-line-through"
    | "youtube"
    | "filter"
    | "right-to-bracket"
    | "eye"
    | "eye-slash";
};

defineProps<IconProps>();

const icons = shallowRef({
  home: IconHome,
  movie: IconMovie,
  tv: IconTV,
  search: IconSearch,
  tmdb: IconTMDB,
  star: IconStar,
  "arrow-prev": IconArrowPrev,
  "arrow-next": IconArrowNext,
  menu: IconMenu,
  close: IconClose,
  loupe: IconLoupe,
  "loupe-line-through": IconLoupeLineThrough,
  youtube: IconYoutube,
  filter: IconFilter,
  "right-to-bracket": IconRightToBracket,
  eye: IconEye,
  "eye-slash": IconEyeSlash,
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
