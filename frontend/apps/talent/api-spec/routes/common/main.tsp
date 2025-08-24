import "@typespec/http";

using Http;

// 認証スキーマの定義
model TalentBearerAuth {
  type: "apiKey"; // APIキー認証を使う（header指定可）
  name: "Talent-Authorization"; // ヘッダー名
  in: "header"; // ヘッダーに入れる
}

model SuccessResponse<T> {
  @statusCode status: 200;
  @body body: T
}

model SuccessResponseWithHeader<T> {
  @statusCode status: 200;
  @body body: T;
  @header("Set-Cookie") token: string;
}

model BadRequestErrorResponse<T> {
  @statusCode status: 400;
  @body body: T
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
