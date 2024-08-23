import React from 'react'

export const InfoModal = ({infoModal}) => {
  return (
    <div className='inforModalMainDiv'>
        <div className='modalDiv'>
            <p>{infoModal.message}</p>
            <div className='infobtnCont'>
                {infoModal.onNotConfirm ? <button className='noBtn' onClick={(e)=>{
                    infoModal.onNotConfirm(infoModal.notConfirmMessage)
                    infoModal.setInfoModal(null);
                }}>No</button>:""}
                <button className='yesBtn' onClick={(e)=>{
                    infoModal.onConfirm && infoModal.onConfirm(infoModal.body,infoModal.confirmMessage)
                    infoModal.setInfoModal(null);
                }}>{infoModal.onNotConfirm?"Yes":"Ok"}</button>
            </div>
        </div>
    </div>
  )
}
