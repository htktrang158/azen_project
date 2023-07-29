// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './common/DefaultLayout';
import Login from './components/Login/index';

function App() {
  return (
    <BrowserRouter>

      <Routes >
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={< DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
