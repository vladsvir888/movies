<template>
  <div class="info">
    <div class="info__table-wrapper">
      <table class="info__table">
        <tbody>
          <tr v-if="data.original_title" class="info__row">
            <td class="info__cell">
              {{ $t("Original Title") }}
            </td>
            <td class="info__cell">{{ data.original_title }}</td>
          </tr>
          <tr v-if="data.original_language" class="info__row">
            <td class="info__cell">
              {{ $t("Original Language") }}
            </td>
            <td class="info__cell">
              {{ transformedLanguage }}
            </td>
          </tr>
          <tr v-if="data.runtime" class="info__row">
            <td class="info__cell">
              {{ $t("Runtime") }}
            </td>
            <td class="info__cell">
              {{ transformedRuntime }}
            </td>
          </tr>
          <tr v-if="data.status" class="info__row">
            <td class="info__cell">
              {{ $t("Status") }}
            </td>
            <td class="info__cell">
              {{ data.status }}
            </td>
          </tr>
          <tr v-if="data.release_date" class="info__row">
            <td class="info__cell">
              {{ $t("Release Date") }}
            </td>
            <td class="info__cell">
              {{ transformedDate }}
            </td>
          </tr>
          <tr v-if="data.production_countries" class="info__row">
            <td class="info__cell">
              {{ $t("Production Countries") }}
            </td>
            <td class="info__cell">
              {{ transformedProductionCountries }}
            </td>
          </tr>
          <tr v-if="data.production_companies" class="info__row">
            <td class="info__cell">
              {{ $t("Production Companies") }}
            </td>
            <td class="info__cell">
              <ul class="info__companies">
                <li
                  v-for="(company, index) in transformedProductionCompanies"
                  :key="company.id"
                  class="info__company"
                >
                  {{ index + 1 }}.
                  {{ company.name }}
                  <NuxtImg
                    v-if="company.logo"
                    :src="`${config.public.apiImgUrl}w200${company.logo}`"
                    width="200"
                    height="31"
                    class="info__company-image"
                    loading="lazy"
                    alt=""
                  />
                </li>
              </ul>
            </td>
          </tr>
          <tr v-if="data.budget" class="info__row">
            <td class="info__cell">
              {{ $t("Budget") }}
            </td>
            <td class="info__cell">${{ transformedBudget }}</td>
          </tr>
          <tr v-if="data.revenue" class="info__row">
            <td class="info__cell">
              {{ $t("Revenue") }}
            </td>
            <td class="info__cell">${{ transformedRevenue }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHoursAndMinutes } from "~/src/shared/lib/get";
import { formatNumber, formatDate } from "~/src/shared/lib/format";
import type { Media } from "~/src/shared/config";

const { t } = useI18n();
const config = useRuntimeConfig();

const props = defineProps<{
  data: Media;
}>();

const transformedLanguage = computed(() => {
  return props.data.original_language.toUpperCase();
});

const transformedDate = computed(() => {
  return formatDate(props.data.release_date);
});

const transformedRuntime = computed(() => {
  if (props.data.runtime) {
    const { hours: h, minutes: m } = getHoursAndMinutes(props.data.runtime);
    return `${h}${t("h")} ${m}${t("min")}`;
  }

  return undefined;
});

const transformedProductionCountries = computed(() => {
  return props.data.production_countries
    ?.map((country) => country.name)
    .join(", ");
});

const transformedProductionCompanies = computed(() => {
  return props.data.production_companies?.map(({ id, name, logo_path }) => ({
    id,
    name,
    logo: logo_path,
  }));
});

const transformedBudget = computed(() => {
  if (props.data.budget) {
    return formatNumber(props.data.budget);
  }

  return undefined;
});

const transformedRevenue = computed(() => {
  if (props.data.revenue) {
    return formatNumber(props.data.revenue);
  }

  return undefined;
});
</script>

<style lang="scss">
.info {
  max-width: 1200px;
  margin: 0 auto;

  &__table-wrapper {
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
  }

  &__cell {
    padding: 20px 10px 20px 0;
    border-bottom: 1px solid var(--palette-white);

    &:first-child {
      font-weight: 700;
      vertical-align: top;
    }
  }

  &__companies {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__company {
    display: flex;
    align-items: center;
    column-gap: 10px;

    &-image {
      width: 40px;
      height: 30px;
      object-fit: contain;
      padding: 5px;
      background-color: var(--palette-white);
      border-radius: 5px;
    }
  }
}
</style>
