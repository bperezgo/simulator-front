export type TitleProps = {
  value: string;
};

export function Title({ value }: TitleProps) {
  return <h2>{value}</h2>;
}
