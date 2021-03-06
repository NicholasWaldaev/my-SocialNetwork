import {Dispatch} from "redux";
import {userAPI} from "../API/api";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS = "SET-TOTAL-USERS"
const SERVER_IS_FETCHING = "SERVER-IS-FETCHING"
const FOLLOWING_IN_PROGRESS = "FOLLOWING-IN-PROGRESS"

type FollowAT = {
    type: typeof FOLLOW
    userID: number
}

type UnfollowAT = {
    type: typeof UNFOLLOW
    userID: number
}

type SetUsersAT = {
    type: typeof SET_USERS
    users: Array<UserType>
}

type SetCurrentPageAT = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

type SetTotalUsersCountAT = {
    type: typeof SET_TOTAL_USERS
    totalUsers: number

}

type ServerIsFetchingAT = {
    type: typeof SERVER_IS_FETCHING
    isFetching: boolean
}

type FollowingInProgressAT = {
    type: typeof FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}

export type UsersActionType = FollowAT
    | UnfollowAT
    | SetUsersAT
    | SetCurrentPageAT
    | SetTotalUsersCountAT
    | ServerIsFetchingAT
    | FollowingInProgressAT

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: null | string
        large: null | string
    },
    status: null
    followed: boolean
}

export const initialState = {
    users: [] as Array<UserType>,
    totalUserCount: 12686,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => (u.id === action.userID ? {...u, followed: true} : u))}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => (u.id === action.userID ? {...u, followed: false} : u))}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS:
            return {...state, totalUserCount: action.totalUsers}
        case SERVER_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case FOLLOWING_IN_PROGRESS:
            debugger
        let a = {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId ]
                    : state.followingInProgress.filter(f => f !== action.userId)
            }
            return a
    }
    return state;
}

export const followAC = (userID: number): FollowAT => ({type: FOLLOW, userID})
export const unfollowAC = (userID: number): UnfollowAT => ({type: UNFOLLOW, userID})
export const setUsers = (users: Array<UserType>): SetUsersAT => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageAT => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsers = (totalUsers: number): SetTotalUsersCountAT => ({type: SET_TOTAL_USERS, totalUsers})
export const serverIsFetching = (isFetching: boolean): ServerIsFetchingAT => ({type: SERVER_IS_FETCHING, isFetching})
export const setFollowingInProgress = (isFetching: boolean, userId: number): FollowingInProgressAT => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId})

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch<UsersActionType>) => {
    dispatch(serverIsFetching(true));
    userAPI.getUser(currentPage, pageSize)
        .then(data => {
            dispatch(setTotalUsers(data.totalCount));
            dispatch(serverIsFetching(false));
            dispatch(setUsers(data.items));
        })
}

export const onPageNumber = (pageNumber: number, pageSize: number) => (dispatch: Dispatch<UsersActionType>) => {
    dispatch(serverIsFetching(true));
    dispatch(setCurrentPage(pageNumber))
    userAPI.onPageNumber(pageNumber, pageSize)
        .then(data => {
            dispatch(setUsers(data.items));
            dispatch(serverIsFetching(false));
        })
}

export const followTC = (userId: number) => (dispatch: Dispatch<UsersActionType>) => {
    debugger
    dispatch(setFollowingInProgress(true, userId))
    userAPI.follow(userId)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(followAC(userId))
            }
            dispatch(setFollowingInProgress(false, userId))
        })
}

export const unfollowTC = (userId: number) => (dispatch: Dispatch<UsersActionType>) => {
   debugger
    dispatch(setFollowingInProgress(true, userId))
    userAPI.unfollow(userId)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(unfollowAC(userId))
            }
            dispatch(setFollowingInProgress(false, userId))
        })
}

