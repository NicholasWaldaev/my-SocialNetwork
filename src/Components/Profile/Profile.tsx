import React from 'react';
import s from './Profile.module.css';
import {MyPostContainer} from "./MyPost/MyPostContainer";

export function Profile() {
    return (
        <div className={s.content}>
            <div className={s.contentPhoto} >
                <img className={s.contentImg}
                     src="https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg"/>
            </div>
            <div className={s.contentInfo}>
                <h3>My name</h3>
                <div>Birthday:</div>
                <div>Current city:</div>
                <div>Relationship:</div>
            </div>
            <MyPostContainer/>
        </div>
    )
}


