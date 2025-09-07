import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;
using OpenAPI;

@summary("CompanyMemberUpdateInput")
model CompanyMemberUpdateInput {
  name: HttpPart<string>;
  position: HttpPart<string>;
  description: HttpPart<string>;
  icon?: HttpPart<Binary>;
}

@summary("CompanyMember")
model CompanyMember {
  id: string;
  name: string;
  position: string;
  description: string;
  iconUrl?: string;
}

@summary("CompanyMember Update Validation Error")
model CompanyMemberUpdateValidationError {
  name?: string[];
  position?: string[];
  description?: string[];
  icon?: string[];
}

@summary("CompanyMember Update Response")
model CompanyMemberUpdateResponse {
  companyMember: CompanyMember;
  errors: CompanyMemberUpdateValidationError;
}