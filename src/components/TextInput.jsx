export default function TextInput(props) {
 return (
  <div className="form-group input-with-sync-btn" style={{ margin: 10 }}>
   {/* <label>{props.label}</label> */}
   <input
    type={props.type}
    className="form-control"
    placeholder={props.placeholder}
    onChange={(e) => props.setInput(e.target.value, props.valueType)}
   />
   {props.sync && (
    <button className="input-sync-btn">
     <i className="fas fa-sync"></i>
    </button>
   )}
  </div>
 );
}
