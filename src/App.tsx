import React, { useState } from 'react';
import './App.css'

/* Creating a new type, provides good intellisense. */
type Note = {
  id: number;
  title: string;
  content: string;
};


const App = () => {
  /* Creating a state: component-specific memory*/
  const [notes, setNotes] = useState<Note[]>
  ([
    {
      id: 1,
      title: "Note Title 1",
      content: "Content for note 1",
    },
    {
      id: 2,
      title: "Note Title 2",
      content: "Content for note 2",
    },
    {
      id: 3,
      title: "Note Title 3",
      content: "Content for note 3",
    },
    {
      id: 4,
      title: "Note Title 4",
      content: "Content for note 4",
    },
  ]);

  /* We have 2 bits of data to store we create 2 states. */
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  /* A note will not always be selected so null needs to be an option. */
  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.title);
  };


  /* The function takes in the even as a param, we state that it is of type FormEvent. */
  const handleAddNote = (
    event: React.FormEvent
  ) => {
    /* Prevents the app from POSTing and reloading the page. */
    event.preventDefault();

    /* Creating a new Note with the data in form. */
    const newNote: Note = {
      id: notes.length + 1,
      title,
      content
    }

    /* Add new Note and copy others into array. */
    setNotes([newNote, ...notes]);
    /* Clear form. */
    setTitle('');
    setContent('');
  };

  const handleUpdateNote = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title,
      content
    };

    /* Update the data in the array. */
    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    )

    setNotes(updatedNotesList);
    setTitle('');
    setContent('');
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
  }

  const deleteNote = (
    event: React.MouseEvent,
     noteId: number
  ) => {
    /* This stops other actions happening in this case it is needed because
    * it is nested onClick due to the note being clickable.
    */
    event.stopPropagation();

    const updatedNotes = notes.filter(
      (note) => note.id !== noteId
    );

    setNotes(updatedNotes);
  };

  return (
  <div className ="app-container">
    <form className="note-form"
          onSubmit={(event) => 
            selectedNote 
            ? handleUpdateNote(event) 
            : handleAddNote(event)
          }
    >
      <input
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        } 
        placeholder='Title'
        required></input>
      <textarea
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        } 
        placeholder='Content'
        rows={10}
        required
      ></textarea>
        {selectedNote ? (
          <div className='edit-buttons'>
            <button type='submit'> Save</button>
            <button
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ): (
        <button type='submit'>
          Add Note
        </button>)}
    </form>
    <div className='notes-grid'>
      {notes.map((note) => (
        <div className='note-item'
          onClick={() => handleNoteClick(note)}
        >
        <div className='notes-header'>
          <button onClick={(event) =>
            deleteNote(event, note.id)
            }
          >
            x
          </button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
      ))}
    </div>
  </div>)
}

export default App;