import { Injectable } from '@angular/core';
import { Note } from '../store';
import { ApiService } from './api';
import { StoreHelper } from './storehelper';
import 'rxjs/Rx';

@Injectable()
export class NoteService {
    path: string = '/notes';
    constructor(private apiService: ApiService,
    private storehelper: StoreHelper) {}

    createNote(note) {
        return this.apiService.post(this.path, note)
        .do(savedNote => this.storehelper.add('notes', savedNote));
    }

    getNotes() {
        return this.apiService.get(this.path)
        .do(res => this.storehelper.update('notes', res.date));
    }

    completeNote(note) {
        return this.apiService.delete(`${this.path}/${note.id}`)
        .do(res => this.storehelper.findAndDelete('notes', res.id));
    }
};