const UserCard = ({ userData }) => {
  const { profile_image_url, name, screen_name, influence } = userData;
  return (
    <div>
      <div style={{display:'flex'}}>
        <img src={profile_image_url} />
        <div className='user'>
          <p>{name}</p>
          <p>@{screen_name}</p>
        </div>
      </div>
      <b>Influence Score: {influence}</b>
    </div>
  );
};

export default UserCard;