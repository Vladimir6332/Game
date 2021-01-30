declare interface LogsProp {
  log: {
    typeMessage: string;
    message: number;
    id?: string;
  };
}

declare interface Logs {
  typeMessage: string;
  message: number;
  id?: string;
}

declare interface PropsNotCorrect {
  type: 'login' | 'signUp' | 'reset';
}
