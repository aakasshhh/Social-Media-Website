import Info from './ProfileComponents/InfoProfile/Info'
import UserHome from '../UserHome/UserHome'

import Profile from "../../assets/profile.jpg"
import img1 from "../../assets/User-post/img1.jpg"
import img2 from "../../assets/User-post/img2.jpg"
import img3 from "../../assets/User-post/img3.jpg"
import { useEffect, useState } from 'react'
import "../Profile/ProfileMiddle.css"

import moment from 'moment'
import ProfileInputPost from './ProfileComponents/ProfileInputPost'

const ProfileMiddle = ({following,
                        search,
                        images,
                        setImages,
                        profileImg,
                        setProfileImg,
                        name,
                        setName,
                        userName,
                        setUserName,
                        modelDetails,
                        setModelDetails}) => {

  const [userPostData ,setUserPostData] =useState(
    [
      {
        id:1,
        username:"Sam",
        profilepicture:Profile,
        img:img1,
        datetime:moment("20230401", "YYYYMMDD").fromNow(),
        body:"Defying odds and redefining the game.",
        like: 22,
        comment:12
    },
    {
        id:2,
        username:"Sam",
        profilepicture:Profile,
        img:img2,
        datetime:moment("20230525", "YYYYMMDD").fromNow(),
        body:"Strength is earned, not given.",
        like: 84,
        comment:30
    },
    {
        id:3,
        username:"Sam",
        profilepicture:Profile,
        img:img3,
        datetime:moment.utc("2023-08-13 12:45:00").local().startOf('seconds').fromNow(),
        body:"In the pursuit of strength, persistence prevails.",
        like: 340,
        comment:76
    }
    ]
  )
  const [body,setBody] =useState("")
  const [importFile,setImportFile] =useState("")
  
 

  const handleSubmit =(e)=>{
    e.preventDefault()

  
    const id =userPostData.length ? userPostData[userPostData.length -1].id +1 :1
    const username="Sam"
    const profilepicture=Profile
    const datetime=moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()
    const img= images ? {img:URL.createObjectURL(images)} : null

   
    const obj ={id:id,
               profilepicture:profilepicture,
               username:username,
               datetime:datetime,
               img:img && (img.img),
               body:body,
               like:0,
               comment:0
              }

    const insert =[...userPostData,obj]
    setUserPostData(insert)
    setBody("")
    setImages(null)
  }


  

  const [searchResults,setSearchResults] =useState("")
    
    useEffect(()=>{
      const searchData = userPostData.filter((val)=>(
        (val.body.toLowerCase().includes(search.toLowerCase()))
       ||
       (val.username.toLowerCase().includes(search.toLowerCase()))
       ))
       setSearchResults(searchData)
       
    },[userPostData,search])

   

    

  return (
    <div className='profileMiddle'>
        <Info 
        modelDetails ={modelDetails}
        setModelDetails={setModelDetails}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        userPostData={userPostData}
        following={following}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        />
        
        <ProfileInputPost
        modelDetails={modelDetails}
        profileImg={profileImg}
        handleSubmit={handleSubmit}
        body ={body}
        setBody ={setBody}
        importFile ={importFile}
        setImportFile ={setImportFile}
        images={images}
        setImages={setImages}
        />
        
        <UserHome 
        modelDetails={modelDetails}
        profileImg={profileImg}
        setUserPostData={setUserPostData}
        userPostData={searchResults}
        images={images}
        />
    </div>
  )
}

export default ProfileMiddle