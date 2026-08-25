import { useEffect, useState } from "react";


export default function DisplayInactiveVolunteers({ volunteers }){
    console.log(volunteers);
        return  ( 
            <div className="inactive-volunteers-page">
                <div className="inactive-volunteers-card">

                    <div className="inactive-icon">
                        🤝
                    </div>

                    <h2>Emails drafted to:</h2>

                   <ul className="inactive-volunteers-list">
                        {volunteers.map(volunteer => (
                            <li key={volunteer.email}>
                                {volunteer.email}
                            </li>
                        ))}
                    </ul>

                     <div className="inactive-info">
                            <span>
                            Look in your email drafts to offically send email. 
                            </span>
                     </div>

                </div>
            </div>
            );
    }