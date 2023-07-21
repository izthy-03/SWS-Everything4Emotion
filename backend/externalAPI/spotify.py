import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# 设置你的 Spotify API 凭证
client_id = 'caeb3171fa9d48af9afdad43120efb40'
client_secret = 'cf67f8e118e84669a428681b003e6a0c'

# 创建 Spotify 客户端凭证
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# 定义搜索关键词
def Spotify(search_keyword:str) -> list:
    # 执行搜索
    results = sp.search(q=search_keyword, type='track', limit=3)
    print(type(results))
    # 提取搜索结果
    tracks = results['tracks']['items']
    for key in tracks[0]:
        print(f"key {key}")
    # 打印搜索结果
    for track in tracks:

        print('Track:', track['name'])
        print('ID:', track['id'])
        print('Artist:', track['artists'][0]['name'])
        print('Preview URL:', track['preview_url'])
        print('External URL:', track['external_urls'])
        print('------------------------')
    return tracks
if __name__ == '__main__':
    tmp = Spotify(input())