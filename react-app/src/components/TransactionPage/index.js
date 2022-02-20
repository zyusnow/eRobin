
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getAllTransations } from '../../store/transaction';
import './TransactionPage.css'

const TransactionPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const transactions = useSelector(state => state?.transaction?.transactions);
    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id;

    useEffect(() => {
        if (!sessionUser) {
            history.push('/login')
        } else {
            dispatch(getAllTransations(userId))
        }
    }, [dispatch, userId])

    return (
        <div className='transaction_container'>
            <div className='transaction_container_sub'>
                <h2>Transactions</h2>
                <div>
                    {transactions &&
                        transactions.length ?
                        (
                            <table>
                                <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Shares</th>
                                    <th>Price</th>
                                    <th>Buy/Sell</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id}  className={(transaction?.transaction_type === "Sell") ? 'sell' : 'buy'}>
                                        <td>{transaction?.ticker}</td>
                                        <td>{transaction?.transaction_shares}</td>
                                        <td>{transaction?.transaction_price}</td>
                                        <td>{transaction?.transaction_type}</td>
                                        <td>{transaction?.createdAt.slice(5,16)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>

                        )
                        : (<div>You don't have any transactions yet.</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default TransactionPage
