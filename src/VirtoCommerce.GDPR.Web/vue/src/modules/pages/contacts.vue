<template>
  <VcBlade
    :title="$t('GDPR.LIST.TITLE')"
    :subtitle="$t('GDPR.LIST.SUBTITLE')"
    :toolbar-items="toolbar"
    :loading="loading"
    width="50%"
  >
    <VcDataTable
      v-model:search-value="keyword"
      :items="items"
      :total-count="totalCount"
      :pagination="pagination"
      :searchable="true"
      state-key="GDPR_CONTACTS"
      :active-item-id="activeId"
      :empty-state="{ icon: 'lucide-users', title: $t('GDPR.LIST.EMPTY') }"
      @row-click="(e: { data: Contact }) => open(e.data)"
      @pagination-click="pagination.goToPage"
    >
      <VcColumn
        id="fullName"
        :title="$t('GDPR.FIELDS.FULL_NAME')"
        mobile-role="title"
        always-visible
      />
      <VcColumn
        id="email"
        :title="$t('GDPR.FIELDS.EMAIL')"
        mobile-role="field"
      >
        <template #body="{ data }">{{ accountOf(data).email }}</template>
      </VcColumn>
      <VcColumn
        id="login"
        :title="$t('GDPR.FIELDS.LOGIN')"
        mobile-role="field"
      >
        <template #body="{ data }">{{ accountOf(data).login }}</template>
      </VcColumn>
    </VcDataTable>
  </VcBlade>
</template>

<script setup lang="ts">
// The AngularJS GDPR main blade (one entry: Customers) and its customer list, merged into one workspace blade
import {
  useAsync,
  useBlade,
  useDataTablePagination,
  useFunctions,
  useTableSearch,
  type IBladeToolbar,
} from "@vc-shell/framework";
import { VcBlade, VcColumn, VcDataTable } from "@vc-shell/framework/ui";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { accountOf, api, type Contact } from "../api";

defineBlade({
  url: "/gdpr",
  name: "GdprContacts",
  isWorkspace: true,
  permissions: ["gdpr:access"],
});

const PAGE_SIZE = 20;
const { t } = useI18n({ useScope: "global" });
const { openBlade, exposeToChildren } = useBlade();
const { debounce } = useFunctions();

const items = ref<Contact[]>([]);
const totalCount = ref(0);
const activeId = ref<string>();
const { searchValue: keyword } = useTableSearch({ stateKey: "GDPR_CONTACTS" });
const pagination = useDataTablePagination({ stateKey: "GDPR_CONTACTS", pageSize: PAGE_SIZE, totalCount });

const { loading, action: load } = useAsync(async () => {
  const result = await api.search(keyword.value || undefined, pagination.skip, PAGE_SIZE);
  items.value = result.results ?? [];
  totalCount.value = result.totalCount ?? 0;
});

load();
watch(keyword, () => pagination.setPage(1));
watch([keyword, () => pagination.skip], debounce(() => load(), 300));

function open(contact: Contact) {
  openBlade({
    name: "GdprContactDetails",
    options: { contact },
    onOpen: () => (activeId.value = contact.id),
    onClose: () => (activeId.value = undefined),
  });
}

const toolbar = ref<IBladeToolbar[]>([
  { id: "refresh", title: t("GDPR.LIST.REFRESH"), icon: "lucide-refresh-cw", clickHandler: () => load() },
]);

exposeToChildren({ reload: () => load() });
</script>
