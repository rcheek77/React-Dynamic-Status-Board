import React, { useState } from 'react';
import { TicketInfo } from './TicketInfo';
import TicketItem from './TicketItem';
import completedImg from '../images/completed.png';
import inProgressImg from '../images/in-progress.png';
import failedImg from '../images/failed.png';

export const StatusBoard = ({tickets, setTickets}) => {
  const [newTicket, setNewTicket] = useState({id: '', name: '', status: ''}); 
  const [error, setError] = useState("");

// Handles input onChange to add new TicketItem 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
    if (error) setError("");
  }
  
// Handles add functionallity
  const addTicketToList = (event) => {
    console.log('console.log(newTicket.id.trim()): ', newTicket.id)
    console.log('newTicket.name.trim(): ', newTicket.name)
    event.preventDefault();
    const trimmedId = newTicket.id;
    const trimmedName = newTicket.name.trim();
// Checks not empty
    if (!trimmedId || !trimmedName) {setError("Ticket ID and Subject are required."); return;}
// Converts ID to number
    const numericalId = Number(trimmedId)
// Checks if ID id valid number
    if (isNaN(numericalId)) {setError("Job ID must be a valid number"); return;}
// Check for duplicate ID
    if (tickets.some(ticket => ticket.id === numericalId)) {alert("A job with this ID already exists, please choose another"); return;}
// checks ID is number and name is not empty
    if (numericalId !== '' && newTicket.name.trim() !== '') {
      const ticketToAdd = {
        id: numericalId,
        name: trimmedName,
        status: "in-progress"
      };
      setTickets([...tickets, ticketToAdd]);
      setNewTicket({id: '', name: '', status: ''});
    }
  }

// Update ticket status based on condition
  const updateTicketStatus = (id) => {
    setTickets(
      tickets.map(ticket =>
        ticket.id === id ?
          { ...ticket, status: ticket.status === "failed" ? "in-progress" : "completed" }
          : ticket
      )
    );
  };

  return (
    <>
    <input type="text" name="id" value={newTicket.id} onChange={handleInputChange} placeholder="Enter Ticket ID" />
      <input type="text" name="name" value={newTicket.name} onChange={handleInputChange} placeholder="Enter Ticket Information" />
      
      <button onClick={addTicketToList}>Add Ticket</button>
      {error && <p className="invalid-feedback error-message">{error}</p>}

      <h1>Ticket Board</h1>
      <ul className='status-board'>
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} updateTicketStatus={updateTicketStatus} />
        ))
      }
      </ul>

      <hr className='w-hr' />

      <h1>Ticket Info</h1>
      <div className="status-board">
        
        <TicketInfo result="in-progress" tickets={tickets}>
          <p>Tickets In Progress</p>
          <img src={inProgressImg} style={{width: '150px'}} alt="in progress"/>
        </TicketInfo>

        <TicketInfo result="completed" tickets={tickets}>
          <p>Tickets Completed</p>
          <img src={completedImg} style={{width: '150px'}} alt="completed"/>
        </TicketInfo>
        
        <TicketInfo result="failed" tickets={tickets}>
          <p>Tickets Failed</p>
          <img src={failedImg} style={{width: '150px'}} alt="failed"/>
        </TicketInfo>  
      </div>
      

    </>
  )
}