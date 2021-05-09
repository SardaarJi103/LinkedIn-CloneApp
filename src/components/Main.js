import styled from 'styled-components';
import PostModel from './postModel';
import {useState} from 'react';
import { connect } from 'react-redux';
import {useEffect} from 'react';
import {getArticlesAPI} from '../Actions';
import ReactPlayer from 'react-player';


const Main=(props)=>{

useEffect(()=>{
props.getArticles();
},[]);

const [showModel,setShowModel]=useState("close");

const handleModel=(e)=>{

    e.preventDefault();

   if(e.target !== e.currentTarget){
       return;
   }

switch(showModel){
    case "open":
        setShowModel("close");
        break;
    case "close":
        setShowModel("open");
        break;
    default:
        setShowModel("close");
        break;
}

}


    return (

<>

{
    props.articles.length===0 ?
   ( <p>There are no articles</p>)
    :
(
        <Container>
           <ShareBox>
               <div>
           {   props.user && props.user.photoURL ? 
           
         (<img src={props.user.photoURL}></img>)
           :

            (<img src="/images/user.svg"></img>)

           

           }
            <button onClick={handleModel}
            disabled={props.loading ? true : false}>Start a Post</button>
           </div>
           <div>
               <button>
                   <img src="/images/photo-icon.svg"></img>
                   <span>Photo</span>
               </button>

               <button>
                   <img src="/images/video-icon.svg"></img>
                   <span>Video</span>
               </button>

               
               <button>
                   <img src="/images/event-icon.svg"></img>
                   <span>Event</span>
               </button>

               
               <button>
                   <img src="/images/article-icon.svg"></img>
                   <span>Write Article</span>
               </button>
           </div>
           </ShareBox>

           <Content>
               {
                 props.loading && <img src="./images/loader.gif"></img>  
               }

               {props.articles.length>0 && 
               props.articles.map((article,key)=>(
                  
                  <Article key={key}>
                  
      <ShareActor>
          <a>
              <img src={article.actor.image }></img>
              <div>
                  <span>{article.actor.title}</span>
                  <span>{article.actor.description}</span>
                  <span>{article.actor.date.toDate().toLocaleDateString()}</span>
              </div>
          </a>
          <button>
              <img src="/images/threeDots.jpg"></img>
          </button>
      </ShareActor>
<Description>
    {article.description}
</Description>

<SharedImg>
    <a>
        
        {
            !article.shareImage && article.video ? (<ReactPlayer width={'100%'} url={article.video}></ReactPlayer>)

            : 
            (
                article.shareImage && <img src={article.shareImage}></img>
            )
        }
    </a>
</SharedImg>

<SocialCounts>
    <li>
        <button>
            <img src="https://i.pinimg.com/originals/c0/d2/16/c0d21611b7e1ef0bf8486900301822a4.png"></img>
        
        <img src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands500.png"></img>
        
        <span>75</span>
        </button>
    </li>

    <li>
        <a>{article.comment}</a>
    </li>
</SocialCounts>

<SocialActions>
<button>
    <img src="https://i.pinimg.com/originals/c0/d2/16/c0d21611b7e1ef0bf8486900301822a4.png"></img>
    <span>Like</span>
</button>

<button>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX////09PQAl9MwMDD4+PgdHR0TExPf398kJCQsLCwxLCkAm9mMjIwiV2/b29s5OTnAwMANi8AwKiTv7+8MDAwyJBkyJx4Ng7S3t7d2dnbn5+eqqqorQk4ZGRkUFBQhISFHR0eRkZFgYGDMzMx7e3stOD6dnZ0/Pz8lT2IWeKKkpKQhXnsBkcoOhrlUVFRmZmYoSFeibCVcAAADUElEQVR4nO3c3XKaQBiA4cUPdBesRjHGSACVaBOTmN7/1RVn2qlxJNaGP7fvc+aBzryzwq4roBQAAAAAAAAAAAAAAAAAAAAAAAAAAADwWy9a9su3jOZNh/2SrWJPV8GLV1nTcXv92Ij4VRAxcb/pPKUeY5Hx+ulb+Z7WY5H4vunAKBZ//dwJqtB5XvsSb5sNDLX4D69BpxrB64MvOmy0cJOKP6oqME8c+ZIuGy38bvyX6gLzxBffDJsMdCcyvauysHM3lYnTYOG8K7evVQZ2OreS9Bos7OWF1QYGeeGgpYVB8DoqwVS8m/khtzWFz09rf/x1IqK9A3rxWOdSrrAwGD1M81VXFYz2VvVNkUWFwd2tL8bTpgTpx5c6Nfmg1nZoFhQGb/n4eavZoAzZ0eto54mRun5YFY1hvtjytm5FnI0n+r3RwuB5KmmknKrs14rdmk43BYU/fLOqLtBx3J3RNf2qKviW7ucwt8rCWSpek4WjW+nOKy3sJTKpZ8Y4XbhfLVcZ6DjhRLr1rFZPFgYUUkghhRRSSCGFFFJIIYUUUniu8LI9+aJPaXGhu7lof3tb8DHtLXR7qbloA79gu6e9hU64SLy/l+zCaxtDx53PLhFe3bd033jRBn6BVheWgkIKKaSQwv+j8B8nwuspdKNPL/GenXl7+wvd2eTTK7wnZ/5CprD5QsfZ3H9mc+bd11Bo/ZnmiyikkMI/Tl7nbVWhOnWtvl2FO+N/s7sw8mR8PIh2FbpDI/IWWFyobmIR/2X04Z6zN6sK1WYiMpaHD8SqQjVL9dFNpGJZoZr3h4mXHtC2FSrlDGbRgaW2rvDIIPkfCisNbLxwPpGkV+kgNl2oUkkjuwvvtVnYXZglkvbPbrZcc2E+iJI+ztVF//ee1arCMF+Q62F/dlOi7KCx+UIVfk+P7m79slj+bBO3oFC5fZ2evif0H+0fdLJ03PYU5rPi9n0xLJFnxHv/dQVROwrLlhmdH9uZsrdQOStPTLLZn3AsLVRqGYvE76Frb6HK8oNRLwbK3kIV7lIxaeR0rS3cP3hLJHk0FheqWWwknx0tLlSDoRa7C5V7H1teqNQ2Tht9tlINsn4rnjcIAAAAAAAAAAAAAAAAAAAAAAAAAACAxv0ELKKtJYBz2wAAAAAASUVORK5CYII="></img>
<span>Comments</span>
</button>

<button>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXANfk1iNcs1Pc3k8IKqmGR8bhOhlvBohPA0GQmzbrDquuFKxDN_hEd2uuO21wu0Phk7I&usqp=CAU"></img>
<span>Share</span>
</button>

<button>
    <img src="https://www.clipartmax.com/png/middle/195-1953726_connect-to-mailing-list-platforms-send-message-icon-png.png"></img>
<span>Send</span>
</button>
</SocialActions>
               </Article>

               ))}

           </Content>
           <PostModel showModel={showModel} handleClick={handleModel}></PostModel>
        </Container>
        
)}
        </>
    )
};

