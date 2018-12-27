import React, {Component} from 'react'


class Addtodo extends Component{
    state={
        content:''
    }
    handlechange = (e) =>{
        this.setState({
           content:e.target.value 
        })
    }
    handlesubmit =(e)=>{
        e.preventDefault();
        console.log(this.state.content);
    }
    render(){
        return(
            <div>
                <form onSubmit={handlesubmit}>
                    <label>Add new To do:</label>
                    <input type="text" onChange={handlechange}/>
                </form>
            </div>
        )
    }
}

export default Addtodo;