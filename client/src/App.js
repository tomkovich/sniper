import logo from './logo.svg';
import './App.css';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="/auth/google" target="_blank">
          Sign In With Google
        </a>
      </header>
    </div>
  );
}

export default App;
