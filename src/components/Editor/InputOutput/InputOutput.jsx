import "./InputOutput.css";
import { ClipLoader } from "react-spinners";

const InputOutput = ({
  className,
  inputRef,
  outputRef,
  submitInput,
  compiling,
}) => {
  return (
    <div
      className={`${className} io`}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: "0 0 50%" }} className="input-parent">
        <span>Input</span>
        {compiling ? (
          <div className="compiling">
            <ClipLoader color="#36d7b7" size={20}/>
          </div>
        ) : (
          <a className="run-button" onClick={submitInput}>
            <i className="bi bi-play-fill"></i>
          </a>
        )}

        <div ref={inputRef} className="input" contentEditable="true"></div>
      </div>
      <div className="output-parent" style={{ flex: "0 0 50%" }}>
        <div>Output</div>
        <div ref={outputRef} className="output"></div>
      </div>
    </div>
  );
};

export default InputOutput;
