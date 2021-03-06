import React from 'react';
import s from './MyPost.module.css';
import {Post} from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {MyPostPropsType} from "./MyPostContainer";
import {Textarea} from "../../Common/FormsControl/FormsControl";
import {maxLength, requiredField} from "../../../utils/validators/validators";

export function MyPost(props: MyPostPropsType) {

    const postItems = props.posts.map(el => {
        return (
            <Post key={el.id}
                  id={el.id}
                  title={el.title}
                  likes={el.likes}
                  avatar={el.avatar}
                  removePost={props.removePost}
                  likesCountPost={props.likesCountPost}/>
        )
    })

    const addPost = (values: AddPostFormDataType) => {
            props.addPost(values.post);
    }

    return (
        <div className={s.contentMyPost}>
            <div>My Post</div>
            <div>
                <AddPostFormContainer onSubmit={addPost}/>
            </div>
            { postItems }
        </div>
    )
}

type AddPostFormDataType = {
    post: string
}

const maxLengthSymbols = maxLength(15)

function AddPostForm (props: InjectedFormProps<AddPostFormDataType>) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[requiredField, maxLengthSymbols]} name="post" placeholder="New post" />
            </div>
            <button>Post</button>
        </form>
    )
}

const AddPostFormContainer = reduxForm<AddPostFormDataType>({form: "AddPostForm"})(AddPostForm)


