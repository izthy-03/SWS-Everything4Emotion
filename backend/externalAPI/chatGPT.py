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
                                                  "content": "please suggest three songs for me according to word following:" + context 
                                                  +"with Json format and no any other word"
                                                  }]
                                            )
        song_names = []
        singer_names = []
        # Extract song names and singer names from each line
        for line in lines:
            if line.strip():
                parts = line.strip().split(' by ')
                if len(parts) == 2:
                    song_names.append(parts[0][4:-1])  # Remove the leading number and quotes
                    singer_names.append(parts[1])
        return (True, song_names)
    except Exception as err:
        return (False, f'OpenAI API 异常: {err}')

if __name__ == '__main__':
    context = "Happy"
    input_string = gpt_35_api_non_stream(context=context)[1]
    # Split the input_string into individual lines
    lines = input_string.split('\n')

    # Initialize lists to store song names and singer names
    song_names = []
    singer_names = []

    # Extract song names and singer names from each line
    for line in lines:
        if line.strip():
            parts = line.strip().split(' by ')
            if len(parts) == 2:
                song_names.append(parts[0][4:-1])  # Remove the leading number and quotes
                singer_names.append(parts[1])

    # Print the extracted song names and singer names
    for idx, (song_name, singer_name) in enumerate(zip(song_names, singer_names), start=1):
        print(f"{idx}. \"{song_name}\" by {singer_name}")


    #messages = [{'role': 'user','content': '鲁迅和周树人的关系'},]
    # print(gpt_35_api_stream(messages))
    # print(messages)

                                                                                                                                             