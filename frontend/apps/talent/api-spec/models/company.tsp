import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

@summary("Company")
model Company {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
  establishedAt?: plainDate;
}