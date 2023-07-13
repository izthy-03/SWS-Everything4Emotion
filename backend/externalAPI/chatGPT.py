import openai

# openai.log = "debug"
openai.api_key = "sk-4hyZ60z1KJygFo9WHheYplOoubnxNsOJSlbjI0C5FokiDojL"
openai.api_base = "https://api.chatanywhere.com.cn/v1"

# 非流式响应

def gpt_35_api_stream(messages: list):
    """为提供的对话消息创建新的回答 (流式传输)

    Args:
        messages (list): 完整的对话消息
        api_key (str): OpenAI API 密钥

    Returns:
        tuple: (results, error_desc)
    """
    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=messages,
            stream=True,
        )
        completion = {'role': '', 'content': ''}
        print("requesting...")
        for event in response:
            if event['choices'][0]['finish_reason'] == 'stop':
                print(f'收到的完成数据: {completion}')
                break
            for delta_k, delta_v in event['choices'][0]['delta'].items():
                print(f'流响应数据: {delta_k} = {delta_v}')
                completion[delta_k] += delta_v
        messages.append(completion)  # 直接在传入参数 messages 中追加消息
        return (True, '')
    except Exception as err:
        return (False, f'OpenAI API 异常: {err}')
# just for testing 
def gpt_35_api_non_stream(context: str)->tuple:
    try:
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", 
                                              messages=[{
                                                  "role": "user", 
                                                  "content": "please suggest three songs for me according the key word following:" +context 
                                                  +"with Json format and no any other word"
                                                  }]
                                            )
        return (True, completion.choices[0].message.content)
    except Exception as err:
        return (False, f'OpenAI API 异常: {err}')

if __name__ == '__main__':
    context = "Happy"
    result = gpt_35_api_non_stream(context=context)
    print(result)

    #messages = [{'role': 'user','content': '鲁迅和周树人的关系'},]
    # print(gpt_35_api_stream(messages))
    # print(messages)

                                                                                                                                             