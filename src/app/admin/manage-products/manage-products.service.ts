import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { map, switchMap } from 'rxjs/operators';
import { ApiResponse } from 'src/api/api-response';
import { AuthService } from 'src/app/core/auth/auth-service';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector, private readonly authService: AuthService) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'import');
    const authToken = this.authService.getAuthToken();

    return this.http
      .get<ApiResponse<string>>(url, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: authToken,
        },
        params: {
          name: fileName,
        },
      })
      .pipe(map((response) => response.data));
  }
}
