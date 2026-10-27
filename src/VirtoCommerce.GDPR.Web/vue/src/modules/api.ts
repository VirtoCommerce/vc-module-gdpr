// Same-origin fetch client for api/gdpr (cookie auth works: the host is same-origin).
// Hand-written: the search endpoint is annotated as Contact[] but returns { totalCount, results }.
async function http<T>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    credentials: "same-origin",
    headers: body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return (text ? JSON.parse(text) : undefined) as T;
}

export interface Contact {
  id: string;
  fullName?: string;
  birthDate?: string;
  securityAccounts?: { userName?: string; email?: string }[];
}

export const api = {
  // the AngularJS list's criteria
  search: (keyword: string | undefined, skip: number, take: number) =>
    http<{ totalCount?: number; results?: Contact[] }>("POST", "/api/gdpr/contacts/search", {
      memberType: "Contact",
      objectType: "Member",
      keyword,
      deepSearch: !!keyword,
      skip,
      take,
    }),
  anonymize: (id: string) => http<Contact>("GET", `/api/gdpr/contacts/anonymize/${encodeURIComponent(id)}`),
  download: (id: string) => http<Record<string, unknown> & { fullName?: string }>("GET", `/api/gdpr/contacts/download/${encodeURIComponent(id)}`),
};

/** Login and email come from the contact's first account, as in the AngularJS list. */
export const accountOf = (c?: Contact) => ({ login: c?.securityAccounts?.[0]?.userName ?? "", email: c?.securityAccounts?.[0]?.email ?? "" });
