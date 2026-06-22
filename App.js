import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StatusBoard } from './components/StatusBoard';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([
    { id: 1, name: 'Ticket Information - part A', status: 'in-progress' },
    { id: 2, name: 'Ticket Information - part B', status: 'completed' },
    { id: 3, name: 'Ticket Information - part C', status: 'failed' }
  ]);

  return (
    <div className="App">
      <Header />
      <StatusBoard
        tickets={tickets}
        setTickets={setTickets}
      />
      <Footer />
    </div>
  );
}
  
export default App;