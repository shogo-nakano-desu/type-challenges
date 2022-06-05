/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise

  ### Question

  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have `Promise<ExampleType>` how to get ExampleType?

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */
// inferは何かの型を得るためのもので、T extends ... ? ... : ...の条件部分でのみ使用することができる。
// 以下の記事が参考になる。
// https://reosablo.hatenablog.jp/entry/2020/08/25/005957

// this is for new problem
// https://www.typescriptlang.org/play?ssl=18&ssc=115&pln=18&pc=1#code/PQKgUABBCMAcCcEC0ECCB3AhgSwC4FMATSZJM8kgIwE8IBZTAY23wCsIBlbAawHsAnTBAAUAAQC2TFqwDOPAZgCUEAMT5MM2ioAO-XuOwz8qygFdsAG1xJsAOxIkVTiAEVT+Gbmy97UEgEkAMwh0YwALTAA3YyFcam1jdDDsRjCIQxDBbQTCCDiEiAseYwAFPQMjADoIAAledBDjRkxbCABzfFwIWPjE5NT0mXTbOUJjXDDErJy83oB+CAAxAQh8AA9McW0LY2xg0IgI6IgAAzL9Q3wAHgBRDa2dgBVegD4Tw-q83nbOiDvN7b4Z4JOYOKAvCCPZJDACO7k83laGW0AgIuUC5TykwgAG0BNg2nZMBZuvwvIwdgBdYRhXC4bQyABcwGAY0ilVwvGAkkYcj4gmAmEIkRajCISHyHkY-Gw2ms63w-GYRhkSDhHi8PiQ0CQABYAKzcXXKGi4iRSNh8hTU2n0pkswkTUyUSqMfTci2yeSCRRgiAQgBqLAaPggAHE8DVnYzDnSGczgLgZKlKrJKgI2sA4PAwCBgGAC6AIAB9Utl8tliAATV4pn4EAAwrwxrVFcYKx3SxA8wXJfRqBgcGiro9VmsCLZCENzhVri1qC8IQBeSFjidTiAzy5XOyBRVoCELYSoNf4SfT8rb3f7gBCh4gN4gMdQyhjtnw0X4BbARc7HchGqNhoHgln+5bdvm2BbKiswFAA3n8cLEgANH8awJIwXQAL4QBi+gQAA5KIkpIKkxI7LYHQyMApheBYMgEb2vQQAAGhAK5bkYVyeDKlEvGAfZVuxm6XlxCGBCwFiEG+pjiJQ+5YfxfYAFrCZx1zqdxuC8W0EAAD4QLYsnyfwi5MQUzQqsJOIkHcGG4LcSEWFcdADlgeBEFcLEvKhPF2G0i7IbZ6H4JhjmmMSLluUOnlVj5EDiZJ0mGcZCmBcF9nhZFrmDh5hBXMp8V+ZR+kpXJirpZShbABAxGqus9lIIqehfn2zUrCuOXucORnlaZ34-iAoFgV2ix1hM+4cAQDLDSNEGDSQEIcBE-DGNQtb1jIvAWLRiJMrGdoJkmKZphmWYIIKIyhF+4IQEG+ANFtO2aiMMa2vGLLHWEqYyOm-CZtmwBPbtPgyIt9ACMYDYRBYFFUW9cb2omybfad-25vmYBAA
// type MyAwaited<T extends Promise<any>> = T extends Promise<infer A>
//   ? A extends Promise<infer B>
//     ? B
//     : A
//   : never;

type Awaited<T extends Promise<unknown>> = T extends Promise<infer U>
  ? U
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;

type cases = [
  Expect<Equal<Awaited<X>, string>>,
  Expect<Equal<Awaited<Y>, { field: number }>>
];

// @ts-expect-error
type error = Awaited<number>;
