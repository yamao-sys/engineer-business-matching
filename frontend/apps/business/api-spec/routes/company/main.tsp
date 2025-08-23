import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/company.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("companies")
@route("/companies")
namespace BusinessService.CompanyRoutes {
  interface ValidateSignUp {
    @route("/validate-sign-up")
    @operationId("post-company-validate-sign-up")
    @summary("Company Validate Sign Up")
    @post
    post(
      @header contentType: "multipart/form-data",
      @multipartBody body: CompanySignUpInput,
    ): SuccessResponse<CompanySignUpResponse>
      | BadRequestErrorResponse<CompanySignUpResponse>
      | InternalServerErrorResponse;
  }

  interface SignUp {
    @route("/sign-up")
    @operationId("post-company-sign-up")
    @summary("Company Sign Up")
    @post
    post(
      @header contentType: "multipart/form-data",
      @multipartBody body: CompanySignUpInput,
    ): SuccessResponse<CompanySignUpResponse>
      | BadRequestErrorResponse<CompanySignUpResponse>
      | InternalServerErrorResponse;
  }
  
  interface SignIn {
    @route("/sign-in")
    @operationId("post-company-sign-in")
    @summary("Company Sign In")
    @post
    post(
      @body body: CompanySignInInput,
    ): SuccessResponseWithHeader<CompanySignInResponse>
      | BadRequestErrorResponse<CompanySignInResponse>
      | InternalServerErrorResponse;
  }
}
