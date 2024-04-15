import { Injectable } from '@angular/core';
import { Actor } from '../model/actor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL: string = 'http://localhost:8080/api/actors';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  constructor(private http: HttpClient) {}

  getAllActors(): Observable<Actor[]> {
    return this.http.get(URL + '/') as Observable<Actor[]>;
  }

  getActorById(id: number): Observable<Actor> {
    return this.http.get(URL + '/' +id) as Observable<Actor>;
  }

  createActor(actor: Actor): Observable<Actor> {
    return this.http.post(URL, actor) as Observable<Actor>;
  }

  updateActor(actor: Actor): Observable<Actor> {
    return this.http.put(URL+"/"+actor.id, actor) as Observable<Actor>;
  }

  deleteActor(id: number): Observable<boolean> {
    return this.http.delete(URL+"/"+id) as Observable<boolean>;
  }}
