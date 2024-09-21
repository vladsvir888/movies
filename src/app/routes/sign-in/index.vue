<template>
  <SignInPage />
</template>

<script setup lang="ts">
import SignInPage from "~/src/pages/sign-in";

definePageMeta({
  middleware: ["auth"],
});
</script>
