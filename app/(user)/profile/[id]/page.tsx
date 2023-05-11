import Profile from "./Profile"

type ProfileParams = {
  params: {
    id: string
  }
}

const ProfilePage = ({ params: { id } }: ProfileParams) => {
  return (
    <Profile id={id} />
  );
}

export default ProfilePage;