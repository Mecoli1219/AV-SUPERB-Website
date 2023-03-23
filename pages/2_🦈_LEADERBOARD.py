import streamlit as st
import pandas as pd
import numpy as np
from google.oauth2 import service_account
import gspread

st.set_page_config(page_title="Leaderboard", page_icon="📊")
st.markdown("# Leaderboard")
st.sidebar.header("Leaderboard")

# Create a connection object.
credentials = service_account.Credentials.from_service_account_info(
    st.secrets["gcp_service_account"],
    scopes=[
        "https://www.googleapis.com/auth/spreadsheets",
    ],
)

@st.cache_data
def loadBenchMark():
    gs = gspread.authorize(credentials)

    sheet_url = st.secrets["private_gsheets_url"]
    sheet = gs.open_by_url(sheet_url)
    worksheet = sheet.get_worksheet(0)
    return pd.DataFrame(worksheet.get_all_records())

df = loadBenchMark()
st.dataframe(df.style.highlight_max(axis=0))