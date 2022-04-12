const UserCard = ({ userData }) => {
  const { profile_image_url, name, screen_name, influence } = userData;
  return (
    <div>
      <img src={profile_image_url} />
      <div>
        <div>{name}</div>
        <div>@{screen_name}</div>
      </div>
      <label>{influence}</label>
    </div>
  );
};

export default UserCard;
