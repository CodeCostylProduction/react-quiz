import React from 'react'
import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <Layout>
        <div style={{
            margin: '0 auto',
            border: '1pt solid black',
            width: 300,
            textAlign: 'center'
        }}>
            <h1>Layout works</h1>
        </div>
    </Layout>
  );
}

export default App;
