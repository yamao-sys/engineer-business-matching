import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/engineer.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("engineers")
@route("/engineers")
namespace TalentService.Engineer {
  interface ValidateSignUp {
    @route("/validate-sign-up")
    @operationId("post-engineer-validate-sign-up")
    @summary("Engineer Validate Sign Up")
    @post
    post(
      @header contentType: "multipart/form-data",
      @multipartBody body: EngineerSignUpInput,
    ): SuccessResponse<EngineerSignUpResponse>
      | BadRequestErrorResponse<EngineerSignUpResponse>
      | InternalServerErrorResponse;
  }

  interface SignUp {
    @route("/sign-up")
    @operationId("post-engineer-sign-up")
    @summary("Engineer Sign Up")
    @post
    post(
      @header contentType: "multipart/form-data",
      @multipartBody body: EngineerSignUpInput,
    ): SuccessResponse<EngineerSignUpResponse>
      | BadRequestErrorResponse<EngineerSignUpResponse>
      | InternalServerErrorResponse;
  }
  
  interface SignIn {
    @route("/sign-in")
    @operationId("post-engineer-sign-in")
    @summary("Engineer Sign In")
    @post
    post(
      @body body: EngineerSignInInput,
    ): SuccessResponseWithHeader<EngineerSignInResponse>
      | BadRequestErrorResponse<EngineerSignInResponse>
      | InternalServerErrorResponse;
  }
}
