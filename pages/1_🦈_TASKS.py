import streamlit as st
import pandas as pd
import numpy as np
import time

st.set_page_config(page_title="Tasks", page_icon="📊")
st.sidebar.header("Tasks")
st.markdown("# Tasks")
st.write("There are two kinds of tasks, which are video-audio, and video-speech (I still not include the image-speech related task)")


tasks = ["Audio Event Detection", "Audio-Visual Action Recognition", "Lips reading ASR", "Emotion recognition", "Audio-Visual Speaker recognition"]
task_descriptions = [
    """
    - Brief introduction:
        - Given a video, classify the audio into a specific class (event related class)
    - Type: Video-Audio
    - Dataset (see MAViL):
        - Audioset
            - link: [http://research.google.com/audioset/download.html](http://research.google.com/audioset/download.html)
            - license: CC by 4.0
        - VGGSound
            - link: [https://www.robots.ox.ac.uk/~vgg/data/vggsound/](https://www.robots.ox.ac.uk/~vgg/data/vggsound/)
            - license: CC by 4.0
    """,
    """
    - Brief introduction:
        - Given a video, classify the audio into a specific class (action related class)
    - Type: Video-Audio
    - Dataset:
        - Kinetics
            - link: [https://www.deepmind.com/open-source/kinetics](https://www.deepmind.com/open-source/kinetics)
            - license: CC by 4.0
        - UCF101
            - link: [https://www.deepmind.com/open-source/kinetics](https://www.crcv.ucf.edu/data/UCF101.php)
            - license: Not on the official website/GitHub/paper
    """,
    """
    - Brief introduction:
        - Given a video (camera is on the mouth), do the ASR
    - Type: Video-Speech
    - Dataset:
        - LRS3
            - link: [https://www.robots.ox.ac.uk/~vgg/data/lip_reading/lrs3.html](https://www.robots.ox.ac.uk/~vgg/data/lip_reading/lrs3.html)
            - license: CC by 4.0
    """,
    """
    - Brief introduction:
        - Given a video, classify this video into different emotion classes
    - Type: Video-Speech
    - Dataset:
        - IEMOCAP
            - link: [https://sail.usc.edu/iemocap/](https://sail.usc.edu/iemocap/)
            - license: Not found
    """,
    """
    - Brief introduction:
        - Given a video, classify this video into different speaker
    - Type: Video-Speech
    - Dataset:
        - VoxCeleb
            - link: [https://www.robots.ox.ac.uk/~vgg/data/voxceleb/](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/)
            - license: CC by 4.0
    """
]

for i in range(len(tasks)):
    with st.container():
        st.subheader(tasks[i])
        st.markdown(task_descriptions[i])


