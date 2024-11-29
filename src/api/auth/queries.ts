import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import type { AddUserModel, LoginPayload, LoginResponse } from "./types"

import authServices from "./services"

export const loginMutation = {
	useMutation: (
		opt?: UseMutationOptions<LoginResponse, Error, LoginPayload, void>
	) =>
		useMutation({
			mutationKey: ["login"],
			mutationFn: (payload: LoginPayload) => authServices.login(payload), // Pass the payload to the login function
			...opt, // additional options
		}),
}

export const addNewUser={
	useMutation:(opt?:UseMutationOptions<any,Error,AddUserModel,any>)=>{
		return useMutation({
			mutationKey:['addUser'],
			mutationFn:(payload:AddUserModel)=>authServices.addNewUser(payload),
			...opt,
		})
	}
}
