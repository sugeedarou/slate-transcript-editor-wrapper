import Cookies from 'js-cookie';

const USER_COOKIES_KEY = "token";
const EMAIL_COOKIES_KEY = "email";
const TASK_ID_COOKIES_KEY = "t_id";

export function isAuth()
{
   let cookie = Cookies.get(USER_COOKIES_KEY)
   if(cookie)
        return true
    return false

}

export function getToken()
{
   let cookie = Cookies.get(USER_COOKIES_KEY)
   if(cookie)
        return cookie
    return false

}

export function getEmail()
{
   let cookie = Cookies.get(EMAIL_COOKIES_KEY)
   if(cookie)
        return cookie
    return false

}

export function unAuth()
{
    Cookies.remove(USER_COOKIES_KEY);
    Cookies.remove(EMAIL_COOKIES_KEY);
}

export function auth(token,email)
{
    Cookies.set(USER_COOKIES_KEY, token);
    Cookies.set(EMAIL_COOKIES_KEY, email);
}

export function setTaskId(task_id)
{
    Cookies.set(TASK_ID_COOKIES_KEY, task_id);
}

export function getTaskId()
{
   let cookie = Cookies.get(TASK_ID_COOKIES_KEY)
   if(cookie)
        return cookie
    return ""

}