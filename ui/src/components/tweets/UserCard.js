const UserCard = ({ userData }) => {
  const { profile_image_url, name, screen_name, influence, count } = userData;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <img src={profile_image_url} />
        <div className="user">
          <p>{name}</p>
          <p>@{screen_name}</p>
        </div>
      </div>
      <b>Influence Score: {influence===0?0:influence.toFixed(2)}</b>
      <div>Count: {count}</div>
    </div>
  );
};

export default UserCard;
