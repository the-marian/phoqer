export type MediaTypes = 'base' | 'sm' | 'md' | 'lg';

export type MediaProp<T> =
    | T
    | {
          base: T;
          sm?: T;
          md?: T;
          lg?: T;
      };
