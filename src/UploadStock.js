
import React, { useState } from 'react';
import axios from 'axios';

function UploadStock() {
    const [stocks, setStocks] = useState([{ stockName: '', symbol: '' }]);

    const handleChange = (index, event) => {
        const values = [...stocks];
        values[index][event.target.name] = event.target.value;
        setStocks(values);
    };

    const handleAddStock = () => {
        setStocks([...stocks, { stockName: '', symbol: '' }]);
    };

    const handleSubmit = () => {
        axios.post('/api/stocks/upload', stocks)
            .then(response => console.log('Stocks uploaded successfully'))
            .catch(error => console.error('There was an error uploading the stocks!', error));
    };

    return (
        <div>
            <h1>test page</h1>
            <h2>Upload Restricted Stocks</h2>
            {stocks.map((stock, index) => (
                <div key={index}>
                    <input name="stockName" placeholder="Stock Name" value={stock.stockName} onChange={e => handleChange(index, e)} />
                    <input name="symbol" placeholder="Symbol" value={stock.symbol} onChange={e => handleChange(index, e)} />
                </div>
            ))}
            <button onClick={handleAddStock}>Add Stock</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default UploadStock;
