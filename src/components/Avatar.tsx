import React from 'react';
import type { Employee } from '../data/seed';
import { getAvatar, initials } from '../data/seed';
  
interface AvatarProps {  
  emp: Employee;  
  size?: number;  
}  
  
const Avatar: React.FC<AvatarProps> = ({ emp, size = 34 }) => {  
  return (  
    <div  
      className="avatar"  
      style={{  
        width: size,  
        height: size,  
        background: getAvatar(emp),  
        fontSize: size > 40 ? 14 : 11  
      }}  
    >  
      {initials(emp.name)}  
    </div>  
  );  
};  
  
export default Avatar; 
