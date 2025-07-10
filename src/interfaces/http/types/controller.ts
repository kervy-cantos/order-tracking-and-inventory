export interface ControllerResponse<T = unknown> {
  status: number;
  body: {
    message: string;
    data?: T;
    error?: boolean;
  };
}
