import { useAuthStore } from "@/store/authStore";
import { redirect } from "react-router";

export const authLoader = async () => {
  const user = useAuthStore.getState();
  if (!user) {
    return redirect("/login");
  }
  return null;
};
