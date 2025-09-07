import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/company-member.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("CompanyMember")
@route("/company-members")
@useAuth([BusinessBearerAuth])
namespace BusinessService.CompanyMemberRoutes {
  @route("/")
  interface Root {
    @operationId("get-company-members")
    @summary("Fetch CompanyMembers")
    @get
    get(): SuccessResponse<CompanyMember[]>
      | InternalServerErrorResponse;

    @operationId("post-company-member")
    @summary("Create CompanyMember")
    @post
    post(
      @header contentType: "multipart/form-data",
      @multipartBody body: CompanyMemberUpdateInput,
    ): SuccessResponse<CompanyMemberUpdateResponse>
      | BadRequestErrorResponse<CompanyMemberUpdateResponse>
      | InternalServerErrorResponse;
  }

  @route("/{id}")
  interface Id {
    @operationId("get-company-member")
    @summary("Show CompanyMember")
    @get
    get(
      @path id: string,
    ): SuccessResponse<CompanyMember>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
    
    @operationId("put-company-member")
    @summary("Update CompanyMember")
    @put
    put(
      @path id: string,
      @header contentType: "multipart/form-data",
      @multipartBody body: CompanyMemberUpdateInput,
    ): SuccessResponse<CompanyMemberUpdateResponse>
      | BadRequestErrorResponse<CompanyMemberUpdateResponse>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;

    @operationId("delete-company-member")
    @summary("Delete CompanyMember")
    @delete
    delete(
      @path id: string,
    ): SuccessResponse<CompanyMember>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
  }
}
