import './App.scss';

import { Queries } from "./pages";
import { Header, Sidebar } from './components';

function App() {

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <Queries />
    </div>
  )
}

export default App
