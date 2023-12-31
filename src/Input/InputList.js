import React, {useState} from 'react';
import axios from "axios";

import '../style.css'
import AuthServise from "../AuthServise";

function InputList({productList,isAdmin}) {
    const [product,setProduct] = useState({});
    const [visible, setVisible] = useState(false);
    const[order,setOrder]=useState({});
    const [user, userId]= useState('')



    const handleDelete = (id) => {
        axios.delete("http://localhost:8080/api/product/" + id).then((res) => {
            console.log(res.data)
            window.location.reload()
        })
    }

    const showModal = (props) => {
        setProduct(props)
        setVisible(true);
    };
    const handleOk = () => {
        console.log("clicked ok")
        setVisible(false)
        window.location.reload()
    }

    const handleCancel = () => {
        console.log("clicked cancel")
        setVisible(false)
    }


    function addBucket(tour) {

        AuthServise.getUser().then((user)=>{
            userId(user.id)
        })
        setOrder({
            customerId:user,
            orderItems:[
                {
                    productId:tour.id,
                    quantity:1
                }

            ]
        })
        axios
            .post("http://localhost:8080/api/order/", order, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container-fluid">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr style={{textAlign:"center"}}>
                        <th scope="col">Name</th>
                        <th scope="col">Supplier name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total price</th>

                    </tr>
                    </thead>
                    <tbody>
                    {productList.map((product) => (
                        <tr>
                            <td>{product.productResponse.name}</td>
                            <td>{product.supplierResponse.fullName}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.date}</td>
                            <td>{product.totalPrice}</td>



                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InputList;