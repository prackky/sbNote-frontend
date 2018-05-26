import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {appConfig} from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../note/note.model';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // Placeholder for notes
  notes: Note[] = [];
  note: Note;

  constructor(private http: HttpClient) {
  }

  addNote(note: Note): Observable<Note> {
    console.log('adding note from service...');
    // console.log(note);
    return this.http.post<Note>(appConfig.apiUrl + '/api/notes', note);
    }

  deleteNoteById(id: number): Observable<any> {
    // console.log('delete request sent');
    // console.log('URL: ' + '/api/notes/' + id);
      return this.http.delete<any>(appConfig.apiUrl + '/api/notes/' + id, {observe: 'response'});
    }

  updateNoteById(id: number, values: Object = {}): Observable<any> {
      return this.http.put<any>(appConfig.apiUrl + '/api/notes/' + id, values);
    }

  getAllNotes(): Observable<Array<Note>> {
      return this.http.get<Array<Note>>(appConfig.apiUrl + '/api/notes/');
    }

  getNoteById(id: number): Observable<any> {
      return this.http.get<any>(appConfig.apiUrl + '/api/notes/' + id);
    }

}
