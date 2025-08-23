import "@typespec/http";

using Http;

alias SecuritySchema = ApiKeyAuth<ApiKeyLocation.cookie, "businessToken">;

model SuccessResponse<T> {
  @statusCode status: 200;
  @bodyRoot body: T
}

model SuccessResponseWithHeader<T> {
  @statusCode status: 200;
  @bodyRoot body: T;
  @header("Set-Cookie") token: string;
}

model BadRequestErrorResponse<T> {
  @statusCode status: 400;
  @bodyRoot body: T
}

model ForBiddenErrorResponse {
  @statusCode status: 403;
}

model NotFoundErrorResponse {
  @statusCode status: 404;
}

model InternalServerErrorResponse {
  @statusCode status: 500;
}
