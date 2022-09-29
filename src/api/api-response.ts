import { Initializable } from 'src/common/initializable';

export class ApiResponse<T> extends Initializable<ApiResponse<T>> {
  public data: T;
}
