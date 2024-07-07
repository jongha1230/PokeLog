import api from "@/api";
import { useSignIn } from "@/components/shared/hooks/useAuth";
import { BaseFormErrors, BaseFormState } from "@/types/FormTypes";
import { Provider } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";
import { FcGoogle, FcUndo } from "react-icons/fc";
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

  const handleSocialSignIn = async (e: FormEvent, provider: Provider) => {
    e.preventDefault();
    try {
      const { data, error } = await api.auth.signInWithOAuth(provider);
      if (error) throw error;
      if (!data) {
        console.error("No data returned from social login");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(`로그인 도중 에러 발생: ${(error as Error).message}`);
      // 사용자에게 오류 메시지 표시
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
              to={"/auth/signup"}
              className="bg-green-500 hover:bg-green-700 text-white font-bold text-center py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              회원가입
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-4 bg-gray-600 hover:bg-gray-700 text-white font-bold text-center py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              <span className="icon">
                <FcUndo
                  aria-label="undo button"
                  className="cursor-pointer border rounded-full p-1 hover:brightness-90"
                  size="30"
                />
              </span>
              <p>홈으로 돌아가기</p>
            </Link>
          </div>
        </div>
      </form>
      <button
        onClick={(e) => handleSocialSignIn(e, "google" as Provider)}
        className=" border hover:hover:brightness-90 flex items-center justify-center gap-4 text-center py-2 rounded focus:outline-none focus:shadow-outline w-full mt-4"
      >
        <span className="icon">
          <FcGoogle
            aria-label="google login"
            className="cursor-pointer border rounded-full p-1 hover:brightness-90"
            size="30"
          />
        </span>
        <p>Google로 로그인하기</p>
      </button>
      <button
        onClick={(e) => handleSocialSignIn(e, "kakao" as Provider)}
        className="border bg-yellow-400 hover:hover:brightness-90 flex items-center justify-center gap-4 text-center py-2 rounded focus:outline-none focus:shadow-outline w-full mt-4"
      >
        <span className="icon">
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
            alt="카카오 로그인"
            className="cursor-pointer border bg-white rounded-full p-1 hover:brightness-90"
            width="30"
            height="30"
          />
        </span>
        <p>카카오로 로그인하기</p>
      </button>
    </div>
  );
};

export default LoginForm;
