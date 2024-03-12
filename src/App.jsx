import { useState, useEffect, useRef, useCallback } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }

    setPassword(pass);
  },[length, numberAllowed, charAllowed]);

  //useref hook:
  const passRef= useRef(null);

  const copyPassToCilpboard=useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  //useEffect hook:
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className="w-full max-w-md m-auto shadow-md rounded-lg px-4 py-3 my-12 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button 
          onClick={copyPassToCilpboard}
          className=" outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
          // onClick={copyPasswordTOclipboard}
          >
            copy
          </button>
        </div>

        <div className='flex text-sm gap-x-2'>
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setlength(e.target.value)}
          />
          <label>length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={()=>{
            setnumberAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor="numberInput">number</label>
        </div>
        
        <div className="flex items-center gap-x-1">
          <input
           type="checkbox"
           defaultChecked={charAllowed}
           onChange={()=>{setcharAllowed((prev)=> !prev)}}
           />
           <label htmlFor="characterInput">charecter</label>
        </div>

      </div>
        </div>
      
    </>
  );
}

export default App;
