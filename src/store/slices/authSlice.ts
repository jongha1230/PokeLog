import api from "@/api";
import { SignUpResponse, UserProfile } from "@/types/supabaseTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

export const signIn = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.auth.signIn(email, password);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signUp = createAsyncThunk<
  { signUpData: SignUpResponse; userData: UserProfile | null },
  { email: string; password: string; nickname: string },
  { rejectValue: string }
>("auth/signUp", async ({ email, password, nickname }, { rejectWithValue }) => {
  try {
    const response = await api.auth.signUp(email, password, nickname);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(
        signIn.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "알 수 없는 에러 발생";
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
