import React , {Component, useEffect} from 'react';
import { useState } from 'react';
import  "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup"; 
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';
import { MdDone } from 'react-icons/md';


function App() {

  const [toDo ,setToDo] = useState({id:0, task:'',done:false});
  const [list , setList] = useState([]);
  const [count,setCount] = useState(0);


  const addToList = () => {

    setCount(count+1);
    setToDo({...toDo,id:count})
    const newList = [...list,toDo];
    setList(newList);
    setToDo({id:count+1, task:''});   //clear input field .
  }

  const deleteTask = (id) => {
    setList(list.filter(task => task.id !== id));
  }

  const doneTask = (id) => {

      setList(prevList => {
        const updatedList = prevList.map(task => {
          if (task.id === id) {
            return { ...task, done: !task.done }; 
          }
          return task; 
        });
        return updatedList;
      });
  }


  return (

   <Container>
    <Row style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      fontSize:"19px",
      fontWeight:"bolder",
    }}>To do list
    </Row>
    <hr/>
    <Row>
      <Col md={{span: 5,offset: 4}}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="add item ..."
            size="lg"
            value={toDo.task}
            onChange={(e)=>setToDo({...toDo,task:e.target.value})}
           />
           
          <InputGroup>
           
           <Button
             variant='warning'
             className="mt-2"
             onClick={()=> addToList()}
           >
            <MdAdd/>
           </Button>
          
          </InputGroup>

        </InputGroup>
      </Col>
    </Row>
    <Col md={{span: 5, offset: 4}}>
      <ListGroup>
      {list.map(item => (
      <ListGroup.Item key={item.id}>
        <Row onClick={()=>doneTask(item.id)}>

            <Col className="d-flex justify-content-start">
            <div 
              style={{ 
                width:30,
                height:30,
                marginRight:10,
                }}>
             {item.done?
             <MdDone 
             style={{ 
              width:30,
              height:30,
              background:'green',
              color:'white',
              borderRadius:5,
              margin:7}}/> :<></>
              }
              </div>

            <h3 className="task">{item.task}</h3>       
            </Col>
          
            <Col className="d-flex justify-content-end">
   
              <Button  
               variant = 'danger'
               style={{margin:'5px'}}
               onClick={()=>deleteTask(item.id)}>
                 <RiDeleteBinLine />
              </Button>
            
            </Col>
        </Row>
      </ListGroup.Item>
    ))}
      </ListGroup>
    </Col>
   </Container>
  );
}

export default App;
