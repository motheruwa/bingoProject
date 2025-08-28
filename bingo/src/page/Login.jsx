import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import styles from "./TicketGenerator.module.css";

export default function TicketGenerator() {
  const [odds, setOdds] = useState([]);
  const [selectedOdds, setSelectedOdds] = useState([]);
  const [ticket, setTicket] = useState(null);
  const barcodeRef = useRef(null);

  // Generate odds with random decimals
  useEffect(() => {
    const generateOdds = () => {
      let arr = [];
      for (let i = 1; i <= 100; i++) {
        arr.push((i + Math.random()).toFixed(2));
      }
      setOdds(arr);
    };
    generateOdds();
  }, []);

  // Render barcode when ticket is created
  useEffect(() => {
    if (ticket && barcodeRef.current) {
      JsBarcode(barcodeRef.current, ticket.id, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 60,
        displayValue: true,
      });
    }
  }, [ticket]);

  const addOddToTicket = (odd) => {
    if (!selectedOdds.find((item) => item.odd === odd)) {
      setSelectedOdds([...selectedOdds, { odd, amount: "" }]);
    }
  };

  const updateAmount = (odd, value) => {
    setSelectedOdds((prev) =>
      prev.map((item) =>
        item.odd === odd ? { ...item, amount: value } : item
      )
    );
  };

  const generateTicket = () => {
    if (selectedOdds.length === 0) {
      alert("Please select at least one odd");
      return;
    }
    if (selectedOdds.some((item) => !item.amount || item.amount <= 0)) {
      alert("Please enter valid amounts for all selected odds");
      return;
    }

    const ticketId = "TKT-" + Date.now();
    const totalAmount = selectedOdds.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );

    setTicket({
      id: ticketId,
      bets: selectedOdds,
      total: totalAmount,
      createdAt: new Date().toLocaleString(),
    });

    setSelectedOdds([]);
  };

  const handlePrint = () => {
    window.print();
    setTicket(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎟️ Aviator Ticket Generator</h2>

      {/* Odds grid */}
      <div className={styles.oddsGrid}>
        {odds.map((o, idx) => (
          <button
            key={idx}
            onClick={() => addOddToTicket(o)}
            className={`${styles.oddBtn} ${
              selectedOdds.find((item) => item.odd === o) ? styles.oddBtnActive : ""
            }`}
          >
            {o}x
          </button>
        ))}
      </div>

      {/* Selected odds */}
      {selectedOdds.length > 0 && (
        <div className={styles.selectedWrapper}>
          <h3 className={styles.subTitle}>Selected Odds</h3>
          {selectedOdds.map((item, idx) => (
            <div key={idx} className={styles.selectedItem}>
              <span className={styles.oddLabel}>{item.odd}x</span>
              <input
                type="number"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) => updateAmount(item.odd, e.target.value)}
                className={styles.amountInput}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={generateTicket} className={styles.generateBtn}>
        Generate Ticket
      </button>

      {/* Ticket Display */}
      {ticket && (
        <div className={styles.ticketBox}>
          <h3 className={styles.subTitle}>Ticket Details</h3>
          <p><b>ID:</b> {ticket.id}</p>
          <p><b>Date:</b> {ticket.createdAt}</p>
          <div className={styles.betList}>
            {ticket.bets.map((bet, idx) => (
              <p key={idx}>{bet.odd}x → {bet.amount}</p>
            ))}
          </div>
          <p className={styles.total}>Total: {ticket.total}</p>

          <svg ref={barcodeRef}></svg>

          <button onClick={handlePrint} className={styles.printBtn}>
            Print Ticket
          </button>
        </div>
      )}
    </div>
  );
}
