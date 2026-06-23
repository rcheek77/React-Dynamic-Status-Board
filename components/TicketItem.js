import React from 'react';
import '../TicketItem.css';

// component for creating ticket item
const TicketItem = ({ticket, updateTicketStatus}) => {  // this extracts props.ticket and props.updateTicketStatus
  return (

    <div className={`ticket-item status-${ticket.status === "in-progress" ? "in-progress"   // combine static and dynamic CSS classes. Append "in-progress" class if status equals "in-progress"
        : ticket.status === "completed" ? "completed"   // appends "completed" class if status equals "completed"
        : "failed"    // appends "failed" class by defualt for all other classes
      }`} >

        <div>
          <h2>
            {ticket.id} - {ticket.name}   {/* display the ticket's ID and name */} 
          </h2>
          <p>{ticket.status}</p>    {/* display the ticket's status */} 
        </div>
        <div>
          <div>
            <button onClick={() => updateTicketStatus(ticket.id)}>    {/* on clicking the button, run updateTicketStatus function, passing the ticket's ID as the argument */}
              {ticket.status === "failed" ? "Start" : ticket.status === "in-progress" ? "Finish" : "Complete"} {/* change the text of the button based on the status */}
            </button>
          </div>
        </div>
      </div>
  )
}

export default TicketItem