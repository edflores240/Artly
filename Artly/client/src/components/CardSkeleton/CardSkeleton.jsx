import React from 'react';
import "./style.scss"
import {Skeleton, Space} from 'antd';
import { useState } from 'react';


export const ProfileSkeleton = () => {


  return (
    <>
    <Space style={{padding:'10px', background: "#010110", display:"flex", flexDirection:"column", width:"100%", height:"100vh"}}>
      <div className="cover" style={{width:"100%"}}>
        <Skeleton.Button active={true} style={{width:"98vw", height:"320px"}}/>
      </div>
      <Skeleton.Avatar active={true} size={'default'} shape={'circle'} style={{width:"200px", height:"200px",}} className='avatar-pic'/>
      <Skeleton.Button active={true} size={'default'} shape={'default'} block={false} style={{width:"200px", height:"30px",}} className='name-skeleton'/>
      <Skeleton.Button active={true} size={'default'} shape={'default'} block={false} style={{width:"150px", height:"20px",}} className='name-skeleton username'/>
    </Space>
    <Space>
      
    </Space>
    
  </>
  )

}


const CardSkeleton = () => {
  const [active, setActive] = useState(true);
  const [block, setBlock] = useState(false);
  const [size, setSize] = useState('default');
  const [buttonShape, setButtonShape] = useState('default');
  const [avatarShape, setAvatarShape] = useState('circle');

  return (
    <>
    <Space style={{padding:'10px'}}>
      <Skeleton.Avatar active={active} size={size} shape={avatarShape} style={{width:"50px", height:"50px",}}/>
      <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} style={{width:"200px", height:"20px",}}/>
    </Space>
    <Space>
      <Skeleton.Image active={active} style={{width:"300px", height:"320px"}}/>
      
    </Space>
    
  </>
  );
};
export default CardSkeleton;