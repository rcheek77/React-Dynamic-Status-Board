import React, { useState } from 'react';
import { TicketInfo } from './TicketInfo';
import TicketItem from './TicketItem';
import completedImg from '../images/completed.png';
import inProgressImg from '../images/in-progress.png';
import failedImg from '../images/failed.png';

export const StatusBoard = ({tickets, setTickets}) => {                       // new component called StatusBoard that accepts two props (tickets [current list of tickets] & setTickets [function to update that list of tickets])
  const [newTicket, setNewTicket] = useState({id: '', name: '', status: ''}); // Create a variable newTicket to store the form data for a new ticket, initialising fields for id, name, and status as empty strings.
  const [error, setError] = useState(""); // Create a variable error initialised to an empty string to store and display validation error messages.

// Handles input onChange to add new TicketItem 
  const handleInputChange = (e) => {              // function to handle real-time changes when a user types into either input field.
    const { name, value } = e.target;             // Destructures the name attribute (either "id" or "name") and the current value from the input element that triggered the event.
    setNewTicket({ ...newTicket, [name]: value }); // Updates the newTicket state by copying the existing data and dynamically overwriting the changed field ([name])
    if (error) setError("");                        // Clears any active error message as soon as the user starts typing or fixing their input.
  }
  
// Handles add functionallity
  const addTicketToList = (event) => {                              // function triggered when the user clicks the "Add Ticket" button.

    event.preventDefault();                         // Prevents the browser's default behavior, which stops the page from reloading when the button is clicked.

    const trimmedId = newTicket.id;                 // Stores the input ID into a local variable

    const trimmedName = newTicket.name.trim();      // Removes any accidental leading or trailing whitespaces from the ticket name input

    if (!trimmedId || !trimmedName) {setError("Ticket ID and Subject are required."); return;} // Checks if either field is blank; if so, displays an error message 
                                                                                               // and stops the function execution immediately using return

    const numericalId = Number(trimmedId)   // Converts the text-based ID input into a JavaScript number type

    if (isNaN(numericalId)) {setError("Job ID must be a valid number"); return;} // Checks if the ID conversion failed/is valid; if invalid, displays error message and exits the function.

    if (tickets.some(ticket => ticket.id === numericalId)) {alert("A job with this ID already exists, please choose another"); return;} // Scans the existing tickets array to see if the new ID 
                                                                                                                                        // already exists. If it finds a duplicate, display alert and halt execution

    if (numericalId !== '' && newTicket.name.trim() !== '') {   // check ID & newTicket name are not empty
      const ticketToAdd = {                 // new ticket object, assigning ID, name and default status of "in-progress"
        id: numericalId,
        name: trimmedName,
        status: "in-progress"
      };
      setTickets([...tickets, ticketToAdd]);          // Updates the global ticket state by taking all existing tickets and appending the new ticket to the end of the array
      setNewTicket({id: '', name: '', status: ''});   // Resets the form fields back to empty strings
    }
  }

// Update ticket status based on condition
  const updateTicketStatus = (id) => {          // function that takes a ticket's id to change its status.
    setTickets(                                 
      tickets.map(ticket =>                   // Loop through every ticket in the array using .map() to create a modified copy of the list.
        ticket.id === id ?
          { ...ticket, status: ticket.status === "failed" ? "in-progress" : "completed" }
          : ticket                        // if ticket.id matched ID passed into function, duplicate the ticket details and update status 
                                          // to "in-progress" if it was "failed", otherwise set to "completed"
      )
    );
  };

  return (
    
    <>
    <input type="text" name="id" value={newTicket.id} onChange={handleInputChange} placeholder="Enter Ticket ID" />                 {/* input fiewlds for new tickets */}
      <input type="text" name="name" value={newTicket.name} onChange={handleInputChange} placeholder="Enter Ticket Information" />
      
      <button onClick={addTicketToList}>Add Ticket</button>
      {error && <p className="invalid-feedback error-message">{error}</p>}  {/* display a paragraph containing the error message only if the error state is not empty */}

      <h1>Ticket Board</h1>
      <ul className='status-board'>
        {tickets.map((ticket) => (  // Loops through the tickets array to build a list item for every item stored in the state.
          <TicketItem key={ticket.id} ticket={ticket} updateTicketStatus={updateTicketStatus} /> // Renders a child component (TicketItem), passing the ID as a
                                                                                                 // React key, the ticket data, and the status update function as props
        )) 
      }
      </ul>



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