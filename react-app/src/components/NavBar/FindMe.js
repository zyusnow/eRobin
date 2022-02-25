
import { FaGithub, FaLinkedin} from 'react-icons/fa';

const FindMe = () => {
    return (
        <div className='find_me'>
            <span>Find me:</span>
            <a className="git_logo" href="https://github.com/zyusnow" target="_blank"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/mezyu/" target="_blank"><FaLinkedin /></a>
        </div>
    )
}

export default FindMe
