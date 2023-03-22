import streamlit as st
import pandas as pd
import numpy as np
import time

st.set_page_config(page_title="Leaderboard", page_icon="📊")
st.markdown("# Leaderboard")
st.sidebar.header("Leaderboard")


df = pd.DataFrame(
   np.random.randn(50, 20),
   columns=('col %d' % i for i in range(20)))
st.dataframe(df.style.highlight_max(axis=0))
