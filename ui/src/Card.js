import './App.css';

function Card() {
    return (
        <div className='card'>
          <div style={{display:'flex'}}>
            <img src='https://media-exp1.licdn.com/dms/image/C4D03AQHcBoE-XvYAcA/profile-displayphoto-shrink_200_200/0/1632493847623?e=2147483647&v=beta&t=zLTjx9dO27-JjTF1_okENtyWnSGS3gDSYFKQj7WLenA'/>
            <div className='user'>
              <h4>Lina Pawar</h4>
              <span className='greytext'>@linapawar Apr 06</span>
            </div>
          </div>
          <p className='tweet'>Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.</p>
          <span className='hashtag'>#quoteoftheday</span>
        </div>
    );
}
export default Card;