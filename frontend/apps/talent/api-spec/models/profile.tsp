import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;
using OpenAPI;

@summary("Profile")
model ProfileUpdateInput {
  firstName: string;
  lastName: string;
  birthday?: plainDate;
  address?: string;
  currentEmployer?: string;
  tel?: string;
}

@summary("Profile")
model Profile {
  firstName: string;
  lastName: string;
  birthday?: plainDate;
  address?: string;
  currentEmployer?: string;
  tel?: string;
}

@summary("Profile Update Validation Error")
model ProfileUpdateValidationError {
  firstName?: string[];
  lastName?: string[];
  birthday?: string[];
  address?: string[];
  currentEmployer?: string[];
  tel?: string[];
}

@summary("Profile Update Response")
model ProfileUpdateResponse {
  profile: Profile;
  errors: ProfileUpdateValidationError;
}