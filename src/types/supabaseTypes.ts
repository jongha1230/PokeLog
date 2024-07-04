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

// Comments

export type CommentWithUser = Tables<"comments"> & {
  user: {
    nickname: string;
    profile_picture?: string | null;
  };
};
