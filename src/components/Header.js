import React from 'react';

const Header = ({titleName, author, git}) => {
    return(
        <div className="App-header">
            <a href={git} target='_blank'><p className='author'>
                {author}
            </p></a><br />
            <p>{titleName}</p>
        </div>
    )
}

export default Header;
