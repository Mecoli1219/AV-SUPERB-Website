import streamlit as st
from streamlit_extras.app_logo import add_logo
from streamlit_extras.add_vertical_space import add_vertical_space
from streamlit_extras.colored_header import colored_header

st.set_page_config(
    page_title="Multi-model Benchmark",
    page_icon="random",
    initial_sidebar_state="collapsed",
    layout="centered",
    menu_items={
        'Get Help': "mailto:michaellai901026@gmail.com",
        'Report a bug': "mailto:michaellai901026@gmail.com",
        # 'About': "# This is a header. This is an *extremely* cool app!"
    }
)
add_logo("http://placekitten.com/120/120")

st.write("# Multi Modal Benchmark! 👋")

st.sidebar.markdown('''
# Multi Modal Benchmark! 👋
''', unsafe_allow_html=True)


colored_header(
    label="Motivation",
    description="",
    color_name="violet-70",
)
st.markdown(
    """
    In the video-text field, there is already a benchmark for research to test the capability of their models. 
    However, there is no existing benchmark in the video-audio or video-speech field. 
    Meanwhile, more and more video-audio or video-speech SSL models are coming out. 
    So it's a good time to utilize the existing multi-modality SSL model to build a benchmark for video with audio/speech.
    """
)
add_vertical_space(2)

# st.subheader("Plan", anchor="plan")
colored_header(
    label="Plan",
    description="",
    color_name="violet-70",
)
st.markdown(
    """
    Given existing multi-modality SSL models, we can select different multi-modality tasks and test SSL models on them. 
    Below show the possible selection of the SSL models and tasks.
    """
)
add_vertical_space(2)

# st.subheader("Models", anchor="models")
colored_header(
    label="Models",
    description="",
    color_name="violet-70",
)
# TODO: add models
models = ["AV-HubBERT", "RepLAI", "XDC", "MAViL"]
model_descriptions = [
    """
    - **Paper link:** https://arxiv.org/abs/2201.02184
    - **Brief introduction:** Use for lips reading ASR task. 
    Use audio/video encoder to encode the audio and video (with mask), then take it to the fusion module (Concat), 
    then just take it to the transformer and output the final representation. 
    The training process of this model is similar to the HuBERT. It has two iterations. 
    The target of the first iteration is the MFCC from the input spectrogram. 
    The target of the second iteration is the feature from the middle layers of the AV-HuBERT.
    - **Useful information:**
        - Pre-trained dataset:
            - LRS3, VoxCeleb2
        - Evaluate Test:
            - LRS3
        - Github link: [Github](https://github.com/facebookresearch/av_hubert)
    """,
    """
    - **Paper link:** [arxiv](https://arxiv.org/abs/2209.13583)
    - **Brief introduction:** Given an audio-visual pair, use an algorithm to find out the 'action part' in the video. 
    For example, find out where is the 'closing door' action in the video. 
    The algorithm calculates the frequency of the audio and finds the local maximum as the 'moments of interaction'.
    
        After that, trim the audio and video, then input this information into the audio/video encoder. 
        The paper uses two loss to do self-supervised learning
    - **Useful information:**
        - Pre-trained dataset:
            - Use the previous model as initialization, which trained on AudioSet-2M
        - Evaluate Test:
            - Video action recognition
                - EPIC-Kitchens-100 & Ego4D
            - Long-term action anticipation
                - Ego4D
            - State change classification
                - Ego4D
        - Github link: [Github](https://github.com/HimangiM/RepLAI)
    """,
    """
    - **Paper link:** [arxiv](https://arxiv.org/abs/1911.12667)
    - **Brief introduction:** Use the method in the DeepCluster paper. 
    First, use an audio/video encoder to generate features, then use the k-means algorithm to cluster the features. 
    The outcome of k-means was used as a pseudo-label of the features. 
    The author uses different settings, including multi-head deep clustering, concatenation deep clustering
    - **Useful information:**
        - Pre-trained dataset:
            - Kinetics, AudioSet, IG-Kinetics, IG-Random
        - Evaluate Test:
            - Video action recognition
                - UCF101 & HMDB51
            - Sound classification
                - ESC50
        - Github link: [Github](https://github.com/HumamAlwassel/XDC)
    """,
    """
    - **Paper link:** [arxiv](https://arxiv.org/abs/2212.08071)
    - **Brief introduction:** The overall model process is described below:
        1. From a paired audio-video, transform them to spectrogram and video patch, separately
        2. Mask 80% of the input audio/video, then use the audio/video encoder to transform these features. 
        (The structure of the encoder is a transformer)
            1. Use Intra and Inter contrastive learning to get the loss. 
            Intra-contrastive compare the uni-modality, the Inter contrastive comparison between two modalities
        3. After the audio/video encoder, use the multi-modal encoder to transform both audio and video representations. 
        The structure of the multi-modal encoder is still a transformer
        4. After that, use the [Mask] token padding with a separate audio/video decoder to reconstruct the spectrogram and video patch, 
        calculate the reconstruction loss
    - **Useful information:**
        - Pre-trained dataset:
            - AudioSet-2M
        - Evaluate Test:
            - Audio Event Detection
                - AudioSet-20k,20M & VGGSound
            - Audio to Video Retrieval
                - YouCook & MSR-VTT
        - Github link:
            - Not open (But this work is done by Meta, maybe we can get it)
    """,
]

tabs = st.tabs(models)
for i in range(len(tabs)):
    with tabs[i]:
        st.markdown(model_descriptions[i])
