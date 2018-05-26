import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from './note/note.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {

  constructor() {}

/*  private noteUrl = 'https://sb-note-app-pracky.c9users.io:8080';

  public getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.noteUrl + '/note');
  }*/

}