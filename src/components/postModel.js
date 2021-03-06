

import styled from 'styled-components'
import {useState} from 'react';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux'
import firebase from 'firebase';
import {postArticleAPI} from '../Actions';

const PostModel=(props)=>{

const [editorText,setEditorText]=useState("");
const [shareImage,setShareImage]=useState("");
const [videoLink,setVideoLink]=useState("");
const [assetArea,setAssetArea]=useState("");

const handleChange=(e)=>{

    const image=e.target.files[0];

    if(image=== " " || image === undefined){
        alert(`Not an Image, the file is a ${typeof image}`);
    return ;
    }
    setShareImage(image);


}

const switchAssetArea=(area)=>{
    setShareImage(""); 
    setVideoLink("");

    setAssetArea(area);
}


const postArticle=(event)=>{
    event.preventDefault();
    if(event.target!==event.currentTarget){
        return;
    }

    const payload={
        image: shareImage,
        video:videoLink,
        user:props.user,
        description:editorText,
        timestamp:firebase.firestore.Timestamp.now()
    };
    props.postArticle(payload);
    reset(event);
}

const reset=(e)=>{
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
}

    return (

//JSX fragment
<> 
{  props.showModel ==="open" &&

<Container>

<Content>
    <Header>
        <h2>Create a Post</h2>
        <button onClick={(event)=>reset(event)}>
            <img src="/images/close.png"></img>
        </button>
    </Header>
    <SharedContent>
        <UserInfo>
           
           {props.user.photoURL ?  (<img src={props.user.photoURL}></img>)
           :   (
            <img src="/images/user.svg"></img>

           )}          
 
            <span>{props.user.displayName}</span>
        </UserInfo>
{/* 
//here we set the value of textarea after changing throughstate */}
<Editor>
<textarea value={editorText} onChange={(e)=>setEditorText(e.target.value)} placeholder="What do you want to talk about?" 
autoFocus={true}>

</textarea>



{


assetArea==="image" ? (

<UploadImage>

<input type="file" accept="image/gif, image/jpeg, image/png, image/jpg"
name="image"
id="file"
style={{display:"none"}}

onChange={handleChange}
></input>

<p><label htmlFor="file"

>Select a Image to share</label></p>

{shareImage && <img src={URL.createObjectURL(shareImage)}></img>}
</UploadImage>

)
     :  (
     assetArea==="media"  &&  (

<>

<input type="text" placeholder="Please inout a video link"
value={videoLink}
onChange={(e)=>setVideoLink(e.target.value  )}
></input>

   {videoLink && (<ReactPlayer width={'100%'} url={videoLink}></ReactPlayer>)}
</>
     )
     )}
</Editor>




    </SharedContent>
    <SharedCreation>

<AttachAssets>

    <AssetButton onClick={()=>switchAssetArea("image")}>
        <img src="/images/share-image.png"></img>
    </AssetButton>
    <AssetButton onClick={()=>switchAssetArea("media")}>
        <img src="/images/share-video.png"></img>
    </AssetButton>

</AttachAssets>
<SharedComment>
<AssetButton>
        <img src="/images/share-comment.png"></img>
    Anyone
    </AssetButton>
</SharedComment>

<PostButton disabled={!editorText ? true : false}
 onClick={(event)=>postArticle(event)}>

Post
</PostButton>

    </SharedCreation>
</Content>
</Container>
}
</>

    );
};

const Container=styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0; 
z-index:99999;
background-color:rgba(0,0,0,.8);
animation: fadeIn .3s;
`;

const Content=styled.div`
width:100%;
max-width:552px;
background-color:white;
max-height:90%;
overflow:initial;
border-radius:5px;
position: relative;
display: flex;
flex-direction:column;
top:32px;
margin: 0 auto;

`;

const Header=styled.div`
display: block;
padding:10px 20px;
border-bottom:1px solid rgba(0,0,0,0.15);
line-height:1.5;
color:rgba(0,0,0,.6);
font-weight:400;
display:flex;
justify-content:space-between;
align-items:center;
button{
    height: 40px;
    width:40px;
    min-width:auto;
    color:rgba(0,0,0,.15);
}


img{
    height:30px;
    width:30px;
    pointer-events:none
}
`;

const SharedContent=styled.div`
display:flex;
flex-direction:column;
flex-grow:1;
overflow-y:auto;
vertical-align:baseline;
background:transparent;
padding:8px 12px;
`;

const UserInfo=styled.div`
display:flex;
align-items:center;
padding:12px 24px;
svg, img{
    width:48px;
    height:48px;
    background-clip:content-box;
    border:2px solid transparent;
    border-radius:50%;
}
span{
    font-weight:600;
    font-size:16px;
    line-height:1.5;
    margin-left:5px;
}
`;

const SharedCreation=styled.div`
display:flex;
justify-content:space-between;
padding:12px 24px 12px 16px;


`;

const AssetButton=styled.button`
display:flex;
align-items:center;
height:40px;
min-width:auto;
color:rgba(0,0,0,.5);
img{
    height:20px;

}
`;

const AttachAssets=styled.div`
align-items:center;
display:flex;
padding-right:8px;
${AssetButton}{
    width:40px;
}
`;

const SharedComment=styled.div`
padding-left:8px;
margin-right:auto;
border-left:1px solid rgba(0,0,0,.15);
${AssetButton}{
    img{
        margin-right:5px;

    }
}
`;


const PostButton=styled.button`
min-width:60px;
border-radius:20px;
padding-left:10px;
padding-right:16px;
background:${(props) => (props.disabled ? "rgba(0,0,0,.8)" : "#0a66c2")};
color:${(props)=> (props.disabled ? "rgba(1,1,1,.2)" : "white")};
&:hover{
    background: ${(props)=> (props.disabled ? "rgba(0,0,0,.08)" : "#004182")};
}
`;


const Editor=styled.div`
padding:12px 24px;
textarea{
    width:100%;
    min-height:100px;
    resize:none;
}
input{
    width:100%;
    height:35px;
    font-size:16px;
    margin-bottom:20px;
}
`;

const UploadImage=styled.div`
text-align:center;
img{
    width:100%;
}
`;


const mapStateToProps=(state)=>{
return {
    user:state.userState.user
}
}

const mapDispatchToProps=(dispatch)=>({
    postArticle:(payload)=> dispatch(postArticleAPI(payload)),
    
});


export default connect(mapStateToProps,mapDispatchToProps)(PostModel);