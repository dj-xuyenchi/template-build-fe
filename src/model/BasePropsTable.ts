export type BaseTable = {
  handleExpandHeader?: (keys: string[], toCol: string) => void;
  expandedCols?: Record<string, boolean>;
};
