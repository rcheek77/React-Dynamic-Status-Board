import React from 'react';
import '../TicketItem.css';

// component for creating ticket item
const TicketItem = ({ticket, updateTicketStatus}) => {
  return (
      <div className={`ticket-item status-${ticket.status === "in-progress" ? "in-progress" 
        : ticket.status === "completed" ? "completed" 
        : "failed"
      }`} >
        <div>
          <h2>
            {ticket.id} - {ticket.name}
          </h2>
          <p>{ticket.status}</p>
        </div>
        <div>
          <div>
            <button onClick={() => updateTicketStatus(ticket.id)}>
              {ticket.status === "failed" ? "Start" : ticket.status === "in-progress" ? "Finish" : "Complete"}
            </button>
          </div>
        </div>
      </div>
  )
}

export default TicketItem