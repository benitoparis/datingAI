import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VirtualProfile } from '../models/virtualProfile.model';

@Injectable({
  providedIn: 'root',
})
export class LLMEndpointService {
  private apiUrl = 'http://localhost:5173/api/v1/llm-call';

  constructor(private http: HttpClient) {}

  postData(body: {
    msg: string;
    virtualProfile: VirtualProfile;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
