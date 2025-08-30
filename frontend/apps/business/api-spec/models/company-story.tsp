import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;
using OpenAPI;

@summary("CompanyStoryUpdateInput")
model CompanyStoryUpdateInput {
  mission: string;
  vision: string;
}

@summary("CompanyStory")
model CompanyStory {
  mission: string;
  vision: string;
}

@summary("CompanyStory Update Validation Error")
model CompanyStoryUpdateValidationError {
  mission?: string[];
  vision?: string[];
}

@summary("CompanyStory Update Response")
model CompanyStoryUpdateResponse {
  companyStory: CompanyStory;
  errors: CompanyStoryUpdateValidationError;
}