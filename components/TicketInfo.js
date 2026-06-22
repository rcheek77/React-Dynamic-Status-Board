import React from 'react'
import { useState } from 'react';

export const TicketInfo = ({tickets, result, image, children}) => {
  const [show, setShow] = useState(false); // show/hide info in each section

  const count = tickets.filter(ticket => ticket.status === result).length;
 
  return (
    <div className={`ticket-info status-${result}`}>
      {children}
      
      <div className="ticket-details" onClick={()=> setShow(!show)}>
        <p><strong>{!show ? "Show More Info >>" : "Show Less Info <<"}</strong></p>

        {show && count !== undefined ? (
          <>
            {count !== undefined && count > 0 ? (
              <p>Number of tickets {result}: {count}</p>
            ) : (
              <p>No tickets in {result}.</p>
            )}
          </>
        ) : (
          ''
        )} 
      </div>
    </div>
  )
}