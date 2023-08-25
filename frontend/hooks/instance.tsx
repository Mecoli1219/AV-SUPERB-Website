import axios, { AxiosInstance, AxiosResponse } from "axios"
import { useState, useEffect } from "react";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();
export const BACKEND_URL = publicRuntimeConfig.BACKEND_URL;

// Create an instance of Axios with a default base URL
const instance: AxiosInstance = axios.create({
    baseURL: BACKEND_URL,
});

export default instance;
