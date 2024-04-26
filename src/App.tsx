import { useState } from 'react';
import './App.css';
import { useQuery } from 'react-query';

interface Data {
  body: string;
  title: string;
  id: number;
  userId: number;
}

async function getData(id: number): Promise<Data[]> {
  let response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
  return response.json();
}

function App() {
  const [id, setId] = useState(1);
  
  const { data, isLoading, isError } = useQuery({
    queryKey:['post', id],
    queryFn: () => getData(id),
    select:(data)=>{
      return data[0]
    },
    staleTime:3000
  });

  
  
  return (
    <>
      <div>
        <p>{id}</p>
        <button style={{ marginRight: "12px" }} onClick={() => setId(id + 1)}>+</button>
        <button onClick={() => { if (id > 1) setId(id - 1); }}>-</button>
        {isLoading? <div>Loading...</div>: <div></div>}
        {isError? <div>Error</div>: <div></div>}
        {data? <p>{data?.body}</p>: <p></p>}

        
      </div>
      
    </>
  );
}

export default App;
