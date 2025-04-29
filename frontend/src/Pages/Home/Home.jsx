import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import NoteCard from '../../Components/Cards/NoteCard'
import { MdAdd } from "react-icons/md"
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstances from '../../utilis/axiosInstances'
import Toast from '../../Components/ToastMessage/Toast'


const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type:"add",
    data: null,
  })

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false, message:"",type:"add",
  })

  const [allNotes,setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) =>{
    setOpenAddEditModal({ isShown: true,data: noteDetails, type: "edit"});
  }

  const showToastMessage = (message,type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: true,
      message:""
    })
  }

  //Get User Info
  const getUserInfo = async () =>{
    try {
      const response = await axiosInstances.get("/get-user");
      
      console.log("Respnse data: ", response.data);
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");        
      }
    }
  }

  //Get all Notes API
  const getAllNotes = async() => {
    try {
      const response = await axiosInstances.get("/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error")
    }
  }

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const response = await axiosInstances.delete("/delete-note/"+ noteId);

      if(response.data && response.data.error){
          showToastMessage("Note Deleted Successfully!!", 'delete')
          getAllNotes();
      }
  } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
      }{
        console.log("Unexpected error")
      }
  }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, [])
  
  return (
    <>
    <Navbar userInfo={userInfo}/>
    <div className='container mx-auto'>
    <div className='grid grid-cols-3 gap-4 mt-8'>
  {allNotes.map((item, index) => (
    <NoteCard 
      key={item._id}
      title={item.title}
      date={item.createdOn}
      content={item.content} 
      tags={item.tags} 
      isPinned={item.isPinned}
      onEdit={() => handleEdit(item)}
      onDelete={() => deleteNote(item)}
      onPinNote={() => {}}
    />
  ))}
</div>

    </div>

    <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-900 absolute right-10 bottom-10"  
      onClick={() => {
        setOpenAddEditModal({isShown:true , type: "add", data:null});
    }}>
      <MdAdd className="text-[32px] text-white"/>
    </button>

    <Modal 
      isOpen = { openAddEditModal.isShown}
      onRequestClose={() =>{}}
      style= {{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
    >
    <AddEditNotes 
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={() => {
        setOpenAddEditModal({ isShown: false, type: "add", data: null }) 
      }}
      getAllNotes ={getAllNotes}
      showToastMessage ={showToastMessage}
    />
    </Modal>
    <Toast isShown={showToastMsg.isShown}
           message = {showToastMsg.message}
           type={showToastMsg.type}
           onClose={handleCloseToast}
    />
    </>
  )
}

export default Home