import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./common.tsp";

using Http;
using OpenAPI;

@summary("TechBlogUpdateInput")
model TechBlogUpdateInput {
  title: string;
  url: string;
  publishedAt: plainDate;
}

@summary("TechBlog")
model TechBlog {
  id: string;
  title: string;
  url: string;
  publishedAt: plainDate;
}

@summary("TechBlog Update Validation Error")
model TechBlogUpdateValidationError {
  title?: string[];
  url?: string[];
  publishedAt?: string[];
}

@summary("TechBlog Update Response")
model TechBlogUpdateResponse {
  techBlog: TechBlog;
  errors: TechBlogUpdateValidationError;
}