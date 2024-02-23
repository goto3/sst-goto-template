import { SSTConfig } from "sst";

import { API } from "./stacks/api.stack";
import { frontend } from "./stacks/frontend.stack";

export default {
  config(_input) {
    return {
      name: "sst2-goto-boilerplate",
      profile: "personal",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(API);
    app.stack(frontend);
  }
} satisfies SSTConfig;
