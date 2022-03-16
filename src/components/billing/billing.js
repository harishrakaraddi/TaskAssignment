import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { AccordionDetails } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

//Billing page
function Billing(props) {
  let [details, setDetails] = props.itemsObj;
  const navigate = useNavigate();

  //gives sub total
  function grossTotal() {
    let price = 0;
    details.forEach((element) => {
      price = element.totalPrice + price;
    });
    return price;
  }

  // gives total item price for corresponding number of quantities
  function itemPrice(price, count, i) {
    if (i !== undefined) {
      let total = price * count;
      details[i].totalPrice = price * count;
      return total;
    }
  }

  // gives saving amount of each item, when offer is availed
  function savings(item, i) {
    if (item.name === "Soup") {
      console.log(item);

      for (var i = 0; i < details.length; i++) {
        if (details[i].name === "Bread" && item.count) {
          console.log("=====", details[i]);
          const save = details[i].totalPrice / 2;
          details[i].savingsPrice = save;
          break;
        } else {
          details[i].savingsPrice = 0;
          break;
        }
      }
    }
    if (item.name === "Cheese") {
      if (item.count % 2 === 0) {
        const save = (item.count / 2) * item.price;
        details[i].savingsPrice = save;
      } else {
        const save = ((item.count - 1) / 2) * item.price;
        details[i].savingsPrice = save;
      }
    }
  }

  // gives total savings by adding saving of each items
  function offer_saving() {
    let offer = 0;
    details.forEach((element) => {
      offer = element.savingsPrice + offer;
    });
    return offer;
  }

  // gives total amount after deducting total savings from sub total
  function total_amount() {
    let totalAmount = 0;
    let offer = 0;
    let price = 0;
    details.forEach((element) => {
      offer = element.savingsPrice + offer;
    });

    details.forEach((element) => {
      price = element.totalPrice + price;
    });
    return (totalAmount = totalAmount + price - offer);
  }

  return (
    <div>
      <h2>Basket</h2>
      <div>
        <Button
          type="button"
          variant="outlined"
          style={{ marginTop: "10px" }}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </div>
      {details.length &&
        details.map((items, i) => {
          savings(items, i);
          itemPrice(items.price, items.count, i);
          return (
            <div className="mt-2 card p-2" key={i}>
              <div className="row">
                <div className="col-sm">
                  <h5 style={{ marginTop: "7px" }}>{items.name}</h5>
                </div>
                <div className="col-sm">
                  <h5 style={{ textAlign: "center", marginTop: "1px" }}>
                    <span>&#163;</span>
                    {items.price}
                  </h5>
                </div>
                <div className="col-sm ">
                  <div
                    className="d-flex flex-shrink-1"
                    style={{ justifyContent: "right" }}
                  >
                    <Button
                      variant="outlined"
                      style={{ minWidth: "20px" }}
                      onClick={(e) => props.increment(i)}
                    >
                      +
                    </Button>
                    <Typography className="mx-3 my-2">{items.count}</Typography>
                    <Button
                      variant="outlined"
                      style={{ minWidth: "20px" }}
                      onClick={() => props.decrement(i)}
                    >
                      -
                    </Button>
                  </div>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    textAlign="end"
                  >
                    item price &#163;{items.price}*{items.count}=&#163;
                    {items.totalPrice}
                  </Typography>
                </div>
              </div>

              {items.savingsPrice ? (
                <>
                  <Divider flexItem />
                  <div style={{ textAlign: "end", color: "red" }}>
                    Savings &#163;{items.savingsPrice}
                  </div>
                </>
              ) : null}
              <Divider flexItem />
              <div style={{ textAlign: "end", fontWeight: "bold" }}>
                Item cost &#163;{itemPrice(items.price, items.count, i)}
              </div>

              {/* <Divider flexItem /> */}
            </div>
          );
        })}
      <div>
        <div
          className="d-flex justify-content-between"
          style={{ fontWeight: "bold" }}
        >
          <label> sub total </label>
          <label> &#163;{grossTotal()} </label>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{ fontWeight: "bold" }}
        >
          <label> Savings: </label>
          <label> &#163;{offer_saving()} </label>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{ fontWeight: "bold" }}
        >
          <label> Total Amount:</label>
          <label> &#163;{total_amount()} </label>
        </div>
      </div>
      ;
    </div>
  );
}

export default Billing;
