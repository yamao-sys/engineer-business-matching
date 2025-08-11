export const customFormData = <Body>(body: Body): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(body as Record<string, any>)) {
    formData.append(key, value);
  }
  return formData;
};
