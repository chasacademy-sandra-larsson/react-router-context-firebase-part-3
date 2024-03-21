import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import  {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase-config";




function SignUpForm() {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();


  const formSubmit = (data) => {
    console.log("Form Submitted: ", data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
        // Redirect to a new page after successful form submission
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    
    
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit">Register</button>
      <Link to="/signin">Already have an account? Sign In</Link>

    </form>
  );
}

export default SignUpForm;