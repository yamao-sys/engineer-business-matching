import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;
using OpenAPI;

@summary("Profile")
model ProfileUpdateInput {
  name: HttpPart<string>;
  logo?: HttpPart<Binary>;
  email: HttpPart<string>;
  address?: HttpPart<string>;
  siteUrl?: HttpPart<string>;
  employeeCount?: HttpPart<integer>;
  industryId?: HttpPart<integer>;
}

@summary("Profile")
model Profile {
  name: string;
  logoUrl?: string;
  email: string;
  address?: string;
  siteUrl?: string;
  employeeCount?: integer;
  industryId?: integer;
}

@summary("Profile Update Validation Error")
model ProfileUpdateValidationError {
  name?: string[];
  logo?: string[];
  email?: string[];
  address?: string[];
  siteUrl?: string[];
  employeeCount?: string[];
  industryId?: string[];
}

@summary("Profile Update Response")
model ProfileUpdateResponse {
  profile: Profile;
  errors: ProfileUpdateValidationError;
}