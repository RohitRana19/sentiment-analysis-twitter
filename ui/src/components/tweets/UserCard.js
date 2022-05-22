const UserCard = ({ userData }) => {
  const { profile_image_url, name, screen_name, influence, count } = userData;
  return (
    <div
      style={{
        display: "flex",
        margin: "20px 0px 20px 0px",
        padding: "10px",
        backgroundColor: "#74b6f7",
      }}
    >
      <img src={profile_image_url} />
      <div className="user">
        <p>{name}</p>
        <p>@{screen_name}</p>
      </div>
      <b>Influence Score: {influence === 0 ? 0 : influence.toFixed(2)}</b>
      <div>Count: {count}</div>
    </div>
  );
};

export default UserCard;
