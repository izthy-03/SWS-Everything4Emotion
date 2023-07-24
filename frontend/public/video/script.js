const video = document.getElementById('video')


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)
/*
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights')
]).then(startVideo);
*/

function startVideo(){
  navigator.getUserMedia1 = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia1(
        { video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

// 设置您的Spotify API凭证和关键词
const clientId = 'caeb3171fa9d48af9afdad43120efb40';
const clientSecret = 'cf67f8e118e84669a428681b003e6a0c';
//const keyword = 'sad';

// 获取访问令牌
async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

// 创建表格
function createTable() {
  const table = document.createElement('table');
  const tableHeader = document.createElement('tr');
  
  const header1 = document.createElement('th');
  header1.textContent = 'Song Name';
  tableHeader.appendChild(header1);
  
  const header2 = document.createElement('th');
  header2.textContent = 'Artists';
  tableHeader.appendChild(header2);
  
  table.appendChild(tableHeader);
  
  return table;
}

// 在表格中添加行
function addTableRow(table, songName, artists) {
  const row = document.createElement('tr');
  
  const cell1 = document.createElement('td');
  cell1.textContent = songName;
  row.appendChild(cell1);
  
  const cell2 = document.createElement('td');
  cell2.textContent = artists.join(', ');
  row.appendChild(cell2);
  
  table.appendChild(row);
}

// 调用搜索音乐函数并处理结果
/*
searchMusic()
  .then(tracks => {
    const table = createTable();
    
    tracks.forEach(track => {
      const songName = track.name;
      const artists = track.artists.map(artist => artist.name);
      addTableRow(table, songName, artists);
    });
    
    const resultContainer = document.getElementById('result-container');
    resultContainer.appendChild(table);
  })
  .catch(error => {
    console.error('发生错误：', error);
  });
*/
// 搜索音乐
async function searchMusic(keyword) {
    const accessToken = await getAccessToken();
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=track&limit=10`;
  
    const response = await fetch(searchEndpoint, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    return data.tracks.items;
}

let recommendedSongs = [];

// 更新表格内容
function updateTable(keyword) {
    searchMusic(keyword)
      .then(tracks => {
        const table = document.getElementById('result-container');
        table.innerHTML = ''; // 清空表格内容
        
         // 随机排序歌曲列表
        tracks.sort(() => Math.random() - 0.5);

        // 只选择一部分歌曲进行显示，例如选择前10首
        const displayedTracks = tracks.slice(0, 10);
        //recommendedSongs.push({ songs: displayedTracks });
        displayedTracks.forEach(track => {
          const songName = track.name;
          const artists = track.artists.map(artist => artist.name);
  
          // Check if the song is already in the recommendedSongs array
          const existingSong = recommendedSongs.find(song => song.songName === songName);
          if (existingSong) {
            existingSong.count++;
          } else {
            recommendedSongs.push({ songName, artists, count: 1 });
          }
  
          addTableRow(table, songName, artists);
        });
      })
      .catch(error => {
        console.error('发生错误：', error);
      });
  }
  

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    //const displaySize = {width: video.width, height:video.height }
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize)

    // 获取表格元素
    const emotionTable = document.getElementById('emotionTable');

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks
        ().withFaceExpressions()
        console.log(detections)
        const resizeDetections = faceapi.resizeResults
        (detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        
        faceapi.draw.drawDetections(canvas, resizeDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizeDetections)

        // 更新表格
        if (detections.length > 0) {
            const expressions = detections[0].expressions;
            console.log(expressions);
            // 清空表格内容
            emotionTable.innerHTML = '';

            // 遍历每个检测到的面部
            detections.forEach(detection => {
            const expressions = detection.expressions;

            // 将表情信息按照概率排序
            const sortedExpressions = Object.keys(expressions)
            .map(expression => ({ expression, probability: expressions[expression] }))
            .sort((a, b) => b.probability - a.probability)

            // 添加新的表格行
            sortedExpressions.forEach(sortedExpression => {
                const emotion = sortedExpression.expression;
                const confidence = sortedExpression.probability;
                const newRow = emotionTable.insertRow();
                const emotionCell = newRow.insertCell(0);
                const confidenceCell = newRow.insertCell(1);
                emotionCell.innerHTML = emotion;
                confidenceCell.innerHTML = confidence;
                });
            });

            sortedExpressions = Object.keys(expressions)
            .map(expression => ({ expression, probability: expressions[expression] }))
            .sort((a, b) => b.probability - a.probability)
            if (sortedExpressions.length > 0) {
                const topExpression = sortedExpressions[0].expression;
                console.log('当前表情:', topExpression);
                /*
                // 根据不同的表情推荐不同的关键词
                switch (topExpression) {
                case 'happy':
                    keyword = 'happy';
                    break;
                case 'sad':
                    keyword = 'sad';
                    break;
                case 'angry':
                    keyword = 'angry';
                    break;
                // 添加更多表情和对应的关键词
                default:
                    keyword = 'happy';
                    break;
                }*/

                updateTable(topExpression);
            }
        }
    },100)
})

document.getElementById('endRecording').addEventListener('click', () => {
  // Convert the recommendedSongs array to a JSON string
  const recommendedSongsJson = JSON.stringify(recommendedSongs);

  // Encode the JSON string to be passed as a URL parameter
  const encodedRecommendedSongs = encodeURIComponent(recommendedSongsJson);

  // Redirect to recommendations.html page and pass the recommendedSongs as a parameter
  window.location.href = `recommendations.html?recommendedSongs=${encodedRecommendedSongs}`;
});


