import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/v1/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST"
      })
    }),
    confirmAccount: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/confirm-account`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
    changeMarks: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/change-marks`,
        method: "POST",
        body: data,
      }),
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-account`,
        method: "PUT",
        body: data,
      }),
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/avatar`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useConfirmAccountMutation, useForgotPasswordMutation, useResetPasswordMutation, useChangeMarksMutation, useUpdateAccountMutation, useUpdateAvatarMutation } = usersApiSlice;
