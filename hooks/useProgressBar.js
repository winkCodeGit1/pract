/** @format */

import { useState } from 'react';

const useProgressBar = () => {
  const [data, setData] = useState([]);
  const [loadedData, setLoadedData] = useState(0);

  const getData = async (url) => {
    try {
      let response = await fetch(url, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYXlsZWUiLCJpYXQiOjE2OTMyODIyNzksInJvbGVzIjoiRG9jdG9yIiwiZXhwIjoxNjkzMzExMDc5fQ.p0FFinMfC-Ss0iX0k9KkPHfXlK4AoKyynBSSI355-8in60mkFpVcJb37P1NY53jhPm6adLkKBsXT_ZoG04Mjug',
        },
      });

      const reader = response.body.getReader();

      const contentLength = +response.headers.get('Content-Length');
      let receivedLength = 0;
      let chunks = [];
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;
        var loadedContent = ((receivedLength / contentLength) * 100).toFixed(0);
        console.log(loadedContent, 'loadedContent');
        setLoadedData(loadedContent);
      }

      let chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (let chunk of chunks) {
        chunksAll.set(chunk, position); // (4.2)
        position += chunk.length;
      }

      let result = new TextDecoder('utf-8').decode(chunksAll);

      let commits = JSON.parse(result);
      setData(commits);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (url) {
  //     getData(url);
  //   }
  // }, [url]);
  const setValueFetchData = (newValue) => {
    if (newValue) {
      getData(newValue);
    }
  };
  return [data, loadedData, setValueFetchData];
};

export default useProgressBar;
