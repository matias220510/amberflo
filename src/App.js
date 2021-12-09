import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [dataTable, setDataTable] = useState([]);
    const [order, setOrder] = useState('DESC');
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://run.mocky.io/v3/3f275018-4a34-4354-ab35-83a8784a0056')
            .then((response) => response.json())
            .then((data) => setDataTable(data));
    }, []);

    const handleOrder = () => {
        if (order === 'DESC') {
            setOrder('ASC');
            setDataTable(dataTable.reverse());
        } else {
            setOrder('DESC');
            setDataTable(dataTable.sort());
        }
    };

    const handleEdit = (row) => {
        setShowForm(true);
        setEditData(row);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const rowID = e.target.id.value;
        const thresholdCondition = e.target.thresholdCondition.value;
        const customerId = e.target.customerId.value;
        const name = e.target.name.value;

        let keyToBeEdited = null;
        for (let i = 0; i < dataTable.length; i++) {
            if (dataTable[i].id === rowID) {
                keyToBeEdited = i;
            }
        }

        const newObject = {
            id: rowID,
            thresholdCondition,
            customerId,
            name,
        };

        const newDataTable = [...dataTable];

        newDataTable.splice(keyToBeEdited, 1);
        newDataTable.push(newObject);
        setDataTable(newDataTable);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const result = dataTable.filter((row) => row.name === searchTerm);
        if (result.length > 0) {
            setDataTable(result);
        }
    };
    return (
        <div className="App">
            <div className="searchBox">
                <label>Search:</label>
                <input
                    type="text"
                    name="searchItem"
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <div className="headerRow">
                <span>id</span>
                <span>thresholdCondition</span>
                <span>CustomerId</span>
                <span onClick={handleOrder}>Name</span>
                <span>Actions</span>
            </div>
            {dataTable.map((row) => {
                return (
                    <div className="rowContainer" key={row.id}>
                        <p>{row.id}</p>
                        <p>{row.thresholdCondition}</p>
                        <p>{row.customerId}</p>
                        <p>{row.name}</p>
                        <button
                            className="edit-button"
                            onClick={() => handleEdit(row)}
                        >
                            Edit
                        </button>
                    </div>
                );
            })}

            <div className={`form ${showForm ? 'show' : 'hide'}`}>
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label>ID:</label>
                        <input type="text" name="id" value={editData.id} />
                    </div>
                    <div className="inputContainer">
                        <label>ThresholdCondition:</label>
                        <input
                            type="text"
                            name="thresholdCondition"
                            defaultValue={editData.thresholdCondition}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>CustomerId:</label>
                        <input
                            type="text"
                            name="customerId"
                            defaultValue={editData.customerId}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={editData.name}
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit">Save</button>
                        <button onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
