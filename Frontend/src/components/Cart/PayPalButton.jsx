import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                { amount: { value: Number(amount).toFixed(2) } },
              ],
            });
          }}
          onApprove={(data, action) => {
            return action.order.capture().then(onSuccess);
          }}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;
