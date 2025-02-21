import * as React from "react";
import styles from "./Input.module.scss";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`${styles.input} ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

// import React from "react";
// import Button from "./Button";
// import Input from "./Input";

// const App = () => {
//   return (
//     <div>
//       <Input type="text" placeholder="Enter your name" />
//       <Input type="email" placeholder="Enter your email" />
//       <Button variant="primary">Submit</Button>
//     </div>
//   );
// };

// export default App;