import { useAuthStore } from "@/store/authStore";

export const authLoader = async () => {
  const user = useAuthStore.getState();
  if (!user) {
    // return redirect("/login");
    console.log("멍멍!");
  }
  return null;
};
