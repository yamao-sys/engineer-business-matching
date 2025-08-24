import { FC, Suspense } from "react";
import ProfileForm from "../ProfileForm";

const ProfileTemplate: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileForm />
      </Suspense>
    </>
  );
};

export default ProfileTemplate;
