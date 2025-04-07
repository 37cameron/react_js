//global variable - every component can see it
const myGlobalVariable= "I'm global baby!";





const students = [{suid: 123456, name: 'Sue Flay', year: 'senior', major: 'Applied Data Analytics'}, {suid: 234567, name: 'Ella Vader', year: 'junior', major: 'Information Management and Technology'}, {suid: 345678, name: 'Chris P Bacon', year: 'junior', major: 'Innovation, Society and Technology'}];



//long form
const Hello2 = () => {
    return(
        <div>
            <h1>Hello 2</h1>
        </div>
    );
}

// arrow function concise
const Hello3 = () => (<div><h1>Hello 3</h1></div>)


function App(){
    
    return(
        <div>
            <h1>Hello World</h1>
            <Hello2 />
            <Hello3 /> 
        </div>   
        
        );
        }

           
export default App;