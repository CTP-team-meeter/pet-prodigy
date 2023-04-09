import "./Button.css";
/*
This is a functional React component called "Button" that takes three props:
1. "title": A string that represents the text that will be displayed on the button.
2. "width" (optional): A number that represents the width of the button.
3. "transparent" (optional): A boolean value that determines whether the button should have a transparent background or not.

The component returns a button element with the specified text and width, and sets the "data-transparent" attribute
to the value of the "transparent" prop, if it's provided. If the "transparent" prop is not provided, the button will not
have the "data-transparent" attribute. The component also applies CSS styles to the button using a separate CSS file
imported at the top of the component.
 */
const Button = ({
  title,
  width,
  transparent,
  onclick,
  className,
  size,
}: {
  title: string;
  width?: string | number;
  transparent?: boolean;
  size?: "sm" | "md" | "lg";
  onclick?: any;
  className?: any;
}) => {
  // set css properties that are generally applied 
  let styleObj: React.CSSProperties = { 
    width: width,
  };
  if (size === "lg") {
    styleObj = {
      ...styleObj,
      padding: "8px 39px",
      fontSize: "18px",
    };
  } else if (size === "sm") {
    styleObj = {
      ...styleObj,
      padding: "2px 24px",
      fontSize: "12px",
    };
  }

  return (
    <button
      className={`button ${className}`}
      onClick={onclick}
      data-transparent={transparent}
      style={styleObj}
    >
      {title}
    </button>
  );
};

export default Button;
