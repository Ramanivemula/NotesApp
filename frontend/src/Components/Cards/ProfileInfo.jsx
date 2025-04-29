import React from 'react'
import { getInitials } from '../../utilis/helper'

const ProfileInfo= ({ userInfo,onLogout }) => {
  return (
    <div className='flex items-center gap-5'>
        <div className='w-10 h-10  flex items-center justify-center rounded-full text-slate-950 font-medium bg-white'>
            {getInitials(userInfo?.fullName)}
        </div>

        <div>
            <p className='text-sm font-medium'>{userInfo?.fullName}</p>
            <button className='text-sm text-slate-700 underline' onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
    )
}

export default ProfileInfo 