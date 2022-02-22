
import { FaGithub, FaLinkedin} from 'react-icons/fa';

const FindMe = () => {
    return (
        <div className='find_me'>
            <span>Find me:</span>
            <a className="git_logo" href="https://github.com/zyusnow"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/mezyu/"><FaLinkedin /></a>
        </div>
    )
}

export default FindMe
