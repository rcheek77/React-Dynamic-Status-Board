import React from 'react'
import { useState } from 'react';

export const TicketInfo = ({tickets, result, image, children}) => {         // new component, TicketInfo, with four proprs for input
  const [show, setShow] = useState(false); // show/hide info in each section. Initialise show to false

  const count = tickets.filter(ticket => ticket.status === result).length;  // filter tickets array to find items matching result status
 
  return (
    <div className={`ticket-info status-${result}`}>    {/* new div, assign class based on status */}
      {children}                                        {/* renders text passed down via children prop */}
      
      <div className="ticket-details" onClick={()=> setShow(!show)}>                {/* create a wrapper div, toggle between true and false on click, whether to show or hide */}
        <p><strong>{!show ? "Show More Info >>" : "Show Less Info <<"}</strong></p> {/* if hidden, <p> with "Show more info", if shown, <p> with "Show less info" */}

        {show && count !== undefined ? (                  // if show state is true & count is not undefined, 
          <>                                              {/* fragment */}
            {count !== undefined && count > 0 ? (         // if count is not undefined and is greater than 0,
              <p>Number of tickets {result}: {count}</p>  // display actual number of tickets, 
            ) : (
              <p>No tickets {result}.</p>             // or, if count is 0, display "no tickets" message
            )}
          </>
        ) : (                                             // or, if show is false, display an empty string to hide details 
          ''
        )} 
      </div>
    </div>
  )
}