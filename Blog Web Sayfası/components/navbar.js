import Link from 'next/link'
import { useRouter } from 'next/router';
import style from '../styles/nav.module.css'

export const Navbar = () => {
  const router = useRouter();

  return (
    <div className={style.navbar}>
        <ul>
            <li><Link href="/"><a>Anasayfa</a></Link></li>
            <li className={style.mail}><Link href="mailto:halisutkualadag@gmail.com">İletişim</Link></li>
        </ul>
    </div>
  );
};

export default Navbar