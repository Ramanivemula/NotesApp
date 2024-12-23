import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Card, CardContent, CardActions, Button, Fab } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const NotesAppHome = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'First Note', description: 'This is the description of the first note' },
    { id: 2, title: 'Second Note', description: 'This is the description of the second note' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', description: '' });

  const handleAddNote = () => {
    if (newNote.title && newNote.description) {
      setNotes([...notes, { id: Date.now(), ...newNote }]);
      setNewNote({ title: '', description: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNewNote(noteToEdit);
    setIsModalOpen(true);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: "none", borderBottom: "1px solid #ccc" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color:"#333" }}>
            NotesApp
          </Typography>
          <Avatar sx={{ bgcolor: 'orange' }}>U</Avatar>
        </Toolbar>
      </AppBar>

      {/* Notes List */}
      <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {notes.map((note) => (
          <Card key={note.id} sx={{ width: '300px' ,boxShadow: "none", border: "1px solid #ccc", borderRadius:"0.4rem" }}>
            <CardContent>
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {note.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" startIcon={<Edit />} onClick={() => handleEditNote(note.id)}>
                Edit
              </Button>
              <Button size="small" color="error" startIcon={<Delete />} onClick={() => handleDeleteNote(note.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      {/* Add Note Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsModalOpen(true)}
      >
        <Add />
      </Fab>

      {/* Add/Edit Note Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" marginBottom={2}>
            {newNote.id ? 'Edit Note' : 'Add Note'}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            value={newNote.description}
            onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAddNote}
          >
            {newNote.id ? 'Update Note' : 'Add Note'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default NotesAppHome;
