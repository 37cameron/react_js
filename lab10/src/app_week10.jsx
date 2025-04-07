//global variable - every component can see it
const myGlobalVariable= "I'm global baby!";





const students = [{suid: 123456, name: 'Sue Flay', year: 'senior', major: 'Applied Data Analytics'}, {suid: 234567, name: 'Ella Vader', year: 'junior', major: 'Information Management and Technology'}, {suid: 345678, name: 'Chris P Bacon', year: 'junior', major: 'Innovation, Society and Technology'}];

function App(){
    
    return(
        <div>
            <h1>Map to Loop Lists</h1>
            <Students />
        </div>    

        );
        }

        function Students() {
            const filteredStudents = students.filter(student => student.name === "Sue Flay");
            return (
                <div>
                    <ul>
                        {
                            filteredStudents.map(function(item){
                            return <li key={item.suid}>Name: {item.name}<br/>Year: {item.year}<br/>Major: {item.major}</li>;
                            })
                        }
                    </ul>
                    
                </div>
            );
        }
      
           
export default App;