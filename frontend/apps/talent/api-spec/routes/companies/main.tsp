import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/company.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("companies")
@route("/companies")
@useAuth([TalentBearerAuth])
namespace TalentService.CompaniesRoutes {
  interface Root {
    @operationId("get-companies")
    @summary("Show Companies")
    @get
    get(): SuccessResponse<Company[]>
      | InternalServerErrorResponse;
  }
}
