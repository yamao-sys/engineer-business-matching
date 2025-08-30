import { FC, Suspense } from "react";
import CompanyStoryForm from "../CompanyStoryForm";

const CompanyStoryTemplate: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyStoryForm />
      </Suspense>
    </>
  );
};

export default CompanyStoryTemplate;