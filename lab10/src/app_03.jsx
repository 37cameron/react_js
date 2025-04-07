//brings in react useState code
import { useState } from "react";

// sets up useState, what variable, what function changes it, and what start value
const Home = () => {
    const [name, setName] = useState('Cameron');



//cuntion actually making dynamic change




    
    let handleClick = () => {
        setName('Libby');
    }


    return(
        <div>
           <h1>Hello World</h1>
           <p>{name}</p>
           <button onClick={handleClick}>Click me</button>
       </div>   
        
        );
}
           
export default Home;