declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const svg: string;
  export default svg;
}
