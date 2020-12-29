import "./AddTimeButton.css";
import {AiOutlinePlusCircle} from'react-icons/ai'

function AddTimeButton(props) {
   return (
      <div>
         <div onClick={props.addTimeHandler}><AiOutlinePlusCircle/></div>
      </div>
   );
}

export default AddTimeButton;
