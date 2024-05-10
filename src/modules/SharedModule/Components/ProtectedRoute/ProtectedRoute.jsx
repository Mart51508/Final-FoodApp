import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({LoginData , children}) {
    if(localStorage.getItem('token') || LoginData){
        return children
    }else{
        return  <Navigate to={'/'}/>
    }
}

export default ProtectedRoute
