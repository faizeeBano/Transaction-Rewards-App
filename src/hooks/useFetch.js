import { useEffect, useState, useCallback } from "react";
import { API_PATH } from "../constants";

function useFetch() {
    const [data, setData] = useState({
        transactions: [],
        loading: false,
        error: null
    });

    const reload = useCallback(() => {
        setData({ transactions: [], loading: true, error: null });

        setTimeout(() => {
            fetch(API_PATH)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to load transactions.json");
                    return res.json();
                })
                .then((txs) => {
                    setData({ transactions: txs, loading: false, error: null });
                })
                .catch((err) => {
                    setData({
                        transactions: [],
                        loading: false,
                        error: err.message || "ERROR"
                    });
                });
        }, 500)
    }, []);

    useEffect(() => {
        reload();
    }, [reload]);

    return { ...data, reload };
}

export default useFetch;
