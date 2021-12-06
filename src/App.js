import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [dataTable, setDataTable] = useState([]);
    const [order, setOrder] = useState('DESC');
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState([]);

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
        console.log('handle Edit', row);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const rowID = e.target.id.value;
        console.log(dataTable);

        const IdToBeEdited = dataTable.filter((table) => table.id === rowID);
        console.log(IdToBeEdited);
    };
    return (
        <div className="App">
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
                EDIT:
                <form onSubmit={handleSubmit}>
                    <input type="text" name="id" value={editData.id} />
                    <input
                        type="text"
                        name="thresholdCondition"
                        value={editData.thresholdCondition}
                    />
                    <input
                        type="text"
                        name="CustomerId"
                        value={editData.customerId}
                    />
                    <input type="text" name="Name" value={editData.name} />
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
