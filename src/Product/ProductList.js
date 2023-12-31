import React, {useState} from 'react';
import axios from "axios";
import ProductEdit from "./ProductEdit";
import '../style.css'
import AuthServise from "../AuthServise";
import OrderAdd from "../Order/OrderAdd";
import {Button} from "antd";

function ProductList({productList,isAdmin}) {
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
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Order</th>

                    </tr>
                    </thead>
                    <tbody>
                    {productList.map((product) => (
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.date}</td>


                                    <td><button  onClick={()=>showModal(product)} className={"btn btn-primary"}>Edit</button></td>
                                    <td> {product.currentQuantity?<OrderAdd product={product}/>:            <Button type="primary" >Order</Button>
                                    } </td>


                        </tr>
                    ))}
                    </tbody>
                </table>
                <ProductEdit info={product} visible={visible} onOk={handleOk} onCancel={handleCancel}/>
            </div>
        </div>
    );
}

export default ProductList;