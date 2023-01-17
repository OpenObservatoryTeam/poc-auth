import { useMutation } from "react-query";
import client from "../client";

export type LoginBody = {username : string, password : string}

export const login = (json : LoginBody ) => client.post('auth/login', { json }).then(r => r.json<any>());

export type RegisterBody = {firstName : string, lastName : string, username : string, password : string, confirmPassword?: string}

export const register = (json : RegisterBody) => client.post('auth/signup', {json}).then(r => r.json<any>());