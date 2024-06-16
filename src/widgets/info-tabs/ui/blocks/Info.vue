<template>
  <div class="info">
    <div class="info__table-wrapper">
      <table class="info__table">
        <tr v-if="data.originalTitle" class="info__row">
          <td class="info__cell">
            {{ $t("Original Title") }}
          </td>
          <td class="info__cell">{{ data.originalTitle }}</td>
        </tr>
        <tr v-if="data.originalLanguage" class="info__row">
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
        <tr v-if="data.date" class="info__row">
          <td class="info__cell">
            {{ $t("Release Date") }}
          </td>
          <td class="info__cell">
            {{ transformedDate }}
          </td>
        </tr>
        <tr v-if="data.productionCountries" class="info__row">
          <td class="info__cell">
            {{ $t("Production Countries") }}
          </td>
          <td class="info__cell">
            {{ transformedProductionCountries }}
          </td>
        </tr>
        <tr v-if="data.productionCompanies" class="info__row">
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
      </table>
    </div>
  </div>
</template>

<script setup>
import { getHoursAndMinutes } from "~/src/shared/lib/get";
import { formatNumber, formatDate } from "~/src/shared/lib/format";

const { t } = useI18n();
const config = useRuntimeConfig();

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const transformedLanguage = computed(() => {
  return props.data.originalLanguage.toUpperCase();
});

const transformedDate = computed(() => {
  return formatDate(props.data.date);
});

const transformedRuntime = computed(() => {
  const { hours: h, minutes: m } = getHoursAndMinutes(props.data.runtime);

  return `${h}${t("h")} ${m}${t("min")}`;
});

const transformedProductionCountries = computed(() => {
  return props.data.productionCountries
    .map((country) => country.name)
    .join(", ");
});

const transformedProductionCompanies = computed(() => {
  return props.data.productionCompanies.map(({ id, name, logo_path }) => ({
    id,
    name,
    logo: logo_path,
  }));
});

const transformedBudget = computed(() => {
  return formatNumber(props.data.budget);
});

const transformedRevenue = computed(() => {
  return formatNumber(props.data.revenue);
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
