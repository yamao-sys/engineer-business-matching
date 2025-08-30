import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;
using OpenAPI;

@summary("CompanyProductUpdateInput")
model CompanyProductUpdateInput {
  name: HttpPart<string>;
  description: HttpPart<string>;
  url: HttpPart<string>;
  logo?: HttpPart<Binary>;
}

@summary("CompanyProduct")
model CompanyProduct {
  name: string;
  description: string;
  url: string;
  logoUrl?: string;
}

@summary("CompanyProduct Update Validation Error")
model CompanyProductUpdateValidationError {
  name?: string[];
  description?: string[];
  url?: string[];
  logo?: string[];
}

@summary("CompanyProduct Update Response")
model CompanyProductUpdateResponse {
  companyProduct: CompanyProduct;
  errors: CompanyProductUpdateValidationError;
}