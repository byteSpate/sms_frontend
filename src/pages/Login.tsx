import { Button, Row, Col, Card, Form, Input } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "noman12345",
    },
  });

  const [login, { error, isLoading, isError }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await login(data).unwrap();
      const token = res.data.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(
        setUser({
          user: user,
          token: token,
        })
      );
      navigate(`/${user?.userRole}/dashboard`);
      toast.success("Logged In", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("Something Went Wrong", {
        id: toastId,
        duration: 20000,
      });
    }
  };

  if (error) {
    return <p>Error Happen In Login Page</p>;
  }

  if (isLoading || isError) {
    return <p>Loading ... In Login Page</p>;
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card
          style={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "8px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <img
              src="/public/vite.svg" // Assuming your logo is here
              alt="Logo"
              style={{ width: "60px", marginBottom: "10px" }}
            />
            <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
              Welcome back
            </h2>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Glad to see you again 👋
            </p>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
              Login to your account below
            </p>
          </div>
          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Form.Item label="Email" style={{ textAlign: "left", marginBottom: "15px" }}>
              <Input
                placeholder="enter email..."
                {...register("id")}
                style={{ borderRadius: "4px", height: "40px" }}
              />
            </Form.Item>
            <Form.Item label="Password" style={{ textAlign: "left", marginBottom: "25px" }}>
              <Input.Password
                placeholder="enter password..."
                {...register("password")}
                style={{ borderRadius: "4px", height: "40px" }}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0" }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  borderRadius: "4px",
                  height: "45px",
                  fontSize: "16px",
                  backgroundColor: "#522580",
                  borderColor: "#522580",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
