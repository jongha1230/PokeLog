import { Session, User } from "@supabase/supabase-js";
import { Database, Tables } from "./supabase";

// Users
export type UserProfile = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type some = Tables<"users">;

export type SignUpResponse = {
  user: User | null;
  session: Session | null;
};

// Bookmarks
export type BookmarkRow = Database["public"]["Tables"]["bookmarks"]["Row"];
export type BookmarkInsert =
  Database["public"]["Tables"]["bookmarks"]["Insert"];
export type BookmarkUpdate =
  Database["public"]["Tables"]["bookmarks"]["Update"];

// Reviews
export type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
export type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"];
export type ReviewWithUser = Database["public"]["Tables"]["reviews"]["Row"] & {
  user: {
    nickname: string;
    profile_picture: string | null;
  };
};
