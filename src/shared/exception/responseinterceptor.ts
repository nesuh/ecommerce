import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  message: string;
  success: boolean;
  result: any;
  error: null;
  timestamps: Date;
  statusCode: number;
  path: string;
}

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T, Response<T>> {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const path = context.switchToHttp().getRequest().url;

    return next.handle().pipe(
      map((data: any) => ({
        message: data?.message || 'Operation successful',
        success: data?.success ?? true, // Defaults to true if undefined
        result: data?.result || data, // If no result, return the entire data
        timestamps: new Date(),
        statusCode,
        path,
        error: null, // Assuming there's no error
      })),
    );
  }
}
