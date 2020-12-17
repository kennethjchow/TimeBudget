import "./AddTimeButton.css";

function AddTimeButton(props) {
	const addTime = (event) => {
		console.log('I am clicked')
	}
   return (
      <div>
         <button onClick={addTime}>Add time</button>
      </div>
   );
}

export default AddTimeButton;
