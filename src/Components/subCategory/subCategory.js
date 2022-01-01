import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useQuery from "../../Hooks/useQuery";
import {useHistory} from "react-router-dom";
import style from "./subCategories.module.css";
import cn from "classnames"
import {AiOutlinePlus} from "react-icons/ai";
import {addCategoryAC} from "../../Redux/Actions/categories.action";
import Modal from "../Global/Modal/modal";
import Input from "../Global/Input/input";
import UploadPhoto from "../uploadPhoto/upload-photo";
import {addSubCategoryAC} from "../../Redux/Actions/subcategory.action";

const SubCategory = () => {
    const subCategories = useSelector(state => state.subCategoriesReducer.subCategories);
    const [isShowCategoryModal, setShowCategoryModal] = useState(false)
    const [subCategoryText, setSubCategoryText] = useState('');
    const dispatch = useDispatch()
    const [error,setError] = useState(false)

    const addNewSubCategory = () => {
        if (!subCategoryText == " ") {
            dispatch(addSubCategoryAC({id: Math.random(), subCategory: subCategoryText, categoryId: categoryQuery}))
            setShowCategoryModal(false)
            setSubCategoryText("")
            setError(false)
        }else {
            setError(true)
        }
    }

    const query = useQuery();
    const history = useHistory();

    const genderId = +query.get('gender') || 1
    const categoryQuery = +query.get('category')
    const subCategoryQuery = +query.get('subCategory')
    return (
        <div className={style.subs}>
            <div className={style.subCategory}>

                {
                    categoryQuery !== 0 &&  subCategories.map(x => {
                        return (
                            x.categoryId == categoryQuery &&
                            <div key={x.id}
                                 className={x.id === subCategoryQuery ? cn(style.border, style.active) : cn(style.border)}
                                 onClick={() => history.push(`/?gender=${genderId}&category=${categoryQuery}&subCategory=${x.id}`)}>
                                <p className={style.subP}>{x.subCategory}</p>
                            </div>
                        )
                    })
                }

            </div>
            { categoryQuery !== 0 &&  <div className={style.plus} onClick={() => setShowCategoryModal(true)}>
                <AiOutlinePlus />
            </div> }
            {isShowCategoryModal && <Modal cn="modalTwo" close={() => setShowCategoryModal(false)}>
                <div className={style.modalContent}>
                    <p>добавить категория</p>
                    <p style={{display:error && "block"}} className={style.err}>file is empty</p>
                </div>

                <div className={style.inputDiv}>
                    <Input placeholder="категория" cn="categoryInp" value={subCategoryText} onChange={e => setSubCategoryText(e.target.value)}/>
                </div>

                <div>
                    <button className={style.buttonModal} onClick={addNewSubCategory}>добавить</button>
                </div>
            </Modal>}
        </div>
    );
};

export default SubCategory;