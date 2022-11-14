import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authTokenStorageKey = 'Authorization';

  public setAuthTokenMock(): void {
    const authTokenValue = this.generateAuthTokenValue();

    localStorage.setItem(this.authTokenStorageKey, authTokenValue);
  }

  public getAuthToken(): string {
    return localStorage.getItem(this.authTokenStorageKey) || ' ';
  }

  private generateAuthTokenValue(): string {
    return `Basic ${btoa('YURKOUSKIR:TEST_PASSWORD')}`;
  }
}
