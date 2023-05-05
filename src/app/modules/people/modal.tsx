import React from 'react'
import './css/modal.css'

interface Props {
    active: boolean;
    setActive: (page: boolean) => void;
}
const Modal: React.FC<Props> = ({
    active,
    setActive
}) => {
    return (

        <div className={active ? 'modal active' : 'modal'} >
            <div className="modal__content">
                <button onClick={() => setActive(false)}>
                    <span>X</span> </button>
                <div className='formInput'>
                    <label htmlFor="Search">Name:</label>
                    <input
                        name="Name"
                        role="textbox"
                        aria-label="Name"
                        type="text"
                    />
                </div>
                <div className='formInput'>
                    <label htmlFor="Search">Show:</label>
                    <input
                        name="Show"
                        role="textbox"
                        aria-label="Show"
                        type="text"
                    />
                </div>
                <div className='formInput'>
                    <label htmlFor="Search">Actor/Actress:</label>
                    <input
                        name="Actor"
                        role="textbox"
                        aria-label="Actor"
                        type="text"
                    /> </div>
                <div className='formInput'>
                    <label htmlFor="Search">Date Of Birth:</label>
                    <input
                        name="DOB"
                        role="textbox"
                        aria-label="DOB"
                        type="text"
                    />
                </div>
                <div className='formInput'>
                    <label htmlFor="Search">Movies:</label>
                    <input
                        name="Movies"
                        role="textbox"
                        aria-label="Movies"
                        type="text"
                    />
                </div>
                <button className='submit'> Submit </button>
            </div>
        </div>
    )
}

export default Modal
