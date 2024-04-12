import { Injectable } from '@angular/core';
import { Actor } from '../model/actor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

const URL: string = 'http://localhost:8080/api/actors';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  constructor(private http: HttpClient) {}

  getAllActors(): Observable<Actor[]> {
    return this.http.get(URL + '/') as Observable<Actor[]>;
  }

  // getActorById(id: number): Actor {
  //   let m: Actor = new Actor();
  //   for (const actor of this.actors) {
  //     if (actor.id == id) {
  //       m = actor;
  //     }
  //   }
  //   return m;
  // }

  // createActor(actor: Actor): Actor {
  //   this.actors.push(actor);
  //   return actor;
  // }

  // updateActor(actor: Actor): void {
  //   console.log('updateActor not yet implemented');
  // }

  // deleteActor(id: number): boolean {
  //   let success: boolean = false;
  //   let m: Actor = this.getActorById(id);
  //   if (m.id != 0) {
  //     let index: number = this.actors.indexOf(m);
  //     this.actors.splice(index, 1);
  //     success = true;
  //   } else {
  //     console.log('Error - actor id not found for id: ' + id);
  //   }

  //   return success;
  // }
}
