export interface ControllerResponse<T = unknown> {
  status: number;
  body: {
    message: string;
    data?: T;
    error?: boolean;
    total?: number;
    totalPages?: number;
    resultCount?: number;
    limit?: number;
    page?: number;
  };
}
