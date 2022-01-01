import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useQuery from "../../Hooks/useQuery";
import {useHistory} from "react-router-dom";
import productsReducer from "../../Redux/Reducers/products.reducer";
import style from "./products.module.css"
import Filter from "../Filter/filter";
import {AiOutlinePlus} from "react-icons/ai";
import Modal from "../Global/Modal/modal";
import Input from "../Global/Input/input";
import UploadPhoto from "../uploadPhoto/upload-photo";
import {addCategoryAC} from "../../Redux/Actions/categories.action";
import {addProductAC} from "../../Redux/Actions/products.action";

const Products = ({searchedAllProducts}) => {
    const genders = useSelector(state => state.genderReducer.genders);

    const [isShowProductModal, setShowProductModal] = useState(false)
    const [error,setError] = useState(false)

    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null)
    const [productText, setProductText] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCode, setProductCode] = useState('');
    const dispatch = useDispatch()
    const query = useQuery();
    const history = useHistory();

    const genderId = +query.get('gender') || 1
    const categoryQuery = +query.get('category') || 1
    const subCategoryQuery = +query.get('subCategory')



//     useEffect(()=> {
//         let arr = [];
//         filprice.length && searchedAllProducts.map(p => {
//             p.price > filprice[0] && p.price < filprice[1] &&
//             arr.push(p)
//         })
//         setFilteredProducts(arr)
//         console.log(filteredProduct)
//     },[filprice[0], filprice[1]])
//
// useEffect(() => {
//     if(filteredProduct.length) {
//         console.log(filteredProduct)
//     }
// }, [filteredProduct.length])

    const addNewProduct = () => {
        if (productText != " "){
        dispatch(addProductAC({id: Math.random(), subCategoryId:subCategoryQuery, img: photo , price:productPrice, code:productCode}))
        setShowProductModal(false)
        }else {
            setError(true)
        }
    }

    return (

        <div className={style.products}>
            {

                searchedAllProducts.map(p => {
                    return (
                       p.subCategoryId === subCategoryQuery && <div key={p.id}  className={style.product}>
                            <img src={p.productImg} className={style.image}/>
                           <div className={style.infos}>
                               <div> {p.price}</div>
                               <div>{p.code} </div>
                           </div>
                        </div>
                    )
                })

            }
            {/*<div>*/}
            {/*    <div className={style.add} onClick={() => setShowProductModal(true)}>*/}
            {/*        <AiOutlinePlus/>*/}
            {/*    </div>*/}
            {/*</div>*/}



            {isShowProductModal && <Modal cn="modal" close={() => setShowProductModal(false)}>
                <div className={style.modalContent}>
                    <p>добавить категория</p>
                    <p style={{display:error && "block"}} className={style.err}>file is empty</p>
                </div>
                <div className={style.ProductIconModal}>
                    {
                        genders.map(s => {
                            return (
                                <div className={style.ProductModalInfos}
                                     onClick={() => history.push(`/?gender=${s.id}`)}
                                >
                                    <div key={s.id} className={style.genderModal}>
                                        <img src={s.gender}/>
                                        <p className={style.modalProductP}>{s.genderP}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={style.inputDiv}>
                    <Input placeholder="категория" cn="categoryInp" value={productPrice} onChange={e => setProductPrice(e.target.value)}/>
                    <Input placeholder="категория" cn="categoryInp" value={productCode} onChange={e => setProductCode(e.target.value)}/>
                    <Input placeholder="категория" cn="categoryInp" value={productText} onChange={e => setProductText(e.target.value)}/>
                </div>
                <div>

                </div>

                <UploadPhoto

                    photo={photo}
                    setPhoto={setPhoto}
                    setFile={setFile}
                    styles={{height: "145px", margin: "18px 0 25px"}}
                    textStyles={{marginTop: "21px", fontSize: "16px"}}
                />

                <div>
                    <button className={style.buttonModal} onClick={addNewProduct}>добавить</button>
                </div>
            </Modal>}
        </div>
    );
};

export default Products;