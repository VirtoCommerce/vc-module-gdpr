import * as blades from "./pages";
import * as locales from "./locales";
import { defineAppModule } from "@vc-shell/framework";

// GDPR: the AngularJS module's main menu item, customer list and customer details (anonymize / download data)
export default defineAppModule({
  blades,
  locales,
});

export * from "./pages";
