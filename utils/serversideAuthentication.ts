import { checkAuthentication } from '../api_service/auth';
import { setAuth } from '../redux/slice/authSlice';

export const checkServerSideAuth = async (ctx: any, store: any) => {
  const cookies = ctx.req?.headers.cookie;
  console.log("....",cookies)
  try {
    const getAuth = await checkAuthentication(cookies);
    if (getAuth?.status === 201) {
      store.dispatch(setAuth(getAuth.data));
    }
  } catch (error) {}
}

export const clientSideAuth = async (dispatch: any) => {
  try {
    const getAuth = await checkAuthentication("");
    if (getAuth?.status === 201) {
      dispatch(setAuth(getAuth.data));
    }
  } catch (error) {}
}