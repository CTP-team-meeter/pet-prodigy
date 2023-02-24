import "./Button.css";
const Button = ({ title, width }: { title: string; width?: number }) => {
  return <button style={{width: width}}>{title}</button>;
};

export default Button;
