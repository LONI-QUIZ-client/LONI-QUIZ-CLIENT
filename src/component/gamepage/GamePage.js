import React from 'react';
import './scss/GamePage.scss'

const GamePage = () => {

    const createImage = e =>{
        console.log("클릭!")
    }



    return (
        <div className='box'>
            <div className='a'>
                <div className='show-img'>
                    <img src="" onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2GQEpeYCnmbm3Kpk60eWT60SqR6861oxoVg&usqp=CAU';"className='img'/>
                    <input type="text" className='input' value={inputText}/>
                    <button className='create' onClick={createImage}>사진만들기</button>
                </div>
                <div className='user-list'>
                    <div className='user'>1</div>
                    <div className='user'>2</div>
                    <div className='user'>3</div>
                    <div className='user'>4</div>
                    <div className='user'>5</div>
                    <div className='user'>6</div>
                </div>
            </div>
            <div className='b'>

            </div>
        </div>
    );
};

export default GamePage;