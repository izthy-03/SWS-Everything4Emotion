import openai
import json

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
def gpt_35_api_non_stream(context: dict)->tuple:
    content = ""
    if (context.get('mood')):
        content = content + 'My mood is ' + context['mood'] + 'now.'
    if (context.get('singer')):
        content = content + 'My favorite singer is ' + context['singer'] + '.'
    if (context.get('text')):
        content = content + 'the other information is ' + context['text'] + '.'
    try:
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", 
                                              messages=[{
                                                  "role": "user", 
                                                  "content": "please suggest three songs for me according to what I say:"
                                                  + content  
                                                  +"with Json format including titles and artist and no any other word."
                                                  }]
                                            )   
        print(completion.choices[0].message.content)
        songs = json.loads(completion.choices[0].message.content)['songs']
        print(songs)
        song_names = []
        # Extract song names and singer names from each line
        # for song in songs:
        #     if song.strip():
        #         parts = song.strip().split(' by ')
        #         if len(parts) == 2:
        #             song_names.append(parts[0][4:-1])  # Remove the leading number and quotesx 
        #             singer_names.append(parts[1])
        for song in songs:
            song_names.append(song['title'])
        return (True, song_names)
    except Exception as err:
        return (False, f'OpenAI API 异常: {err}')

if __name__ == '__main__':
    context = {
        "mood":"sad",
        "singer":"Aimer",
        "text":"I want to listen star dust"
    }
    song_names = gpt_35_api_non_stream(context=context)
    print(song_names)
    # Split the input_string into individual lines
    # Initialize lists to store song names and singer names



    #messages = [{'role': 'user','content': '鲁迅和周树人的关系'},]
    # print(gpt_35_api_stream(messages))
    # print(messages)

                                                                                                                                             