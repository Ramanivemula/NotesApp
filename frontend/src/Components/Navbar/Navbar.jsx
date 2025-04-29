import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Navbar = ({userInfo}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () =>{
    localStorage.clear();
    navigate("/login");
  }

  const handleSearch = () =>{}

  const onClearSearch= () => {
    setSearchQuery("");
  }

  return (
    <div className='bg-blue-100 flex items-center justify-between px-6 py2 drop-shadow-md'>
        <h2 className='text-2xl font-serif text-black px-4 py-4'>Notes</h2>

        <SearchBar value={searchQuery} onChange={({ target })=>{
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar