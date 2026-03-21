import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Register Data:", form);

    alert("Registered Successfully!");
    navigate("/login");
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">

      <Row>
        <Col>
          <Card style={{ width: "400px" }} className="shadow p-3">

            <Card.Body>
              <h3 className="text-center mb-4">Register</h3>

              <Form onSubmit={handleSubmit}>

                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Phone */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Role */}
                <Form.Group className="mb-3">
                  <Form.Select
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="student">Student</option>
                    <option value="counselor">Counselor</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                {/* Button */}
                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>

                {/* Footer */}
                <div className="text-center mt-3">
                  Already have an account?{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </div>

              </Form>
            </Card.Body>

          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default Register;