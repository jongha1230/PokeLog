import { useAuthStore } from "@/store/authStore";

export const authLoader = async () => {
  const user = useAuthStore.getState().user;
  if (!user) {
    // return redirect("/auth/login");
  }
  return null;
};
