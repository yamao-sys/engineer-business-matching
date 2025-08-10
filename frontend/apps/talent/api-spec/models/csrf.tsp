import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

@summary("CsrfResponse")
model CsrfResponse {
  csrfToken: string;
}
