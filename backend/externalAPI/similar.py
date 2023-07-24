import json


class similar:
    def __init__(self, jsonfilename="/home/ubuntu/SWS-Everything4Emotion/backend/externalAPI") -> None:
        with open(jsonfilename, "rb") as jsonfile:
            self.data = json.load(jsonfile)
            self.map = {}
            # make a map
            for i, song in enumerate(self.data):
                self.map[song['song_name']] = i
            
    def display(self) -> None:
        print(type(self.data))   
    def match(self, song_name:str) -> list:
        ret = []
        if (self.map.get(song_name)):
            song_id = self.map[song_name]
            for similar_song in self.data[song_id]['similar_songs']:
               ret.append(similar_song['song_name'])
        return ret 

if __name__ == "__main__":
    test = similar("similar_songs_details.json")
    while (1):
        print(test.match(input()))