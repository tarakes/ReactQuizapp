export default function Input({ Val, filedtext, qsno, onselect }) {
  return (
    <div>
      <input type={"radio"} name={"answer"} value={Val} onChange={onselect} />
      {filedtext}
    </div>
  );
}
