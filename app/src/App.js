import React from 'react';
import { DrizzleProvider } from 'drizzle-react';
import Container from './Container';
import drizzleOptions from './drizzleOptions';
import MyComponent from './MyComponent';

function App() {
  return (
    <DrizzleProvider options={drizzleOptions}>

        <Container />
    </DrizzleProvider>
  );
}

export default App;
