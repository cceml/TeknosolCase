import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Il, Ilce } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ilUrl = 'assets/model/iller.json';
  private ilceUrl = 'assets/model/ilceler.json';

  constructor(private http: HttpClient) { }

  getIl(): Observable<Il[]> {
    return this.http.get<Il[]>(this.ilUrl);
  }

  getIlce(): Observable<Ilce[]> {
    return this.http.get<Ilce[]>(this.ilceUrl);
  }
}
