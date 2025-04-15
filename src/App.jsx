import './App.css'
import {QueryClient, QueryClientProvider, useMutation} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {



  return (
      <QueryClientProvider client={queryClient}>
        <MyComponent />
    </QueryClientProvider>
  )
}

function MyComponent() {
  const {
    mutate,
  } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`https://ade-portfolio-server.onrender.com/ping-post`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log('On Success Ran');
      console.log('Data:', data);
    },
    onError: (error) => {
      console.log('On Error Ran');
      console.error('Error:', error);
    },
    onSettled: (data) => {
      console.log('On Settled Ran');
      console.log('Data:', data);
    },
  })
  return (<>
    <button onClick={() => mutate({responseRequest: 200})}>Trigger Success</button>
    <button onClick={() => mutate({responseRequest: 500})}>Trigger Failure</button>
  </>)
}

export default App
