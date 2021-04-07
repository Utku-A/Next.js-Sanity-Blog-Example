import Head from 'next/head'
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar.js'
import styles from '../styles/content.module.css'

export default function Home({ posts }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'tsjygz8q',
        dataset: 'production',
      });

      setMappedPosts(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(550).height(350),
          }
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <div className={styles.back}>

      <Head><title>Blog Projesi</title></Head>

      <Navbar />
      <h1>Next Js + Sanity  blog</h1>
      <div className={styles.main}> 
        

        <div className={styles.block}>

        <h3>Blog Projesi</h3>
        <hr></hr>
        <p>İçindeki content'leri Sanity sunucusundan yada başka bir suncudan çekerek dinamik url yapısı ile sade bir blog sitesi </p>
        

        </div>

        <div className={styles.new}>
          {mappedPosts.length ? mappedPosts.map((p, index) => (
            <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} className={styles.images}>
              <h2>{p.title}</h2>
              <img src={p.mainImage} />
              <br></br>
              <br></br>
              <hr></hr>
            </div>
          )) : <>No Posts Yet</>}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent('*[ _type == "post" ]');
  const url = `https://tsjygz8q.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      }
    }
  } else {
    return {
      props: {
        posts: result.result,
      }
    }
  }
};

