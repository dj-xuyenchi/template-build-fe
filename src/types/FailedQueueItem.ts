export interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}
