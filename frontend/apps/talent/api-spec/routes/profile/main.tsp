import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/profile.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("profile")
@route("/profile")
@useAuth([TalentBearerAuth])
namespace TalentService.ProfileRoutes {
  interface Root {
    @operationId("get-profile")
    @summary("Show Profile")
    @get
    get(): SuccessResponse<Profile>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;

    @operationId("put-profile")
    @summary("Update profile")
    @put
    put(
      @body body: ProfileUpdateInput,
    ): SuccessResponse<ProfileUpdateResponse>
      | BadRequestErrorResponse<ProfileUpdateResponse>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
  }
}
