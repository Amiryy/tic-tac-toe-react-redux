import React from 'react';

const Header = ({titleName, author, git, gitIcon}) => {
    return(
        <div className="App-header">
            <a href={git} target='_blank'>
                <div className='author'>
                    <img id='github_icon' alt='/Amiryy' src={gitIcon}/>
                    <span id='author_span'>
                        {author}
                    </span>
                </div>
            </a>
            <br />
            <p>{titleName}</p>
            <hr />
        </div>
    )
};

export default Header;
