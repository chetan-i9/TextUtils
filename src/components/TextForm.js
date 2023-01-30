import React,{useState} from 'react'

export default function TextForm(props) {
    const handleUpClick= ()=>{
        //console.log("UpperCase was Clicked" + text);
        let newText=text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Upper Case!","success");
    }

    const handleLoClick= ()=>{
        //console.log("LowerCase was Clicked" + text);
        let newText=text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lower Case!","success");
    }

    const handleClearClick= ()=>{
        //console.log("Clear Text was Clicked" + text);
        let newText="";
        setText(newText);
        props.showAlert("Text Cleared","success");
    }
    
    function totitleCase(value) {
            let myValue = value.toLowerCase()
            let newValue = myValue.split(" ")
            let newarray = []
            for(let i = 0; i< newValue.length; i++){
                let arrayValue = newValue[i][0].toUpperCase() + newValue[i].slice(1)
                newarray.push(arrayValue)
        }
            return newarray.join(" ")
        }

    const handleTitleClick= () => {
        let newText = totitleCase(text);
        setText(newText);
        props.showAlert("Converted to Title Case!","success");
    }

    const handleCopy = () => {
        var text=document.getElementById("mybox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text copied","success");
    }

    const extraSpaces=()=>{
        let newText=text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra space removed","success");
    }

    const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    }

    const handleOnChange= (event)=>{
        //console.log("On Change");
        setText(event.target.value);
    }

    const [text, setText]=useState("");
    //text="jgda"; is wrong way to change the state
    //setText="jgda; is the correct way to change state"

  return (
    <>
        <div className='container ' style={{color:props.mode==='dark'?'white':'black'}}>
            <h2 className='mb-2'>{props.heading}</h2>
                <div className="mb-3">
                <textarea className="form-control my-3" id="mybox" style={{backgroundColor:props.mode==='dark'?'#1c63a2':'white',
                color:props.mode==='dark'?'white':'black'}} value={text} onChange={handleOnChange} rows="8"></textarea>
                </div>
            <button disabled={text.length===0} className='btn btn-primary mx-1 my-2' onClick={handleUpClick}>Upper Case</button>
            <button disabled={text.length===0} className='btn btn-primary mx-1 my-2' onClick={handleLoClick}>Lower Case</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-2" onClick={handleTitleClick}>Title Case</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-2" onClick={handleCopy}>Copy</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-2" onClick={extraSpaces}>Remove Extra Space</button>
            <button disabled={text.length===0} className='btn btn-primary mx-1 my-2' onClick={handleClearClick}>Clear</button>
            <button disabled={text.length===0} type="submit" onClick={speak} className="btn btn-primary mx-1 my-2">🗣</button>
        </div>

        <div className="container my-3" style={{color:props.mode==='dark'?'white':'black',}}>
            <h3>Text Summary</h3>
            <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>Time to Read : {0.008*text.split(" ").filter((element)=>{return element.length!==0}).length} minutes</p>
            <h3>Preview</h3>
            <p>{text.length>0?text:"Nothing to Preview."}</p>
        </div>

    </>
  )
}

