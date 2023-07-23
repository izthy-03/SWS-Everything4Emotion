import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import './SongLIst.css'

const SongList = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

    console.log(props.list);
    // console.log(JSON.parse(sessionStorage.getItem("lastRes")).data);
    let newData = JSON.parse(sessionStorage.getItem("lastRes")).data;
    if (JSON.stringify(data) !== JSON.stringify(newData))
      setData(JSON.parse(sessionStorage.getItem("lastRes")).data);
    setLoading(false);
  };

  useEffect(() => {
    console.log("starting SongList useEffect hook");
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        // loader={
        //   <Skeleton
        //     avatar
        //     paragraph={{
        //       rows: 1,
        //     }}
        //     active
        //   />
        // }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        {/* {console.log("fck", JSON.parse(props.list))} */}
        <List
          // dataSource={data}
          dataSource={JSON.parse(props.list)}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={<a href={JSON.parse(item.external_urls.replace(/'/g, '"')).spotify}>{item.name}</a>}
                description="Spotify"
              />
              <div>{<a href={item.preview_url}>Preview</a>}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>

    </div>
  );
};
export default SongList;