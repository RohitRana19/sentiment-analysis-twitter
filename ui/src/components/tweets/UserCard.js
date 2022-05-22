const UserCard = ({ userData }) => {
  const { profile_image_url, name, screen_name, influence, count } = userData;
  return (
    <div
      style={{
        display: "flex",
        margin: "20px 0px 20px 0px",
        padding: "10px",
        backgroundColor: "rgb(50, 167, 246)",borderRadius:"10px"
      }}
    >
      <img src={profile_image_url} alt='/profileimage' style={{marginTop:"5px",marginBottom:"8px"}}/>
      <div className="user">
        <p>{name}</p>
        <p>@{screen_name}</p>
        <b>Influence Score: {influence === 0 ? 0 : influence.toFixed(2)}</b>
      </div>
    </div>
  );
};

export default UserCard;
