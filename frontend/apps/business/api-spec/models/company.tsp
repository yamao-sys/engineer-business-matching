import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;

@summary("Company SignIn Input")
model CompanySignInInput {
  email: string;
  password: string;
}

@summary("Company SignUp Validation Error")
model CompanySignUpValidationError {
  name?: string[];
  email?: string[];
  password?: string[];
  finalTaxReturn?: string[];
}

@summary("Company SignUp Input")
model CompanySignUpInput {
  name: HttpPart<string>;
  email: HttpPart<string>;
  password: HttpPart<string>;
  finalTaxReturn?: HttpPart<Binary>;
}

@summary("Company SignUp Response")
model CompanySignUpResponse {
  code: integer;
  errors: CompanySignUpValidationError;
}

@summary("Company SignIn Ok Response")
model CompanySignInOkResponse {
  token: string;
}

@summary("Company SignIn Error Response")
model CompanySignInOkResponseHeader {
  "Set-Cookie": string;
}

@summary("Company SignIn BadRequestError Response")
model CompanySignInBadRequestResponse {
  errors: string[];
}
