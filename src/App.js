import React from 'react';
import Header from './component/header';
import Headline from "./component/headline";
import scss from './app.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <section className="main">
          <Headline header='Exchange' desc='Click the button to render exchange!' />
      </section>
    </div>
  );
}

export default App;
