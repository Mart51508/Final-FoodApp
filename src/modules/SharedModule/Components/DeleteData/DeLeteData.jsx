import React from 'react'
import NoDataDelete from '../../../../assets/images/no-data.png'

function DeLeteData({item}) {
    return (
        <>
        <div className="container text-center">
        <img src={NoDataDelete}  className='text-center'/>
        <h5 className='my-3'>Delete this {item}</h5>
        <p className='text-muted my-2'>Are you sure you want to delete this items? if you are sure just click on delete it</p>
        </div>
        </>
    )
}

export default DeLeteData
