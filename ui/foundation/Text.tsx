type Props = {
    value: string;
  };
  
  export function Text({ value }: Props) {
    return <span>{value}</span>;
  }
  