import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row>
        <Col>
          <Card style={{ width: "400px" }} className="shadow p-4">

            <Card.Body>

              <h3 className="text-center mb-4">LMS Login</h3>

              <Form>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                  />
                </Form.Group>

                {/* Forgot Password */}
                <div className="text-end mb-3">
                  <small style={{ color: "blue", cursor: "pointer" }}>
                    Forgot Password?
                  </small>
                </div>

                {/* Login Button */}
                <Button
                  variant="primary"
                  className="w-100"
                >
                  Login
                </Button>

                {/* Register Redirect */}
                <div className="text-center mt-3">
                  Don't have an account?{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
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

export default Login;