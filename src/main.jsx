import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [], // Tableau de notes
      selectedNote: null, // Note actuellement sélectionnée
      newNoteTitle: "", // Titre de la nouvelle note
      newNoteContent: "", // Contenu de la nouvelle note en markdown
    };
  }

  //mettre à jour le contenu du titre d'une note
  handlNewNoteTitle = (e) => {
    this.state({ newNoteTitle: e.target.value });
  };
  //mettre à jour le contenu d'une note
  handlNewNoteContent = (e) => {
    this.state({ newNoteContent: e.target.value });
  };
  // Sélectionner une note
  selectNote = (note) => {
    this.setState({
      selectedNote: note,
      newNoteTitle: note.title,
      newNoteContent: note.content,
    });
  };

  createNewNote = () => {
    const { newNoteTitle, newNoteContent } = this.state;

    if (newNoteTitle || newNoteContent) {
      const newNote = {
        title: newNoteTitle,
        content: newNoteContent,
      };

      this.setState(
        {
          notes: [...this.state.notes, newNote],
          newNoteTitle: "",
          newNoteContent: "",
        },
        () => {
          localStorage.setItem("notes", JSON.stringify(this.state.notes));
        }
      );
    } else {
      // Réinitialise le titre et le contenu à des chaînes vides
      this.setState({
        newNoteTitle: "",
        newNoteContent: "",
      });
    }
  };

  // Méthode pour sauvegarder une note
  saveNote = () => {
    const { notes, selectedNote, newNoteTitle, newNoteContent } = this.state;

    if (selectedNote) {
      // Si une note est sélectionnée, alors c'est une modification
      const updatedNotes = notes.map((note) => {
        if (note === selectedNote) {
          return { ...note, title: newNoteTitle, content: newNoteContent };
        }
        return note;
      });

      this.setState(
        {
          notes: updatedNotes,
          selectedNote: null, // Désélectionnez la note après la sauvegarde
        },
        () => {
          localStorage.setItem("notes", JSON.stringify(updatedNotes));
        }
      );
    }
  };

  render() {
    const { notes, selectedNote, newNoteTitle, newNoteContent } = this.state;
    return (
      <div className="container">
        <div className="left-column">
          <div className="col-note">
            <button className="button" onClick={this.createNewNote}>
              Ajouter une note
            </button>
          </div>
          <div>
            <h1>Liste des notes</h1>
            <ul>
              {notes.map((note, index) => (
                <li key={index} onClick={() => this.selectNote(note)}>
                  <strong>{note.title}</strong>
                  <br />
                  {note.content.substring(0, 15)}...
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right-column">
          <div className="previous-note">
            {selectedNote && (
              <h1>
                <strong>Title:</strong> {selectedNote.title}
              </h1>
            )}
            {selectedNote && (
              <p>
                <strong>Content:</strong> {selectedNote.content}
              </p>
            )}
          </div>
          <div>
            <h1>Nouvelle Note</h1>
            <textarea
              className="input-title"
              placeholder="Ecris le titre de ta note ici ..."
              value={newNoteTitle}
              onChange={(e) => this.setState({ newNoteTitle: e.target.value })}
            />
          </div>
          <div>
            <textarea
              className="input-form"
              placeholder="Ecris le contenu de la note ici ..."
              value={newNoteContent}
              onChange={(e) =>
                this.setState({ newNoteContent: e.target.value })
              }
            />
          </div>
          <div>
            <button className="button" onClick={this.saveNote}>
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
