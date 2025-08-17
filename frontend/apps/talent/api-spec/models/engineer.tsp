import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;

@summary("Engineer SignUp Validation Error")
model EngineerSignUpValidationError {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  password?: string[];
  birthday?: string[];
  frontIdentification?: string[];
  backIdentification?: string[];
}

@summary("Engineer SignUp Input")
model EngineerSignUpInput {
  firstName: HttpPart<string>;
  lastName: HttpPart<string>;
  email: HttpPart<string>;
  password: HttpPart<string>;
  birthday?: HttpPart<plainDate>;
  frontIdentification?: HttpPart<Binary>;
  backIdentification?: HttpPart<Binary>;
}

@summary("Engineer SignUp Response")
model EngineerSignUpResponse {
  code: integer;
  errors: EngineerSignUpValidationError;
}

@summary("Engineer SignIn Input")
model EngineerSignInInput {
  email: string;
  password: string;
}

@summary("Engineer SignIn Response")
model EngineerSignInResponse {
  token: string;
  error: string;
}
