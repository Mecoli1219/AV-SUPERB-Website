import streamlit as st
from httpx_oauth.clients.google import GoogleOAuth2
import asyncio
from streamlit_js_eval import get_cookie, set_cookie
import json, time

client_id = st.secrets["login_service"]['client_id']
client_secret = st.secrets["login_service"]['client_secret']

async def write_authorization_url(client,
                                  redirect_uri):
    authorization_url = await client.get_authorization_url(
        redirect_uri,
        scope=["profile", "email"],
    )
    return authorization_url

async def write_access_token(client,
                             redirect_uri,
                             code):
    token = await client.get_access_token(code, redirect_uri)
    return token

async def refresh_token(client,
                        token):
    token = await client.refresh_token(token)
    return token

async def get_email(client,
                    token):
    user_id, user_email = await client.get_id_email(token)
    return user_id, user_email

def prompt_login(client, redirect_uri):

    with open("styles.css")as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html = True)

    authorization_url = asyncio.run(write_authorization_url(client, redirect_uri))
    st.sidebar.markdown(f'''
        <a href="{authorization_url}" class="login-btn" style="text-decoration:none;" target="_self">
            <img id="google" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                alt="Google"
                style="width:50px;height:50px;">
            <div class="btn-text">
                Login with Google
            </div>
        </a> 
        ''', unsafe_allow_html=True)

def get_code():
    code = st.experimental_get_query_params()['code'][0]
    return code

def get_client():
    client = GoogleOAuth2(client_id, client_secret)
    return client

def is_expired(token):
    if "expires_at" not in token:
        return False
    return time.time() > token["expires_at"]

def get_token_from_google(client, redirect_uri):
    code = get_code()
    token = asyncio.run(
        write_access_token(client=client,
                           redirect_uri=redirect_uri,
                           code=code))
    return token

def get_token(client, redirect_uri):
    if 'token' not in st.session_state:
        st.session_state.token = None
    if st.session_state.token is None:
        # Using cookie first
        # try:
        #     cookie = get_cookie(name="token")
        #     time.sleep(0.1)
        #     token = json.loads(cookie)
        # except:
        #     token = None
        # if token is not None:
        #     if not is_expired(token):
        #         st.session_state.token = token
        #         user_id, user_email = asyncio.run(
        #             get_email(client=client,
        #                         token=token['access_token'])
        #         )
        #         st.session_state.user_id = user_id
        #         st.session_state.user_email = user_email
        #         return True
            
        # Verify token is correct:
        try:
            token = get_token_from_google(client=client,
                                redirect_uri=redirect_uri)
        except Exception as e:
            print(e)
        else:
            cookie = json.dumps({
                "access_token": token["access_token"],
                "expires_at": token["expires_at"],
            })
            set_cookie(name='token', value=cookie, duration_days=1)
            # Check if token has expired:
            if not is_expired(token):
                st.session_state.token = token
                user_id, user_email = asyncio.run(
                    get_email(client=client,
                                token=token['access_token'])
                )
                st.session_state.user_id = user_id
                st.session_state.user_email = user_email
                return True
            
        # Check cookie
        try:
            cookie = get_cookie(name="token")
            time.sleep(0.1)
            token = json.loads(cookie)
        except:
            token = None
        if token is not None:
            if not is_expired(token):
                st.session_state.token = token
                user_id, user_email = asyncio.run(
                    get_email(client=client,
                                token=token['access_token'])
                )
                st.session_state.user_id = user_id
                st.session_state.user_email = user_email
                return True
        return False
    return True




def google_login(main_func, redirect_uri="http://localhost:8080"):
    client = get_client()
    success = get_token(client, redirect_uri)
    if success:
        main_func(user_id=st.session_state.user_id,
             user_email=st.session_state.user_email)
    else:
        prompt_login(client, redirect_uri)

def main(user_id, user_email):
    st.write(f"You're logged in as {user_email}")

if __name__ == "__main__":
    google_login(main)