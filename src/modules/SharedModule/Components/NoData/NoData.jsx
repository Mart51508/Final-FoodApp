import React from 'react'
import Nodata from '../../../../assets/images/no-data.png'
 
function NoData() {
    return (
        <>
        <div className="image my-3">
            <img src={Nodata} />
            <div className="text my-4">
                <h5>No Data !</h5>
                <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>
        </div>
        </>
    )
}

export default NoData
