import React, { useState } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()  

function Grocery() {

    let textInput = React.createRef();
    const [groceryItem, setGroceryItem] = useState([]);
    const [editGroceryItemId, setEditGroceryItemId] = useState(null);

    const handleSubmit = () => {
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
        toast.info("updated successfully");
    }

    const handleEdit = (itemId) => {
        textInput.current.value = groceryItem[itemId].name;
        setEditGroceryItemId(itemId);
    }


    return (
        <React.Fragment>
                <div className="card grocery_card">
                    <div className="card-body">
                        <div></div>
                        <h3 className="grocery_title">Grocery Bud</h3>
                        <div className="d-flex justify-content-center">
                            <input type="text" className="grocery_input" placeholder="e.g eggs" ref={textInput} />
                            <button className="submit_btn" onClick={handleSubmit}>Submit</button>
                            <button className="submit_btn" onClick={handleUpdate}>Edit</button>
                        </div>
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