const Container=styled.div`
grid-area:main;
`;

const CommonCard=styled.div`

text-align:center;
overflow:hidden;
margin-bottom:8px;
background-color:#fff;
border-radius:5px;
position:relative;
border:none;
box-shadow:0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0 /20%);

`;

const ShareBox=styled(CommonCard)`
display:flex;
flex-direction:column;
color:#958b7b;
margin:0 0 8px;
background:white;

div{
    button{
        outline:none;
        color:rgba(0,0,0,.6);
        font-size:14px;
        line-height:1.5;
        min-height:48px;
        background: transparent;
        border:none;
        display:flex;
        align-items:center;
        font-weight:600;

    }
    &:first-child{
        display:flex;
        align-items:center;
        padding:8px 16px 0px 16px;
        img{
            width:48px;
            border-radius:50%;
            margin-right:8px;
        }
        button{
            margin:4px 0;
            flex-grow:1;
            border-radius : 35px;
            padding-left:16px;
            border : 1px solid rgba(0,0,0,0.15);
            background-color:white;
            text-align:left
        }
    }
    &:nth-child(2){
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        padding-bottom:4px;

        button{
            img{
                margin: 0 4px 0 -2px;
            }
            span{
                color:#70b5f9;

            }
        }
    }
}
`;

const Article=styled(CommonCard)`

padding:0;
margin: 0 0 8px;
overflow:visible;

img{
    height:30px;
    width:30px;
    background:transparent;
}
`;

const ShareActor=styled.div`
padding-right:40px;
flex-wrap:nowrap;
padding:12px 16px 0;
margin-bottom:8px;
align-items:center;
display:flex;

a{
    margin-right:12px;
    flex-grow:1;
    overflow:hidden;
    display:flex;
    text-decoration:none;
    img{
        width:48px;
        height:48px;
    }

    &>div{
        display:flex;
        flex-direction:column;
        flex-grow:1;
        flex-basis:0;
        margin-left:8px;
        overflow:hidden;
        span{
            text-align:left;
            &:first-child{
                font-size:14px;
                font-weight:700;
                color: rgba(0,0,0,1)
            }

            &:nth-child(n+1){
                font-size:12px;
                color:rgba(0,0,0,.6);
            }
        }

    }
}

button{
    position: absolute;
    right:12px;
    top:0;
    background:transparent;
    border:none;
    outline:none;
}
`;

const Description=styled.div`
padding:0 16px;
overflow:hidden;
color:rgba(0,0,0,.9);
font-size:14px;
text-align:left;
`;

const SharedImg=styled.div`
margin-top:8px;
width:100%;
display:block;
position:relative;
background-color:#f9fafb;

img{
    object-fit:contain;
    width:100%;
    height: 100%;
}
`;

const SocialCounts=styled.ul`

line-height:1.3;
display:flex;
align-items:flex-start;
overflow:auto;
margin: 0 16px;
padding:8px 0;
border-bottom:1px solid #e9e5df;
list-style:none;

li{
    margin-right:5px;
    font-size:12px;

    button{
        display:flex;
        border:none;
        
        background-color:white;
        
    }
}

img{
            object-fit:contain;
            height:30px !important;
            width:30px;
            border-radius:50%;
        }
`;

const SocialActions=styled.div`
align-items:center;
display:flex;
justify-content:flex-start;
margin:0;
min-height:40px;
padding:4px 8px;

button{
    display: inline-flex;
    align-items:center;
    padding:8px;
    color:blue;
    border:none;
    background-color:white;


    @media (min-width:768px){
        span{
            margin-left:8px;
        }
    }
}
`;

const Content=styled.div`
text-align:center;
&>img{
    width:30px;
}
`;

const mapStateToProps=(state)=>{
    return {
        loading:state.articleState.loading,
        user:state.userState.user,
        articles:state.articleState.articles
    };
};

const mapDispatchToProps=(dispatch)=>({

    getArticles:()=>dispatch(getArticlesAPI())
});

export default connect(mapStateToProps,mapDispatchToProps)(Main);