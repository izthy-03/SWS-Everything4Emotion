// 获取URL参数，解析出推荐歌曲数据
function getRecommendedSongs() {
    const urlParams = new URLSearchParams(window.location.search);
    const recommendedSongsParam = urlParams.get('recommendedSongs');
    return JSON.parse(decodeURIComponent(recommendedSongsParam));
  }
  
  // 创建表格
  function createTable() {
    const table = document.createElement('table');
    const tableHeader = document.createElement('tr');
  
    const header1 = document.createElement('th');
    header1.textContent = '歌曲名称';
    tableHeader.appendChild(header1);
  
    const header2 = document.createElement('th');
    header2.textContent = '艺术家';
    tableHeader.appendChild(header2);
  
    const header3 = document.createElement('th'); // 新的表头列
    header3.textContent = '推荐次数';
    tableHeader.appendChild(header3);
  
    table.appendChild(tableHeader);
    return table;
  }
  
  // 在表格中添加行
  function addTableRow(table, songName, artists, count) { // 添加一个新的参数count
    const row = document.createElement('tr');
  
    const cell1 = document.createElement('td');
    cell1.textContent = songName;
    row.appendChild(cell1);
  
    const cell2 = document.createElement('td');
    cell2.textContent = artists.join(', ');
    row.appendChild(cell2);
  
    const cell3 = document.createElement('td'); // 新的单元格
    cell3.textContent = count; // 将推荐次数赋值给新单元格
    row.appendChild(cell3);

    table.appendChild(row);
  }
  
  // 显示总推荐次数最多的10首歌曲
  function displayTopRecommendedSongs() {
    const recommendedSongs = getRecommendedSongs();

    // 对推荐歌曲按推荐次数进行降序排序
    const sortedSongs = recommendedSongs.sort((a, b) => b.count - a.count);

    // 选择推荐次数最多的前10首歌曲
    const top10RecommendedSongs = sortedSongs.slice(0, 10);

    console.log(`总推荐次数最多的10首歌曲的推荐次数:`);
    top10RecommendedSongs.forEach((song, index) => {
      console.log(`${index + 1}. ${song.songName}: ${song.count} 次`);
    });

    // Display the top 10 most recommended songs in a table
    const table = createTable();
    top10RecommendedSongs.forEach((song) => {
      const songName = song.songName;
      const artists = song.artists;
      const count = song.count; // 新增的推荐次数数据
      addTableRow(table, songName, artists, count); // 传递推荐次数数据
    });
  
    // Append the table to the result-container in the HTML
    const resultContainer = document.getElementById('result-container');
    resultContainer.appendChild(table);
  }
  
  // Call the displayTopRecommendedSongs function when the page loads
  window.addEventListener('load', () => {
    displayTopRecommendedSongs();
  });
  