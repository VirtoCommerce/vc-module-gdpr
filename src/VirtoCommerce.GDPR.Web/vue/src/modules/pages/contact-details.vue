<template>
  <VcBlade
    :title="contact.fullName"
    :subtitle="$t('GDPR.DETAILS.SUBTITLE')"
    :toolbar-items="toolbar"
    :loading="loading"
    width="50%"
  >
    <VcContainer>
      <div class="gdpr-form">
        <VcCard :header="$t('GDPR.DETAILS.HEADER')">
          <div class="gdpr-grid">
            <VcField
              :label="$t('GDPR.FIELDS.FULL_NAME')"
              :model-value="contact.fullName"
            />
            <VcField
              :label="$t('GDPR.FIELDS.LOGIN')"
              :model-value="accountOf(contact).login"
            />
            <VcField
              :label="$t('GDPR.FIELDS.EMAIL')"
              :model-value="accountOf(contact).email"
            />
            <VcField
              :label="$t('GDPR.FIELDS.BIRTHDAY')"
              :model-value="contact.birthDate ? new Date(contact.birthDate) : undefined"
              type="date"
            />
          </div>
        </VcCard>
      </div>
    </VcContainer>
  </VcBlade>
</template>

<script setup lang="ts">
// The AngularJS contact-detail blade: the customer's personal data, Anonymize (confirmed) and Download (JSON file)
import { useAsync, useBlade, useLoading, usePopup, type IBladeToolbar } from "@vc-shell/framework";
import { VcBlade, VcCard, VcContainer, VcField } from "@vc-shell/framework/ui";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { accountOf, api, type Contact } from "../api";

defineBlade({ name: "GdprContactDetails" });

const { t } = useI18n({ useScope: "global" });
const { options, callParent } = useBlade<{ contact: Contact }>();
const { showConfirmation } = usePopup();

const contact = ref<Contact>({ ...options.value!.contact });

const { loading: anonymizing, action: anonymizeAction } = useAsync(async () => {
  contact.value = await api.anonymize(contact.value.id);
  await callParent("reload");
});

async function anonymize() {
  if (await showConfirmation(t("GDPR.DETAILS.ANONYMIZE_CONFIRM"))) await anonymizeAction();
}

const { loading: downloading, action: download } = useAsync(async () => {
  const data = await api.download(contact.value.id);
  const d = new Date();
  const stamp = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}_${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, "\t")], { type: "application/json" }));
  a.download = `${data.fullName ?? contact.value.fullName}_${stamp}.json`.replace(/\s+/g, "");
  a.click();
  // revoked right after click(), Firefox and Safari may not have started the download yet
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

const loading = useLoading(anonymizing, downloading);
const toolbar = ref<IBladeToolbar[]>([
  {
    id: "anonymize",
    title: t("GDPR.DETAILS.ANONYMIZE"),
    icon: "lucide-eraser",
    permissions: ["gdpr:anonymize"],
    disabled: computed(() => anonymizing.value),
    clickHandler: () => anonymize(),
  },
  {
    id: "download",
    title: t("GDPR.DETAILS.DOWNLOAD"),
    icon: "lucide-download",
    permissions: ["gdpr:download"],
    disabled: computed(() => downloading.value),
    clickHandler: () => download(),
  },
]);
</script>

<style lang="scss">
/* the design's blade body padding, as in the Orders details */
.gdpr-form {
  padding: 20px 22px 36px;
}

.gdpr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
