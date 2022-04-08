import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailField = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordField = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Email = ", email);
    console.log("Password = ", password);
  };

  return (
    <div>
      <div className="w-50 mx-auto mt-5">
        <h1 className="text-primary">Registration Page</h1>
        <Form onSubmit={handleFormSubmit}>
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
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordField}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
