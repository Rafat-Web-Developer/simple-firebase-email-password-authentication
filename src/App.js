import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase.init";

const auth = getAuth(app);

function App() {
  const [registered, setRegistered] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisteredCheck = (e) => {
    setRegistered(e.target.checked);
  };

  const handleEmailField = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordField = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError(
        "Provide a valid password (Must contain at least one special character"
      );
      return;
    }
    setError("");

    if (validated) {
      if (registered) {
        signInWithEmailAndPassword(auth, email, password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            setError(error.message);
            console.log(error);
          });
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            setError(error.message);
            console.log(error);
          });
      }
    }
  };

  return (
    <div>
      <div className="w-50 mx-auto mt-5">
        <h1 className="text-primary">
          Please {registered ? "Login" : "Register"}
        </h1>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailField}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordField}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegisteredCheck}
              type="checkbox"
              label="Already Register?"
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
