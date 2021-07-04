export default function TextInput(props) {
 return (
  <div className="form-group" style={{ margin: 10 }}>
   {/* <label>{props.label}</label> */}
   <input
    type={props.type}
    className="form-control"
    placeholder={props.placeholder}
    onChange={(e) => props.setInput(e.target.value, props.valueType)}
   />
  </div>
 );
}
