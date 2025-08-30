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
  interface Root {
    @operationId("get-company-product")
    @summary("Show CompanyProduct")
    @get
    get(): SuccessResponse<CompanyProduct>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;

    @operationId("put-company-product")
    @summary("Update CompanyProduct")
    @put
    put(
      @header contentType: "multipart/form-data",
      @multipartBody body: CompanyProductUpdateInput,
    ): SuccessResponse<CompanyProductUpdateResponse>
      | BadRequestErrorResponse<CompanyProductUpdateResponse>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
  }
}
