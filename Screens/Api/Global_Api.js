import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = "https://cogniquest.arodek.com/api/mobile";
// const url = "http://10.0.2.126:3005/api/mobile";



export function signups(data) {
  // console.log("your_datasssss==>",data)
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/signUp", data);
}

export function logginss(data) {
  // console.log("your_datasssss==>",data)
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/login", data);
}

export const userDetails = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("232==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/userDetails", data);
}

export const namingTest = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("232==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/getResponse2", data);
}

export const attentionTest  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/getResponse4", data);
}

export const languageTest  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/getResponse5", data);
}

export const abstractionTest  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/getResponse6", data);
}

export const substractionTest  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/getResponse8", data);
}


export const testId  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/createTestId", data);
}


export const delayRecall  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/getResponse7", data);
}


export const getDrawing  = async (data) => {

  var  config = {headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
   }}
 
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  axios.defaults.headers.common["Authorization"] = toc;
  return axios.post(url + "/getResponse1", data, config);
}


export const preTest  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/checkUser", data);
}


export const reports  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/Reports", data);
}


export const graph  = async (data) => {
  // console.log("your_datasssss==>",data)
  const token = await AsyncStorage.getItem("token")
  // console.log("232==>", token)
  const toc = "Bearer " + token
  // console.log("23248==>", toc)
  axios.defaults.headers.common["Authorization"] = toc;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post(url + "/dailyGraph", data);
}