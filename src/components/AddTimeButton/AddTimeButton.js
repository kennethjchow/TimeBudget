import "./AddTimeButton.css";
import {AiOutlinePlusCircle} from'react-icons/ai'

function AddTimeButton(props) {
	const addTime = (event) => {
		console.log('I am clicked')
	}
   return (
      <div>
         <div onClick={addTime}><AiOutlinePlusCircle/></div>
      </div>
   );
}

export default AddTimeButton;
