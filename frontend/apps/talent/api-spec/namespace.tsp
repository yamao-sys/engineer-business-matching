import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;

@service
@doc("talent APIs")
@OpenAPI.info(#{
  version: "1.0",
  title: "Talent Service",
})
@server("https://localhost:4000")
namespace TalentService {};
