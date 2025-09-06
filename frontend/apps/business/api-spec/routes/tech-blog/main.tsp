import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../../models/tech-blog.tsp";
import "../common";

using Http;
using OpenAPI;

@tag("TechBlog")
@route("/tech-blogs")
@useAuth([BusinessBearerAuth])
namespace BusinessService.TechBlogRoutes {
  @route("/")
  interface Root {
    @operationId("get-tech-blogs")
    @summary("Fetch TechBlogs")
    @get
    get(): SuccessResponse<TechBlog[]>
      | InternalServerErrorResponse;

    @operationId("post-tech-blog")
    @summary("Create TechBlog")
    @post
    post(
      @body body: TechBlogUpdateInput,
    ): SuccessResponse<TechBlogUpdateResponse>
      | BadRequestErrorResponse<TechBlogUpdateResponse>
      | InternalServerErrorResponse;
  }

  @route("/{id}")
  interface Id {
    @operationId("get-tech-blog")
    @summary("Show TechBlog")
    @get
    get(
      @path id: string,
    ): SuccessResponse<TechBlog>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
    
    @operationId("put-tech-blog")
    @summary("Update TechBlog")
    @put
    put(
      @path id: string,
      @body body: TechBlogUpdateInput,
    ): SuccessResponse<TechBlogUpdateResponse>
      | BadRequestErrorResponse<TechBlogUpdateResponse>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;

    @operationId("delete-tech-blog")
    @summary("Delete TechBlog")
    @delete
    delete(
      @path id: string,
    ): SuccessResponse<TechBlog>
      | NotFoundErrorResponse
      | InternalServerErrorResponse;
  }
}
