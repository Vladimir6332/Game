declare interface LogsProp {
  log: {
    typeMessage: string;
    message: number;
    id?: string;
  };
  isNewGame: boolean;
  isEsc: boolean;
}

declare interface Logs {
  typeMessage: string;
  message: number;
  id?: string;
}
