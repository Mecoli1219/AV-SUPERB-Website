import streamlit as st
import pandas as pd
import numpy as np
import time
from utility import google_login

st.set_page_config(page_title="Submission", page_icon="📊")
st.markdown("# Submission")
st.sidebar.header("Submission")

def main(user_id, user_email):

    st.write("This page is used to submit your results to the leaderboard")
    st.write("Please login first")
    st.write("If you don't have an account, please register first")

google_login(main, redirect_uri="http://localhost:8080/SUBMISSION")
