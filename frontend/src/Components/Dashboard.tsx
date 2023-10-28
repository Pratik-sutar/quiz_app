import React, { useState, useCallback} from "react";
import AllUsersData from "./AdminComponents/AllUserData";
import AllUsersResults from "./AdminComponents/AllUserResults";
import { Button } from "react-bootstrap";
import "./Style.css"

const Dashboard = () => {
  const [switchTable, setSwitchTable] = useState(true);

  const switchComp = ()=>{
    setSwitchTable((switchTable) => !switchTable)
  }

  return (
    <div>
      <div className="d-flex flex-row p-2 m-2">
        <div className="p-2 ">
          <Button
           className="p-3 rounded shadow purpleGradient font-weight-bold "
           onClick={switchComp}
          >
            {switchTable===true?"Show Results":"Show Users"}
          </Button>
        </div>
        
      </div>

      {switchTable === true ? <AllUsersData /> : <AllUsersResults />}
    
    </div>
  );
};

export default Dashboard;
