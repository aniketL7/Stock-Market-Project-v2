import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const PortfolioOrderForm =(props)=> {
    {/* creates a form for the user to input the stock info that they are buying */}
  return (
    <div className="aside order-holder">
        <h3>{props.balance}</h3>
        <form onSubmit={props.buyStock} className="form-group">
        <label>
              Symbol
              <input type="text" onChange={props.takeSymbol} placeholder="Symbol" className="form-control"/>          </label>
          <label>
              Qty
              <input type="number" onChange={props.takeQty} placeholder="Qty" className="form-control"/>
          </label>
          <label>
              <input type="submit" value="Submit" className="form-control"/>
              
          </label>
        </form>
        <div>{props.stopOrderBlock}</div>
    </div>
  );
}

export default PortfolioOrderForm;