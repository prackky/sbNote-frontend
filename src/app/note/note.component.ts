import {
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import * as MarkdownIt from 'markdown-it';
import {
  Note
} from './note.model';

import {
  NoteService
} from '../core/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  newNote: Note = new Note();
  notes: Note[] = [];
  note: Note;
  noteForm: FormGroup;
  editNoteForm: FormGroup;
  previewTitle: string;
  previewContent: string;
  showOverlay = false;
  showDeleteModal = false;
  noteToDelete = {};
  noteToEdit = {
    editing: false
  };
  md = new MarkdownIt();

  constructor(private noteService: NoteService, private fb: FormBuilder, private elementRef: ElementRef) {
    this.createForm();
  }

  createForm() {
    this.noteForm = this.fb.group({
      'title': '',
      'content': ''
    });
    this.previewTitle = '';
    this.previewContent = '';
    this.subscribeChanges();
  }

  getNotes() {
    this.noteService.getAllNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  addNote(note) {
    console.log('adding note..');
    this.newNote = note;
    this.noteService.addNote(this.newNote).subscribe(notes => this.notes.push(notes));
  }

  editNote(note) {
    this.editNoteForm = this.fb.group({
      'title': note.title,
      'content': note.content
    });
    this.showOverlay = true;
    note.editing = true;
    this.noteToEdit = note;
    // Set focus to current note form textarea
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('.item__form textarea').focus();
    }, 0);

  }

  removeNote(note) {
    // console.log('Note ID to delete: ' + note.id);
    this.noteService.deleteNoteById(note.id).subscribe(response => {
      // console.log(response.status);
      if (response.status === 200) {
        this.notes.splice(this.notes.indexOf(note), 1);
      }
    });
    this.closeDeleteModal();
    this.noteToDelete = {};
    this.getNotes();
  }

  subscribeChanges() {
    this.noteForm.controls['title'].valueChanges.subscribe(value => {
      this.previewTitle = value;
    });
    this.noteForm.controls['content'].valueChanges.subscribe(value => {
      this.previewContent = this.parseMarkdown(value);
    });
  }

  openDeleteModal(note) {
    this.showOverlay = true;
    this.showDeleteModal = true;
    this.noteToDelete = note;
  }

  closeDeleteModal() {
    this.showOverlay = false;
    this.showDeleteModal = false;
  }

  parseMarkdown(content) {
    return this.md.render(content);
  }

  ngOnInit() {
    this.getNotes();
    this.subscribeChanges();
  }

  onSubmit(value: any): void {
    this.addNote(value);
    this.createForm();
  }

  onEditSubmit(note: any, value: any): void {
    note.editing = false;
    delete note.editing;
    this.noteService.updateNoteById(note.id, value);
    this.showOverlay = false;
  }

  abortOverlay() {
    this.closeDeleteModal();
    this.noteToEdit.editing = false;
  }

}
