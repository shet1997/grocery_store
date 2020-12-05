import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import Joi from 'joi-browser';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()  

function Grocery() {


    let textInput = React.createRef();
    const [groceryItem, setGroceryItem] = useState([]);
    const [editGroceryItemId, setEditGroceryItemId] = useState(null);
    const [errors, setError] = useState([]);
    var x = document.getElementById("edit");
    var y = document.getElementById("submit");


    const schema = Joi.object().keys({ 
        name: Joi.string().min(3).max(30).required(),
      }); 


    useEffect(() => {
        var x = document.getElementById("edit");
        var y = document.getElementById("submit");
        x.style.display = 'none';
        y.style.display = 'block';
    }, []);


    const handleValidate = () => {
        const data = {
            name: textInput.current.value
        }
        const result = Joi.validate(data, schema); 
        if(result.error === null) {
            setError(null);
        } else {
            const errorMessage = result.error.details[0].message;
            setError(errorMessage);
        }
    }

    const handleSubmit = () => {   
                handleValidate();
                {!errors &&
                setGroceryItem([
                    ...groceryItem, 
                    { 
                        id: groceryItem.length,
                        name: textInput.current.value
                    }
                ]);
                textInput.current.value = '';
                toast.success('item added successfully');
            }
        } 

    const handleDelete = (itemId) => {
        const deletingItems = [...groceryItem];
        let remainingItem =  deletingItems.filter(items => items.id != itemId);
        setGroceryItem(remainingItem);
        toast.error('deleted successfully');
    }


    const handleUpdate = () => {        
        const updatingItems = [...groceryItem];
        var index =  updatingItems.findIndex(indexs =>  indexs.id == editGroceryItemId);
        updatingItems[index].name = textInput.current.value;
        setGroceryItem(updatingItems);
        textInput.current.value = '';
        x.style.display = 'none';
        y.style.display = 'block';
        toast.info("updated successfully");
    }

    const handleEdit = (itemId) => {
        textInput.current.value = groceryItem[itemId].name;
        setEditGroceryItemId(itemId);
        x.style.display = 'block';
        y.style.display = 'none';
    }


    return (
        <React.Fragment>
                <div className="card grocery_card">
                    <div className="card-body">
                        <div></div>
                        <h3 className="grocery_title">Grocery Bud</h3>
                        <div className="d-flex justify-content-center">
                            <input type="text" className="grocery_input" placeholder="e.g eggs" ref={textInput} />
                            <button className="submit_btn" id="submit" onClick={handleSubmit}>Submit</button>
                            <button className="submit_btn" id="edit" onClick={handleUpdate}>Edit</button>
                        </div>
                        {errors && <div className="d-flex justify-content-center">{errors}</div>}
                        <div className="list_items">
                            {groceryItem.map(item => (
                                <li key={item.id} className="d-flex justify-content-between">
                                    {item.name}
                                    <div>
                                        <i className="fa fa-pencil-square-o edit_icon" aria-hidden="true" onClick={() => handleEdit(item.id)}></i>
                                        <i className="fa fa-trash" aria-hidden="true" onClick={() => handleDelete(item.id)}></i>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
        </React.Fragment>
    );
}

export default Grocery;