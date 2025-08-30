import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/company-story.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("CompanyStory")
@route("/company-stories")
@useAuth([BusinessBearerAuth])
namespace BusinessService.CompanyStoryRoutes {
  interface Root {
    @operationId("get-company-story")
    @summary("Show CompanyStory")
    @get
    get(): SuccessResponse<CompanyStory>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;

    @operationId("put-company-story")
    @summary("Update CompanyStory")
    @put
    put(
      @body body: CompanyStoryUpdateInput,
    ): SuccessResponse<CompanyStoryUpdateResponse>
      | BadRequestErrorResponse<CompanyStoryUpdateResponse>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
  }
}
