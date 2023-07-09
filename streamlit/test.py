from streamlit_js_eval import get_cookie, set_cookie
from random import randint
import streamlit as st

# 触发按钮；在整个程序中必须存在按钮等被用户触发的组件，否则将导致程序异常循环
def shuaxin():  # 刷新页面
    # 仅仅是为了触发st更新
    pass
st.button('刷新', on_click=shuaxin)

# set cookie；设置cookie
set_cookie(name='test1', value=10, duration_days=1, component_key='012')
set_cookie(name='test2', value=randint(0, 100), duration_days=1, component_key='013')
set_cookie(name='test3', value=randint(0, 100), duration_days=1, component_key='014')

# def cookie_obtain():
#     # 获取cookie
#     def cookie_get_cookie():
#         import time
#         st.session_state['cookies'] = {}
#         get_cookie(name='test1', component_key=st.session_state['get_cookie1'])  # 如果没有得到响应信息，是None(并不是返回的)
#         get_cookie(name='test2', component_key=st.session_state['get_cookie2'])
#         get_cookie(name='test4', component_key=st.session_state['get_cookie3'])  # test4 是不存在的，返回 ''
#         time.sleep(0.06)  # 响应会有延迟，响应后会添加到会话（添加等待时间之后，不一定会执行重复运行，但是偶尔还会）；可以按需要来调整等待时间，但最好不要小于0.05秒，0.1秒比较稳定

#     # 触发调解规则；重要的
#     if not 'abc' in st.session_state:  # ①首次打开页面、用户F5刷新页面、执行②之后的用户触发st更新开始执行位置
#         st.session_state['get_cookie_sign'] = 0
#         st.session_state['get_cookie1'] = 'cookie1'
#         st.session_state['get_cookie2'] = 'cookie11'
#         st.session_state['get_cookie3'] = 'cookie111'
#         cookie_get_cookie()  # 获取cookie，因为获取仍有失败的可能，失败后会立即重新运行
#         st.session_state['abc'] = 0
#     elif st.session_state['abc'] == 1:  # ②用户触发st更新执行位置
#         st.session_state['get_cookie_sign'] = 1
#         st.session_state['get_cookie1'] = 'cookie2'
#         st.session_state['get_cookie2'] = 'cookie21'
#         st.session_state['get_cookie3'] = 'cookie211'
#         cookie_get_cookie()  # 获取cookie，因为获取仍有失败的可能，失败后会立即重新运行
#         st.session_state['abc'] = 2
#     else:  # ③ ①结束执行位置

#         st.session_state['cookies'] = {
#             'test1': st.session_state[st.session_state['get_cookie1']],
#             'test2': st.session_state[st.session_state['get_cookie2']],
#             'test4': st.session_state[st.session_state['get_cookie3']],
#         }
#         st.write('session_state：')
#         st.write(st.session_state)
#         st.session_state['get_cookie_sign'] = 2

#     # 打印输出
#     st.write('cookie：')
#     st.write(st.session_state['cookies'])

#     # 主程序截流
#     if st.session_state['get_cookie_sign'] != 2:
#         print('停止？')
#         st.stop()
#     else:
#         return st.session_state['cookies']

# cookies = cookie_obtain()
# 在此处之后添加主程序
print('执行主程序')