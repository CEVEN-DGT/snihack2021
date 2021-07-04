export default function Button(props) {
 return (
  <div className="form-group" style={{ margin: 10 }}>
   <button
    style={props.large ? { width: "100%" } : {}}
    className="btn btn-primary btn-block sign-up-btn"
    onClick={props.onClick}
   >
    {props.label}
   </button>
  </div>
 );
}
