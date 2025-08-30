import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/company-product.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("CompanyProduct")
@route("/company-products")
@useAuth([BusinessBearerAuth])
namespace BusinessService.CompanyProductRoutes {
  @route("/")
  interface Root {
    @operationId("get-company-products")
    @summary("Fetch CompanyProducts")
    @get
    get(): SuccessResponse<CompanyProduct[]>
      | InternalServerErrorResponse;

    @operationId("post-company-product")
    @summary("Create CompanyProduct")
    @post
    post(
      @header contentType: "multipart/form-data",
      @multipartBody body: CompanyProductUpdateInput,
    ): SuccessResponse<CompanyProductUpdateResponse>
      | BadRequestErrorResponse<CompanyProductUpdateResponse>
      | InternalServerErrorResponse;
  }

  @route("/{id}")
  interface Id {
    @operationId("get-company-product")
    @summary("Show CompanyProduct")
    @get
    get(
      @path id: string,
    ): SuccessResponse<CompanyProduct>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
    
    @operationId("put-company-product")
    @summary("Update CompanyProduct")
    @put
    put(
      @path id: string,
      @header contentType: "multipart/form-data",
      @multipartBody body: CompanyProductUpdateInput,
    ): SuccessResponse<CompanyProductUpdateResponse>
      | BadRequestErrorResponse<CompanyProductUpdateResponse>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;

    @operationId("delete-company-product")
    @summary("Delete CompanyProduct")
    @delete
    delete(
      @path id: string,
    ): SuccessResponse<CompanyProduct>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
  }
}
