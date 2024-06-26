import { signUp } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/store";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface SignUpFormState {
  email: string;
  password: string;
  nickname: string;
}

interface SignUpFormErrors {
  email: string;
  password: string;
  nickname: string;
}

const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [signUpFormState, setSignUpFormState] = useState<SignUpFormState>({
    email: "",
    password: "",
    nickname: "",
  });
  const [errors, setErrors] = useState<Partial<SignUpFormErrors>>({});

  const handleChange = (prop: keyof SignUpFormState, value: string) => {
    setSignUpFormState({ ...signUpFormState, [prop]: value });
  };

  const validateForm = () => {
    const newErrors: Partial<SignUpFormErrors> = {};
    if (!signUpFormState.email) {
      newErrors.email = "이메일을 입력하세요.";
    }
    if (!signUpFormState.password) {
      newErrors.password = "비밀번호를 입력하세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const { email, password, nickname } = signUpFormState;
      dispatch(signUp({ email, password, nickname }));
      console.log("회원가입 성공");
    } catch (error) {
      console.error(`회원가입 도중 에러 발생 ${(error as Error).message}`);
    }
  };
  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            이메일:
          </label>
          <input
            type="email"
            value={signUpFormState.email}
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
            value={signUpFormState.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs ">{errors.password}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            닉네임:
          </label>
          <input
            type="nickname"
            value={signUpFormState.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        {errors.nickname && (
          <p className="text-red-500 text-xs ">{errors.nickname}</p>
        )}
        <div className="flex flex-col gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-center py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            회원가입
          </button>

          <Link
            to={"/"}
            className="bg-green-500 hover:bg-green-700 text-white font-bold text-center py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
