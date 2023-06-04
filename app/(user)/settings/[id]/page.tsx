import UserSettings from "./UserSettings";

type IParams = {
  params: {
    id: string
  }
}

const SettingsPage = ({ params: { id } }: IParams) => {

  return (
    <div>
      <UserSettings id={id} />
    </div>
  );
}

export default SettingsPage;