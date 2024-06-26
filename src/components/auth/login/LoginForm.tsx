import { useSignIn } from "@/components/shared/hooks/useAuth";
import { BaseFormErrors, BaseFormState } from "@/types/FormTypes";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginFormState, setLoginFormState] = useState<BaseFormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<BaseFormErrors>>({});
  const { mutate: signIn } = useSignIn();
  const navigate = useNavigate();

  const handleChange = (prop: keyof BaseFormState, value: string) => {
    setLoginFormState({ ...loginFormState, [prop]: value });
  };

  const validateForm = () => {
    const newErrors: Partial<BaseFormErrors> = {};
    if (!loginFormState.email) {
      newErrors.email = "이메일을 입력하세요.";
    }
    if (!loginFormState.password) {
      newErrors.password = "비밀번호를 입력하세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const { email, password } = loginFormState;
      signIn({ email, password });
      console.log("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(`로그인 도중 에러 발생: ${(error as Error).message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            이메일:
          </label>
          <input
            type="email"
            value={loginFormState.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs ">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            비밀번호:
          </label>
          <input
            type="password"
            value={loginFormState.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-xs ">{errors.password}</p>
          )}
          <div className="flex flex-col gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-center py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              로그인
            </button>

            <Link
              to={"/signup"}
              className="bg-green-500 hover:bg-green-700 text-white font-bold text-center py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
