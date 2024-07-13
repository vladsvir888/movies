<template>
  <Button
    v-if="authStore.sessionId"
    variant="primary"
    size="small"
    :pill="true"
    @click="authStore.logout()"
  >
    {{ $t("Sign out") }}
  </Button>
</template>

<script setup>
import Button from "~/src/shared/ui/button";
import { useAuthStore } from "~/src/entities/user";

const authStore = useAuthStore();
</script>
