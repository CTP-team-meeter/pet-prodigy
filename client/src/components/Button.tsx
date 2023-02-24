import "./Button.css";
const Button = ({ title, width }: { title: string; width: number | undefined }) => {
  return <button style={{width: width}}>{title}</button>;
};

export default Button;
